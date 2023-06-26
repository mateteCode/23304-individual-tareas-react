import TaskList from "./TaskList";
import { BsFillPersonXFill, BsFillPersonCheckFill } from "react-icons/bs";
import { PiNotePencilFill } from "react-icons/pi";
import { signInWithGoogle, logout } from "../api/firebase";

export default function TaskListsBox({
  tasks,
  taskListNames,
  authUser,
  setFormState,
  setTasks,
}) {
  return (
    <div className="container">
      <div className="header">
        <h1>Lista de Tareas</h1>
        <div className="headerMenu">
          {authUser ? (
            <>
              <a
                href="#"
                className="btn-newtask"
                onClick={() => setFormState({ action: "newTask" })}
              >
                <PiNotePencilFill />
              </a>
              <a href="#" className="btn-logout" onClick={logout}>
                <BsFillPersonXFill />
              </a>
            </>
          ) : (
            <a href="#" className="btn-login" onClick={signInWithGoogle}>
              <BsFillPersonCheckFill />
            </a>
          )}
        </div>
      </div>
      <div className="taskPanel">
        {taskListNames.map((taskListName) => {
          return (
            <TaskList
              key={taskListName.idList}
              taskListName={taskListName}
              tasks={tasks.filter((task) => task.idList == taskListName.idList)}
              setFormState={setFormState}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
