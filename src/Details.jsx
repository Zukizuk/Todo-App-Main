export function Details({ todos, setFilterTodos }) {
  return (
    <div className="todo__task-details">
      <small className="todo__task-count">{`${todos.length} items left`}</small>
      <div className="todo__toggle-buttons" aria-label="Toggle Buttons">
        <button
          onClick={() => setFilterTodos("All")}
          className="todo__toggle-button todo__toggle-button--all"
        >
          All
        </button>
        <button
          onClick={() => setFilterTodos("Active")}
          className="todo__toggle-button todo__toggle-button--active"
        >
          Active
        </button>
        <button
          onClick={() => setFilterTodos("Completed")}
          className="todo__toggle-button todo__toggle-button--completed"
        >
          Completed
        </button>
      </div>
      <button className="todo__clear-completed-button">Clear Completed</button>
      <p className="todo__drag-instruction">Drag and drop to reorder list</p>
    </div>
  );
}
