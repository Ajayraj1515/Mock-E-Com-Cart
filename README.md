# Mock E‑Commerce Cart (Vibe Commerce Screening)

A complete, local-only mock e‑commerce cart demonstrating end‑to‑end flows: product listing, cart add/update/remove, totals, and mock checkout with receipt. Built to showcase React UI, REST APIs, and DB integration.

## Tech Stack
- Frontend: React 18, Vite, React Router, Axios
- Backend: Node.js, Express, SQLite (file persistence)
- Language: JavaScript (ES Modules)

## Features
- Products: 6 mock items (id, name, price, image placeholder)
- Cart: add items, update quantity, remove, auto‑computed subtotal and total
- Checkout: name + email → returns mock receipt (orderId, items, total, timestamp)
- Persistence: SQLite file under `backend/data/app.db`
- UI: responsive layout, toasts, polished styling, INR currency formatting

## Repository Structure
```
mock-ecom-cart/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── config/db.js
│       ├── controllers/
│       ├── models/
│       └── routes/
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── api/client.js
│       ├── utils/currency.js
│       ├── components/
│       ├── pages/
│       └── styles/global.css
└── README.md
```

## Getting Started
Prerequisite: Node.js 18+ (or 20+ recommended)

1) Backend
```
cd backend
npm install
npm run dev     # or: node server.js
```
- Runs at http://localhost:5000
- Health check: http://localhost:5000/api/health → {"status":"ok"}
- Products: http://localhost:5000/api/products → 6 seeded items

2) Frontend
```
cd frontend
npm install
npm run dev
```
- Open http://localhost:5173 in your browser

If the frontend can’t reach the backend, create `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```
Then restart `npm run dev`.

## API Endpoints
- GET `/api/products`
  - Response: `[ { id, name, price, image }, ... ]`
- GET `/api/cart`
  - Response: `{ items: [ { id, productId, name, price, image, qty, subtotal } ], total }`
- POST `/api/cart` body: `{ productId, qty }`
  - Adds (or increments) item. Response: `{ id, cart }` (updated cart)
- PUT `/api/cart/:id` body: `{ qty }`
  - Updates quantity for the cart item id. Response: updated cart
- DELETE `/api/cart/:id`
  - Removes item by cart item id. Response: updated cart
- POST `/api/checkout` body: `{ name, email, cartItems }`
  - Validates cart, records order, clears cart. Response: `{ receipt }` with orderId, items, total, timestamp

## How It Works (Workflow)
- Products are seeded into SQLite on first backend start.
- When you add to cart, backend stores/updates in `cart_items` and computes totals by joining with `products`.
- Checkout creates a row in `orders` and clears `cart_items`, then returns a receipt to the frontend.
- The UI formats prices in INR and shows toasts for actions.

## Design Notes
- Clean, responsive layout and improved visual design (buttons, shadows, hero header)
- Image placeholders are inline SVG gradients (no external assets)
- Currency formatting centralized in `frontend/src/utils/currency.js`

## Troubleshooting (Windows)
- If `npm run dev` (frontend) fails with Rollup/Vite optional dependency errors:
  1. Delete `frontend/node_modules` and `frontend/package-lock.json`
  2. Run `npm install` again in `frontend/`
- If backend shows `SQLITE_CANTOPEN`, ensure the app created `backend/data/` automatically. If missing, create it and run again.
- To reseed products, stop backend and delete `backend/data/app.db`, then start backend again.

## Scripts
Backend
- `npm run dev` → start server with nodemon
- `npm start` → start server with node

Frontend
- `npm run dev` → start Vite dev server
- `npm run build` → production build
- `npm run preview` → preview production build

## Notes / Bonus
- Persistence: products, cart items, and orders saved in SQLite
- Error handling: basic validation and 4xx/5xx responses
- Optional: Set `VITE_API_URL` to point to a different backend

---
This project is self‑contained for local screening. No external hosting is required.
