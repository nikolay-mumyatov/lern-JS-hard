"use strict";

// № 1
let arr = [223, 324, 42, 987, 245, 40, 390];

var arrLength = arr.length;
for (var i = 0; i < arrLength; i++) {
  let num = arr[i] + "";

  if (num[0] === "2" || num[0] === "4") {
    console.log(arr[i]);
  }
}

// № 2

console.log("----Простые числа");

let number = 100;
nextPrime: for (let i = 2; i <= number; i++) {

  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      continue nextPrime;
    }
  }
  console.log(i); // простое число
}
