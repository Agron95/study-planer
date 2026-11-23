
// ---------- 1. Get HTML elements ----------

const taskForm = document.getElementById("task-form");
const subjectInput = document.getElementById("subject-input");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

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

// Array where all tasks are stored
let tasks = [];

// Selected filter
let currentFilter = "all";


// ---------- 3. Add a new task ----------

function addTask(event) {

    event.preventDefault();

    // Get values from inputs
    const subject = subjectInput.value.trim();
    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;

    // Check if inputs are empty
    if (subject === "" || title === "" || dueDate === "") {

        errorMessage.textContent = "Please fill in all fields.";

        return;
    }

    // Create a new task
    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        subject: subject,
        title: title,
        dueDate: dueDate,
        completed: false
    };

    // Add task to the array
    tasks.push(newTask);

    // Clear the form
    taskForm.reset();

    errorMessage.textContent = "";

    // Update the page
    render();

}


// ---------- 4. Mark task as completed ----------

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    render();

}


// ---------- 5. Delete a task ----------

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    render();

}


// ---------- 6. Filter tasks ----------

function getVisibleTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function(task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        return tasks.filter(function(task) {
            return task.completed;
        });

    }

    return tasks;

}


// ---------- 7. Display tasks ----------

function renderTasks() {

    taskList.innerHTML = "";

    const visibleTasks = getVisibleTasks();

    visibleTasks.forEach(function(task) {

        // Create task card
        const item = document.createElement("li");

        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.title + " as completed"
        );

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        // Create task information
        const information = document.createElement("div");

        information.className = "task-title";

        const subject = document.createElement("strong");

        subject.textContent = task.subject;

        const title = document.createElement("p");

        title.textContent = task.title;

        const date = document.createElement("small");

        date.textContent = "Due: " + task.dueDate;

        information.appendChild(subject);
        information.appendChild(title);
        information.appendChild(date);

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.setAttribute(
            "aria-label",
            "Delete " + task.title
        );

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        // Add everything to the task card
        item.appendChild(checkbox);
        item.appendChild(information);
        item.appendChild(deleteButton);

        taskList.appendChild(item);

    });


    // Empty list message
    if (visibleTasks.length === 0) {

        if (tasks.length === 0) {

            emptyMessage.textContent =
                "No tasks yet. Add your first study task above.";

        } else if (currentFilter === "active") {

            emptyMessage.textContent =
                "No active tasks.";

        } else {

            emptyMessage.textContent =
                "No completed tasks yet.";

        }

    } else {

        emptyMessage.textContent = "";

    }

}


// ---------- 8. Update statistics ----------

function renderStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const active = total - completed;

    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    totalCount.textContent = total;
    completedCount.textContent = completed;
    activeCount.textContent = active;

    progressText.textContent = percent + "%";

    progressFill.style.width = percent + "%";

    progressTrack.setAttribute("aria-valuenow", percent);

}


// ---------- 9. Render everything ----------

function render() {

    renderTasks();

    renderStats();

}


// ---------- 10. Event listeners ----------

// Submit the form
taskForm.addEventListener("submit", addTask);

// Clear error message when typing
subjectInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

titleInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

dueDateInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});


// Filter buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        render();

    });

});


// ---------- 11. Start the website ----------

render();
