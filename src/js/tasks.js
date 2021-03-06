import { createTaskOfList, editTaskOfList } from "./userLists";
import { editTaskOfSharedList } from "./sharedUserLists";
const form = document.querySelector(".add-task__form");
const tasksList = document.querySelector('.tasks');


// array with data, to fetch

let itemsTask = [];

export const tasksFetch = async () => {
  const token = localStorage.getItem("x-auth-token");
  itemsTask = [];
  if(!document.querySelector('.list-group-item')) return;
  const activeListId = await document.querySelector(".list-group-item.active")
    .dataset.id;
  console.log(activeListId);
  const request = new Request(
    "http://localhost:3000/api/my_lists/" + activeListId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
  try {
    const data = await fetch(request);
    const list = await data.json();
    const tasks = [list.tasks];
    const tasksArray = tasks[0];
    const tasksList = document.querySelector(".tasks");
    populateList(tasksArray, tasksList);
    let addedTasks = await document.querySelectorAll("#taskList li");
    await addedTasks.forEach(item =>{
      itemsTask.push({
        name: item.querySelector("p").textContent,
        done: item.classList.contains("done") ? true : false
      });}
    );
  } catch (err) {
    console.log("Error:", err.message);
  }
}

export const sharedTasksFetch = async () => {
  const token = localStorage.getItem("x-auth-token");
  itemsTask = [];
  if (!document.querySelector(".list-group-item")) return;
  const activeListId = await document.querySelector(".list-group-item.active")
    .dataset.id;
  console.log(activeListId);
  const request = new Request(
    "http://localhost:3000/api/shared_lists/" + activeListId,
    {
      method: "GET"
    }
  );
  try {
    const data = await fetch(request);
    const list = await data.json();
    const tasks = [list.tasks];
    // console.log(list);
    const tasksArray = tasks[0];
    const tasksList = document.querySelector(".tasks");
    // console.log(tasksArray);
    // console.log(tasksList);
    populateList(tasksArray, tasksList, true);
    let addedTasks = await document.querySelectorAll("#taskList li");
    // console.log(addedTasks);
    await addedTasks.forEach(item =>{
      itemsTask.push({
        name: item.querySelector("p").textContent,
        done: item.classList.contains("done") ? true : false
      });}
    );
    // console.log(itemsTask);
  } catch (err) {
    console.log("Error:", err.message);
  }
}



let li =  document.querySelector(".task");



//################################
// #########        ADD-TASK      #############
//#################################
function addTask(event) {
  event.preventDefault();
  const name = this.querySelector("[name = item]").value;
  const item = {
    name,
    done: false
  };
  // console.log("item", item);
  // console.log("itemsTask", itemsTask);
  // itemsTask = 
  itemsTask.push(item);
  populateList(itemsTask, tasksList, false);
  createTaskOfList();
// console.log(itemsTask);
  this.reset();
}

//################################
// #########        ADD - NODE ELEMENTS TO NEW TASK      #############
//#################################
export function populateList(tasks = [], tasksList, isShared) {
  tasksList.innerHTML = tasks
    .map((item, i) => {
      if (isShared === true){
        return `
        <li class=" task single-task${i} ${item.done ? "done" : "undone"}">
            <label class="container">
            <input type="checkbox" class="isChecked"  data-index=${i} id=item${i}" ${
            item.done ? "checked" : ""
          }>
            <span class="checkmark"></span>
            </label>
            <div id="single-task__title" for ="item${i}">
            <p class"task-text">${item.name}</p></div>
        </li>
        `
      } else {
      return `
    <li class=" task single-task${i} ${item.done ? "done" : "undone"}">
        <label class="container">
        <input type="checkbox" class="isChecked"  data-index=${i} id=item${i}" ${
        item.done ? "checked" : ""}>
        <span class="checkmark"></span>
        </label>
        <div id="single-task__title" for ="item${i}">
        <p class"task-text">${item.name}</p></div>
        <button class="item-task__remove"><i class="fa fa-trash"></i> </button>
        <button class="item-task__edit"><i class="fa fa-gear"></i> </button>
    </li>
    `
      }
    })
    .join("");
  
  


 
}
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener("click", editItem);
form.addEventListener("submit", addTask);




//##############################
//########      DONE TASK    ################
//###############################
function toggleDone(event) {
  if (!event.target.matches("input")) return;
  const el = event.target;
  const index = el.dataset.index;
  console.log(itemsTask);
  itemsTask[index].done = !itemsTask[index].done;
  populateList(itemsTask, tasksList, document.querySelector(".active").textContent.includes("shared"));
  // console.log(el.parentElement.parentElement);
  const toggledTask = el.parentElement.parentElement;
  if(toggledTask.classList.contains('done')){
    toggledTask.classList.remove('done');
    toggledTask.classList.add('undone');
  } else {
    toggledTask.classList.remove("undone");
    toggledTask.classList.add("done");
  } 
  if(document.querySelector(".active").textContent.includes("shared")){
    editTaskOfSharedList(toggledTask);
  } else {
    editTaskOfList(toggledTask);
  }

}

tasksList.addEventListener("click", toggleDone);
populateList(itemsTask, tasksList);


//################################
// #########         REMOVE TASK      #############
//#################################
let removeTaskBtn = document.createElement("button");
removeTaskBtn.className = "item-task__remove";
tasksList.addEventListener("click", deleteTask);

// li.appendChild(removeTaskBtn);
function deleteTask(event) {
   if (event.target.classList.contains("item-task__remove")) {
     if (confirm("Are You Sure")) {
       let li = event.target.parentElement;
       tasksList.removeChild(li);
       let index = itemsTask.indexOf(item.textContent);
       itemsTask.splice(index,1);
       createTaskOfList();
      }
     } else if (event.target.classList.contains("fa-trash")) {
      if (confirm("Are You Sure?")) {
        let buttonClick = event.target.parentElement;
        let li = buttonClick.parentElement;
        tasksList.removeChild(li);
        let index = itemsTask.indexOf(item.textContent);
       itemsTask.splice(index,1);
       createTaskOfList();
      }
    }
   }

//################################
// #########        EDIT TASK      #############
//#################################
function editItem(event) {
  if (event.target.classList.contains("item-task__edit")) {
    if (confirm("Do you want to edit this task?")) {
      let li = event.target.parentElement;
      console.log("tu jestem!", li);
      li.contentEditable = "true";
      window.addEventListener("keypress", event => {
        if (event.keyCode == 13) {
          itemsTask.push(li.textContent);
          li.contentEditable = "false";
          // console.log(itemsTask);
          editTaskOfList(li);
        }
      })
    }
    } else if (event.target.classList.contains("fa-gear")) {
      if (confirm("Do you want to edit this task?")) {
        let buttonClick = event.target.parentElement;
        let li = buttonClick.parentElement;
        console.log("tu jestem!", li);
        li.contentEditable = "true";
        window.addEventListener("keypress", e => {
          if (e.keyCode == 13) {
            li.contentEditable = "false";
            editTaskOfList(li);
          }
        });
      }
    }
  }


