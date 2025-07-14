let output = []; // Initialize an empty array to store the results.

function fizzBuzz(n) {
  // This function takes an integer 'n' as input and performs the FizzBuzz algorithm.
  for (let i = 0; i <= n; i++) {
    // Iterate from 1 to 'n'.
    let addNumber = output.length + 1; // Calculate the current number to be added to the output array.

    if (addNumber % 3 === 0 && addNumber % 5 === 0) {
      // If the current number is divisible by both 3 and 5, add "FizzBuzz" to the output.
      output.push("FizzBuzz");
    } else if (addNumber % 5 === 0) {
      // If the current number is divisible by 5, add "Buzz" to the output.
      output.push("Buzz");
    } else if (addNumber % 3 === 0) {
      // If the current number is divisible by 3, add "Fizz" to the output.
      output.push("Fizz");
    } else {
      // If the current number is not divisible by 3 or 5, add the number itself to the output.
      output.push(addNumber);
    }

    console.log(output); // Print the current state of the output array after each iteration.
  }
}

fizzBuzz(30); // Call the fizzBuzz function with 'n' equal to 30, which will generate the FizzBuzz sequence up to 30.
