const taskInput = document.getElementById("task-input");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("due-date");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const toggleMode = document.getElementById("toggle-mode");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

// Dark mode init
if (darkMode) document.body.classList.add("dark");

// Toggle dark mode
toggleMode.onclick = () => {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
};

// Render tasks
function renderTasks() {
  const search = searchInput.value.toLowerCase();
  taskList.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(search))
    .forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
          <strong>${task.text}</strong><br>
          <small>${task.category} | ${task.date || "No date"}</small>
        </div>

        <div class="actions">
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;

      taskList.appendChild(li);
    });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    category: categoryInput.value,
    date: dateInput.value,
    completed: false
  });

  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
};

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Edit
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    renderTasks();
  }
}

// Search
searchInput.oninput = renderTasks;

// Initial load
renderTasks();