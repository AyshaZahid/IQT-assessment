import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import WeatherPage from "./pages/WeatherPage.jsx";

// Derive the backend root from the API URL (strip the "/api/tasks" path).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";
const PING_URL = API_URL.replace(/\/api\/.*$/, "/");

export default function App() {
  // Keep the backend awake: ping on load (wakes a sleeping free-tier server),
  // then every 10 minutes while the tab is open so it never cold-starts.
  useEffect(() => {
    const ping = () => {
      fetch(PING_URL, { method: "GET", cache: "no-store" }).catch(() => {});
    };
    ping();
    const id = setInterval(ping, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">IQT-FSD-2026 · Full Stack CRUD + API Integration</p>
      </header>

      <Nav />

      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </div>
  );
}
