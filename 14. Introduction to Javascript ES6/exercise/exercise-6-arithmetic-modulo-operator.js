let a = 9;
let b = 2;

// "*" is for multiply.
// "-" is for substraction.
// "+" is for addition.
// "/" is for division
// "%" is modulo operator.

// Example :
let multiplyExample = a * b; // result is 18
let substractionExample = a - b; // result is 7
let addExample = a + b; // result is 11
let divisionExample = a / b; // result is 1
let moduloExample = a % 2; // result is 1

alert("The result is " + divisionExample);

// Challenge
// Make a prompt for dog age and calculate to human age
// Human Age = (Dog Age - 2) x 4 + 21

// Solution :
let dogAge = parseInt(prompt("How old your dog? "));
let dogToHumanAge = (dogAge - 2) * 4 + 21;

alert("So your dog age in human age is " + dogToHumanAge);
