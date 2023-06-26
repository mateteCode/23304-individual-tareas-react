import TaskListsBox from "./components/TaskListsBox";
import { auth, getTasks, saveTasks } from "./api/firebase";
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
      getTasks(authUser, setTasks);
    } else {
      setTasks([]);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      saveTasks(authUser, tasks);
    }
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
