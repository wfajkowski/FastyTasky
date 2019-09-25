import {
  createList,
  deleteList,
  editList,
  chooseActiveList /* updateListName */
} from "./userLists";

let form = document.getElementById("adding_panel");
let itemList = document.getElementById("items");
let deleteButton = document.getElementsByClassName("delete");
let editButton = document.getElementsByClassName("edit");

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", editItem);

function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById("item").value;
  var li = document.createElement("li");
  var liIcon = document.createElement("i");
  liIcon.className = "fa fa-bolt";
  li.className = "list-group-item";
  li.appendChild(liIcon);
  var liText = document.createElement("p");
  liText.className = "liText";
  li.appendChild(liText);
  liText.appendChild(document.createTextNode(newItem));
  var deleteBtn = document.createElement("button");
  var deleteIcon = document.createElement("i");
  var editBtn = document.createElement("button");
  var editIcon = document.createElement("i");
  deleteBtn.className = "btn delete";
  deleteIcon.className = "fa fa-trash";
  editBtn.className = "btn edit";
  editIcon.className = "fa fa-gear";
  deleteBtn.appendChild(deleteIcon);
  li.appendChild(deleteBtn);
  editBtn.appendChild(editIcon);
  li.appendChild(editBtn);
  itemList.appendChild(li);
  //  console.log(tab)
  chooseActiveList();
  //  console.log(tab.indexOf(newItem))
  let x = document.getElementById("item");
  createList();
  x.value = "";
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      let li = e.target.parentElement;
      deleteList(li);
      itemList.removeChild(li);
    }
  } else if (e.target.classList.contains("fa-trash")) {
    if (confirm("Are You Sure?")) {
      let buttonClick = e.target.parentElement;
      let li = buttonClick.parentElement;
      deleteList(li);
      itemList.removeChild(li);
    }
  }
}
function editItem(e) {
  if (e.target.classList.contains("edit")) {
    if (confirm("Do you want to edit this item?")) {
      let li = e.target.parentElement;
      li.contentEditable = "true";
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13) {
          li.contentEditable = "false";
          editList(li);
        }
      });
    }
  } else if (e.target.classList.contains("fa-gear")) {
    if (confirm("Do you want to edit this item?")) {
      let buttonClick = e.target.parentElement;
      let li = buttonClick.parentElement;
      li.contentEditable = "true";
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13) {
          li.contentEditable = "false";
          editList(li);
          // tab.push(li.textContent);
          // console.log(tab);
          // updateListName(li);
          // li.contentEditable = 'false';
        }
      });
    }
  }
}
