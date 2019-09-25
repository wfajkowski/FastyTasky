import { createTaskOfList, getTasksOfList } from "./userLists";
const form = document.querySelector(".add-task__form");
const tasksList = document.querySelector('.tasks');


// array with data, to fetch

let itemsTask = [];

export const tasksFetch = async () => {
  itemsTask = [];
  const activeListId = await document.querySelector(".list-group-item.active")
    .dataset.id;
  console.log(activeListId);
  const request = new Request(
    "http://localhost:3000/api/my_lists/" + activeListId,
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
    populateList(tasksArray, tasksList);
    let addedTasks = await document.querySelectorAll("#taskList li p");
    // console.log(addedTasks);
    await addedTasks.forEach(item =>
      itemsTask.push({
        name: item.textContent,
        done: false
      })
    );
    // console.log(itemsTask);
    await getTasksOfList();
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
  console.log(item);
  // itemsTask = 
  itemsTask.push(item);
  populateList(itemsTask, tasksList);
  createTaskOfList();
// console.log(itemsTask);
  this.reset();
}

//################################
// #########        ADD - NODE ELEMENTS TO NEW TASK      #############
//#################################
export function populateList(tasks = [], tasksList) {
  tasksList.innerHTML = tasks
    .map((item, i) => {
      return `
    <li class=" task single-task${i}">
        <label class="container">
        <input type="checkbox" class="isChecked"  data-index=${i} id=item${i}" ${
          item.done ? "checked" : ""
        }>
        <span class="checkmark"></span>
        </label>
        <div id="single-task__title" for ="item${i}">
        <p class"task-text">${item.name}</p></div>
        <button class="item-task__remove"><i class="fa fa-trash"></i> </button>
        <button class="item-task__edit"><i class="fa fa-gear"></i> </button>
    </li>
    `;
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
  populateList(itemsTask, tasksList);


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
      }
     } else if (event.target.classList.contains("fa-trash")) {
      if (confirm("Are You Sure?")) {
        let buttonClick = event.target.parentElement;
        let li = buttonClick.parentElement;
        tasksList.removeChild(li);
        let index = itemsTask.indexOf(item.textContent);
       itemsTask.splice(index,1);
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
      li.contentEditable = "true";
      window.addEventListener("keypress", event => {
        if (event.keyCode == 13) {
          itemsTask.push(li.textContent);
          li.contentEditable = "false";
          // console.log(itemsTask);
        }
      })
    }
    } else if (event.target.classList.contains("fa-gear")) {
      if (confirm("Do you want to edit this task?")) {
        let buttonClick = event.target.parentElement;
        let li = buttonClick.parentElement;
        li.contentEditable = "true";
        window.addEventListener("keypress", e => {
          if (e.keyCode == 13) {
            li.contentEditable = "false";
          }
        });
      }
    }
  }


