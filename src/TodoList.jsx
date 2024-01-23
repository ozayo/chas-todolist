import React, { useState } from "react";

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

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      title,
      done: false,
      id: todos.length + 1,
    };
    setTodos([...todos, newTodo]);
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
      <input type="text" placeholder="Enter todo" />
      <button onClick={() => addTodo("New Todo")}>Add</button>
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

export default TodoList;
