"use strict";

let lang = prompt('Введите значение языка "ru" или "en".');

// if
if (lang === 'ru') {
  alert('Дни недели: Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang === 'en') {
  alert(
    'Weekday: Monday, Tuesday, Wednes­day, Thursday, Friday, Saturday, Sunday'
  );
} else {
  alert('Вы ввели недопустимое значение! You entered an invalid value!');
}

// switch-case
switch (lang) {
  case 'ru':
    alert(
      'Дни недели: Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'
    );
  break;
  case 'en':
    alert(
      'Weekday: Monday, Tuesday, Wednes­day, Thursday, Friday, Saturday, Sunday'
    );
  break;
  default:
   alert('Вы ввели недопустимое значение! You entered an invalid value!');
}

// многомерный массив
let weekday = {
  'ru': ['Понедельник', ' Вторник', ' Среда', ' Четверг', ' Пятница', ' Суббота', ' Воскресенье'],
  'en': ['Monday', ' Tuesday', ' Wednes­day', ' Thursday', ' Friday', ' Saturday', ' Sunday'],
};
alert(weekday[lang]);

// -------------------------------

let namePerson = prompt('Введите свое имя.');
namePerson.toLowerCase();
console.log(namePerson === "артем" ? "Директор" : namePerson === "максим" ? "Преподаватель" : "Студент");