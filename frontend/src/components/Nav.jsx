import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Tasks
      </NavLink>
      <NavLink to="/weather" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Weather
      </NavLink>
    </nav>
  );
}
