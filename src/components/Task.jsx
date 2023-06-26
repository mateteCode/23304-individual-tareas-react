import { BsTrashFill } from "react-icons/bs";

export default function Task({ task, setFormState, setTasks }) {
  const handleDeleteTaskBtn = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };
  return (
    <div
      className="task"
      style={task.color ? { backgroundColor: task.color } : {}}
    >
      <div className="taskPriority">
        {task.priority && (
          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        )}
      </div>
      <div className="taskMenu">
        <a href="#" onClick={() => setFormState({ action: "editTask", task })}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </a>
        <a href="#" onClick={handleDeleteTaskBtn}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </a>
      </div>
      <p>{task.description}</p>
    </div>
  );
}
