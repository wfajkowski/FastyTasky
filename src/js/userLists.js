let itemList = document.getElementById("items");

let tab = [];

const getLists = async () => {
  const request = new Request("http://localhost:3000/api/my_lists", {
    method: "GET"
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
      var liIcon = document.createElement('i');
      liIcon.className = 'fa fa-bolt';
      li.appendChild(liIcon);
      let liText = document.createElement("p");
      liText.className = "liText";
      liText.appendChild(document.createTextNode(myToDos[i].title));
      li.appendChild(liText);
      let deleteBtn = document.createElement("button");
      let deleteIcon = document.createElement("i");
      let editBtn = document.createElement("button");
      let editIcon = document.createElement("i");
      deleteBtn.className = "btn delete";
      deleteIcon.className = "fa fa-trash";
      editBtn.className = "btn edit";
      editIcon.className = "fa fa-gear";
      deleteBtn.appendChild(deleteIcon);
      li.appendChild(deleteBtn);
      editBtn.appendChild(editIcon);
      li.appendChild(editBtn);
      itemList.appendChild(li);
      tab.push(li.textContent);
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const createList = async () => {
  const listTitle = document.querySelector('#item').value;
  const request = new Request("http://localhost:3000/api/my_lists", {
    method: "POST",
    body: JSON.stringify({
      title: listTitle,
      userId: "5d7e412fb184593eb44fb240",
      tasks: []
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
}

export const deleteList = async (element) => {
  const request = new Request("http://localhost:3000/api/my_lists/" + element.dataset.id, {
    method: "DELETE"
  });

  try {
    const data = await fetch(request);
    const deletedList = await data.json();
    return deletedList;
  } catch (err) {
    console.log("Error:", err.message);
  }
}



export const editList = async (element) => {
  const listTitle = element.textContent;
  const request = new Request("http://localhost:3000/api/my_lists/" + element.dataset.id, {
    method: "PUT",
    body: JSON.stringify({
      title: listTitle,
      userId: "5d7e412fb184593eb44fb240",
      tasks: []
    }),
    headers: { 
      "Content-Type": "application/json" 
    }
  });
  try {
    const data = await fetch(request);
    const editedData = await data.json();
    return editedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
}
export const init = () => {
  getLists();
};
