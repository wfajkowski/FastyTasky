import './css/style.css';
import './js/itemList.js';
import './js/hamburger.js';
import 'jquery';
import './js/profilePic.js';
import './js/perfectScrollbar.js'
import './js/tasks.js';

import {init} from './js/userLists';
import {initShare} from './js/sharedUserLists';
import {initMessage} from './js/messages';

init();
initShare();
initMessage();
