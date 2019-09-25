import { populateList, tasksFetch } from "./tasks";
let itemList = document.getElementById("items");

let tab = [];

const getLists = async () => {
  const token = localStorage.getItem("x-auth-token");
  const request = new Request(
    "http://localhost:3000/api/my_lists/",
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
    const lists = await data.json();
    const myToDos = [...lists];
    if(!myToDos) return;
    console.log(myToDos);
    for (let i = 0; i < myToDos.length; i++) {
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.dataset.id = myToDos[i]._id;
      var liIcon = document.createElement("i");
      liIcon.className = "fa fa-bolt";
      li.appendChild(liIcon);
      let liText = document.createElement("p");
      liText.className = "liText";
      liText.appendChild(document.createTextNode(myToDos[i].title));
      li.appendChild(liText);
      let shareBtn = document.createElement("button");
      let shareIcon = document.createElement("i");
      let deleteBtn = document.createElement("button");
      let deleteIcon = document.createElement("i");
      let editBtn = document.createElement("button");
      let editIcon = document.createElement("i");
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
      tab.push(li.textContent);
    }
    chooseActiveList();
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const chooseActiveList = () => {
  let myLists = document.querySelectorAll(".list-group-item");
  myLists[0].classList.add("active");
  myLists.forEach(item =>
    item.addEventListener("click", e => {
      myLists.forEach(element => element.classList.remove("active"));
      if (
        e.target.classList.contains("liText") ||
        e.target.classList.contains("delete") ||
        e.target.classList.contains("share") ||
        e.target.classList.contains("edit")
      ) {
        e.target.parentElement.classList.add("active");
      } else if (e.target.classList.contains("list-group-item")) {
        e.target.classList.add("active");
      } else {
        e.target.parentElement.parentElement.classList.add("active");
      }
      getTasksOfList();
      tasksFetch();
    })
  );
}

export const getTasksOfList = async () => {
  const token = localStorage.getItem("x-auth-token");
  const activeListId = await document.querySelector(".list-group-item.active")

  const request = new Request(
    "http://localhost:3000/api/my_lists/" + activeListId.dataset.id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
  try {
    if ((document.querySelector(".active").textContent.includes("shared"))) {
      document.querySelector(".add_task").style.display="none";
    } else {
      document.querySelector(".add_task").style.display="block";
    };
    const data = await fetch(request);
    // console.log(request);
    const list = await data.json();
    const tasks = [list.tasks];
    const tasksArray = tasks[0];
    const tasksList = document.querySelector(".tasks");
    // console.log(tasksArray);
    // console.log(tasksList);
    populateList(tasksArray, tasksList, false);
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const createList = async () => {
  const token = localStorage.getItem("x-auth-token");
  const listTitle = document.querySelector("#adding_panel #item").value;
  const request = new Request("http://localhost:3000/api/my_lists", {
    method: "POST",
    body: JSON.stringify({
      title: listTitle,
      // userId: "5d82a884811f4f1dcc8aeec3",
      tasks: []
    }),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  });
  try {
    const data = await fetch(request);
    const savedData = await data.json();
    document.querySelector(".list-group-item:last-child").dataset.id = savedData._id;
    return savedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const createTaskOfList = async () => {
  const taskName = document.querySelector(".add-task__form #itemm").value;
  const activeListId = await document.querySelector(".list-group-item.active")
    .dataset.id;
  const activeListName = await document.querySelector(
    ".list-group-item.active p"
  ).innerText;
  let addedTasks = document.querySelectorAll("#taskList li");
  let tab = [];
  // console.log("addedTasks", addedTasks);
  addedTasks.forEach(item =>
    tab.push({
      name: item.querySelector('p').textContent,
      done: item.classList.contains("done") ? true : false
    })
  );

  const request = new Request(
    "http://localhost:3000/api/my_lists/" + activeListId,
    {
      method: "PUT",
      body: JSON.stringify({
        title: activeListName,
        // userId: "5d7e412fb184593eb44fb240",
        tasks: tab
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  try {
    const data = await fetch(request);
    const savedData = await data.json();
    console.log(request);
    console.log(savedData);

    return savedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const editTaskOfList = async (taskToEdit) => {
  const taskName = document.querySelector(".add-task__form #itemm").value;
  const activeListId = await document.querySelector(".list-group-item.active")
    .dataset.id;
  const activeListName = await document.querySelector(
    ".list-group-item.active p"
  ).innerText;
  let addedTasks = document.querySelectorAll("#taskList li p");
  let tab = [];
  // let editedTask = 
  addedTasks.forEach(newitem =>{
    tab.push({
      name: newitem.textContent,
      done: newitem.parentElement.parentElement.classList.contains("done") ? true : false
    })}
  );

  const request = new Request(
    "http://localhost:3000/api/my_lists/" + activeListId,
    {
      method: "PUT",
      body: JSON.stringify({
        title: activeListName,
        // userId: "5d7e412fb184593eb44fb240",
        tasks: tab
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  try {
    const data = await fetch(request);
    const savedData = await data.json();
    console.log(savedData);

    return savedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const deleteList = async element => {
  const request = new Request(
    "http://localhost:3000/api/my_lists/" + element.dataset.id,
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

export const editList = async element => {
  console.log('element', element);
  const listTitle = element.textContent;
  const request = new Request(
    "http://localhost:3000/api/my_lists/" + element.dataset.id,
    {
      method: "PUT",
      body: JSON.stringify({
        title: listTitle,
        // userId: "5d7e412fb184593eb44fb240",
        tasks: []
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  try {
    const data = await fetch(request);
    const editedData = await data.json();
    return editedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const init = async () => {
  await getLists();
  // await getTasksOfList();
  await tasksFetch();
};
