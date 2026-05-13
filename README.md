# Trendy Threads

Trendy Threads is a MERN e-commerce project with a simple, beginner-friendly structure. This upgrade keeps the current app as one full-stack project while adding practical DevOps and performance improvements with Docker and Redis.

## What Changed

- Docker support for `frontend`, `backend`, `mongo`, and `redis`
- Redis caching for product list and product detail APIs
- Cache expiration for product responses
- Cache invalidation when products are created, updated, or deleted
- Environment-based backend configuration for MongoDB, Redis, frontend origin, and JWT secret

## Project Architecture

The app is still a single MERN application:

- `Frontend/` is the React + Vite client
- `API/` is the Express + MongoDB backend
- `redis` is used only as a cache layer for product reads
- `mongo` remains the main database and source of truth

This is intentionally not a microservices setup. Docker is only used to run the existing pieces together in a cleaner way.

## Redis Flow

Redis is used only where it gives clear value without adding complexity:

1. Request hits `GET /api/products`
2. Backend checks Redis first
3. If cached data exists, it returns immediately
4. If not, backend reads from MongoDB, returns the result, and stores it in Redis for 5 minutes

The same flow is used for `GET /api/products/:id`.

When a product is created, updated, or deleted:

- the product list cache is cleared
- the product detail cache for that product is cleared

This keeps the cache simple and prevents stale product data from being shown.

## Product APIs With Caching

The backend now supports:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products/:userId`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Environment Variables

### Backend

Copy [API/.env.example](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/.env.example) to `API/.env`.

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/trendythreads
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace-with-your-own-secret
APIKEY=your_razorpay_key
APISECRET=your_razorpay_secret
```

### Frontend

Copy [Frontend/.env.example](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/Frontend/.env.example) to `Frontend/.env`.

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Docker Files

- [docker-compose.yml](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/docker-compose.yml)
- [API/Dockerfile](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/Dockerfile)
- [Frontend/Dockerfile](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/Frontend/Dockerfile)

## Run With Docker

First copy the example files:

1. `API/.env.example` -> `API/.env`
2. `Frontend/.env.example` -> `Frontend/.env`

From the project root:

```bash
docker-compose up --build
```

Then open:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`
- Redis: `redis://localhost:6379`

## How Container Communication Works

- The frontend calls the backend through `http://localhost:3000` because the browser runs on your machine
- The backend connects to MongoDB through `mongodb://mongo:27017/trendythreads`
- The backend connects to Redis through `redis://redis:6379`

The service names `mongo` and `redis` come from `docker-compose.yml`, which is why the backend should not use `localhost` for those connections inside Docker.

`docker-compose.yml` reads your normal [API/.env](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/.env) and [Frontend/.env](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/Frontend/.env) files, then overrides only the backend database/cache URLs so container-to-container communication works correctly.

## Local Development Without Docker

If you want to keep running services locally:

1. Start MongoDB
2. Start Redis
3. Run the backend from `API/`
4. Run the frontend from `Frontend/`

The same `.env` values will work, with local URLs instead of Docker service names.

## Key Implementation Files

- [API/src/config/db.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/src/config/db.js)
- [API/src/config/redis.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/src/config/redis.js)
- [API/src/controller/product.controller.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/src/controller/product.controller.js)
- [API/src/services/product.service.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/src/services/product.service.js)
- [API/src/routes/product.route.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/src/routes/product.route.js)
- [API/server.js](/C:/Users/acer/Desktop/Vs%20code%20prgrams/WebDev/e-commerce/API/server.js)

## Result

This keeps the project simple:

- one frontend
- one backend
- one MongoDB database
- one Redis cache

It adds real-world tooling and performance improvements without turning the app into an enterprise-style architecture.
