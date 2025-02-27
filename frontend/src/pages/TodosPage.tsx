"use client";

import type React from "react";
import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Error fetching todos. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (title: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError("Error adding todo. Please try again.");
      console.error(err);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todoToUpdate.title,
          completed: !todoToUpdate.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError("Error updating todo. Please try again.");
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Error deleting todo. Please try again.");
      console.error(err);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []); // Removed fetchTodos from dependencies

  return (
    <div className="todos-page">
      <h2>Todo List</h2>
      <p>Manage your tasks with this simple todo application.</p>

      <TodoForm onAddTodo={addTodo} />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
};

export default TodosPage;
