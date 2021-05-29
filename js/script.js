"use strict";

let num = 266219;

console.log(num);

let digits = num.toString().split('');

let sum = digits.reduce(function(a, b){
  return a * b;
});
console.log(sum);

let sumDegree = sum ** 3;
console.log(sumDegree);

console.log(sumDegree.toString().substring(0, 2));