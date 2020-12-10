//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadAllEventListeners();

// load all event listeners
function loadAllEventListeners(){
    //add task event
    form.addEventListener("submit", addTask)
    //remove task event
    taskList.addEventListener("click", removeTask);
    //clear task event
    clrBtn.addEventListener("click", clearTasks);
    //filter task event
    filter.addEventListener("keyup", filterTasks);
}

//get tasks form LS
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item"
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    })
}

//add task
function addTask(e){
    if (taskInput.value === ""){
        alert("add a task")
    }
    
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item"
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //store in LS
    storeTaskInLS(taskInput.value);
    //clear input
    taskList.value = "";
    
    e.preventDefault();
    
}

//store task
function storeTaskInLS(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if (confirm("are you sure?")){
            e.target.parentElement.parentElement.remove();

            //remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

//remove from LS
function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}



//clear tasks
function clearTasks(){
    // taskList.innerHTML = "";

    //faster
    
    if (confirm("are you sure?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

    }
   
    //clear from LS
    clearTasksFromLS();
}

//clear tasks from LS
function clearTasksFromLS(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else{
            task.style.display = "none"
        }
    })
}