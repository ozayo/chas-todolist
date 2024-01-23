import React, { useState, useEffect } from "react";
import "./App.css";

const TodoItem = ({ todo, toggleDone, deleteTodo }) => {
  return (
    <div>
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button onClick={() => toggleDone(todo.id, !todo.done)}>
        {todo.done ? "Undone" : "Done"}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    // localStorage'dan veriyi al
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Her todos state'i güncellendiğinde localStorage'a kaydet
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoTitle.trim() !== "") {
      const newTodo = {
        title: newTodoTitle,
        done: false,
        id: todos.length + 1,
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
    }
  };

  const toggleDone = (id, done) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default App;
