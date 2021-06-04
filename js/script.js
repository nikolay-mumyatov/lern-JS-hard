"use strict";

const randomNumber = function () {
    alert('Я загадал число! Угадай какое! У тебя 10 попыток!');
    let botNumber = Math.floor(Math.random() * 100) + 1,
        attempts = 10;
    console.log(botNumber);
    
    const start = function () {
      let userNumber = +prompt("Введите число от 1 до 100.");
      console.log(userNumber);

      const attemptsCheck = function () {
        if (attempts >= 1) {
          start();
        } else {
          let restart = confirm("Попытки закончились! Хотели бы сыграть еще?");
          if (restart === true) {
            randomNumber();
          } else {
            alert("Спасибо за игру!");
            return;
          }
        }

      };

      const check = function (userNumber, botNumber) {
        if (userNumber === null && userNumber === undefined) {
          alert("Игра окончена!");
          return;
        } else if (isNaN(parseFloat(userNumber))) {
          alert(`Введите число!`);
          attemptsCheck();
        } else if (userNumber === botNumber) {
          alert("Поздравляю, Вы угадали!!!");
          let restart = confirm("Хотели бы сыграть еще?");
          if (restart === true) {
            randomNumber();
          } else {
            alert("Спасибо за игру!");
            return;
          }
        } else if (userNumber > botNumber) {
          attempts--;
          alert(`Загаданное число меньше, осталось попыток ${attempts}!`);
          attemptsCheck();
        } else {
          attempts--;
          alert(`Загаданное число больше, осталось попыток ${attempts}!`);
          attemptsCheck();
        }
      };
      check(userNumber, botNumber);
    };
    start();
};

randomNumber();

