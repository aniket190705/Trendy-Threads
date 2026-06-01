# Trendy Threads

`Trendy Threads` is a full-stack e-commerce project built with a React + Vite frontend and an Express + MongoDB backend. The project includes user auth, cart management, checkout, delivery address handling, order history, Razorpay payment integration, and Redis caching for product reads.

## Project Structure

- `Frontend/` — React client built with Vite, using Tailwind CSS, MUI, and React Router.
- `API/` — Node.js Express backend using CommonJS, MongoDB via Mongoose, Redis caching, JWT auth, and Razorpay payments.
- `docker-compose.yml` — local full-stack Docker setup with frontend, backend, MongoDB, and Redis.

## Key Features

- User authentication and authorization
- Product browsing, details, cart management, and checkout
- Delivery address add/update/delete
- Order placement and order history
- Razorpay payment link integration
- Redis caching for product list and product detail endpoints

## Setup

### Backend

```bash
cd API
npm install
```

Create `API/.env` from `API/.env.example` and set your values.

Start the backend:

```bash
npm start
```

### Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

### Recommended Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Docker Setup

A Docker Compose configuration is included for running the entire stack locally.

From the project root:

```bash
docker-compose up --build
```

This starts:

- frontend on `http://localhost:5173`
- backend on `http://localhost:3000`
- mongo on `mongodb://localhost:27017`
- redis on `redis://localhost:6379`

### Notes for Docker

- The backend uses `MONGODB_URL=mongodb://mongo:27017/trendythreads`
- The backend uses `REDIS_URL=redis://redis:6379`
- The frontend still connects to the backend at `http://localhost:3000`

## Environment Variables

### Backend (`API/.env`)

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/trendythreads
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace-with-your-own-secret
APIKEY=your_razorpay_key
APISECRET=your_razorpay_secret
```

### Frontend (`Frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Backend Scripts

From `API/`:

- `npm start` — start the Express backend

## Frontend Scripts

From `Frontend/`:

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run lint` — run ESLint

## Important Files

- `API/server.js` — backend startup and service initialization
- `API/src/config/db.js` — MongoDB connection
- `API/src/config/redis.js` — Redis connection
- `API/src/controller/product.controller.js` — product endpoints
- `API/src/services/product.service.js` — product business logic
- `API/src/routes/product.route.js` — product routes
- `Frontend/src/` — React UI and customer components

## Notes

- Redis is used for caching product list and product details, improving read performance.
- MongoDB is the source of truth for products, users, carts, orders, addresses, reviews, and ratings.
- The app is intentionally monolithic: one frontend, one backend, one database.
- The backend uses `server.js` to initialize MongoDB and Redis before listening.

## Quick Start

1. Install backend dependencies:
   - `cd API && npm install`
2. Install frontend dependencies:
   - `cd Frontend && npm install`
3. Create `API/.env` from `API/.env.example`
4. Create `Frontend/.env` with `VITE_API_BASE_URL=http://localhost:3000`
5. Run backend and frontend separately, or use Docker Compose:
   - `docker-compose up --build`

---

Built for local development and demonstration of a MERN e-commerce workflow with payment integration and caching.
