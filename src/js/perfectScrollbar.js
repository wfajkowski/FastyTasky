import PerfectScrollbar from 'perfect-scrollbar';
const ps = new PerfectScrollbar('.todo-lists', {
    wheelSpeed: .5,
    maxScrollbarLength: 100,
    minScrollbarLength: 20,
    swipeEasing: false
});
ps.update();