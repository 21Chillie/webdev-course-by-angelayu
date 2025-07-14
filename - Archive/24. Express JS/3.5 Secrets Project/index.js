//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const correctPassword = "ILoveProgramming";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res, next) => {
  const password = req.body["password"];

  if (password === correctPassword) {
    console.log("Password correct!");
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    console.log("Password incorrect, make sure you type the correct password");
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}.`);
});
