# Barber Pro

A full-stack barber shop management system that allows barbers to manage their haircut models, schedule appointments, and track services — with subscription-based access control.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Back-end Setup](#back-end-setup)
  - [Front-end Setup](#front-end-setup)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

Barber Pro is a web application built for barbers to manage their day-to-day operations. Each barber has their own account where they can register haircut models with custom prices, schedule customer appointments, and mark services as finished when complete.

Access to features is tiered: free accounts are limited to 3 haircut models, while premium subscribers (via Stripe) can create unlimited models.

---

## Tech Stack

### Back-end

| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime |
| Express | ^4.18.2 | HTTP framework |
| TypeScript | ^4.9.3 | Type safety |
| Prisma | ^4.7.1 | ORM |
| PostgreSQL | — | Database |
| JSON Web Tokens | ^8.5.1 | Authentication |
| bcryptjs | ^2.4.3 | Password hashing |
| express-async-errors | ^3.1.1 | Async error handling |
| cors | ^2.8.5 | Cross-origin support |

### Front-end

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 13.1.1 | React framework |
| React | 18.2.0 | UI library |
| TypeScript | 4.9.4 | Type safety |
| Chakra UI | 2.4.2 | Component library |
| Axios | ^1.2.2 | HTTP client |
| Framer Motion | ^6.5.1 | Animations |
| nookies | ^2.5.2 | Cookie management |
| jwt-decode | ^3.1.2 | JWT parsing |

---

## Features

- **Authentication** — Register and log in with JWT-based sessions (30-day expiry)
- **User Profile** — Update personal information and address
- **Haircut Models** — Create, list, and update haircut styles with name and price
- **Appointments** — Schedule new services linking a customer to a haircut model
- **Service Management** — List all pending appointments and mark them as finished
- **Subscription Gating** — Free tier allows up to 3 haircut models; premium tier is unlimited
- **Auto Logout** — Frontend automatically signs out the user on 401 responses

---

## Project Structure

```
barber-pro/
├── back-end/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   └── src/
│       ├── server.ts              # Express app entry point
│       ├── routes.ts              # Route definitions
│       ├── middlewares/
│       │   └── isAuthenticated.ts # JWT verification middleware
│       ├── controllers/
│       │   ├── user/              # CreateUser, AuthUser, DetailUser, UpdateUser
│       │   ├── haircut/           # CreateHaircut, ListHaircut, UpdateHaircut,
│       │   │                      #   CheckSubscription, CountHaircuts, DetailsHaircut
│       │   └── schedule/          # NewSchedule, ListSchedule, FinishSchedule
│       └── services/
│           ├── user/
│           ├── haircut/
│           └── schedule/
└── front-end/
    └── src/
        ├── pages/
        │   ├── index.tsx          # Home page
        │   ├── login/             # Login page
        │   ├── register/          # Registration page
        │   └── dashboard/         # Main dashboard (authenticated)
        ├── context/
        │   └── AuthContext.tsx    # Global auth state (token, user, sign-in)
        └── services/
            └── api.ts             # Axios instance with auth header injection
```

---

## Database Schema

```
User
├── id                 UUID (PK)
├── name               String
├── email              String
├── address            String?
├── password           String (hashed)
├── stripe_customer_id String?
├── created_at / updated_at
├── subscriptions      → Subscription (1:1)
├── haircuts           → Haircut[]
└── services           → Service[]

Subscription
├── id       String (PK, from payment provider)
├── status   String  ("active" | "inactive")
├── priceId  String
└── user_id  → User

Haircut
├── id         UUID (PK)
├── name       String
├── price      Float
├── status     Boolean (default: true)
└── user_id    → User

Service
├── id          UUID (PK)
├── customer    String
├── user_id     → User
└── haircut_id  → Haircut
```

---

## API Reference

All protected routes require the header:

```
Authorization: Bearer <token>
```

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users` | No | Register a new user |
| POST | `/session` | No | Login and receive JWT token |
| GET | `/me` | Yes | Get authenticated user details |
| PUT | `/user/update` | Yes | Update user profile |

### Haircut

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/haircut` | Yes | Create a new haircut model |
| GET | `/haircuts` | Yes | List all haircuts for the user |
| PUT | `/haircut` | Yes | Update a haircut model |
| GET | `/haircut/check` | Yes | Check if user has an active subscription |
| GET | `/haircut/count` | Yes | Count the user's haircut models |
| GET | `/haircut/detail` | Yes | Get details of a specific haircut |

### Schedule

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/schedule` | Yes | Create a new appointment |
| GET | `/schedule` | Yes | List all appointments |
| DELETE | `/schedule` | Yes | Finish/complete an appointment |

---

## Getting Started

### Prerequisites

- Node.js >= 16
- PostgreSQL database
- npm or yarn

### Back-end Setup

```bash
# Navigate to the back-end directory
cd back-end

# Install dependencies
npm install

# Configure environment variables (see below)
cp .env.example .env

# Run Prisma migrations
npx prisma migrate dev

# Start the development server (runs on port 3333)
npm run dev
```

### Front-end Setup

```bash
# Navigate to the front-end directory
cd front-end

# Install dependencies
npm install

# Configure environment variables (see below)

# Start the development server (runs on port 3000)
npm run dev
```

---

## Environment Variables

### Back-end — `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret_key"
```

### Front-end — `.env.local`

```env
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
