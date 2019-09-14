const moment = require('moment');

const date = moment().format("dddd MMM Do YYYY");

document.querySelector('.todo__list__header__date').textContent = date;








const openBtn = document.querySelector('#open-dialog')


const dialog = document.querySelector('.dialog');



openBtn.addEventListener('click', openDialog);

function openDialog() {
    dialog.style.display = 'block';
}






const form = document.querySelector('.add-form');
const tasksList = document.querySelector('#items');
const itemsTask = JSON.parse(localStorage.getItem('itemsTask')) || [];

//dodawanie elementu
function addTask(event) {
    event.preventDefault();

    // let newTask = document.getElementById('item').value;
    // let li = document.createElement('li');
    // li.className = 'item-task';
    // li.appendChild(document.createTextNode(newTask));

    const text = (this.querySelector('[name=todo-form__title]')).value;
    const item = {
        text,
        done: false,
        // title: String,
        // date: String,
        // description: String,
        // member: String,
    };
    itemsTask.push(item);
    console.log(itemsTask);
    console.log(item);
    populateList(itemsTask, tasksList)
    localStorage.setItem('itemsTask', JSON.stringify(itemsTask))
    this.reset();

}

   
function populateList(items = [], tasksList) {
    tasksList.innerHTML = items.map((item, i) => {
        return `
        <li class=one>

            <input type="checkbox" data-index=${i} id=items${i}" ${item.done ? 'checked' : ''} />
            <label for ="item${i}">${item.text}</label>
            <button class="item-task__edit">x</button>
            <button class="item-task__remove">x</button>
          
        </li>
        `;
    }).join('');
}
form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);



function toggleDone(event) {
    if (!event.target.matches('input')) return;
    const el = event.target;
    const index = el.dataset.index;
    itemsTask[index].done = !itemsTask[index].done;
    localStorage.setItem('itemsTask', JSON.stringify(itemsTask));
    populateList(itemsTask, tasksList);
}


tasksList.addEventListener('click', toggleDone);
populateList(itemsTask, tasksList);





   // delete

    let removeTaskBtn = document.createElement('button');
    removeTaskBtn.className = 'item-task__remove';
    li.appendChild(removeTaskBtn);

    //edit
    let editTaskBtn = document.createElement('button');
    editTaskBtn.Classname = 'item-task__edit';
    li.appendChild(editTaskBtn);

    tasksList.appendChild(li);

    editTaskBtn.addEventListener('click', openModal);

    function openModal() {
        event.preventDefault();
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';


        //close dialog

        const modalCloseBtn = document.querySelector('.modal__close')

        modalCloseBtn.addEventListener('click', closeModal);

        function closeModal() {
            modal.style.display = 'none';
        }

        //close dialog outside

        window.addEventListener('click', outsideClick);


        function outsideClick(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }



    };




function deleteTask(event) {
    
    if (event.target.classList.contains('item-task__remove')) {
        if (confirm('Are You Sure')) {
            let li = event.target.parentElement;
            tasksList.removeChild(li);
        }
     

    };

};

// function filterData() {
//     var data = JSON.parse(localStorage.task);
//     //console.log(data);
//     var newData = data.filter(function(val){
//         return (val.YourPropertyName !== key.value && val.YourPropertyName !== val.value );
//     });
//     localStorage.task = JSON.stringify(newData);
// }
window.Deletetask = function(text) {
    itemsTask = itemsTask.filter(val => val.text !== text);
    document.getElementsByClassName("one").remove();

}