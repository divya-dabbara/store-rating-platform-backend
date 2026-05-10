# Store Rating Platform

A professional full-stack web application that allows users to discover and rate local stores. The platform features role-based access control with specialized dashboards for Admin, Store Owners, and regular Users.

## 🚀 Project Overview

The Store Rating Platform is designed to bridge the gap between customers and local businesses. Users can browse stores, provide ratings, and view feedback. Store owners can manage their listings and track performance, while administrators maintain the platform's integrity.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login and registration system with password encryption using `bcryptjs`.
- **🛠️ Role-Based Access Control (RBAC)**: Distinct permissions and views for Admin, Store Owner, and User.
- **📊 Interactive Dashboards**: Custom dashboards tailored to each user role.
- **⭐ Rating System**: Verified users can rate stores with a 1-5 star system.
- **🏢 Store Management**: Store owners can create and manage their store profiles.
- **🔍 Search & Filter**: Find stores by name or location efficiently.
- **📱 Responsive UI**: Beautifully crafted with React and Tailwind CSS for all devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM/Driver**: `node-postgres` (pg)
- **Security**: JSON Web Token (JWT), bcryptjs
- **CORS**: Enabled for frontend integration

## 📂 Folder Structure

```text
store-rating-platform/
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Dashboard and View pages
│   │   ├── services/     # Axios API configuration
│   │   └── App.jsx       # Main routing logic
│   └── .env              # Frontend environment variables
├── src/                  # Express.js backend
│   ├── controllers/      # Business logic for routes
│   ├── db/               # Database connection logic
│   ├── middleware/       # Auth and validation middleware
│   ├── routes/           # API route definitions
│   ├── utils/            # Helper functions
│   └── index.js          # Entry point
├── schema.sql            # Database tables and constraints
└── .env                  # Backend environment variables
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud instance)

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Initialize the database
node init-db.js

# Start the development server
npm start
```

### 3. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔑 Environment Variables Setup

### Backend (.env)
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_random_key
```

### Frontend (frontend/.env)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🛣️ API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login & JWT issue | Public |
| GET | `/api/stores` | List all stores | Public |
| GET | `/api/admin/users` | List all users | Admin |
| POST | `/api/owner/store` | Create new store | Store Owner |
| POST | `/api/rate` | Submit store rating | Registered User |

## 👥 User Roles

- **Admin**: Has full control over users and stores. Can view global statistics.
- **Store Owner**: Can create a store profile and see feedback from users.
- **User**: Can browse stores, view ratings, and submit their own ratings.

## 💾 Database Schema

The platform uses a relational schema with three core tables:
1. **Users**: Stores profile info and hashed passwords.
2. **Stores**: Store details linked to an `owner_id`.
3. **Ratings**: Junction table for user-to-store ratings (1-5 range).

## 🚀 Deployment

- **Frontend**: Can be deployed on Vercel, Netlify, or AWS Amplify. Ensure `VITE_API_URL` is set in the build settings.
- **Backend**: Can be deployed on Render, Railway, or Heroku.
- **Database**: Recommended to use Neon.tech or AWS RDS for managed PostgreSQL.

## 👤 Author

**Divya Dabbara**
- GitHub: https://github.com/divya-dabbara
- LinkedIn: https://www.linkedin.com/in/divya-dabbara/

---
