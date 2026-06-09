# DailyFlow

DailyFlow is a full-stack **MERN** productivity application that helps you manage your **daily tasks** and track your **personal expenses** in one place. It features secure JWT-based authentication, Google OAuth login, and a clean React + Tailwind CSS interface backed by an Express/MongoDB REST API.

---

## ✨ Features

- **User Authentication**
  - Email/password sign up and login with hashed passwords (bcrypt)
  - Google OAuth login (`@react-oauth/google` + `google-auth-library`)
  - JWT-based session handling (via header token and cookies)
- **Task Management**
  - Create, read, update, and delete tasks
  - Track title, description, and status (e.g. Pending / Completed)
  - Tasks are scoped per authenticated user
- **Expense Tracker**
  - Add, edit, and delete expenses
  - Categorize expenses and track amounts
  - Expenses are scoped per authenticated user
- **Modern Frontend**
  - React 19 + Vite for fast development and builds
  - Redux Toolkit for global state management
  - Tailwind CSS styling
  - Client-side routing with React Router

---

## 🛠️ Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, React Icons, @react-oauth/google |
| Backend    | Node.js, Express 5, Mongoose, JWT, bcryptjs, express-validator, cookie-parser, CORS |
| Database   | MongoDB (via Mongoose) |
| Auth       | JWT, Google OAuth 2.0 |

---

## 📁 Project Structure

```
DailyFlow/
├── backend/
│   ├── index.js                 # Express app entry point
│   ├── config/
│   │   └── ConnectDB.js         # MongoDB connection
│   ├── controllers/
│   │   ├── authControllers.js   # Signup, login, getUser, Google login
│   │   ├── taskControllers.js   # Task CRUD logic
│   │   └── expenseControllers.js# Expense CRUD logic
│   ├── middleware/
│   │   └── fetchUser.js         # JWT auth middleware
│   ├── models/
│   │   ├── UserSchema.js
│   │   ├── TaskSchema.js
│   │   └── ExpenseSchema.js
│   └── routes/
│       ├── userRoutes.js
│       ├── tasksRoutes.js
│       └── expenseRoutes.js
│
└── frontend/
    └── Dailyflow/
        ├── index.html
        ├── vite.config.js
        └── src/
            ├── main.jsx         # App bootstrap (Redux + Google OAuth providers)
            ├── App.jsx          # Routes
            ├── components/      # UI components (Dashboard, Login, Signup, etc.)
            ├── features/        # Redux slices (auth, expense)
            ├── redux/store.js   # Redux store
            └── utils/           # Helpers
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- A Google OAuth Client ID (for Google login)

### 1. Clone the repository

```bash
git clone https://github.com/Sourav-Tanwar/DailyFlow.git
cd DailyFlow
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Start the backend server:

```bash
npm run dev    # development (nodemon)
# or
npm start      # production
```

The API runs at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend/Dailyflow
npm install
```

Create a `.env` file inside the `frontend/Dailyflow/` folder:

```env
VITE_BE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint        | Auth | Description                       |
|--------|-----------------|------|-----------------------------------|
| POST   | `/createUser`   | No   | Register a new user               |
| POST   | `/login`        | No   | Login with email & password       |
| POST   | `/google-login` | No   | Login/Register via Google OAuth   |
| GET    | `/getUser`      | Yes  | Get the authenticated user's data |

### Tasks

| Method | Endpoint      | Auth | Description          |
|--------|---------------|------|----------------------|
| GET    | `/Tasks`      | Yes  | Get all user tasks   |
| POST   | `/Tasks`      | Yes  | Create a new task    |
| PUT    | `/Tasks/:id`  | Yes  | Update a task by ID  |
| DELETE | `/Tasks/:id`  | Yes  | Delete a task by ID  |

### Expenses

| Method | Endpoint        | Auth | Description            |
|--------|-----------------|------|------------------------|
| GET    | `/Expense`      | Yes  | Get all user expenses  |
| POST   | `/Expense`      | Yes  | Create a new expense   |
| PUT    | `/Expense/:id`  | Yes  | Update an expense by ID|
| DELETE | `/Expense/:id`  | Yes  | Delete an expense by ID|

> **Authentication:** Protected routes require a valid JWT, sent either via the `auth-token` header or a `token` cookie.

---

## 🧱 Data Models

**User**
- `name`, `email` (unique), `password` (hashed), `date`

**Task**
- `user` (ref), `title`, `description`, `status`, plus date fields (creation, due, update, completion)

**Expense**
- `user` (ref), `expense`, `category`, `amount`, `creation_Date`

---

## 📦 Available Scripts

**Backend** (`backend/`)
- `npm run dev` — start with nodemon
- `npm start` — start with node

**Frontend** (`frontend/Dailyflow/`)
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

---

## 📝 License

This project is licensed under the ISC License.
