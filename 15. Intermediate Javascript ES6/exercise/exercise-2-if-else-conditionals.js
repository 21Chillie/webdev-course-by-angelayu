let yourName = "John";
let coupleName = "Jane";

let n = Math.random(); // 0 - 0.99.....
let loveCalculator = Math.floor(n * 100) + 1; // 1 sampai 100

if (loveCalculator > 70) {
  alert(yourName + " + " + coupleName + " = " + loveCalculator + "%, your love will be last long.");
}
if (loveCalculator > 30 && loveCalculator <= 70) {
  alert(yourName + " + " + coupleName + " = " + loveCalculator + "%, maybe you two will be match");
}
if (loveCalculator < 30) {
  alert(yourName + " + " + coupleName + " = " + loveCalculator + "%, you two not match");
}

// Note :

// COMPARATOR
//  "===" is equal to
// "!==" is not equal to
// ">" is greater than
// "<" is lesser than
// ">=" is greater or equal to
// "<=" is lesser or equal to

// COMBINER
// "&&" is and
//  "||" is or
