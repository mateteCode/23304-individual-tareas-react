import Task from "./Task";

export default function TaskList({ taskListName, tasks, setFormState, setTasks }) {
  return (
    <div className="taskList">
      <h2>{taskListName.title}</h2>
      <div className="tasks" id={`tasks${taskListName.idList}`}>
        {tasks.length !== 0 ? (
          tasks.map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                setFormState={setFormState}
                setTasks={setTasks}
              />
            );
          })
        ) : (
          <div className="empty">No hay tareas pendientes en esta sección.</div>
        )}
      </div>
    </div>
  );
}
