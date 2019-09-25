let messageList = document.getElementById("message_page_items");

let tab = [];

const getMessages = async () => {
  const request = new Request("http://localhost:3000/api/message_boxes/5d8544293db492487928b81f", {
    method: "GET"
  });

  try {
    const data = await fetch(request);
    console.log(data);
    const lists = await data.json();
    const myToDos = [...lists.conversations];
    console.log(myToDos);
    for (let i = 0; i < myToDos.length; i++) {
      let li = document.createElement("li");
      li.className = "conversation";
      let liText = document.createElement("p");
      liText.className = "liText";
      liText.appendChild(document.createTextNode(myToDos[i].targetName));
      li.appendChild(liText);
      messageList.appendChild(li);
      tab.push(li.textContent);
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
};

export const initMessage = () => {
  getMessages();
};