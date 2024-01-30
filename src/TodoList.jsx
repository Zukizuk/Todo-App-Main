function TodoList({ todos, toggleTodo, deleteTodo, filterTodos, setTodos }) {
  const filteredList = todos.filter((todo) => {
    if (filterTodos === "All") {
      return true;
    } else if (filterTodos === "Active") {
      return !todo.completed;
    } else if (filterTodos === "Completed") {
      return todo.completed;
    }
  });
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropId) => {
    const dragId = e.dataTransfer.getData("id");
    const draggedItem = todos.find((todo) => todo.id === dragId);
    const dropIndex = todos.findIndex((todo) => todo.id === dropId);
    const dragIndex = todos.findIndex((todo) => todo.id === dragId);
    const newTodos = [...todos];

    newTodos.splice(dragIndex, 1);
    newTodos.splice(dropIndex, 0, draggedItem);

    setTodos(newTodos);
  };

  return (
    <ul className="todo__task-list">
      {todos.length == 0 && (
        <li className="todo__task-item todo__task-item--No-Todos">No Todos</li>
      )}
      {filteredList.map((todo) => {
        return (
          <li
            className="todo__task-item"
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, todo.id)}
          >
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
