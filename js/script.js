'use strict';


// Вывод
setInterval(function () {
  
  let data = new Date(),
    year = data.getFullYear(),
    month = data.getMonth(),
    day = data.getDate(),
    hour = data.getHours(),
    minute = data.getMinutes(),
    second = data.getSeconds();

  // Функция добавляет в начале ноль если число из одной цыфры.
  let short = function (nowDate) {
    nowDate = String(nowDate);
    if (nowDate.length < 2) {
      nowDate = nowDate.padStart(2, "0");
    }
    return nowDate;
  };
  short();

  // Преобразуем месяца
  let nowMonth;

  switch (month) {
    case 0:
      nowMonth = "января";
      break;
    case 1:
      nowMonth = "февраля";
      break;
    case 2:
      nowMonth = "марта";
      break;
    case 3:
      nowMonth = "апреля";
      break;
    case 4:
      nowMonth = "мае";
      break;
    case 5:
      nowMonth = "июня";
      break;
    case 6:
      nowMonth = "июля";
      break;
    case 7:
      nowMonth = "августа";
      break;
    case 8:
      nowMonth = "сентября";
      break;
    case 9:
      nowMonth = "октября";
      break;
    case 10:
      nowMonth = "ноября";
      break;
    case 11:
      nowMonth = "декабря";
      break;
  }

  // Получаем сегодняшний день
  let todayDay = data.getDay();

  // Преобразуем дни недели
  let nowWeekDay;
  switch (todayDay) {
    case 0:
      nowWeekDay = "Воскресенье";
      break;
    case 1:
      nowWeekDay = "Понедельник";
      break;
    case 2:
      nowWeekDay = "Вторник";
      break;
    case 3:
      nowWeekDay = "Среда";
      break;
    case 4:
      nowWeekDay = "Четверг";
      break;
    case 5:
      nowWeekDay = "Пятница";
      break;
    case 6:
      nowWeekDay = "Суббота";
      break;
  }

  // Исправляем окончание
  let nowHour = "";
  const addHour = function () {
    if (hour === 1 || hour === 21) {
      nowHour = "час";
    } else if ((hour >= 2 && hour <= 4) || (hour >= 22 && hour <= 24)) {
      nowHour = "часа";
    } else {
      nowHour = "часов";
    }
  };
  addHour();

  const output = function () {
    let fullDate = document.querySelector(".full-date");
    let shortDate = document.querySelector(".short-date");

    fullDate.textContent = 
      `Сегодня ${nowWeekDay}  ${day}  ${nowMonth} ${year} года, ${hour} ${nowHour} ${minute} минут ${second} секунды`;

    shortDate.textContent = 
      `${short(day)}.${short(month)}.${year} - ${short(hour)}:${short(minute)}:${short(second)}`;
  };
  output(); 

}, 1000);

