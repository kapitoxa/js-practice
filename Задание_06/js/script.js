'use strict';

let menu = document.querySelector(".menu");
let menuItems = document.querySelectorAll(".menu-item");

menu.insertBefore(menuItems[2], menuItems[1]);

document.body.style.backgroundImage = "url('img/apple_true.jpg')";

let newMenuItem = document.createElement("li");
newMenuItem.classList.add("menu-item");
newMenuItem.textContent = "Пятый пункт";
menu.appendChild(newMenuItem);

let title = document.getElementById("title");
title.textContent = "Мы продаем только подлинную технику Apple";

let columns = document.querySelectorAll(".column");
let adv = document.querySelector(".column .adv");

columns[1].removeChild(adv);

let answerElement = document.getElementById("prompt");
let answer = prompt("Как вы относитесь к технике apple?", "");
answerElement.textContent = answer;