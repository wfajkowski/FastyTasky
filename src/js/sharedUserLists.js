import { populateList, sharedTasksFetch } from "./tasks";

let itemList = document.getElementById("items");

let tab = [];

const getLists = async () => {
  const token = localStorage.getItem("x-auth-token");
  const request = new Request("http://localhost:3000/api/shared_lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  });

  try {
    const data = await fetch(request);
    const lists = await data.json();
    const myToDos = [...lists];
    console.log(myToDos);
    for (let i = 0; i < myToDos.length; i++) {
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.dataset.id = myToDos[i]._id;
      li.dataset.title = myToDos[i].title;
      var liIcon = document.createElement('i');
      liIcon.className = 'fa fa-share';
      li.appendChild(liIcon);
      let liText = document.createElement("p");
      liText.className = "liText";
      liText.appendChild(document.createTextNode(`${myToDos[i].title} (shared)`));
      li.appendChild(liText);
      let deleteBtn = document.createElement("button");
      let deleteIcon = document.createElement("i");
      deleteBtn.className = "btn delete";
      deleteIcon.className = "fa fa-trash";
      deleteBtn.appendChild(deleteIcon);
      li.appendChild(deleteBtn);
      itemList.appendChild(li);
      tab.push(li.textContent);
    }
    let myLists = document.querySelectorAll(".list-group-item");
    myLists[0].classList.add("active");
    myLists.forEach(item =>
      item.addEventListener("click", e => {
        myLists.forEach(element => element.classList.remove("active"));
        e.target.parentElement.classList.add("active");
        getTasksOfList();
        sharedTasksFetch();
      })
    );
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const getTasksOfList = async () => {
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
    populateList(tasksArray, tasksList);
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const initShare = async () => {
  await getLists();
  // await getTasksOfList();
  await sharedTasksFetch();
};

var lit;
var lit2;
let itemList2 = document.getElementById("items");
itemList2.addEventListener("click", chooseItem);
  
function chooseItem(e) {
    if (e.target.classList.contains("share")) {
        lit = e.target.parentElement
        console.log(lit);
        return lit;
    } else if (e.target.classList.contains("fa-share")) {
        let buttonClick = e.target.parentElement;
        lit2 = buttonClick.parentElement;
        console.log(lit2);
        return lit2;
      }
  };

export const shareList = async () => {
  let userName = document.querySelector(".name_div input").value;
  const sharedListId = await lit2.dataset.id || lit.dataset.id;
  console.log(sharedListId);
  const request = new Request("http://localhost:3000/api/shared_lists", {
    method: "POST",
    body: JSON.stringify({
      listId: sharedListId,
      name: userName
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  try {
    const data = await fetch(request);
    const savedData = await data.json();
    return savedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};

  export const deleteSharedList = async element => {
    const request = new Request(
      "http://localhost:3000/api/shared_lists/" + element.dataset.id,
      {
        method: "DELETE"
      }
    );
  
    try {
      const data = await fetch(request);
      const deletedList = await data.json();
      return deletedList;
    } catch (err) {
      console.log("Error:", err.message);
    }
  };  