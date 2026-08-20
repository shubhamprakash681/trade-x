# TradeX - Gemini Development Instructions

## Project Identity

TradeX is a production-inspired paper-trading platform inspired by modern investment applications such as Groww and INDmoney.

TradeX does NOT perform real financial transactions and does NOT connect to real brokers.

The Spring Boot backend is already implemented and deployed.

The current objective is to build a complete production-quality React frontend that consumes the existing backend.

---

## 1. Primary Objective

Build the complete TradeX frontend using:

- React
- TypeScript
- Next.js (App Router)
- TanStack Query / React Query
- Zustand or Redux Toolkit only where genuine client-side global state is required
- Tailwind CSS
- A high-quality component library where appropriate
- TradingView Lightweight Charts or another suitable financial charting library
- Native WebSocket or STOMP client according to the actual backend implementation

The frontend must integrate with the existing backend.

The backend is the source of truth.

### Never

- Invent APIs.
- Invent DTO structures.
- Invent authentication behaviour.
- Invent WebSocket protocols.
- Modify backend behaviour merely to simplify frontend implementation.
- Modify backend source code unless explicitly instructed.

---

## 2. Absolute Rules

### Rule 1 - Backend is the source of truth

Before implementing any frontend feature:

1. Inspect the corresponding backend controller.
2. Inspect request DTOs.
3. Inspect response DTOs.
4. Inspect relevant service/business logic.
5. Inspect validation annotations.
6. Inspect enums.
7. Inspect security configuration.
8. Inspect exception handling.
9. Inspect pagination/filtering behaviour.
10. Inspect WebSocket configuration for real-time features.

Only then implement the frontend.

### Rule 2 - Never invent an endpoint

Never create frontend calls unless the backend actually exposes those endpoints.

If an expected feature does not have a backend API:

1. Identify the gap.
2. Document it.
3. Do not silently invent the endpoint.
4. Do not modify the backend unless explicitly instructed.

### Rule 3 - Do not modify backend

The existing backend is considered completed.

Do not:

- modify Java code
- modify Spring configuration
- change API contracts
- rename backend endpoints
- change DTOs
- change database schema
- change authentication behaviour

unless explicitly instructed.

---

## 3. Phase 0 - Reverse Engineer Backend

Before writing frontend implementation code, perform a complete backend analysis.

Inspect:

- root pom.xml
- module pom.xml files
- controllers
- DTOs
- entities
- enums
- services
- repositories
- security
- JWT implementation
- exception handling
- WebSocket configuration
- Kafka-facing interfaces if relevant
- application.yml
- application.properties
- Docker configuration
- Swagger/OpenAPI configuration
- README files
- database migrations

Identify:

- authentication mechanism
- access token handling
- refresh token handling
- authorization rules
- role/permission model
- pagination
- sorting
- filtering
- validation
- error response structure
- timestamp formats
- monetary value formats
- WebSocket protocol
- WebSocket authentication
- WebSocket topics
- WebSocket message formats

Do not begin frontend implementation during this phase.

### Phase 0 Deliverables

Create:

```text
docs/frontend/backend-api-map.md
docs/frontend/backend-websocket.md
docs/frontend/frontend-architecture.md
```

`backend-api-map.md` must document every endpoint:

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|

Include representative JSON examples based on actual backend DTOs.

`backend-websocket.md` must document:

- connection URL
- authentication
- protocol
- topics
- subscription mechanism
- message schema
- reconnect requirements
- heartbeat if applicable

`frontend-architecture.md` must document:

- application structure
- routing
- API client
- state management
- React Query strategy
- WebSocket architecture
- component architecture
- testing architecture
- environment configuration

After creating these documents, STOP and report findings and backend gaps. Do not guess.

---

## 4. Frontend Architecture

Use feature-oriented architecture.

Preferred structure:

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.api.ts
│   │   ├── stocks.api.ts
│   │   ├── market.api.ts
│   │   ├── portfolio.api.ts
│   │   ├── orders.api.ts
│   │   ├── watchlist.api.ts
│   │   └── notifications.api.ts
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── market/
│   │   ├── portfolio/
│   │   ├── orders/
│   │   └── charts/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── market/
│   │   ├── portfolio/
│   │   ├── orders/
│   │   ├── watchlist/
│   │   ├── alerts/
│   │   └── notifications/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── websocket/
│   ├── constants/
│   └── constants/
├── .env.local
├── package.json
├── tsconfig.json
└── next.config.ts
```

Adjust the structure if the actual project requires a better organization.

Do not create unnecessary abstractions.

---

## 5. TypeScript Requirements

Use strict TypeScript.

Avoid `any`.

Prefer `unknown` when a type genuinely cannot be known.

Every backend DTO consumed by the frontend must have a corresponding TypeScript type/interface.

Do not duplicate the same interface across files.

---

## 6. API Client

Create one centralized HTTP client.

It must handle:

- base URL
- JSON headers
- authorization
- timeouts
- common errors
- 401 handling
- refresh-token flow if supported
- request cancellation where appropriate

Do not scatter raw fetch/axios calls throughout components.

Components must call API services/hooks.

---

## 7. Server State

Use TanStack Query for server state.

Examples:

```text
useStocks()
useStock(symbol)
useMarketHistory(symbol)
usePortfolio()
useHoldings()
useOrders()
useWatchlist()
useAlerts()
useNotifications()
```

Configure caching, stale times, retries, invalidation and optimistic updates where appropriate.

Do not put server data into global state unnecessarily.

---

## 8. Client State

Use global state only for genuine client state, such as:

- authentication state
- theme
- UI preferences
- sidebar state
- selected chart interval

Do not duplicate React Query data in Redux/Zustand.

---

## 9. Authentication

Inspect the backend first.

Determine whether authentication uses:

- Authorization header
- HttpOnly cookie
- access token
- refresh token
- session

Implement exactly what the backend expects.

Support where applicable:

- signup
- login
- logout
- session restoration
- token refresh
- protected routes
- 401 handling
- expired-session handling

Never store sensitive tokens in localStorage unless the backend architecture explicitly requires it.

Prefer secure HttpOnly cookies when supported.

---

## 10. Routing

Create routes according to actual application functionality.

Conceptual routes may include:

```text
/login
/register
/
/dashboard
/markets
/stocks/:symbol
/portfolio
/portfolio/holdings
/portfolio/orders
/watchlist
/alerts
/notifications
/profile
/settings
```

Do not implement routes merely because they are listed here. Verify backend support.

---

## 11. UI and Design

Create a polished modern fintech interface inspired by modern investment platforms, without cloning Groww or INDmoney.

Design principles:

- clean
- minimal
- professional
- data-focused
- responsive
- accessible

Avoid excessive gradients and unnecessary animations.

Desktop should have a professional navigation/sidebar layout.

Mobile should use proper mobile navigation and responsive components rather than merely shrinking desktop UI.

---

## 12. Dashboard

Implement supported sections such as:

- portfolio summary
- total investment
- current value
- overall P/L
- today's P/L
- market overview
- gainers
- losers
- trending
- watchlist
- recent orders

Only display data actually available through backend APIs.

Never fabricate market information.

---

## 13. Stock Detail

Build `/stocks/:symbol` where appropriate.

Display:

- company name
- symbol
- current price
- price change
- percentage change

Chart intervals must be based on backend capabilities.

Use candlestick charts if OHLC data exists; otherwise use line/area charts.

Display Open, High, Low, Previous Close and Volume only if provided by backend.

---

## 14. Historical Chart

Prefer TradingView Lightweight Charts or another appropriate financial chart library.

Requirements:

- responsive
- zoom
- pan
- tooltip
- timestamp formatting
- price formatting
- large dataset handling
- missing data handling

Do not manually render thousands of SVG elements.

---

## 15. Live Market Streaming

TradeX has a simulated real-time market powered by the backend.

Inspect the actual backend WebSocket configuration.

Do not assume STOMP, SockJS, native WebSocket, topic names or authentication.

Implement a robust WebSocket manager with:

```text
connect()
disconnect()
subscribe()
unsubscribe()
reconnect()
```

Handle:

- network failure
- server restart
- browser tab suspension
- duplicate subscriptions
- malformed messages

Avoid unnecessary React rerenders.

---

## 16. Live Chart Strategy

Do not refetch the entire chart for every live tick.

Use:

```text
Historical REST API
        ↓
Initial chart

WebSocket tick
        ↓
Update current price
        ↓
Update current candle
```

The backend remains authoritative.

---

## 17. Buy/Sell

Inspect actual order DTOs, endpoints, validation and responses before implementation.

Do not invent order types.

If backend supports only market orders, do not create limit-order UI.

Implement supported:

- stock
- order type
- quantity
- price where applicable
- estimated amount
- confirmation
- success/error handling

After successful trading, invalidate relevant portfolio, holdings and orders queries.

---

## 18. Portfolio

Display supported:

- total investment
- current value
- total P/L
- today's P/L

Holdings:

```text
Stock
Quantity
Average price
Current price
Investment
Current value
P/L
P/L %
```

Backend is authoritative for financial calculations.

---

## 19. Orders

Display supported fields:

```text
Order ID
Symbol
Side
Quantity
Price
Amount
Status
Created at
```

Support pagination and filters only when backend supports them.

---

## 20. Watchlist

If supported:

- add stock
- remove stock
- view current price
- view daily change
- open stock detail

Use backend APIs.

---

## 21. Alerts

If supported:

- create alert
- list alerts
- delete alert

Do not invent alert types or conditions.

---

## 22. Notifications

If supported:

- unread indicator
- notification list
- timestamp
- type
- read/unread state

Only implement read APIs actually exposed by backend.

---

## 23. Loading, Error and Empty States

Every asynchronous screen needs appropriate UI.

Use skeletons, inline loading and button loading states.

Handle:

```text
Network error
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Server Error
```

Never expose raw backend stack traces.

Every collection needs an empty state.

---

## 24. Accessibility

Follow WCAG-oriented practices:

- semantic HTML
- keyboard navigation
- visible focus
- labels
- ARIA only where necessary
- sufficient contrast
- accessible dialogs

Do not rely solely on color for gain/loss indicators.

---

## 25. Performance

Avoid:

- unnecessary rerenders
- polling when WebSocket exists
- duplicate requests
- huge component files
- expensive calculations during render

Use where justified:

- React Query caching
- debounced search
- memoization
- virtualization
- lazy loading
- code splitting

Do not optimize prematurely.

---

## 26. Search

Stock search should:

- debounce input
- avoid API call on every keystroke
- show loading
- show empty state
- support keyboard navigation
- navigate to stock detail

Use backend search rather than a duplicate frontend stock database.

---

## 27. Security

Never:

- hardcode credentials
- commit secrets
- expose backend secrets
- trust client-side authorization
- rely on frontend-only admin controls

Use:

```text
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_WS_BASE_URL
```

Create `.env.example`.

Never commit `.env`.

---

## 28. Financial Formatting

Create centralized utilities for:

- currency
- percentage
- quantity
- price
- large numbers
- timestamps

Use Indian formatting where appropriate, e.g.:

```text
₹1,24,500.50
+2.45%
-1.21%
```

Do not make authoritative financial calculations in the frontend.

---

## 29. Date/Time

Inspect backend timestamp format first:

- ISO-8601
- epoch seconds
- epoch milliseconds

Create centralized date/time conversion utilities.

---

## 30. Market Data Rule

The backend-generated market data is authoritative.

The frontend must NOT generate stock prices or independently simulate:

- price movement
- P/L
- portfolio value
- order execution

All business calculations must come from backend APIs.

---

## 31. Testing

Implement:

### Unit tests

- formatters
- calculations
- validation
- API transformation
- utility functions

### Component tests

- login
- stock search
- order form
- portfolio
- watchlist

### Integration tests

```text
login → dashboard
stock → chart
buy → portfolio
watchlist → stock
```

Use MSW for API mocking where appropriate.

Do not make unit tests dependent on deployed backend.

### E2E

Use Playwright where practical.

Critical flows:

```text
Register
Login
Search stock
Open stock
View chart
Buy stock
View holding
Sell stock
View order
Add watchlist
Remove watchlist
Create alert
Logout
```

---

## 32. API Contract Validation

Before implementing each feature:

```text
Backend DTO
      ↓
TypeScript type
      ↓
API response
      ↓
UI usage
```

If a mismatch occurs, STOP and inspect the backend.

Do not guess.

---

## 33. Code Quality

Follow:

- SOLID where applicable
- DRY
- separation of concerns
- single responsibility
- composition over inheritance
- reusable components
- meaningful naming

Avoid:

- God components
- God hooks
- God stores
- 1000-line files
- duplicate API clients
- duplicate types

---

## 34. Git Safety

Before changes:

```bash
git status
```

Do not:

- reset user changes
- delete unrelated files
- overwrite existing frontend work without inspection
- modify backend

Suggested commits:

```text
feat(frontend): initialize React application
feat(auth): implement authentication
feat(market): implement market dashboard
feat(charts): implement historical charts
feat(realtime): implement websocket streaming
feat(trading): implement paper trading
feat(portfolio): implement portfolio dashboard
feat(watchlist): implement watchlist
feat(alerts): implement alerts
test(frontend): add frontend test suite
chore(frontend): productionize frontend
```

---

## 35. Documentation

Maintain:

```text
docs/frontend/
├── backend-api-map.md
├── backend-websocket.md
├── frontend-architecture.md
├── frontend-api-client.md
├── frontend-state-management.md
└── frontend-testing.md
```

Update documentation when implementation changes.

---

## 36. Development Phases

Do not attempt to implement the entire frontend in one step.

### Phase 0 - Backend Analysis

Create:

```text
docs/frontend/backend-api-map.md
docs/frontend/backend-websocket.md
docs/frontend/frontend-architecture.md
```

Do not build UI yet.

### Phase 1 - Frontend Foundation

Implement:

- Vite
- React
- TypeScript
- Tailwind
- routing
- API client
- error handling
- environment configuration
- base layout
- theme

Run:

```bash
npm install
npm run dev
npm run build
npm run lint
```

### Phase 2 - Authentication

Implement:

- login
- register
- logout
- session restoration
- protected routes

Verify against actual backend.

### Phase 3 - Market

Implement:

- dashboard
- stock search
- stock list
- stock detail
- historical charts

Verify a real backend stock can be searched and its historical data displayed.

### Phase 4 - Real-Time Market

Implement:

- WebSocket connection
- subscriptions
- live prices
- live chart updates
- reconnect

Verify live simulated backend updates appear without page refresh.

### Phase 5 - Trading

Implement:

- buy
- sell
- confirmation
- order history
- portfolio
- holdings
- P/L

Verify a complete simulated trading flow.

### Phase 6 - Product Features

Implement supported:

- watchlist
- alerts
- notifications
- gainers
- losers
- trending

### Phase 7 - Polish

Implement:

- responsive design
- accessibility
- skeletons
- empty states
- error states
- appropriate animations
- performance improvements

### Phase 8 - Testing

Implement:

- unit tests
- component tests
- integration tests
- E2E tests

### Phase 9 - Production

Implement:

- production build
- Dockerfile
- Nginx if appropriate
- environment configuration
- deployment documentation

---

## 37. Definition of Done

A frontend feature is DONE only when:

- UI implemented
- backend integration verified
- TypeScript compiles
- lint passes
- tests pass
- loading state exists
- error state exists
- empty state exists where applicable
- responsive behaviour implemented
- accessibility considered
- no unnecessary console logs
- no hardcoded API URLs
- no secrets committed
- documentation updated

Never claim tests passed unless they were actually executed.

---

## 38. Handling Backend Gaps

When the backend lacks a required capability, report:

```text
BACKEND GAP

Feature:
<feature>

Expected capability:
<description>

Evidence:
<backend files inspected>

Required backend API:
<suggestion>

Frontend implementation:
NOT IMPLEMENTED until backend support is confirmed.
```

Do not silently work around backend limitations.

---

## 39. Priority Order

When making implementation decisions:

1. Backend contract correctness
2. Security
3. Functional correctness
4. Type safety
5. Maintainability
6. Performance
7. Accessibility
8. Visual polish

Do not sacrifice backend integration correctness for visual appearance.

---

## 40. Final Principle

Treat TradeX as a real production engineering project.

The goal is NOT:

> Generate a pretty React UI.

The goal is:

> Build a maintainable, type-safe, responsive, production-quality frontend that correctly integrates with the existing TradeX Spring Boot backend.

Always inspect before implementing.

Always verify before assuming.

Never invent backend contracts.

---

## 41. Startup Instruction

When Gemini is first started in this repository:

1. Read this `GEMINI.md`.
2. Inspect the entire backend repository.
3. Inspect the existing Git state.
4. Identify whether a frontend already exists.
5. Identify backend services and API boundaries.
6. Identify REST and WebSocket contracts.
7. Create the Phase 0 documentation.
8. STOP after Phase 0.
9. Report findings and backend gaps.
10. Wait for approval before implementing Phase 1.

Do not start generating the frontend immediately.
