# Backend WebSocket Architecture

This document details the WebSocket connection used for real-time market data streaming from the backend `price-stream-service`.

## Connection Details
- **Endpoint**: `/ws`
- **Protocol**: STOMP over WebSocket
- **Broker**: SimpleBroker with `/topic` destination prefix
- **Application Destination Prefix**: `/app`
- **CORS**: Allowed origin patterns `*`

## Authentication
Currently, the WebSocket connection for price streaming does not require authentication based on the Spring WebSocket configuration. The endpoints are exposed without explicit authorization intercepts for STOMP connects.

## Topics

### 1. Global Market Topic
- **Topic Name**: `/topic/market`
- **Description**: Streams price ticks for all available stocks in real-time.
- **Use Case**: Best used on the dashboard or global market screens where updates for multiple symbols are needed simultaneously.

### 2. Symbol-Specific Topic
- **Topic Name**: `/topic/{symbol}` (e.g., `/topic/TCS`)
- **Description**: Streams price ticks for a specific stock symbol.
- **Use Case**: Best used on the stock detail page or when subscribing only to specific symbols in the watchlist/portfolio to reduce unnecessary network traffic and client-side processing.

## Message Schema
Both `/topic/market` and `/topic/{symbol}` emit messages matching the `PriceResponse` DTO structure in JSON format.

```json
{
  "symbol": "TCS",
  "price": 3505.00,
  "previousPrice": 3500.50,
  "changeAmount": 4.50,
  "changePercent": 0.12,
  "synthetic": true,
  "timestamp": "2023-10-01T12:00:00"
}
```

## Subscription Mechanism
Clients must establish a STOMP connection over the `/ws` endpoint (via SockJS or native WebSockets depending on STOMP client library like `@stomp/stompjs`). Once connected, clients subscribe to the desired destinations (`/topic/market` or `/topic/{symbol}`).

## Reconnect Requirements
- The frontend WebSocket manager must automatically handle reconnection on connection drop.
- Subscriptions should be re-established after a successful reconnect.
- STOMP heartbeats should be configured on the client side (e.g., outgoing/incoming 10000ms) to detect silent connection drops and trigger reconnect logic.
