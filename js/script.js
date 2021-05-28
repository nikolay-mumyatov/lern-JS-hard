"use strict";

let num = 266219;

console.log(num);

let digits = num.toString().split('');

let sum = digits[0] * digits[1] * digits[2] * digits[3] * digits[4] * digits[5];
console.log(sum);

let sumDegree = sum ** 3;
console.log(sumDegree);

console.log(sumDegree.toString().substring(0, 2));