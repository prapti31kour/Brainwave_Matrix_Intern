let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const doneTasks = document.getElementById('doneTasks');
    const undoneTasks = document.getElementById('undoneTasks');
    doneTasks.innerHTML = '';
    undoneTasks.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.textContent = `${task.text} - ${task.dateTime}`;
        if (task.done) {
            doneTasks.appendChild(li);
        } else {
            undoneTasks.appendChild(li);
        }
    });
}

document.addEventListener('DOMContentLoaded', renderTasks);
