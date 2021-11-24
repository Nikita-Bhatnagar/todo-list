//seclections
const newTodoContent = document.querySelector(".new-todo-content");
const newTodoBtn = document.querySelector(".new-todo .btn-unchecked");
const todoList = document.querySelector(".list");
let checkbtn = document.querySelectorAll(".btn-unchecked");
const editWindow = document.querySelector(".edit-window");
const edit = document.querySelector(".edit");
const closebtn = document.querySelector(".close");
const editedTodo = document.querySelector(".newTodo");
const completionStatus = document.querySelector(".comp-status");
const todoItems = document.querySelectorAll(".todo-item");
const themeToggler = document.querySelector(".theme-toggler");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const createNewTodo = document.querySelector(".new-todo");
const divTodoList = document.querySelector(".todo-list");

//event listeners
newTodoBtn.addEventListener("click", addTodo);
window.addEventListener("DOMContentLoaded", displayTodos);
todoList.addEventListener("click", removeOrEdit);
completionStatus.addEventListener("click", filter);
closebtn.addEventListener("click", closeEditWindow);
themeToggler.addEventListener("click", changeTheme);

//functions

function addTodo(e) {
  let todo = `<li class='todo-item'>
<div class="todo">
 <div class="btnAndWork">
  <div>
    <button type="button" class="btn-unchecked check-button"></button>
  </div>
  <div>
  <span class="work">${newTodoContent.value}</span>
  </div>
 </div>   
 
  <div class="btns">
    <img
      src="images/icon-cross.svg"
      class="dlt-btn"
      alt="delete"
    />
 

  <i class="far fa-edit edit-btn"></i></div>
</div>
<hr
  style="
    width: 100%;
    height: 0.5px;
    background-color: hsl(234, 39%, 85%);
  "
/>
</li>`;
  todoList.insertAdjacentHTML("afterbegin", todo);
  let todosList;
  if (localStorage.getItem("todosList") === null) todosList = [];
  else {
    todosList = JSON.parse(localStorage.getItem("todosList"));
  }
  todosList.push(newTodoContent.value);
  localStorage.setItem("todosList", JSON.stringify(todosList));

  newTodoContent.value = "";
  currentTheme();
  hideStatus();
}
function displayTodos(e) {
  e.preventDefault();
  let todosList;
  if (localStorage.getItem("todosList") === null) todosList = [];
  else {
    todosList = JSON.parse(localStorage.getItem("todosList"));
  }
  todosList.forEach((task) => {
    let todo = `<li class='todo-item'>
<div class="todo">
 <div class="btnAndWork">
  <div>
    <button type="button" class="btn-unchecked check-button"></button>
  </div>
  <div>
  <span class="work">${task}</span>
  </div>
 </div>   
 
  <div class="btns">
    <img
      src="images/icon-cross.svg"
      class="dlt-btn"
      alt="delete"
    />
 

  <i class="far fa-edit edit-btn"></i></div>
</div>
<hr
  style="
    width: 100%;
    height: 0.5px;
    background-color: hsl(234, 39%, 85%);
  "
/>
</li>`;
    todoList.insertAdjacentHTML("afterbegin", todo);
  });
  hideStatus();
}

var parentitem;
function removeOrEdit(e) {
  parentitem = e.target.closest(".todo");

  let todosList;
  todosList = JSON.parse(localStorage.getItem("todosList"));

  let index = todosList.indexOf(parentitem.querySelector(".work").innerText);

  if (e.target.classList.contains("dlt-btn")) {
    todosList.splice(index, 1);
    localStorage.setItem("todosList", JSON.stringify(todosList));
    e.target.closest(".todo-item").style.display = "none";
    e.target.closest(".todo-item").remove();

    hideStatus();
  } else if (e.target.classList.contains("edit-btn")) {
    editWindow.style.zIndex = "1";
  } else if (e.target.classList.contains("check-button")) {
    e.target.classList.toggle("checked");
    parentitem.querySelector(".work").classList.toggle("done");
  }
  edit.addEventListener("click", editing(parentitem));
  function editing(parentitem) {
    return function () {
      if (editedTodo.value !== "") {
        parentitem.querySelector(".work").innerText = editedTodo.value;
        todosList.splice(index, 1, editedTodo.value);
      }
      localStorage.setItem("todosList", JSON.stringify(todosList));
    };
  }
}

function closeEditWindow(e) {
  editWindow.style.zIndex = "-1";
}
function filter(e) {
  hideStatus();

  let todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.classList[0]) {
      case "all":
        todo.style.display = "unset";

        break;
      case "active":
        todo.style.display = "unset";
        if (todo.querySelector(".done") !== null) todo.style.display = "none";
        break;
      case "finished":
        todo.style.display = "unset";
        if (todo.querySelector(".done") === null) todo.style.display = "none";
        break;
    }
  });
}
function hideStatus() {
  if (todoList.children[0] === undefined) {
    completionStatus.classList.add("hidden");
  } else completionStatus.classList.remove("hidden");
}
hideStatus();
let curTheme = "dark";
function changeTheme(e) {
  checkbtn = document.querySelectorAll(".btn-unchecked");
  if (curTheme === "dark") {
    themeToggler.src = "images/icon-moon.svg";
    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    body.style.color = "hsl(235, 19%, 35%)";
    container.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
    newTodoContent.style.backgroundColor = "hsl(0, 0%, 98%)";
    newTodoContent.style.color = "hsl(235, 19%, 35%)";
    createNewTodo.style.backgroundColor = "hsl(0, 0%, 98%)";
    divTodoList.style.backgroundColor = "hsl(0, 0%, 98%)";
    divTodoList.style.boxShadow = "1px 1px 10px 10px hsl(236, 33%, 95%)";
    checkbtn.forEach((btn) => {
      btn.style.backgroundColor = "hsl(0, 0%, 98%)";
    });
    curTheme = "light";
  } else {
    themeToggler.src = "images/icon-sun.svg";
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    body.style.color = "hsl(234, 39%, 85%)";
    container.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
    newTodoContent.style.backgroundColor = "hsl(235, 24%, 19%)";
    newTodoContent.style.color = "hsl(234, 39%, 85%)";
    createNewTodo.style.backgroundColor = "hsl(235, 24%, 19%)";
    divTodoList.style.backgroundColor = "hsl(235, 24%, 19%)";
    divTodoList.style.boxShadow = "1px 1px 10px 10px hsl(235, 27%, 10%)";
    checkbtn.forEach((btn) => {
      btn.style.backgroundColor = "hsl(235, 24%, 19%)";
    });
    curTheme = "dark";
  }
}
function currentTheme() {
  checkbtn = document.querySelectorAll(".btn-unchecked");
  if (curTheme === "light") {
    checkbtn.forEach((btn) => {
      btn.style.backgroundColor = "hsl(0, 0%, 98%)";
    });
  }
}
