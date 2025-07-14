// Define a function named bmiCalculator that takes two parameters: weight and height
function bmiCalculator(weight, height) {
  // Calculate BMI using the formula: weight (in kg) / height^2 (in meters)
  // Convert the result to a floating-point number, round it to 2 decimal places, and store it in calculateBmi
  let calculateBmi = parseFloat(weight / Math.pow(height, 2)).toFixed(2);

  // Check if the calculated BMI is greater than 24.9
  if (calculateBmi > 24.9) {
    // If true, return a string indicating that the user is overweight along with their BMI
    return "Your BMI is " + calculateBmi + ", so you are overweight.";
  }

  // Check if the calculated BMI is between 18.5 and 24.9 (inclusive)
  if (calculateBmi > 18.5 && calculateBmi <= 24.9) {
    // If true, return a string indicating that the user has a normal weight along with their BMI
    return "Your BMI is " + calculateBmi + ", so you have a normal weight.";
  }

  // Check if the calculated BMI is less than 18.5
  if (calculateBmi < 18.5) {
    // If true, return a string indicating that the user is underweight along with their BMI
    return "Your BMI is " + calculateBmi + ", so you are underweight.";
  }
}

// Call the bmiCalculator function with a weight of 60 kg and height of 1.75 meters. Then passing the value to function parameter (weight, height).
// Display the result in an alert box
alert(bmiCalculator(60, 1.75));
