// { useState } was added by us. It's a hook.
import React, { useState, useRef, useEffect } from "react";
// userRef lets us add a ref="" to an html component.
// useEffect lets us save to localhost
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";
// uuid lets us generate unique ids

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // This accesses our local storage when we first load the page and sets our todos array to what was saved previously. This will loop again and again without the empty array as the second argument.

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // This sets (updates) our local storage anytime the second argument (our todos array) is modified. [todos] is a dependency here.

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete; // changes false to true, true to false
    setTodos(newTodos);
  }

  // This updates the checkbox clicked or unclicked

  function handleAddTodo(e) {
    const name = todoNameRef.current.value; // value of our input from input field
    if (name === "") return; // if empty field we still return

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    // uuidv4() gives a truly unique id.

    todoNameRef.current.value = null; // after clicking add todo button this auto clears input field
  }

  // This handles typing in the input field, clearing the field, and updating the todo list afterward

  function clearTodos(e) {
    setTodos((todoList) => todoList.filter((todos) => !todos.complete));
  }

  // my added function to clear todos that are already complete.

  return (
    /*
      <></> is called a fragment. We use this container because you can only return one element and we have more than one here (TodoList, input, etc.)
    */
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Completed Todos</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
