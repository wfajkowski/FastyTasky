import Sortable from "sortablejs";

const el = document.querySelector(".list-group");
Sortable.create(el, {
  store: {
    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function(sortable) {
      var order = sortable.toArray();
      for (let i = 0; i < order.length; i++) {
        getAndUpdateTasksOfList(order[i], i);
      }
    }
  }
});

const getAndUpdateTasksOfList = async (listId, index) => {
  const request = new Request("http://localhost:3000/api/my_lists/" + listId, {
    method: "GET"
  });
  try {
    const data = await fetch(request);
    const list = await data.json();
    const tasks = list.tasks;

    updateSortedList(listId, index, tasks);
  } catch (err) {
    console.log("Error:", err.message);
  }
};

const updateSortedList = async (listId, index, tasks) => {
  tasks.forEach(element => {
    delete element["_id"];
  });

  const listTitle = document.querySelector(`[data-id="${listId}"] .liText`)
    .textContent;
  const token = localStorage.getItem("x-auth-token");
  const request = new Request(
    "http://localhost:3000/api/sorted_list/" + listId,
    {
      method: "PUT",
      body: JSON.stringify({
        title: listTitle,
        index: index,
        tasks: tasks
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    }
  );
  try {
    const data = await fetch(request);
    const savedData = await data.json();
    return savedData;
  } catch (err) {
    console.log("Error:", err.message);
  }
};
