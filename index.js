let submitBtn = document.getElementById('add-task-btn');
let inputToDo = document.getElementById('task-input');
let taskList = [];
let todoListDiv = document.getElementById('render-todo-list');
let clearAll = document.getElementById('ClearAll');
let clearChecked = document.getElementById('ClearChecked');
let notification = document.getElementById("notification-container")
let notificationContent = document.getElementById("notification-content")


let totalTasks = document.getElementById('tasks');
let completedTasks = document.getElementById('completed');

let leftTasks = [];
let completedT = [];


// this function is used for rendering the task-Array
function renderList(Array) {
    todoListDiv.innerHTML = "";
    let flagCount = 0;
    for (let i in Array) {
        let item = document.createElement('div');
        item.innerHTML = `<div class="task-content todocontent${i}"><div class="checkbox${i}" onclick="taskStatus(${i})" >${Array[i].completed ? '<i class="fa-regular fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>'}</div><span>${Array[i].todoItem}</span></div><span class="todocontent"><button type="button" id="${i}"  onclick="deleteToDoItem(${i})"><i class="fa-solid fa-trash"></i></button></span>`;
        if (Array[i].completed == true) {
            flagCount++;
        }
        item.className = "item-row";
        let inputcheckbox = item.getElementsByClassName(`checkbox${i}`);
        inputcheckbox[0].checked = Array[i].completed;
        todoListDiv.appendChild(item);
    }
    for (let i in Array) {
        if (Array[i].completed) {
            let cross = document.getElementsByClassName(`todocontent${i}`);
            // console.log(cross)
            cross[0].style.textDecoration = "line-through";
            cross[0].style.color = "#0ed70e";
        }
    }
    if (leftTasks.length != 0) {
        totalTasks.innerHTML = `Left:${leftTasks.length}`;
    } else {
        totalTasks.innerHTML = `Left:${taskList.length-flagCount}`;
    }
    completedTasks.innerHTML = `<i class="fa-solid fa-check-double"></i>Completed:${flagCount}`;
}
// function onclick on delete buttons
function deleteToDoItem(item) {
    showNotification(`${taskList[item].todoItem} deleted`);
    taskList.splice(item, 1);
    renderList(taskList);
}

// function used to toggle the task status
function taskStatus(item) {
    taskList[item].completed = !taskList[item].completed;
    renderList(taskList);
    if (taskList[item].completed) {
        let cross = document.getElementsByClassName(`todocontent${item}`);
        cross[0].style.textDecoration = "line-through";
        cross[0].style.color = "#0ed70e";
    }
}

// notification pop containing message
function showNotification(msg) {
    notificationContent.innerText = msg
    notification.style.visibility = "visible"
    setTimeout(() => { closeNotification() }, 2000)
}

function closeNotification() {
    notification.style.visibility = "hidden"
}

// function to add input to the render todo container
function addTask() {
    let task = {
        completed: false,
        todoItem: inputToDo.value
    }
    if (task.todoItem == "") {
        showNotification("please note down task first");
        return;
    }
    taskList.push(task);

    showNotification(`${task.todoItem} Added`);
    inputToDo.value = "";
    renderList(taskList);

}

submitBtn.addEventListener('click', addTask);
inputToDo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
})

clearAll.addEventListener('click', () => {
    taskList = [];
    renderList(taskList);

});

clearChecked.addEventListener('click', () => {
    taskList = taskList.filter(task => !task.completed);
    renderList(taskList);
})

// render the completed task array 
function renderCompleted() {
    leftTasks = [];
    completedT = [];

    for (let i in taskList) {
        if (taskList[i].completed) {
            completedT.push(taskList[i]);
        } else {
            leftTasks.push(taskList[i]);
        }
    }
    // console.log(leftTasks, completedT);
    renderList(completedT);
}
// render uncompleted task array
function renderLeftTasks() {
    leftTasks = [];
    renderList(taskList);
}

totalTasks.innerHTML = `Tasks:0`;
completedTasks.innerHTML = `<i class="fa-solid fa-check-double"></i>Completed:0`;
notification.className = "close"