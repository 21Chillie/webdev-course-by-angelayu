// var = is global variable meaning you can redeclare and change the value of variable that already declare
// let = cant redeclare variable, but can change the value of variable that already declare.
// const = cant redeclare and change value.

let a = "3";
let b = "8";

/***********Do not change the code above 👆*******/
//Write your code on lines 7 - 9:

let c = a;
a = b;
b = c;

/***********Do not change the code below 👇*******/

console.log("a is " + a);
console.log("b is " + b);

// Output
// When the code is run, it should output:
// a is 8
// b is 3

// ------------------------------------------

// Rule :
// Do NOT change any of the existing code.
// You are NOT allowed to type any numbers.
// You should NOT redeclare the variables a and b.
// Hint: Use this code playground to run your code and see if it matches your expectations.
// Hint: The solution is just 3 lines of code
