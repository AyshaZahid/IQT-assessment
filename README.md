# IQT-FSD-2026 — Task Manager (Full Stack CRUD + API Integration)

A full-stack task manager built with the MERN stack (MongoDB, Express, React, Node.js), with a second route integrating a live third-party weather API — one cohesive app covering both the CRUD task (Step 2) and the API integration task (Step 3).

## Stack
- **Frontend:** React 18 + Vite + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose ODM)
- **Third-party API:** [Open-Meteo](https://open-meteo.com) — free weather + geocoding API, no key required

## Features
**Tasks page (`/`)**
- List all tasks
- Add a task (title + optional description)
- Edit a task (title/description)
- Delete a task
- Mark a task as completed / not completed

**Weather page (`/weather`)**
- Live current weather (temperature, humidity, wind) for a default location
- Search any city — uses Open-Meteo's free geocoding API to resolve the city name to coordinates, then fetches live weather for it

## Project Structure
```
iqt-task/
├── backend/
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/Nav.jsx
    │   ├── pages/TasksPage.jsx
    │   ├── pages/WeatherPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## Setup Instructions

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set MONGO_URI to a local MongoDB instance or a free MongoDB Atlas cluster
npm run dev    # or: npm start
```
Backend runs on `http://localhost:5000` by default.

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Default VITE_API_URL already points to the local backend above
npm run dev
```
Frontend runs on `http://localhost:5173` by default. Use the top nav to switch between **Tasks** and **Weather**.

### 3. MongoDB
- **Local:** install MongoDB Community Edition and it will run at `mongodb://127.0.0.1:27017`
- **Cloud (recommended for quick setup):** create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), whitelist your IP (or `0.0.0.0/0` for testing), and paste the connection string into `backend/.env` as `MONGO_URI`.

### 4. Weather page — no setup needed
Open-Meteo requires no API key, so the Weather route works immediately with no extra configuration.

## Database Schema

**Collection:** `tasks`

| Field       | Type      | Required | Default | Notes                          |
|-------------|-----------|----------|---------|---------------------------------|
| `_id`       | ObjectId  | auto     | —       | MongoDB-generated primary key   |
| `title`     | String    | Yes      | —       | Max 200 characters              |
| `description` | String  | No       | `""`    | Max 1000 characters             |
| `completed` | Boolean   | No       | `false` | Toggled from the UI             |
| `createdAt` | Date      | auto     | —       | Set by Mongoose timestamps      |
| `updatedAt` | Date      | auto     | —       | Set by Mongoose timestamps      |

## API Endpoints (backend)

| Method | Endpoint          | Description          |
|--------|-------------------|-----------------------|
| GET    | `/api/tasks`      | Get all tasks         |
| POST   | `/api/tasks`      | Create a new task     |
| PUT    | `/api/tasks/:id`  | Update a task (any of title/description/completed) |
| DELETE | `/api/tasks/:id`  | Delete a task          |

### Example request bodies

**POST /api/tasks**
```json
{ "title": "Finish milestone doc", "description": "Draft the M7 scope" }
```

**PUT /api/tasks/:id**
```json
{ "completed": true }
```

## Third-Party API Integration (Step 3)

**API used:** [Open-Meteo](https://open-meteo.com) — chosen because it needs zero registration, zero key management, and returns live data instantly.

**Implementation:** `frontend/src/pages/WeatherPage.jsx` — fetches live current weather on load for a default location, and lets the user search any city by name via Open-Meteo's free geocoding endpoint, then fetches weather for the resolved coordinates.

**Verify directly (no key needed):**
```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
```

