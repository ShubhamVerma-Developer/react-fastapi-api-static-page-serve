import type React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h2>Welcome to FastAPI + React Demo</h2>
      <p>This is a demonstration of a full-stack application using:</p>
      <ul className="tech-list">
        <li>FastAPI backend with RESTful endpoints</li>
        <li>React frontend with React Router</li>
        <li>Static file serving from FastAPI</li>
      </ul>
      <div className="cta-buttons">
        <Link to="/todos" className="cta-button primary">
          View Todos
        </Link>
        <Link to="/about" className="cta-button secondary">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
