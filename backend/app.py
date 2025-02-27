from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="FastAPI with React")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data
todos = [
    {"id": 1, "title": "Learn FastAPI", "completed": True},
    {"id": 2, "title": "Build React App", "completed": False},
    {"id": 3, "title": "Integrate FastAPI with React", "completed": False},
]


# Pydantic models
class TodoBase(BaseModel):
    title: str
    completed: bool = False


class TodoCreate(TodoBase):
    pass


class Todo(TodoBase):
    id: int

    class Config:
        orm_mode = True


# API endpoints
@app.get("/api/todos", response_model=List[Todo])
async def get_todos():
    return todos


@app.get("/api/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    for todo in todos:
        if todo["id"] == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.post("/api/todos", response_model=Todo)
async def create_todo(todo: TodoCreate):
    new_id = max([t["id"] for t in todos]) + 1 if todos else 1
    new_todo = {"id": new_id, **todo.dict()}
    todos.append(new_todo)
    return new_todo


@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: TodoBase):
    for i, t in enumerate(todos):
        if t["id"] == todo_id:
            todos[i] = {**t, **todo.dict()}
            return todos[i]
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: int):
    for i, todo in enumerate(todos):
        if todo["id"] == todo_id:
            del todos[i]
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")


# Mount static files (React build)
app.mount("/", StaticFiles(directory="static", html=True), name="static")


# Root endpoint redirects to static index.html
@app.get("/", include_in_schema=False)
async def root():
    return {"message": "API is running. Frontend is served at the root path."}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
