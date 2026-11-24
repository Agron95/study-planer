
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

let tasks = [];

let currentFilter = "all";

const storageKey = "studyPlannerTasks";


// ---------- 3. Save tasks to localStorage ----------

function saveTasks() {

    try {

        localStorage.setItem(storageKey, JSON.stringify(tasks));

    } catch (error) {

        console.log("Could not save tasks.");

    }

}


// ---------- 4. Load tasks from localStorage ----------

function loadTasks() {

    try {

        const savedTasks = localStorage.getItem(storageKey);

        if (savedTasks !== null) {

            const parsedTasks = JSON.parse(savedTasks);

            if (
                Array.isArray(parsedTasks) &&
                parsedTasks.every(function(task) {

                    return task &&
                        typeof task.id === "string" &&
                        typeof task.subject === "string" &&
                        typeof task.title === "string" &&
                        typeof task.dueDate === "string" &&
                        typeof task.completed === "boolean";

                })
            ) {

                tasks = parsedTasks;

            } else {

                tasks = [];

            }

        }

    } catch (error) {

        tasks = [];

        console.log("Could not load saved tasks.");

    }

}


// ---------- 5. Check if task is overdue ----------

function isOverdue(task) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayDate = year + "-" + month + "-" + day;

    return !task.completed && task.dueDate < todayDate;

}


// ---------- 6. Add a new task ----------

function addTask(event) {

    event.preventDefault();

    const subject = subjectInput.value.trim();
    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;

    if (subject === "" || title === "" || dueDate === "") {

        errorMessage.textContent = "Please fill in all fields.";

        return;
    }

    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        subject: subject,
        title: title,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskForm.reset();

    errorMessage.textContent = "";

    render();

}


// ---------- 7. Mark task as completed ----------

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

    saveTasks();

    render();

}


// ---------- 8. Delete a task ----------

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    render();

}


// ---------- 9. Filter tasks ----------

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


// ---------- 10. Display tasks ----------

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

        // Show overdue label
        if (isOverdue(task)) {

            const overdueLabel = document.createElement("span");

            overdueLabel.className = "overdue-label";
            overdueLabel.textContent = "Overdue";

            information.appendChild(overdueLabel);

        }

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


// ---------- 11. Update statistics ----------

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


// ---------- 12. Render everything ----------

function render() {

    renderTasks();

    renderStats();

}


// ---------- 13. Event listeners ----------

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
// Filter buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");

        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        render();

    });

});


// ---------- 14. Start the website ----------

loadTasks();

render();
