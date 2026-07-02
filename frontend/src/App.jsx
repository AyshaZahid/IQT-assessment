import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import WeatherPage from "./pages/WeatherPage.jsx";

export default function App() {
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
