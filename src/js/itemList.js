form = document.getElementById('adding_panel');
itemList = document.getElementById('items');

tab = [];

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

function addItem(e){
    e.preventDefault();
    var newItem = document.getElementById('item').value;
    var li = document.createElement('li');
    li.className = 'list-group-item';
    var liText = document.createElement('p');
    liText.className = 'liText';
    liText.appendChild(document.createTextNode(newItem));
    li.appendChild(liText);
    var deleteBtn = document.createElement('button');
    var deleteIcon = document.createElement('i');
    var editBtn = document.createElement('button');
    var editIcon = document.createElement('i');
    deleteBtn.className = 'btn delete';
    deleteIcon.className = 'fa fa-trash';
    editBtn.className = 'btn edit';
    editIcon.className = 'fa fa-gear';
    deleteBtn.appendChild(deleteIcon);
    li.appendChild(deleteBtn);
    editBtn.appendChild(editIcon);
    li.appendChild(editBtn);
    itemList.appendChild(li);
    tab.push(li.textContent);
    //  console.log(tab)
    //  console.log(tab.indexOf(newItem))
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
        //  console.log(tab)
      }
    }
  }
  function editItem(e) {
    if(e.target.classList.contains('edit')){
      if(confirm('Do you want to edit this item?')){
      var li = e.target.parentElement;
      let index = tab.indexOf(li.textContent);
      tab.splice(index, 1);
      // console.log(tab);
      li.contentEditable = 'true';
      window.addEventListener('keypress', (e)=> {
        if (e.keyCode == 13) {
          tab.push(li.textContent);
          // console.log(tab);
          li.contentEditable = 'false';
            
        }

      }
      // tab.splice(index)
      )}
    }
  }