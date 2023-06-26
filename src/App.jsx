import TaskListsBox from "./components/TaskListsBox";
import { auth, getTasks } from "./api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import FormTask from "./components/FormTask";

function App() {
  const taskListNames = [
    { idList: 0, title: "Para hacer" },
    { idList: 1, title: "Haciendo" },
    { idList: 2, title: "En espera" },
    { idList: 3, title: "Terminadas" },
  ];
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (authUser) {
      /* TODO: Cargar todas las tareas desde la db */
      getTasks();
    }
  }, [authUser]);

  useEffect(() => {
    /* TODO: Salvar todas las tareas a la db*/
    console.log("cambio las tareas");
    console.log(tasks);
  }, [tasks]);

  if (authLoading) return <div>Loading...</div>;

  return (
    <>
      <TaskListsBox
        tasks={tasks}
        taskListNames={taskListNames}
        authUser={authUser}
        setFormState={setFormState}
        setTasks={setTasks}
      />
      {formState && (
        <FormTask
          formState={formState}
          setFormState={setFormState}
          taskListNames={taskListNames}
          setTasks={setTasks}
        />
      )}
    </>
  );
}

export default App;
