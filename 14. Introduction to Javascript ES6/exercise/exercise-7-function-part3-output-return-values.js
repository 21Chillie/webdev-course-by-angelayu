// 1. The 'getMilk' function is the main function.
// 2. It has two parameters: 'money' and 'costPerBottle'.
// 3. These parameters do not have values until the 'getMilk' function is called with specific values for these parameters.
// 5. After the 'getMilk' function is called, the values of these parameters (10 and 1.5) are passed into the function, and it performs operations.
// 6. Two operations will be executed: calling the 'calculateCostPerBottle' function and the 'calculateChange' function.
function getMilk(money, costPerBottle) {
  console.log("Hey, can you buy a bottle of milk for me?");
  console.log("I give you " + money + " to buy milk for me");
  console.log("Sure, I'll buy you some milk (Proceed to go to the store)");
  console.log("(In store). Hi, I want to buy some milk. (Give money: " + money + " dollars)");

  // 7. The 'calculateCostPerBottle' function is called and has two parameters: money (10) and costPerBottle (1.5). The values of these parameters are taken from the 'getMilk' function parameters.
  // 12. The value returned from the 'calculateCostPerBottle' function is 6.
  console.log("Hello, here are your " + calculateCostPerBottle(money, costPerBottle) + " bottles of milk.");

  // 11. The 'calculateChange' function is called and has two parameters: money (10) and costPerBottle (1.5). The values of these parameters are taken from the 'getMilk' function parameters.
  // 16. The value returned from the 'calculateChange' function is 1.
  console.log("and here is your change $" + calculateChange(money, costPerBottle));
}

// 8. The 'calculateCostPerBottle' function performs an operation, and the values of its two parameters are taken from 'money' and 'costPerBottle' when this function is called.
function calculateCostPerBottle(startingMoney, costPerBottle) {
  // 9. The variable 'buyMilk' performs the operation 10 / 1.5.
  let buyMilk = Math.floor(startingMoney / costPerBottle);
  // 10. Return the value of the 'buyMilk' variable to the calling function.
  return buyMilk; // Value: 6
}

// 13. The 'calculateChange' function performs an operation, and the values of its two parameters are taken from 'money' and 'costPerBottle' when this function is called.
function calculateChange(startingAmount, costPerBottle) {
  // 14. The variable 'change' performs the operation 10 % 1.5.
  let change = startingAmount % costPerBottle;
  // 15. Return the value of the 'change' variable to the calling function.
  return change; // Value: 1
}

// 4. The 'getMilk' function is called with two parameter values: 10 as the 'money' parameter and 1.5 as the 'costPerBottle' parameter.
console.log(getMilk(10, 1.5));
