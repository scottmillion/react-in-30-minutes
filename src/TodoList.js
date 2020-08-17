import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, toggleTodo }) {
  return todoList.map((todoItem) => {
    return (
      <Todo
        key={todoItem.id}
        toggleTodo={toggleTodo}
        passedTodoItem={todoItem}
      />
    );
    /* 
        if we left the above as "return <Todo passedTodoItem={todoItem} />" then the entire list would be re-rendered everytime we updated a single item. We get an error in the console that says "Warning: Each child in a list should have a unique "key" prop.

        So we added key={todoItem} since that will provide a unique key for each element.
      */
  });
}
