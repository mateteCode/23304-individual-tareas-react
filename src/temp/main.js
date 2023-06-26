/*
Variable global destinada para guardar la tarea a editar
*/
let taskForEdit;

let taskList = [
  {
    name: "Para hacer",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "Haciendo",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "En espera",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "Terminadas",
    color: "green",
    tasks: [],
    max: 0,
  },
];

const maxLists = 5;

function addList(name, color, max) {
  let result;
  if (taskList.length < maxLists) {
    const list = {};
    list.name = name;
    list.color = color;
    list.taks = [];
    list.max = max;
    result = taskList.push(list);
  }
  console.log(result);
}

/*
Cargamos en los selectores de los formularios popup, tanto de nueva tarea como de editar tarea, con el nombre de las listas de tareas
Se deben crear nodos <option> para los <select> de ambos formularios
*/
function loadAllTaskList() {
  let taskListSelect = document.querySelector("#taskListSelect");
  let taskListSelect2 = document.querySelector("#taskListSelect2");
  taskList.forEach((value, index) => {
    const option = document.createElement("option");
    option.setAttribute("value", index);
    option.textContent = value.name;
    if (index == 0) {
      option.setAttribute("selected", true);
    }
    taskListSelect.appendChild(option);
    const option2 = option.cloneNode(true);
    taskListSelect2.appendChild(option2);
  });
}

/*
Ejecutamos las funciones necesarias una vez que ya se cargo el DOM
*/
document.body.onload = () => {
  loadAllTaskList();
  document.querySelector(".btn-conf-columns").style.display = "none";
};

/*
Evento para el boton de Agegar tarea (clase .btn-create-task) del formulario popup de Nueva tarea
Obtenemos los campos de text, prioridad e indice de la lista de tarea del formulario
Si es de altra prioridad se agrega al principio de la lista de tareas correspondiente; caso contrario, al final
Cerramos al formulario removiendo la clase .active
Removemos la clase .empty al div de mensaje de "sin tarea" si es que tuviera esa clase
*/
document.querySelector(".btn-create-task").addEventListener("click", (e) => {
  e.preventDefault();
  const taskInput = document.querySelector("textarea");
  const text = taskInput.value;
  const priority = document.querySelector("#priority").checked;
  if (text !== "") {
    const listIndex = document.querySelector("#taskListSelect").value;
    const parent = document.querySelector("#tasks" + listIndex);
    if (priority) {
      parent.insertBefore(addNewTask(text, priority), parent.firstChild);
    } else {
      parent.appendChild(addNewTask(text, priority));
    }
    taskInput.value = "";
    document.querySelector("#form-new-task").classList.remove("active");
    document.querySelector("#tasks" + listIndex + " .empty").style.display =
      "none";
  }
});

/*
Generador de colores para los "papeles" de tareas
*/
function generateColor() {
  colors = [
    "#ff7eb9",
    "#ff65a3",
    "#7afcff",
    "#feff9c",
    "#fff740",
    "#a1c8e9",
    "#d2d7ff",
    "#d6e3ff",
    "#ddf2ff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/*
Función que crea la tarea con los datos proporcionados por el formulario de crear tarea
Crea los distints elementos y hace la jerarquia correspondiente
Ademas establece los eventos para los botones de Editar tarea y borrar tarea
*/
function addNewTask(text, priority) {
  //Elemento root tarea
  const divTask = document.createElement("div");
  divTask.className = "task";

  // Elemento prioridad
  const divTaskPriority = document.createElement("div");
  divTaskPriority.className = "taskPriority";
  const iconPriority = document.createElement("i");
  iconPriority.className = "fa fa-thumb-tack";
  iconPriority.setAttribute("aria-hidden", "true");
  divTaskPriority.appendChild(iconPriority);
  if (!priority) {
    divTaskPriority.style.display = "none";
  } else {
    divTaskPriority.style.display = "block";
  }

  // Elemento menu de tarea
  const divTaskMenu = document.createElement("div");
  divTaskMenu.className = "taskMenu";

  // Elemento editar tarea
  const a1 = document.createElement("a");
  a1.setAttribute("href", "#");
  const iconEdit = document.createElement("i");
  iconEdit.className = "fa fa-pencil";
  iconEdit.setAttribute("aria-hidden", "true");
  a1.appendChild(iconEdit);
  // Evento editar tarea
  a1.addEventListener("click", (e) => {
    e.preventDefault();
    const task = e.currentTarget.closest(".task");
    taskForEdit = task;
    const text = task.querySelector("p").textContent;
    const priority =
      task.querySelector(".taskPriority").style.display == "none"
        ? false
        : true;
    const listIndex = task.parentElement.id.slice(-1);
    const form = document.querySelector("#form-edit-task");
    form.classList.add("active");
    form.querySelector("textarea").value = text;
    form.querySelector("#priority2").checked = priority;
    form.querySelector("select").value = listIndex;
  });

  // Elemento borrar tarea
  const a2 = document.createElement("a");
  a1.setAttribute("href", "#");
  const iconDelete = document.createElement("i");
  iconDelete.className = "fa fa-trash";
  iconDelete.setAttribute("aria-hidden", "true");
  a2.appendChild(iconDelete);
  // Evento borrar tareaa
  a2.addEventListener("click", (e) => {
    e.preventDefault();
    const task = e.currentTarget.parentElement.parentElement;
    const parent = task.parentElement;
    parent.removeChild(task);
    setEmpty(parent);
  });

  divTaskMenu.appendChild(a1);
  divTaskMenu.appendChild(a2);

  //Elemento texto de la tarea
  const p = document.createElement("p");
  p.textContent = text;

  divTask.appendChild(divTaskPriority);
  divTask.appendChild(divTaskMenu);
  divTask.appendChild(p);

  divTask.style.backgroundColor = generateColor();

  return divTask;
}

// Evento para el botón de nueva tarea (clase .btn-new-task)
// Debe mostrar el popup del formulario de neva tarea (id #form-new-task)
// Agregando la clase .active al mencionado formulario
document.querySelector(".btn-new-task").addEventListener("click", () => {
  document.querySelector("#form-new-task").classList.add("active");
});

document
  .querySelector("#form-new-task .close-btn")
  .addEventListener("click", () => {
    document.querySelector("#form-new-task").classList.remove("active");
  });

document
  .querySelector("#form-edit-task .close-btn")
  .addEventListener("click", () => {
    document.querySelector("#form-edit-task").classList.remove("active");
  });

/*
Evento del boton de editar tarea del formulario de edicion de tarea
*/
document.querySelector(".btn-edit-task").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("#form-edit-task");
  const text = form.querySelector("textarea").value;
  const priority = form.querySelector("#priority2").checked;
  const listIndex = form.querySelector("select").value;

  const newParent = document.querySelector("#tasks" + listIndex);
  const oldParent = taskForEdit.parentElement;

  taskForEdit.querySelector("p").textContent = text;
  if (priority) {
    taskForEdit.querySelector(".taskPriority").style.display = "block";
    newParent.insertBefore(taskForEdit, newParent.firstChild);
  } else {
    taskForEdit.querySelector(".taskPriority").style.display = "none";
    newParent.appendChild(taskForEdit);
  }
  document.querySelector("#form-edit-task").classList.remove("active");
  setEmpty(newParent);
  setEmpty(oldParent);
});

/*
Hace aparecer o desaparecer el cartel de que no hay tareas pendientes de acuerdo al numero de tareas que tenga la lista
*/
function setEmpty(parent) {
  if (parent.querySelectorAll(".task").length == 0) {
    parent.querySelector(".empty").style.display = "block";
  } else {
    parent.querySelector(".empty").style.display = "none";
  }
}
