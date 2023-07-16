import TaskListsBox from "./components/TaskListsBox";
import { auth, getTasks, saveTasks, getCity } from "./api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import FormTask from "./components/FormTask";

import Wheather from "./components/Weather";
import { useAppContext } from "./AppProvider";
import Popup from "./popups/Popup";
import Config from "./popups/Config";

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
  const { popupConfig, dispatch } = useAppContext();

  useEffect(() => {
    /* TODO: Refactorizar getTasks() */
    /* TODO: Corregir perdida de tareas */
    if (authUser) {
      dispatch({ type: "SET_USER", value: authUser });
      getTasks(authUser, setTasks);
      getCity(authUser.uid).then((city) => {
        if (city) dispatch({ type: "SET_CITY", value: city });
      });
    } else {
      dispatch({ type: "RESET_STATE" });
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
      <Wheather />
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

      <Popup isActive={popupConfig}>
        <Config />
      </Popup>
    </>
  );
}

export default App;
