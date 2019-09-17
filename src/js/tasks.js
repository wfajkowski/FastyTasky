const form = document.querySelector(".add-task__form");
const tasksList = document.querySelector(".tasks");



// array with data, to fetch
const itemsTask = [];

//W  momencie usunięcia elementu i dodania kolejnego stary element renederuje się razem z nowym,
//natomiast tablica itemsTask, działa poprawnie
let li =  document.querySelector(".task");





//################################
// #########        ADD-TASK      #############
//#################################
function addTask(event) {
  event.preventDefault();
  const name = this.querySelector("[name = item]").value;
  // single task "item", usefull in backend setup for db
  const item = {
    name,
    done: false
    //should add in future id, date .....

  };
  itemsTask.push(item);
  populateList(itemsTask, tasksList);

<<<<<<< HEAD
=======
console.log(itemsTask);
>>>>>>> 3687073544b5075aa74b77d653242d198e0def42
  this.reset();
}




//################################
// #########        ADD - NODE ELEMENTS TO NEW TASK      #############
//#################################
function populateList(tasks = [], tasksList) {
  tasksList.innerHTML = tasks
    .map((item, i) => {
      return `
    <li class=" task single-task${i}">
  
        <input type="checkbox" data-index=${i} id=item${i}" ${
        item.done ? "checked" : ""
      } />
        <div id="single-task__title" for ="item${i}">${item.name}</div>
        <button class="item-task__edit"><i class="fa fa-gear"></i> </button>
        <button class="item-task__remove"><i class="fa fa-trash"></i> </button>
    </li>
    `;
    })
    .join("");
  
  


 
}
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", editItem);
form.addEventListener("submit", addTask);




//##############################
//########      DONE TASK    ################
//###############################
function toggleDone(event) {
  if (!event.target.matches("input")) return;
  const el = event.target;
  const index = el.dataset.index;
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
li.appendChild(removeTaskBtn);
function deleteTask(event) {


  
   if (event.target.classList.contains("item-task__remove")) {
     if (confirm("Are You Sure")) {
       let li = event.target.parentElement;
       tasksList.removeChild(li);
  
      console.log(li);
    

 
       let index = itemsTask.indexOf(item.textContent);
       itemsTask.splice(index,1);
       console.log(itemsTask);
    
     }
      
   }

 }


//################################
// #########        EDIT TASK      #############
//#################################
function editItem(event) {
  if (event.target.classList.contains("item-task__edit")) {
    if (confirm("Do you want to edit this task?")) {
      let li = event.target.previousElementSibling;
      li.contentEditable = "true";
      window.addEventListener("keypress", event => {
        if (event.keyCode == 13) {
          itemsTask.push(li.textContent);

          li.contentEditable = "false";
          console.log(itemsTask);
        }
      });
    }
  }
}
