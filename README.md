# Multi-Domain Ticket Management Lite

A lightweight full-stack Ticket Management System built using the MERN stack.  
The application allows admins to manage tickets across multiple domains, track ticket status, update priorities, and view ticket summaries through a clean and responsive dashboard interface.

---

## Live Demo

### Frontend
https://ticket-managament-lite.vercel.app

### Backend API
https://ticket-managament-lite.onrender.com

### GitHub Repository
https://github.com/shahid-anwar/Ticket-Managament-Lite

---

# Project Overview

This project is a simplified internal Ticket Management System designed to simulate how organizations track and manage tickets across different departments or domains.

The application supports:

- Creating tickets
- Updating ticket status and priority
- Deleting tickets
- Filtering tickets
- Searching tickets
- Viewing ticket summaries
- Responsive dashboard UI
- Empty states and loading states

The system is built with a clean and scalable frontend architecture along with RESTful backend APIs.

---

# Features

## Ticket Management
- Create Ticket
- View All Tickets
- Update Ticket Status
- Update Ticket Priority
- Delete Ticket

## Filtering & Search
- Filter by Domain
- Filter by Priority
- Filter by Status
- Debounced Search Functionality

## Dashboard Enhancements
- Smart Empty States
- Fullscreen Loader
- Interactive Status & Priority Dropdown Badges
- Responsive UI
- Demo Login System

---

# Tech Stack Used

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- js-cookie

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# Folder Structure

```bash
Multi-Domain-Ticket-Management/
│
├── client/
│   ├── src/
│   └── ...
│
├── server/
│   ├── src/
│   └── ...
│
└── README.md
```

---

# Steps to Run Locally

## 1. Clone Repository

```bash
git clone https://github.com/shahid-anwar/Ticket-Managament-Lite.git
```

---

## 2. Install Dependencies

### Root

```bash
npm install
```

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

# Environment Variables

## Backend (.env inside server)

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

## Frontend (.env inside client)

```env
VITE_API_URL=http://localhost:8000/api
```

---

# Run Project

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm run dev
```

---

# Demo Login Credentials

```txt
Email: admin@example.com
Password: admin123
```

---

# API Endpoints

## Ticket Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tickets | Get all tickets |
| POST | /api/tickets | Create ticket |
| PUT | /api/tickets/:id | Update ticket |
| DELETE | /api/tickets/:id | Delete ticket |
| GET | /api/tickets/summary | Ticket analytics summary |

---

# Assumptions & Limitations

- Authentication is simulated using demo credentials and cookies.
- The system assumes a single admin user.
- Role-based access control was intentionally excluded as per assignment scope.
- Render free tier may introduce cold-start delays after inactivity.

---

# AI Tool Usage

AI tools such as Clude, ChatGPT and GitHub Copilot were used during development for:

- UI/UX improvement suggestions
- Architecture guidance
- Debugging deployment issues
- Optimizing React component structure
- Improving frontend state management
- Deployment troubleshooting

All generated suggestions were reviewed, understood, and manually implemented/customized.

---

# Future Improvements

- JWT Authentication
- Role-Based Access
- Real-time Notifications
- Pagination
- Advanced Analytics Dashboard
- Dark Mode
- Unit & Integration Testing

---

# Author

Shahid Anwar Ansari
