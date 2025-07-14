// Challenge
// Create function that calculate BMI (Body Mass Index)
// BMI = weight(kg)/height²(m²)
// Your weight is 65kg and height is 1.8m. The result should be 20

// Solution
function bmiCalculator(weight, height) {
  let calculateBmi = Math.round(weight / Math.pow(height, 2));

  return calculateBmi;
}

console.log(bmiCalculator(65, 1.8));
