itemList = document.getElementById("items");

tab = [];

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

export const init = () => {
  getLists();
};
