// Selects all the elements with the class 'drum' (i.e., the drum buttons) and stores them in the variable 'drums'
const drums = document.querySelectorAll(".drum");

// Loops through all the drum buttons and adds a click event listener to each one
for (let i = 0; i < drums.length; i++) {
  // For each drum button, listen for the 'click' event
  drums[i].addEventListener("click", function () {
    // 'this' refers to the button that was clicked. 'innerHTML' gets the text inside that button (like 'w', 'a', etc.)
    const eachButton = this.innerHTML;

    // Call the makeSound function, passing the button text (key) as an argument
    makeSound(eachButton);

    // Call the drumAnimation function to add a visual animation effect to the button
    drumAnimation(eachButton);
  });
}

// This function plays a different sound based on the key pressed or the button clicked
function makeSound(key) {
  // Use a switch-case to decide which sound to play based on the key value
  switch (key) {
    case "w":
      // If the key is 'w', create a new audio object for tom1 and play the sound
      const tom1 = new Audio("./sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      const tom2 = new Audio("./sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      const tom3 = new Audio("./sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      const tom4 = new Audio("./sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      const snare = new Audio("./sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      const crash = new Audio("./sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      const kickBass = new Audio("./sounds/kick-bass.mp3");
      kickBass.play();
      break;

    // If any other key is pressed, do nothing
    default:
      break;
  }
}

// Adds a keydown event listener to the whole document to detect when a key is pressed on the keyboard
document.addEventListener("keydown", function (event) {
  // The event object has a 'key' property, which stores the actual key pressed (e.g., 'w', 'a', etc.)
  makeSound(event.key); // Call makeSound and pass the key pressed
  drumAnimation(event.key); // Call drumAnimation to add a visual effect when the key is pressed
  console.log(event.key); // Log the key pressed to the console for debugging purposes
});

// This function adds a brief animation to the button associated with the key or button click
function drumAnimation(currentKey) {
  // Select the button element that corresponds to the key pressed or clicked
  let activeButton = document.querySelector("." + currentKey);

  // Add the 'pressed' class to the button to apply the animation (e.g., change button style)
  activeButton.classList.add("pressed");

  // Set a timeout to remove the 'pressed' class after 300 milliseconds (so the animation effect lasts briefly)
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 300);
}
