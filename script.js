// ---------- 1. Get the elements we need from the page ----------
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-btn");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const activeCount = document.getElementById("active-count");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const progressTrack = document.getElementById("progress-track");

// ---------- 2. App data ----------
// The key used to save and find our tasks inside localStorage
const STORAGE_KEY = "studyflow-tasks";

// Each task looks like: { id: 123, title: "Read chapter 4", completed: false }
let tasks = loadTasks();

// Which filter is selected: "all", "active" or "completed"
let currentFilter = "all";

// ---------- 3. localStorage functions ----------

// Save the tasks array in the browser (localStorage only stores text, so we use JSON)
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Could not save tasks:", error);
  }
}

// Read the saved tasks when the page opens
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    // If nothing was saved yet, start with an empty list
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.warn("Could not load tasks:", error);
    return [];
  }
}

// ---------- 4. Task functions ----------

// Add a new task from the input field
function addTask() {
  const title = taskInput.value.trim(); // trim() removes spaces at the start and end

  // Do not allow empty tasks
  if (title === "") {
    errorMessage.textContent = "Please enter a task name before adding.";
    taskInput.focus();
    return;
  }

  errorMessage.textContent = "";

  const newTask = {
    id: Date.now(), // the current time in milliseconds gives us a unique id
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  taskInput.focus();

  saveTasks();
  render();
}

// Mark a task as completed or active again
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { id: task.id, title: task.title, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  render();
}

// Remove one task
function deleteTask(id) {
  // Keep every task except the one we want to delete
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  render();
}

// Return only the tasks that match the selected filter
function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (task) { return !task.completed; });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (task) { return task.completed; });
  }
  return tasks; // "all"
}

// ---------- 5. Drawing everything on the page ----------

// Build the task list in the page
function renderTasks() {
  taskList.innerHTML = ""; // clear the old list first

  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach(function (task) {
    const item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark \"" + task.title + "\" as completed");
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    // Title (textContent is used so typed text can never run as HTML)
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete \"" + task.title + "\"");
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    item.appendChild(checkbox);
    item.appendChild(title);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });

  // Show a friendly message when there is nothing to display
  if (visibleTasks.length === 0) {
    if (tasks.length === 0) {
      emptyMessage.textContent = "No tasks yet. Add your first study task above.";
    } else if (currentFilter === "active") {
      emptyMessage.textContent = "No active tasks. Great job, everything is done!";
    } else {
      emptyMessage.textContent = "No completed tasks yet. Finish a task to see it here.";
    }
  } else {
    emptyMessage.textContent = "";
  }
}

// Update the numbers and the progress bar
function renderStats() {
  const total = tasks.length;
  const completed = tasks.filter(function (task) { return task.completed; }).length;
  const active = total - completed;

  // Avoid dividing by zero when there are no tasks
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalCount.textContent = total;
  completedCount.textContent = completed;
  activeCount.textContent = active;
  progressText.textContent = percent + "%";
  progressFill.style.width = percent + "%";
  progressTrack.setAttribute("aria-valuenow", percent);
}

// Refresh the whole page content
function render() {
  renderTasks();
  renderStats();
}

// ---------- 6. Events ----------

// Click the "Add Task" button
addButton.addEventListener("click", addTask);

// Press Enter inside the input field
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Hide the error message as soon as the student starts typing
taskInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

// Filter buttons: All, Active, Completed
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    // Highlight only the selected button
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    render();
  });
});

// ---------- 7. Start the app ----------
// Show the saved tasks as soon as the page opens
render();
