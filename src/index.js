import "./css/style.css";
import "./js/itemList.js";
import "./js/hamburger.js";
import "jquery";
import "./js/profilePic.js";
import "./js/loginBox.js";
import "./js/perfectScrollbar.js";
import "./js/tasks.js";

import { init } from "./js/userLists";
import { main_view } from "./js/loginBox.js";

const token = localStorage.getItem("x-auth-token");
if (token) {
  main_view();
}
init();
