import { Details } from "./Details";
import { useEffect, useState } from "react";
import "./App.scss";
import TodoList from "./TodoList";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const TodoData = localStorage.getItem("todos");
    if (TodoData == null)
      return [
        {
          id: crypto.randomUUID(),
          newTodo: "Complete online JavaScript course",
          completed: true,
        },
        {
          id: crypto.randomUUID(),
          newTodo: "Jog around the park 3x",
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          newTodo: "10 minutes meditation",
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          newTodo: "Read for 1 hour",
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          newTodo: "Pick up groceries",
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          newTodo: "Complete Todo App on Frontend Mentor",
          completed: false,
        },
      ];
    return JSON.parse(TodoData);
  });
  const [ischecked, setIscheckd] = useState(false);
  const [filterTodos, setFilterTodos] = useState("All");
  const [isdarktheme, setIsdarktheme] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("todo");
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle("light", !isdarktheme);
    console.log("light");
  }, [isdarktheme]);

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

  function clearCompletedTodos() {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => !todo.completed);
    });
  }

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
            className={
              isdarktheme ? "todo__theme-toggle" : "todo__theme-toggle light"
            }
            aria-label="Toggle Light/Dark Theme"
            onClick={() => setIsdarktheme(!isdarktheme)}
          ></button>
        </header>
        <section className="todo__section">
          <h2 className="sr-only">Add Todos</h2>
          <form className="todo__form" onSubmit={handleSubmit}>
            <input
              className="todo__checkbox"
              name="CheckTodo"
              type="checkbox"
              checked={ischecked}
              id="checktodoitem"
              onChange={(e) => setIscheckd(e.target.checked)}
            />
            <label className="sr-only" htmlFor="checktodoitem">
              Check Todo Item
            </label>
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
            <h2 className="sr-only">Todo Items List</h2>
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              filterTodos={filterTodos}
              setTodos={setTodos}
            />
            <Details
              todos={todos}
              setFilterTodos={setFilterTodos}
              filterTodos={filterTodos}
              clearCompletedTodos={clearCompletedTodos}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
