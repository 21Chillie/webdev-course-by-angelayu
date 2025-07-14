import express from "express"; // Import the Express library to set up a web server
import bodyParser from "body-parser"; // Import the body-parser middleware to parse form data

const app = express(); // Create an Express application instance
const port = 3000; // Set the port the server will listen on

// Use body-parser middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the root URL ("/") - serves the initial form
app.get("/", (req, res) => {
  // Render the `index.ejs` template without passing any data
  res.render("index.ejs");
});

// Route to handle the form submission (POST request to "/submit")
app.post("/submit", (req, res, next) => {
  // Extract the `fName` and `lName` fields from the request body
  const firstName = req.body["fName"];
  const lastName = req.body["lName"];

  // Combine the first and last name into a full name
  const fullName = firstName + lastName;

  // Calculate the number of characters in the full name    
  const numberOfLetters = fullName.length;

  // Render the `index.ejs` template and pass the `nameLength` variable
  res.render("index.ejs", { nameLength: numberOfLetters });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server listen on port ${port}`); // Log a message to indicate the server is running
});
