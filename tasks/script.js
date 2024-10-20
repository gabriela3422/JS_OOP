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
        this.tasks.splice(index, 1);
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
        taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {

            const taskEl = document.createElement('li');
            taskEl.classList.add('item');

            taskEl.innerHTML = `
             <input class="task-input"  data-id="${index}" type="text" value="${task.name}"/>
             <div class="toDoList-actions">
                  <button class="updateTask" onClick="todoList.updateTask(${index}, getValue('${index}'))">Update a Task</button>
                  <button class="deleteTask" onClick="todoList.deleteTask(${index})">Delete a Task</button> 
            </div>
          `
            taskList.appendChild(taskEl);
        })

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

function getValue(index) {
    const taskValue = document.querySelector(`.task-input[data-id="${index}"]`).value;
    return taskValue;
}

document.getElementById('addButton').addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', () => {
    todoList.getTasksFromLocalStorage();
})

