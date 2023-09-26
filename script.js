// Get DOM elements
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskDueDateInput = document.getElementById('task-due-date');
const taskCategorySelect = document.getElementById('task-category');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Get tasks from local storage (if available)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>
            <button class="edit-task" data-index="${index}">Edit</button>
            <button class="delete-task" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Add event listeners for editing and deleting tasks
        taskItem.querySelector('.edit-task').addEventListener('click', editTask);
        taskItem.querySelector('.delete-task').addEventListener('click', deleteTask);
    });

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const dueDate = taskDueDateInput.value;
    const category = taskCategorySelect.value;

    if (title === '' || dueDate === '') {
        alert('Title and Due Date are required.');
        return;
    }

    const newTask = { title, description, dueDate, category };
    tasks.push(newTask);

    renderTasks();

    // Clear input fields
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskDueDateInput.value = '';
}

// Function to edit a task
function editTask(event) {
    const index = event.target.dataset.index;
    const editedTask = tasks[index];

    // You can implement an edit form here or edit the task directly

    renderTasks();
}

// Function to delete a task
function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
}

// Event listener for adding a task
addTaskButton.addEventListener('click', addTask);

// Initial rendering of tasks
renderTasks();
