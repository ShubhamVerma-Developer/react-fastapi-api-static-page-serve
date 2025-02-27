import type React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h2>About This Application</h2>
      <p>
        This is a full-stack application demonstrating the integration of
        FastAPI and React. The application showcases how to serve a React
        frontend from a FastAPI backend and how to make API calls from React to
        FastAPI endpoints.
      </p>

      <h3>Technologies Used</h3>
      <div className="tech-section">
        <div className="tech-card">
          <h4>Backend</h4>
          <ul>
            <li>
              FastAPI - A modern, fast web framework for building APIs with
              Python
            </li>
            <li>Pydantic - Data validation and settings management</li>
            <li>Uvicorn - ASGI server for serving the FastAPI application</li>
          </ul>
        </div>

        <div className="tech-card">
          <h4>Frontend</h4>
          <ul>
            <li>React - A JavaScript library for building user interfaces</li>
            <li>React Router - Declarative routing for React applications</li>
            <li>
              TypeScript - Typed JavaScript for better developer experience
            </li>
          </ul>
        </div>
      </div>

      <h3>API Endpoints</h3>
      <table className="api-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>/api/todos</td>
            <td>Get all todos</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/api/todos/{"{id}"}</td>
            <td>Get a specific todo by ID</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/api/todos</td>
            <td>Create a new todo</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>/api/todos/{"{id}"}</td>
            <td>Update a todo by ID</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>/api/todos/{"{id}"}</td>
            <td>Delete a todo by ID</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AboutPage;
