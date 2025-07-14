// Select H1 and changing css style to color: red;
$("h1").css("color", "red");

// Selecting first button element [0] and add class .button-red
$("button").eq(0).addClass("button-red");

// Select H1 and change the text from "Hello There!" to "Good Bye"
$("h1").text("Good Bye");

// Select anchor tag (a) and change "href" attribute value to "https://reskialamsyah.vercel.app"
$("a").attr("href", "https://reskialamsyah.vercel.app");

// Adding Event Listener
// Select all <button> elements on the page.
$("button")
  // Use .eq(0) to get the first button in the collection (index 0 is the first button).
  .eq(0)
  // Attach an event listener for the "click" event on this first button.
  .on("click", function () {
    // When the button is clicked, change the color of all <h1> elements on the page to green.
    $("h1").css("color", "green");
  });

// Attach an event listener to the entire document that listens for any key press (keydown event).
$(document).keydown(function (e) {
  // When a key is pressed, the event object 'e' contains information about the event.
  // Specifically, 'e.key' gives the value of the key that was pressed (e.g., "a", "Enter", etc.).

  // Update the text of all <h1> elements to display "You Press " followed by the actual key pressed.
  $("h1").text("You Press " + e.key);
});

