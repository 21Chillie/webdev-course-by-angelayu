// So, money parameter is just a placeholder for some future value.
function getMilk(money) {
  console.log("Hey, can you buy bottle of milk for me?");
  console.log("I give you " + money + " to buy milk for me");
  console.log("Sure, I'll buy you a milk (Proceed to going to store)");
  console.log("(In store). Hi, I want to buy a milk. (Give money : " + money + " dollar)");

  let buyMilk = Math.floor(money / 1.5);
  let change = money - 1.5 * buyMilk;

  //   to.Fixed(2) is for rounds a number to two decimal places and returns the result as a string.
  console.log("Here you get " + buyMilk + " bottles of milk and here is your exchange " + change.toFixed(2) + " dollar");
}

// Calling getMilk function and passing value of 10 inside that function parameter.
getMilk(10);

// ---------------------------

// Challenge
// In this challenge, you are going to create a function that tells us how many days, weeks and months we have left if we live until 90 years old.
// So the result will be :
// You have x days, y weeks, and z months left.

// Solution:
function lifeInWeeks(age) {
  let myAge = 90 - age;
  let daysAge = 365 * myAge;
  let weeksAge = 52 * myAge;
  let monthsAge = 12 * myAge;

  alert("You have " + daysAge + " days, " + weeksAge + " weeks, and " + monthsAge + " months left.");
}

let age = prompt("How old are you? ");
lifeInWeeks(age);
