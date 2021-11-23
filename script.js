//seclections
const newTodoContent = document.querySelector(".new-todo-content");
const newTodoBtn = document.querySelector(".new-todo .btn-unchecked");
const todoList = document.querySelector(".list");
const deleteBtn = document.getElementsByClassName("btns");
const editWindow = document.querySelector(".edit-window");
const edit = document.querySelector(".edit");
const closebtn = document.querySelector(".close");
const editedTodo = document.querySelector(".newTodo");

//event listeners
newTodoBtn.addEventListener("click", addTodo);
window.addEventListener("DOMContentLoaded", displayTodos);

todoList.addEventListener("mouseover", displayCross);
todoList.addEventListener("mouseout", hideCross);
todoList.addEventListener("click", removeOrEdit);

closebtn.addEventListener("click", closeEditWindow);

//functions

function addTodo(e) {
  let todo = `<li class='todo-item'>
<div class="todo">
 <div class="btnAndWork">
  <div>
    <button type="button" class="btn-unchecked"></button>
  </div>
  <div>
  <span class="work">${newTodoContent.value}</span>
  </div>
 </div>   
 
  <div class="btns">
    <img
      src="images/icon-cross.svg"
      class="dlt-btn hidden"
      alt="delete"
    />
 

  <i class="far fa-edit edit-btn hidden"></i></div>
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
    <button type="button" class="btn-unchecked"></button>
  </div>
  <div>
  <span class="work">${task}</span>
  </div>
 </div>   
 
  <div class="btns">
    <img
      src="images/icon-cross.svg"
      class="dlt-btn hidden"
      alt="delete"
    />
 

  <i class="far fa-edit edit-btn hidden"></i></div>
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
}

function displayCross(e) {
  if (e.target.classList.contains("dlt-btn")) {
    e.target.classList.remove("hidden");
  } else if (e.target.classList.contains("edit-btn")) {
    e.target.classList.remove("hidden");
  }
}
function hideCross(e) {
  if (e.target.classList.contains("dlt-btn")) {
    e.target.classList.add("hidden");
  } else if (e.target.classList.contains("edit-btn")) {
    e.target.classList.add("hidden");
  }
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
  } else if (e.target.classList.contains("edit-btn")) {
    editWindow.style.zIndex = "1";
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
