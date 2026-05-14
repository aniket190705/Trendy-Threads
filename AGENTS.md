# AGENTS.md

## About Project

- `Trendy Threads` is a MERN-style e-commerce application with a React + Vite frontend in `Frontend/` and an Express + MongoDB backend in `API/`.
- The app supports auth, cart, checkout, Razorpay payment links, order history, and a small Redis cache for product list/detail API responses.
- The architecture is monolithic one frontend, one backend, one MongoDB database, and an optional Redis/Valkey cache. The site should be working even if redis is not working

## Tech Stack

### Frontend

- React `18.3.1`
- React Router DOM `7.2.0`
- Vite `6.1.1`
- Tailwind CSS `3.4.13`
- MUI Material `6.1.3`
- Headless UI React `2.1.9`
- Heroicons `2.1.5`
- Lucide React `0.540.0`
- React Icons `5.5.0`
- React Alice Carousel `2.9.1`

### Backend

- Node.js CommonJS backend
- Express `4.21.2`
- Mongoose `8.16.5`
- Redis client `5.12.1`
- JSON Web Token `9.0.2`
- bcryptjs `3.0.2`
- Razorpay SDK `2.9.6`
- dotenv `16.5.0`
- cors `2.8.5`

### Deployment / Infra

- Vercel for the frontend: `Frontend/vercel.json`
- Render for the backend
- Docker Compose for local full-stack startup: `docker-compose.yml`
- MongoDB compass
- Redis Render Key Value 


## Setup & Commands

### Local frontend

```bash
cd Frontend
npm install
npm run dev
```

### Local backend

```bash
cd API
npm install
node server.js
```


### Frontend build

```bash
cd Frontend
npm run build
npm run lint
```

### Full stack with Docker

```bash
docker-compose up --build
```

This starts:
- frontend on `http://localhost:5173`
- backend on `http://localhost:3000`
- mongo on `mongodb://localhost:27017`
- redis on `redis://localhost:6379`

### Deployment

- Frontend: deploy `Frontend/` to Vercel
- Backend: deploy `API/` to Render
- Render backend service should use:
  - root directory: `API`
  - build command: `npm install`
  - start command: `node server.js`

## Code Conventions

- Frontend uses `.jsx` files and functional React components only.
- Backend follows a `routes -> controller -> service -> model` structure.
- Existing backend style uses CommonJS (`require`, `module.exports`); do not mix in ESM.
- Existing frontend style uses double quotes and semicolons in many app files; match the file you are editing rather than reformatting unrelated code.
- Error handling is mostly inline and pragmatic. Prefer small helper functions within a file over introducing new abstraction layers.

## Architecture Decisions

- Keep the app monolithic. Do not split into microservices.
- MongoDB is the source of truth for users, carts, addresses, orders, and products.
- Redis is only for product read caching:
  - `GET /api/products`
  - `GET /api/products/:id`
- Product cache keys currently live in `API/src/controller/product.controller.js`:
  - `products:list`
  - `products:<id>`
- Payment flow:
  - order is created first via `POST /api/payments/createOrder`
  - Razorpay payment link is created via `POST /api/payments/paymentlink/:id`
  - frontend callback hits `/payment/success/:id`
  - backend verifies payment in `POST /api/payments/updateinfo`
  - successful payment marks order placed and clears the cart








