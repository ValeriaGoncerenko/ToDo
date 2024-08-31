const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if(localStorage.getItem('tasks')){
tasks = JSON.parse(localStorage.getItem('tasks'))
tasks.forEach((task)=>{
 renderTask(task);
})
}

checkEmptyList();

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", setAsDoneTask);

function addTask(event) {
  event.preventDefault();

  const inputValue = taskInput.value;

  //описание задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: inputValue,
    done: false,
  };

  tasks.push(newTask);
  console.log(tasks);

  renderTask(newTask);
  

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();

  saveToLocalStorage();

  // if (tasksList.children.length > 0) {
  //   emptyList.classList.add("none");
  // }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    console.log("Delete!");
    const parenNode = event.target.closest("li");

    const id = Number(parenNode.id);

    // const index = tasks.findIndex((task) => task.id === id);

    // //Удаление задач из масава
    // tasks.splice(index, 1);

    // удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id);

    saveToLocalStorage();

    parenNode.remove();

    checkEmptyList();

    // if (tasksList.children.length == 1) {
    //   emptyList.classList.remove("none");
    // }
  }
}

function setAsDoneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");

    const id = parentNode.id;

    const task = tasks.find((task) => {
      return task.id == id;
    });

    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
    console.log(taskTitle);
  }
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyList = document.querySelector("#emptyList");
    emptyList ? emptyList.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTask(task){
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `<li id = '${task.id}'class="list-group-item d-flex justify-content-between task-item">
                   <span class='${cssClass}'>${task.text}</span>
                   <div class="task-item__buttons">
                       <button type="button" data-action="done" class="btn-action">
                           <img src="./img/tick.svg" alt="Done" width="18" height="18">
                       </button>
                       <button type="button" data-action="delete" class="btn-action">
                           <img src="./img/cross.svg" alt="Done" width="18" height="18">
                       </button>
                   </div>
               </li>`;

  //добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}