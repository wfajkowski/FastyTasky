import './css/style.css';
import './js/itemList.js';
import './js/hamburger.js';
import 'jquery';
import './js/profilePic.js';
import './js/loginBox.js';
import './js/tasks.js';

import {init} from './js/userLists';
import {main_view} from './js/loginBox.js';

const token = localStorage.getItem('x-auth-token');
if(token){
    main_view();
    //tymczasowo usuwany po nowym wczytaniu - później przy wylogowaniu
    localStorage.removeItem('x-auth-token');
}
init();