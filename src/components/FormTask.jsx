import { useState } from "react";
//import { nanoid } from "nanoid";

export default function FormTask({
  formState,
  setFormState,
  taskListNames,
  setTasks,
}) {
  const [description, setDescription] = useState(
    formState.action === "editTask" ? formState.task.description : ""
  );
  const [idList, setIdList] = useState(
    formState.action === "editTask"
      ? formState.task.idList
      : taskListNames[0].idList
  );
  const [priority, setPriority] = useState(
    formState.action === "editTask" ? formState.task.priority : false
  );

  function handleUpdateTasksBtn() {
    if (formState.action === "newTask") {
      const newTask = {
        id: Date.now(),
        idList,
        description,
        priority,
      };
      setTasks((prev) => [...prev, newTask]);
    } else if (formState.action === "editTask") {
      const editTask = {
        id: formState.task.id,
        idList,
        description,
        priority,
      };
      setTasks((prev) => {
        const newTasks = prev.map((task) => {
          if (task.id === formState.task.id) return editTask;
          else return task;
        });
        return newTasks;
      });
    }
    setFormState(null);
  }
  return (
    <div className="popup active" id="form-new-task">
      <div className="close-btn" onClick={() => setFormState(null)}>
        &times;
      </div>
      <div className="form">
        <h2>
          {formState.action === "newTask" ? "Nueva tarea" : "Editar tarea"}
        </h2>
        <div className="form-element">
          <label htmlFor="description">Tarea</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            maxLength="150"
            autoFocus
            placeholder="Escribe tu tarea..."
            required
            wrap="hard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-element">
          <label htmlFor="taskListSelect">Seleccione una lista:</label>
          <select
            className="taskListSelect"
            id="taskListSelect"
            required
            onChange={(e) => setIdList(+e.target.value)}
            defaultValue={
              formState.action === "editTask"
                ? taskListNames.find(
                    (taskListName) =>
                      taskListName.idList === formState.task.idList
                  ).idList
                : taskListNames[0].idList
            }
          >
            {taskListNames.map((taskListName) => {
              return (
                <option value={taskListName.idList} key={taskListName.idList}>
                  {taskListName.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-element">
          <input
            type="checkbox"
            id="priority"
            name="priority"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <label htmlFor="priority">Urgente</label>
        </div>
        <div className="form-element">
          <button className="btn-create-task" onClick={handleUpdateTasksBtn}>
            {formState.action === "newTask"
              ? "Agregar tarea"
              : "Atualizar tarea"}
          </button>
        </div>
      </div>
    </div>
  );
}
