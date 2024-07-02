let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const taskDateTime = document.getElementById('taskDateTime').value;

    if (taskInput && taskDateTime) {
        const task = {
            id: Date.now(),
            text: taskInput,
            dateTime: taskDateTime,
            done: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        document.getElementById('taskInput').value = '';
        document.getElementById('taskDateTime').value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.innerHTML = `
            <span>${task.text} - ${formatDateTime(task.dateTime)}</span>
            <div class="task-buttons">
                <button onclick="toggleDone(${task.id})">${task.done ? 'Undo' : 'Done'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} ${hours}:${minutes}`;
}

function toggleDone(id) {
    const task = tasks.find(task => task.id === id);
    task.done = !task.done;
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);
