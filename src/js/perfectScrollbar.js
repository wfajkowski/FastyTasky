import PerfectScrollbar from 'perfect-scrollbar';
const ps = new PerfectScrollbar('.todo-lists', {
    wheelSpeed: .4,
    maxScrollbarLength: 100,
    minScrollbarLength: 20
});
ps.update();