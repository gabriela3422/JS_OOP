class ToDoList {
    constructor(tasks) {
        this.tasks = [];
    }

    addTask(value) {
        const newTask = {
            name: value,
        }
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index,1);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }


    updateTask(index, value) {
        this.tasks[index].name = value;
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    getTasksFromLocalStorage() {
        const storeTasks = localStorage.getItem('tasks');
        this.tasks = JSON.parse(storeTasks) || [];
        this.renderTasks();
    }


    renderTasks() {
        const taskList = document.querySelector('#list-item');
        const taskEl = document.createElement('li');
        taskEl.classList.add('item');

        this.tasks.forEach((task, index) => {
            taskEl.innerHTML = `
             <span>${task.name}</span>
             <div class="toDoList-actions">
                  <button class="updateTask" onClick="updateTask(${index}, ${task.name})">Update a Task</button>
                  <button class="deleteTask" onClick="deleteTask(${index})">Delete a Task</button> 
            </div>
          `
        })
        taskList.appendChild(taskEl);
    }
}
const todoList = new ToDoList();

function addTask() {
    const taskInput = document.querySelector('.todo-input');
    const taskVal = taskInput.value.trim();
    if (taskVal.length > 0) {
        todoList.addTask(taskVal);
        taskInput.value = '';
    }
}

document.getElementById('addButton').addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', () => {
    todoList.getTasksFromLocalStorage();
})

