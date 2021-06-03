"use strict";

// № 1
let arr = ["223", "324", "42", "987", "245", "40", "390"];

arr.forEach((item) => {
  if (item.startsWith("2") || item.startsWith("4")) {
    console.log(item);
  }
});

// № 2

console.log("----Простые числа");

let number = 100,
    simpleArr = [];
nextPrime: for (let i = 2; i <= number; i++) {

  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      continue nextPrime;
    }
  }
  simpleArr.push(i); // простое число
}

console.log(simpleArr);