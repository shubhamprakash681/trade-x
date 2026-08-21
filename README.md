This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Import the `trade-x` directory as the Vercel project root. No custom build or
output settings are required; Vercel runs `npm run build`.

Set these production environment variables in Vercel before deploying:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Public HTTPS URL of the TradeX API gateway, without a trailing slash (for example `https://api.example.com`) |
| `NEXT_PUBLIC_WS_URL` | Public secure WebSocket URL of the API gateway (for example `wss://api.example.com/ws`) |

`NEXT_PUBLIC_API_URL` is used by the server-side `/api/*` rewrite. It must not
point to `localhost` in Vercel. `NEXT_PUBLIC_WS_URL` is used by the browser and
must be `wss://` when the frontend is served over HTTPS.

The config retains standalone output for the Docker image and disables it only
for Vercel builds, avoiding the known Next 16.3 missing trace-file failure.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
