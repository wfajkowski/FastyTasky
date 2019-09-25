import { init } from "./userLists";
const loginButton = document.querySelector(".login_button");
const registerButton = document.querySelector(".register_button");
const logoutButton = document.querySelector(".logout_button");

//Wyswietla formularz logowania po kliknięciu Sign In
loginButton.addEventListener("click", () => {
  const loginBox = document.querySelector(".login_box");
  loginBox.style.display = "none";
  loginBox.nextElementSibling.style.display = "flex";

  //akcja po ponownym kliknięciu przycisku Sign In
  const signIn = document.querySelector(".login_clicked_box button");

  signIn.addEventListener("click", async ev => {
    ev.preventDefault();
    const email = document.querySelectorAll(".login_clicked_box input")[0]
      .value; //pobranie emaila z input
    const password = document.querySelectorAll(".login_clicked_box input")[1]
      .value; // pobranie hasla z input
    const requestBody = {};
    let apiURL = "http://localhost:3000/api/auth";
    requestBody.email = email;
    requestBody.password = password;
    try {
      let response = await fetch(apiURL, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      response.text().then(function(text) {
        localStorage.setItem("x-auth-token", text);
        main_view();
      });
      response = await response.json();
      console.log(response.name);
      document.querySelector('header').style.display= 'none';
      document.querySelector('#navigation').style.display= 'grid';
      document.querySelector('.todo_list').style.display= 'grid';
      document.querySelector('#login_username').innerHTML = response.name;
    } catch (err) {
      console.log("Error:", err.message);
    }

    //testowe wyswietlenie pobranych inputow, po kliknięciu przycisku
    console.log(email, password);
  });
});

export async function main_view() {
  const token = localStorage.getItem("x-auth-token");
  let apiURL = "http://localhost:3000/api/users/me";
  try {
    let response = await fetch(apiURL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });
    response = await response.json();
    console.log(response.name);
    document.querySelector("header").style.display = "none";
    document.querySelector("#navigation").style.display = "grid";
    document.querySelector(".todo_list").style.display = "grid";
    document.querySelector("#login_username").innerHTML = response.name;
    //reading avatar silly workaround:
    if (localStorage.getItem(token.slice(0, 99)+"IMG")) document.querySelector('.circle').style.backgroundImage = `url(${localStorage.getItem(token.slice(0, 99)+"IMG")})`;

    logoutButton.style.display = "block";
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("x-auth-token");
      location.reload();
    });
    init();
  } catch (err) {
    console.log("Error:", err.message);
  }
}

// There was a problem with export this function after invoke init() inside of it, without this we can't GET our list immediately after logging in

// exports.main_view = main_view;

//Wyswietla formularz rejestracji po kliknięciu Register
registerButton.addEventListener("click", () => {
  const loginBox = document.querySelector(".login_box");
  loginBox.style.display = "none";
  loginBox.nextElementSibling.nextElementSibling.style.display = "flex";

  //akcja po ponownym kliknięciu przycisku register
  const register = document.querySelector(".register_clicked_box button");

  register.addEventListener("click", async ev => {
    ev.preventDefault();
    const login = document.querySelectorAll(".register_clicked_box input")[0]
      .value; //pobranie loginu z input
    const email = document.querySelectorAll(".register_clicked_box input")[1]
      .value; // pobranie emaila z input
    const password = document.querySelectorAll(".register_clicked_box input")[2]
      .value; // pobranie hasla z input

    const requestBody = {};
    let apiURL = "http://localhost:3000/api/users";
    requestBody.name = login;
    requestBody.email = email;
    requestBody.password = password;
    try {
      let response = await fetch(apiURL, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      let token = response.headers.get("x-auth-token");
      localStorage.setItem("x-auth-token", token);
      main_view();
    } catch (err) {
      console.log("Error:", err.message);
    }
  });
});