import {
  createList,
  deleteList,
  editList,
  chooseActiveList /* updateListName */
} from "./userLists";
import { shareList, deleteSharedList } from "./sharedUserLists";

let form = document.getElementById("adding_panel");
let itemList = document.getElementById("items");
let deleteButton = document.getElementsByClassName("delete");
let editButton = document.getElementsByClassName("edit");

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", editItem);
itemList.addEventListener("click", shareItem);

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
  li.appendChild(liText);
  var shareBtn = document.createElement("button");
  var shareIcon = document.createElement("i");
  var deleteBtn = document.createElement("button");
  var deleteIcon = document.createElement("i");
  var editBtn = document.createElement("button");
  var editIcon = document.createElement("i");
  shareBtn.className = "btn share";
  shareIcon.className = "fa fa-share";
  deleteBtn.className = "btn delete";
  deleteIcon.className = "fa fa-trash";
  editBtn.className = "btn edit";
  editIcon.className = "fa fa-gear";
  shareBtn.appendChild(shareIcon);
  li.appendChild(shareBtn);
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
      deleteSharedList(li);
      itemList.removeChild(li);
    }
  } else if (e.target.classList.contains("fa-trash")) {
    if (confirm("Are You Sure?")) {
      let buttonClick = e.target.parentElement;
      let li = buttonClick.parentElement;
      deleteList(li);
      deleteSharedList(li);
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

function shareItem(e) {
  if (e.target.classList.contains("share")) {
    let name_div = document.createElement("div");
    let name_title = document.createElement("p");
    let name_input = document.createElement("input");
    let name_button = document.createElement("button");
    name_div.appendChild(name_title);
    name_div.appendChild(name_input);
    name_div.appendChild(name_button);
    name_div.setAttribute("class", "name_div");
    name_title.textContent = "Put user name";
    name_button.textContent = "Accept";
    document.querySelector("body").appendChild(name_div);
    name_button.addEventListener("click", function () {
      name_div.style.display="none";
      if (confirm("Do you want to share this item?")) {
        let buttonClick = e.target.parentElement;
        let lit2 = buttonClick.parentElement;
        console.log(lit2);
        shareList(lit2);
        document.querySelector("body").removeChild(name_div)
      } else {
        document.querySelector("body").removeChild(name_div)
      }})
  } else if (e.target.classList.contains("fa-share")) {
    let name_div = document.createElement("div");
    let name_title = document.createElement("p");
    let name_input = document.createElement("input");
    let name_button = document.createElement("button");
    name_div.appendChild(name_title);
    name_div.appendChild(name_input);
    name_div.appendChild(name_button);
    name_div.setAttribute("class", "name_div");
    name_title.textContent = "Put user name";
    name_button.textContent = "Accept";
    document.querySelector("body").appendChild(name_div);
    name_button.addEventListener("click", function () {
      name_div.style.display="none";
      if (confirm("Do you want to share this item?")) {
        let buttonClick = e.target.parentElement;
        let lit2 = buttonClick.parentElement;
        console.log(lit2);
        shareList(lit2);
        document.querySelector("body").removeChild(name_div)
      } else {
        document.querySelector("body").removeChild(name_div)
      }})
  }
    /*(e.target.classList.contains("fa-share")) {
      if (confirm("Do you want to share this item?")) {
      let buttonClick = e.target.parentElement;
      let lit2 = buttonClick.parentElement;
      console.log(lit2);
      shareList(lit2);
          // tab.push(li.textContent);
          // console.log(tab);
          // updateListName(li);
          // li.contentEditable = 'false';
      }
    };*/
  }