const moment = require('moment');

const date = moment().format("dddd MMM Do YYYY");

document.querySelector('.todo__list__header__date').textContent = date;


const form = document.querySelector('.add-form');

const tasksList = document.querySelector('#items');

//const item = document.querySelector('.item-task')

const openBtn = document.querySelector('#open-modal')




const modal = document.querySelector('.modal');



openBtn.addEventListener('click', openModal);




function openModal() {
    modal.style.display = 'block';
}



form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);






//dodawanie elementu
function addTask(event) {
    event.preventDefault();
   // event.stopPropagation();

    let newTask = document.getElementById('item').value;
  

  

    let li = document.createElement('li');

    


    li.className = 'item-task';

    

    li.appendChild(document.createTextNode(newTask));





//delete

    let removeTaskBtn = document.createElement('button');
    removeTaskBtn.className = 'item-task__remove';
    li.appendChild(removeTaskBtn);

//edit
    let editTaskBtn = document.createElement('button');
    editTaskBtn.Classname = 'item-task__edit';
    li.appendChild(editTaskBtn);

    tasksList.appendChild(li);

    editTaskBtn.addEventListener('click', openDialog);
   
   function openDialog() {
       const dialog = document.querySelector('.dialog');
       dialog.style.display = 'block';


//close dialog

       const  dialogCloseBtn = document.querySelector('.dialog__close')

       dialogCloseBtn .addEventListener('click', closeModal);
       
       function closeModal () {
           dialog.style.display = 'none';
       }

       //close dialog outside
   
window.addEventListener('click', outsideClick);


function outsideClick (event) {
    if(event.target == dialog) {
        dialog.style.display = 'none';
    }
}



   }




   

};


function deleteTask(event) {
    if(event.target.classList.contains('item-task__remove')){
        if(confirm('Are You Sure')) {
            let li = event.target.parentElement;
            tasksList.removeChild(li);
        }
    }







}


///MODAL DIALOG FOR EDIT







// window.addEventListener('click', outsideClick);


// function outsideClick (event) {
//     if(event.target == dialog) {
//         dialog.style.display = 'none';
//     }
// }






//const  dialogCloseBtn = document.querySelector('.dialog__close')

//      function editTask(event) {
  //let editTask = document.getElementsByClassName('item-task-edit');

  //li.appendChild(editTask);