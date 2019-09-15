form = document.getElementById('adding_panel');
itemList = document.getElementById('items');

tab = [];

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);

function addItem(e){
    e.preventDefault();
    var newItem = document.getElementById('item').value;
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));
    var deleteBtn = document.createElement('button');
    var deleteIcon = document.createElement('i');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteIcon.className = 'fa fa-trash';
    deleteBtn.appendChild(deleteIcon);
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
    tab.push(li.textContent);
    // console.log(tab)
    // console.log(tab.indexOf(newItem))
    let x = document.getElementById('item');
    x.value = '';
  }

  function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
        let index = tab.indexOf(li.textContent);
        tab.splice(index, 1);
        // console.log(tab)
      }
    }
  }