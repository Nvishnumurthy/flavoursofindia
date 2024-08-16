var log = document.getElementById("login");
var sign = document.getElementById("signup");
var button = document.getElementById("btn");

function signup() {
  log.style.left = "-400px";
  sign.style.left = "50px";
  button.style.left = "110px";
}

function login() {
  log.style.left = "50px";
  sign.style.left = "450px";
  button.style.left = "0px";
}