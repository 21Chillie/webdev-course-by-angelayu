// SELECTING HTML ELEMENTS, CLASS, AND ID USING JAVASCRIPT :

// Select the third .list class and change the text to 'Real'
document.getElementsByClassName("list")[2].innerHTML = "Real";

// Select and changing text color of anchor tag inside .list class to red using querySelector
document.querySelector(".list a").style.color = "Red";

// Select .btn class and change background color to yello
document.querySelector(".btn").style.backgroundColor = "Yellow";

// -------------------------------------
// Define the 'loops' function
// This function finds the <h1> element on the page and toggles the 'big-text' class on it
function loops() {
  // Use 'querySelector' to find the <h1> element
  // The 'classList.toggle()' method will add the 'big-text' class if it's not there,
  // and remove it if it is (basically, it switches the class on and off).
  document.querySelector("h1").classList.toggle("big-text");
}

// Set up an event listener on the button with the class '.btn'
// 'addEventListener' listens for the "click" event on the button
// When the button is clicked, it will trigger the 'loops' function
document.querySelector(".btn").addEventListener("click", loops);

// -------------------------------------------------------
// Text Content Property :
document.querySelector("#example").textContent = "Hello There";

// Manipulating HTML Attributes :

// Selecting anchor tag and get href attribute value.
// The getAttribute() method retrieves the value of the specified attribute (in this case, 'href')
const getAttribute = document.querySelector("a").getAttribute("href");

console.log(getAttribute); // output : https://www.google.com

// How do I change value of 'href' attribute :
document.querySelector("a").setAttribute("href", "https://reskialamsyah.vercel.app");
