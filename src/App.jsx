import React, { useState, useEffect } from "react";
import "./App.css";
import { FaPlus, FaTrashAlt, FaTimes, FaCheck } from "react-icons/fa";

const TodoItem = ({ todo, toggleDone, deleteTodo }) => {
  return (
    <div className="todoitem">
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <div>
        <button
          className="check"
          onClick={() => toggleDone(todo.id, !todo.done)}
        >
          {todo.done ? (
            <>
              <FaTimes />
            </>
          ) : (
            <>
              <FaCheck />
            </>
          )}
        </button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    // take data from localStorage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // When todo state update save to localStorage
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
      <button className="add" onClick={addTodo}>
        Add <FaPlus />
      </button>
      <div className="todoitems">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
