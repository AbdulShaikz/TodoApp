let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.querySelector(".deleteBtn");

let editingIndex = -1;

document.addEventListener("DOMContentLoaded", function () {
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  });
  addButton.addEventListener("click", addTask);
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    if (editingIndex !== -1) {
        addButton.textContent = addButton.textContent === "Update" ? "Add" : "Update";
      todo[editingIndex].text = newTask;
      editingIndex = -1;
    } else {
      todo.push({
        text: newTask,
        disabled: false,
      });
    }
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
    addButton.textContent = "Add";
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
            <div class="todo-items-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }/>
                <p class="${
                  item.disabled ? "disabled" : ""
                }" id="todo-${index}" onClick="editTask(${index})">${
      item.text
    }</p> 
         <p onClick="deleteTask(${index})"><span class="material-symbols-outlined">
delete
</p><div>      
            </div>
        `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  if (todo[index].disabled) return;
  todoInput.value = todo[index].text;
  addButton.textContent = "Update";
  editingIndex = index;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index){
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}
