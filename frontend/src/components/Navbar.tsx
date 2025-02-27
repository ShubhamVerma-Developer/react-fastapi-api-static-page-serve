import type React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="app-header">
      <h1>FastAPI + React App</h1>
      <nav className="navbar">
        <ul className="nav-links">
          <li className={isActive("/")}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive("/todos")}>
            <Link to="/todos">Todos</Link>
          </li>
          <li className={isActive("/about")}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
