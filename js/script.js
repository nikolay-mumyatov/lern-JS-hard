"use strict";

const week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

let day = document.getElementById("week"); // div куда будем выводить

// Получаем сегодняшний день
let todayDay;
const weekDay = function() {
  let data = new Date();
  todayDay = data.getDay();
};
weekDay();

const days = function() {
  week.forEach(function (item, i) {
    let newdiv = document.createElement("div"); // Для каждого элемента week создаём div

    if (i === todayDay) {
      newdiv.classList.add("today"); // Для сегодняшнего дня добавляем клас с жироностью
      newdiv.textContent = week[i]; // Вставляем в div
    } else if (item === "Воскресенье" || item === "Суббота") {
      // Выходные делаем курсивом
      newdiv.classList.add("italic");
      newdiv.textContent = week[i]; // Вставляем в div
    } else {
      newdiv.textContent = week[i]; // Если не текущий день и не выходные, то просто вставляем текст без стилей
    }

    day.appendChild(newdiv); // Добавляем новый div в переменную day
  });
};
days(); 
