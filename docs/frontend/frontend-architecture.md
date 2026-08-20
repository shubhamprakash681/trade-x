# Frontend Architecture

This document defines the architecture, tools, and technical approach for the TradeX React frontend application.

## Core Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict Mode)
- **Server State Management**: TanStack Query (React Query)
- **Client State Management**: Zustand (for light client-side state like auth/theme/sidebar)
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives or shadcn/ui for accessible headless components (where necessary)
- **Charting**: TradingView Lightweight Charts
- **WebSocket Client**: `@stomp/stompjs` (STOMP over WebSockets)
- **API Client**: Axios

## Application Structure (Feature-Oriented)
The application will follow a feature-oriented directory structure to keep related code grouped logically.

```text
src/
├── api/                  # Centralized Axios client and request configuration
├── app/                  # Next.js App Router layout, pages, and API routes
├── components/           # Generic/Reusable UI components (buttons, inputs, layouts)
│   ├── common/           # Shared components (Spinner, Card, Modal)
│   └── layout/           # Base layouts (Sidebar, Header, AppLayout)
├── features/             # Feature-specific logic, components, and hooks
│   ├── auth/             # Login, Register, Auth Context
│   ├── dashboard/        # Dashboard widgets, market overview
│   ├── market/           # Stock details, search, charting
│   ├── portfolio/        # Portfolio summary, holdings
│   ├── orders/           # Order placement, order history
│   ├── watchlist/        # Watchlist management
│   ├── alerts/           # Alert creation and management
│   └── notifications/    # Notifications list
├── hooks/                # Generic custom hooks (useDebounce, useMediaQuery)
├── pages/                # Route-level components composing feature components
├── routes/               # Route definitions and route guards (ProtectedRoute)
├── store/                # Zustand stores (e.g., authStore, themeStore)
├── types/                # Shared TypeScript types for API DTOs
├── utils/                # Utility functions (formatting, date parsers, math)
├── websocket/            # STOMP client manager and WebSocket context
└── constants/            # Constants
```

## Routing Strategy
Next.js App Router will be used to define application routes.
- **Public Routes**: `/login`, `/register`
- **Protected Routes**: Handled via layout or middleware.
  - `/` -> Redirects to `/dashboard`
  - `/dashboard` -> Market Overview, Portfolio Summary, Watchlist, Top Movers
  - `/markets` -> Stock search and market explorer
  - `/stocks/:symbol` -> Stock details, historical chart, live price, and buy/sell panel
  - `/portfolio` -> Investment overview and holdings list
  - `/orders` -> Transaction and order history
  - `/watchlist` -> User watchlist
  - `/alerts` -> Price alerts management
  - `/notifications` -> User notifications list

## API Client Architecture
- A centralized Axios instance will be created in `src/api/client.ts`.
- **Base URL**: Configured via `NEXT_PUBLIC_API_BASE_URL`.
- **Interceptors**: 
  - Request interceptor: Attaches the JWT `Bearer` token to the `Authorization` header from the auth store.
  - Response interceptor: Globally handles errors (like 401 Unauthorized by clearing auth state and redirecting to login, and parsing `ApiError` format from the backend).
- **API Modules**: Each feature will have an API file (e.g., `auth.api.ts`, `market.api.ts`) exporting functions that call the Axios client and return strongly-typed promises.

## State Management
### Server State (TanStack Query)
- Used for all data fetched from REST APIs.
- Queries will use structured keys (e.g., `['portfolio', 'summary']`, `['stock', 'TCS']`).
- Mutations will be used for POST/PUT/DELETE operations and will invalidate relevant query caches upon success (e.g., placing an order invalidates `portfolio` and `orders` queries).

### Client State (Zustand)
- Only used for true client-side global state.
- **Auth Store**: Stores the current user object and access/refresh tokens.
- **WebSocket Store**: Stores connection status to coordinate UI indicators.

## WebSocket Architecture
- A centralized STOMP WebSocket manager (`useWebSocketManager`) will handle connection lifecycle.
- Connects using `NEXT_PUBLIC_WS_BASE_URL` on app load for authenticated users.
- Subscribes to `/topic/market` globally if needed, or dynamically subscribes/unsubscribes to `/topic/{symbol}` based on the current active view (e.g., subscribing to TCS only when viewing the TCS stock page) to optimize bandwidth.
- Emits price updates that components can listen to. To prevent excessive re-renders, the live price will be updated optimistically in local component state or refs (especially for charts) rather than flushing to global state every tick.

## Testing Architecture
- **Unit Testing**: Vitest and React Testing Library for testing utility functions, pure components, and hooks.
- **API Mocking**: MSW (Mock Service Worker) for intercepting API calls during tests to simulate backend responses and errors.
- **E2E Testing**: Playwright for critical user workflows (login, viewing stock, placing order).

## Environment Configuration
- `.env` will contain local variables (e.g., `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`).
- `.env.example` will be checked into source control.
- Secrets will never be stored in frontend environment variables.

## Missing or Ambiguous Backend Capabilities (Phase 0 Findings)
After investigating the backend APIs, the following observations were made:
- **WebSocket Authentication**: The backend STOMP endpoints currently do not enforce JWT authorization on the STOMP connection (they lack `ChannelInterceptor` checks). The frontend will connect without passing STOMP headers for auth unless configured otherwise by the proxy/gateway.
- **Token Storage**: The backend provides JWT access and refresh tokens in the JSON response of `/api/auth/login`. Since HttpOnly cookies are not currently implemented by the backend for these tokens, the frontend will need to store these securely (e.g., in-memory or `localStorage` as a fallback) to attach them to the `Authorization: Bearer <token>` header.
- **Pagination**: The `StockController` (`/api/stocks`) supports page, size, and sort. The frontend will implement pagination for this list. Other lists (like portfolio, notifications) do not seem to have explicit pagination except for a `limit` parameter.
- **Date Format**: The backend accepts dates in `ISO.DATE` format (e.g., `2023-10-01`) for market history requests.
- **Alert Conditions**: The `AlertCondition` enum is used. The frontend will need to dynamically construct or hardcode the enum types (e.g., `GREATER_THAN_OR_EQUAL`, `LESS_THAN_OR_EQUAL`) based on the backend schema.
