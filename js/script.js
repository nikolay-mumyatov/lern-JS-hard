"use strict";

// Лучше input, потому, что prompt записывает только строку или null, но принцип и так понятен.
let userValue = prompt("Введите строковое значение.");
  
let crop;
const check = function (data) {
  if (typeof data === "string" && data.length > 30) {
    crop = data.trim().substr(0, 30) + "...";
  } else if (typeof data === "string") {
    crop = data.trim();
  } else {
    alert("Вы ввели не строковое значение!");
  }
};

check(userValue);
console.log(crop);
