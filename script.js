document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        createTaskElement(text, false);
        saveTasks();
        taskInput.value = '';
    }

    function createTaskElement(text, completed) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = text;
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
});
