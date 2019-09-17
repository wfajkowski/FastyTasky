const form = document.querySelector(".add-task__form");
const tasksList = document.querySelector(".tasks");
const itemsTask = [];

//W  momencie usunięcia elementu i dodania kolejnego stary element renederuje się razem z nowym,
//natomiast tablica itemsTask, działa poprawnie



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
  itemsTask.push(item);

  populateList(itemsTask, tasksList);
  console.log(itemsTask);

  this.reset();
}




//################################
// #########        ADD - NODE ELEMENTS TO NEW TASK      #############
//#################################
function populateList(tasks = [], tasksList) {
  tasksList.innerHTML = tasks
    .map((item, i) => {
      return `
    <li class="single-task">
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

function toggleDone(event) {
  if (!event.target.matches("input")) return;
  const el = event.target;
  const index = el.dataset.index;
  itemsTask[index].done = !itemsTask[index].done;

  populateList(itemsTask, tasksList);
}

tasksList.addEventListener("click", toggleDone);



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
    }
  }
  console.log(itemsTask);
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
        }
      });
    }
  }
}
