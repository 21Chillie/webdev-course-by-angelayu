document.querySelector("h1").textContent = "High Order Function and Passing Function as Arguments";
document.querySelector("h2").textContent = "Exercise Simple Calculator Function";
// High Order Function and Passing Function as Arguments
// Exercise Simple Calculator Function

// Normal Function:
// function add(num1, num2) {
//   return num1 + num2;
// }

// function subtract(num1, num2) {
//   return num1 - num2;
// }

// function multiply(num1, num2) {
//   return num1 * num2;
// }

// function divide(num1, num2) {
//   return num1 / num2;
// }

// function calculator(num1, num2, operator) {
//   return operator(num1, num2);
// }

// ------------------------------------------

// Arrow Function :
const add = (num1, num2) => {
  return num1 + num2;
};

const substract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const modulo = (num1, num2) => {
  return num1 % num2;
};

const calculator = (num1, num2, operator) => {
  return operator(num1, num2);
};

calculator(3, 2, multiply);
