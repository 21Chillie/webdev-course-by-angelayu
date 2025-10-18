import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

// PostgreSQL Setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Database Error: ", err);
  process.exit(-1);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secret", (req, res) => {
  res.render("secrets.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username is available
    const checkUsername = await pool.query(
      `
      SELECT * FROM user_account
      WHERE username = $1
      `,
      [username]
    );

    // if available, return status 500 with error
    if (checkUsername.rowCount > 0) {
      res.status(500).json({ error: "Username is already exists. Try logging in." });
    } else {
      // Else, insert username and password in database
      const insertAccount = await pool.query(
        `
      INSERT INTO user_account (username, password)
      VALUES ($1, $2)
      RETURNING *
      `,
        [username, password]
      );

      // Check if insert account and password is success, then redirect to login
      if (insertAccount) {
        console.log(insertAccount.rows[0]);
        console.log("Register Success");
        res.redirect("/login");
      } else {
        res.redirect("/register");
      }
    }
  } catch (err) {
    res.status(500).json({ error: `Oops something went wrong!`, err: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: "All required fields must be filled.",
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT * FROM user_account
      WHERE username = $1
      `,
      [username]
    );

    // Check if username is found
    if (result.rowCount > 0) {
      // if username found, check input password and password in database are match.
      if (password === result.rows[0].password) {
        // Password matches
        res.redirect("/secret");
      } else {
        // Else, password not matches
        res.status(500).json({ error: "Username or password are incorrect" });
      }
    } else {
      // Else, username not found
      res.status(500).json({ error: "Username not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
