import React from "react";

export default function Todo({ passedTodoItem, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(passedTodoItem.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={passedTodoItem.complete}
          onChange={handleTodoClick}
        />
        {passedTodoItem.name}
      </label>
    </div>
  );
}
