import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
const ps = new PerfectScrollbar('.todo-lists', {
    wheelSpeed: .4,
    maxScrollbarLength: 0,
});

const pss = new PerfectScrollbar('.todo_tasks', {
    wheelSpeed: .4,
    
});
