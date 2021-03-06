// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
todoInput.addEventListener("keypress", addTodo);

// functions
function addTodo(event) {
  if (event.key == "Enter") {
    // prevent form from submitting
    event.preventDefault();
    // check input is not empty
    if (todoInput.value == "") return;
    // todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
  } else return;
}

function deleteCheck(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("remove-todo");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check local storage is null
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check local storage is null
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo) {
    // todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // check local storage is null
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}