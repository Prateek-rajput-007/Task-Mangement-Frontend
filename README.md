
# 🗂️ Task Management System

A feature-rich Task Management System built for small teams to create, assign, track, and manage tasks efficiently. This application demonstrates full-stack development capabilities, secure authentication, role-based access control, and a clean, user-friendly design.

Live Demo: [Frontend](https://task-mangement-frontend-kappa.vercel.app/login) | [Backend](https://task-management-backend-2ifw.onrender.com)

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠 Technologies](#-technologies)
- [⚙ Setup Instructions](#-setup-instructions)
- [🚀 Deployment](#-deployment)
- [🧠 Approach](#-approach)
- [📝 Assumptions](#-assumptions)
- [⚖ Trade-offs](#-trade-offs)
- [📁 Repository Structure](#-repository-structure)
- [🔮 Future Improvements](#-future-improvements)

---

## 🌟 Features

### ✅ Core Features

- **Authentication & Authorization**
  - Secure registration and login (JWT, bcrypt)
  - Role-based access: Admin, Manager, Regular User
  - Protected routes for authenticated users

- **Task Management**
  - Full CRUD: Create, Read, Update, Delete
  - Task attributes: Title, Description, Due Date, Priority, Status
  - Input validation on both frontend & backend

- **Team Collaboration**
  - Assign tasks to team members
  - In-app notification system on assignment

- **Dashboard**
  - View assigned, created, and overdue tasks
  - Visual task statistics using cards and charts

- **Search & Filter**
  - Real-time search by title/description
  - Filter tasks by status, priority, due date

### 🚀 Advanced Features

- **Role-Based Access Control (RBAC)**
  - Admins: Manage users and tasks
  - Managers: Assign and monitor tasks
  - Regular Users: Manage own tasks

- **Analytics Dashboard**
  - Track task completion, overdue stats (mocked currently)

- **Unit Testing**
  - Backend Jest tests for tasks and auth routes

---

## 🛠 Technologies

- **Frontend**: Next.js (React + TypeScript), Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, bcrypt
- **Deployment**: 
  - Frontend: [Vercel](https://task-management-frontend.vercel.app)
  - Backend: [Render](https://task-management-backend.onrender.com)

### Libraries

- **Frontend**: `axios`, `react-hot-toast`
- **Backend**: `express-validator`, `mongoose`
- **Security**: `helmet`, `bcrypt`, `jsonwebtoken`

---

## ⚙ Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
````

### Backend Setup

```bash
cd backend
npm install

# Create .env file
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api

npm run dev
```

### Optional: Seed Demo Data

```bash
node backend/scripts/seedDemoData.js
# Demo login: demo@example.com / password123
```

---

## 🚀 Deployment

### 🔗 Live URLs

* Frontend: [Vercel](https://task-management-frontend.vercel.app)
* Backend: [Render](https://task-management-backend.onrender.com)
* GitHub: [Repository](https://github.com/yourusername/task-management-system)

### Environment Variables

* **Frontend**:

  ```
  NEXT_PUBLIC_API_URL=https://task-management-backend.onrender.com/api
  ```
* **Backend**:

  ```
  PORT=5000
  MONGODB_URI=your_mongo_uri
  JWT_SECRET=your_jwt_secret
  ```

---

## 🧠 Approach

### Frontend

* **Next.js**: For SSR, routing, and performance
* **React Context API**: For global state management (tasks, user, notifications)
* **Tailwind CSS**: Utility-first for responsive UI
* **TaskStats Component**:

  * Mocked stats due to backend `/stats` error
  * Includes retry mechanism on failure

### Backend

* **Express**: Modular API with middleware-based auth
* **MongoDB + Mongoose**: Schema validation and flexible queries
* **JWT**: Stored in HTTP-only cookies
* **Security**: Input validation, password hashing, secure headers

---

## 📝 Assumptions

* Team size: 5–20 users (suitable for MongoDB Atlas free tier)
* Task stats mocked due to current 500 error
* Only in-app notifications implemented (no emails)
* Demo user provided for quick evaluation

---

## ⚖ Trade-offs

| Feature            | Pros                                    | Cons                                     |
| ------------------ | --------------------------------------- | ---------------------------------------- |
| Mock Stats         | Dashboard remains functional            | Stats not real-time                      |
| No WebSockets      | Easier setup with polling               | No real-time updates                     |
| MongoDB over SQL   | Faster for this structure, easier setup | Lacks relational integrity of PostgreSQL |
| Basic Testing Only | Covered core features in limited time   | Lacks full test coverage                 |
| No PWA             | Focused on deployment and core UX       | No offline support                       |

---

## 📁 Repository Structure

```
task-management-system/
├── backend/
│   ├── controllers/         # Task and user logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── middlewares/         # Auth, error handlers
│   ├── scripts/             # Seed data script
│   └── server.js            # App entry
├── frontend/
│   ├── app/
│   │   ├── components/      # TaskStats, TaskForm, etc.
│   │   ├── contexts/        # Global state (TaskContext)
│   │   ├── pages/           # Next.js routes
│   │   └── lib/             # Axios config
│   ├── public/              # Assets
│   └── styles/              # Tailwind config
└── README.md
```
