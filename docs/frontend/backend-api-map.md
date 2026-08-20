# Backend API Map

This document outlines all the endpoints exposed by the backend services, along with their request/response structures and error formats based on actual Spring Boot controllers and DTOs.

## Error Response Format
All errors follow a unified structure defined in `ApiError.java`:
```json
{
  "timestamp": "2023-10-01T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": ["field: Error message"]
}
```

## API Endpoints

### Auth Service

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|
| Auth | POST | `/api/auth/signup` | None | `SignupRequest` | `AuthResponse` | 400 Validation |
| Auth | POST | `/api/auth/login` | None | `LoginRequest` | `AuthResponse` | 400 Validation, 401 Unauthorized |
| Auth | POST | `/api/auth/refresh` | None | `RefreshRequest` | `AuthResponse` | 400 Validation, 401 Unauthorized |
| Auth | POST | `/api/auth/logout` | None | `LogoutRequest` | 204 No Content | 400 Validation |
| Auth | GET | `/api/users/me` | Bearer Token | None | `UserResponse` | 401 Unauthorized |
| Auth | PUT | `/api/users/me` | Bearer Token | `UpdateProfileRequest` | `UserResponse` | 400 Validation, 401 Unauthorized |
| Auth | PUT | `/api/users/password` | Bearer Token | `ChangePasswordRequest` | 204 No Content | 400 Validation, 401 Unauthorized |

**Example DTOs:**
```json
// SignupRequest
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "password": "securePassword123"
}

// AuthResponse
{
  "accessToken": "eyJhb...",
  "refreshToken": "def456...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["USER"],
    "createdAt": "2023-10-01T12:00:00"
  }
}
```

### Market Service

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|
| Market | GET | `/api/stocks` | None | `?q=&page=&size=&sort=` | `Page<StockResponse>` | 400 |
| Market | GET | `/api/stocks/search` | None | `?q=` | `List<StockResponse>` | 400 |
| Market | GET | `/api/stocks/{symbol}` | None | None | `StockResponse` | 404 Not Found |
| Market | GET | `/api/market/history/{symbol}` | None | `?from=&to=` (ISO Date) | `List<CandleResponse>` | 404 |
| Market | GET | `/api/market/candle/{symbol}` | None | None | `CandleResponse` | 404 |
| Market | GET | `/api/market/gainers` | None | None | `List<MarketMoverResponse>` | 500 |
| Market | GET | `/api/market/losers` | None | None | `List<MarketMoverResponse>` | 500 |
| Market | GET | `/api/market/trending` | None | None | `List<MarketTrendResponse>`| 500 |
| Market | GET | `/api/admin/market/status` | Bearer Token | None | `MarketStatusResponse` | 401, 403 |
| Market | POST | `/api/admin/market/regenerate` | Bearer Token | None | `MarketStatusResponse` | 401, 403 |

**Example DTOs:**
```json
// StockResponse
{
  "symbol": "TCS",
  "name": "Tata Consultancy Services",
  "exchange": "NSE",
  "sector": "IT",
  "referencePrice": 3500.50,
  "synthetic": true
}

// CandleResponse
{
  "symbol": "TCS",
  "interval": "1D",
  "candleTime": "2023-10-01T00:00:00",
  "open": 3490.0,
  "high": 3510.5,
  "low": 3485.0,
  "close": 3500.5,
  "volume": 1250000
}
```

### Price Stream Service

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|
| Price | GET | `/api/prices/latest` | None | None | `List<PriceResponse>` | 500 |
| Price | GET | `/api/prices/history` | None | `?symbol=&limit=100` | `List<PriceResponse>` | 400 |
| Price | GET | `/api/prices/{symbol}` | None | None | `PriceResponse` | 404 Not Found |

**Example DTOs:**
```json
// PriceResponse
{
  "symbol": "TCS",
  "price": 3505.0,
  "previousPrice": 3500.5,
  "changeAmount": 4.5,
  "changePercent": 0.12,
  "synthetic": true,
  "timestamp": "2023-10-01T12:00:00"
}
```

### Portfolio Service

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|
| Portfolio | GET | `/api/portfolio` | Bearer Token | None | `PortfolioResponse` | 401 |
| Portfolio | GET | `/api/portfolio/summary` | Bearer Token | None | `PortfolioSummaryResponse` | 401 |
| Portfolio | GET | `/api/portfolio/holdings` | Bearer Token | None | `List<HoldingResponse>` | 401 |
| Order | POST | `/api/orders/buy` | Bearer Token | `OrderRequest` | `OrderResponse` | 400, 401, 422 |
| Order | POST | `/api/orders/sell` | Bearer Token | `OrderRequest` | `OrderResponse` | 400, 401, 422 |
| Order | GET | `/api/orders/history` | Bearer Token | None | `List<OrderResponse>` | 401 |
| Transaction | GET | `/api/transactions` | Bearer Token | None | `List<TransactionResponse>`| 401 |

**Example DTOs:**
```json
// PortfolioResponse
{
  "summary": {
    "cashBalance": 1000000.0,
    "holdingsValue": 0.0,
    "totalValue": 1000000.0,
    "investedValue": 0.0,
    "unrealizedPnl": 0.0,
    "unrealizedPnlPercent": 0.0
  },
  "holdings": []
}

// OrderRequest
{
  "symbol": "TCS",
  "quantity": 10
}
```

### Notification Service

| Service | Method | Endpoint | Authentication | Request | Response | Errors |
|---|---|---|---|---|---|---|
| Watchlist | GET | `/api/watchlist` | Bearer Token | None | `List<WatchlistResponse>` | 401 |
| Watchlist | POST | `/api/watchlist` | Bearer Token | `AddWatchlistRequest` | `WatchlistResponse` | 400, 401 |
| Watchlist | DELETE | `/api/watchlist/{symbol}` | Bearer Token | None | 204 No Content | 401, 404 |
| Alert | GET | `/api/alerts` | Bearer Token | None | `List<AlertResponse>` | 401 |
| Alert | POST | `/api/alerts` | Bearer Token | `CreateAlertRequest` | `AlertResponse` | 400, 401 |
| Alert | DELETE | `/api/alerts` | Bearer Token | `?id=&symbol=` | 204 No Content | 400, 401 |
| Alert | DELETE | `/api/alerts/{id}` | Bearer Token | None | 204 No Content | 401, 404 |
| Notification | GET | `/api/notifications` | Bearer Token | `?limit=100` | `List<NotificationResponse>` | 401 |
| Dashboard | GET | `/api/dashboard` | Bearer Token | None | `DashboardResponse` | 401 |

**Example DTOs:**
```json
// CreateAlertRequest
{
  "symbol": "TCS",
  "targetPrice": 3600.0,
  "condition": "GREATER_THAN_OR_EQUAL"
}

// DashboardResponse
{
  "watchlist": [],
  "alerts": [],
  "notifications": [],
  "topGainers": [],
  "topLosers": [],
  "trendingStocks": []
}
```
