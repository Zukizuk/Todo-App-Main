import { Details } from "./Details";
import { useState } from "react";
import "./App.scss";
import TodoList from "./TodoList";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ischecked, setIscheckd] = useState(false);
  const [filterTodos, setFilterTodos] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo === "") return;

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), newTodo, completed: ischecked },
      ];
    });

    setNewTodo("");
    setIscheckd(false);
  };

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    return setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <main className="todo">
        <header className="todo__header">
          <h1 className="todo__title">TODO</h1>
          <button
            className="todo__theme-toggle"
            aria-label="Toggle Light/Dark Theme"
          ></button>
        </header>
        <section className="todo__section">
          <form className="todo__form" onSubmit={handleSubmit}>
            <input
              className="todo__checkbox"
              name="CheckTodo"
              type="checkbox"
              checked={ischecked}
              onChange={(e) => setIscheckd(e.target.checked)}
            />
            <label className="todo__label" htmlFor="AddTodo">
              <input
                className="todo__input"
                type="text"
                id="AddTodo"
                name="AddTodo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Create a new todo..."
              />
            </label>
          </form>
          <section className="todo__task-section">
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              filterTodos={filterTodos}
            />
            <Details todos={todos} setFilterTodos={setFilterTodos} />
          </section>
        </section>
        <p className="todo__drag-instruction">Drag and drop to reorder list</p>
      </main>
    </>
  );
}

export default App;
