function TodoList({ todos, toggleTodo, deleteTodo, filterTodos }) {
  const filteredList = todos.filter((todo) => {
    if (filterTodos === "All") {
      return true;
    } else if (filterTodos === "Active") {
      return !todo.completed;
    } else if (filterTodos === "Completed") {
      return todo.completed;
    }
  });

  return (
    <ul className="todo__task-list">
      {todos.length == 0 && (
        <li className="todo__task-item todo__task-item--No-Todos">No Todos</li>
      )}
      {filteredList.map((todo) => {
        return (
          <li className="todo__task-item" key={todo.id}>
            <div className="todo__task-item--container">
              <input
                type="checkbox"
                className="todo__checkbox"
                id={todo.id}
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              <label htmlFor={todo.id} className="todo__task">
                {todo.newTodo}
              </label>
              <button
                aria-label="Delete Button"
                className="todo__delete-button"
                onClick={() => deleteTodo(todo.id)}
              ></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
