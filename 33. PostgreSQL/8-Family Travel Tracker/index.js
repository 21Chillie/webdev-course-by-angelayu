import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Setup PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Test DB connection
pool
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Connection error:", err);
  });

// Configure Express
app.set("view engine", "ejs"); // use EJS templates
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static("public")); // serve static files

// Keep track of the "current" logged-in user
let currentUserId = 1;

/**
 * Get all visited countries for the current user.
 * Returns an array of country codes.
 */
async function checkVisited() {
  let countries = [];

  const result = await pool.query(
    `
    SELECT
      vc.id,
      vc.country_code,
      vc.user_id,
      u."name",
      u.color
    FROM visited_countries vc
    JOIN users u ON u.id = vc.user_id
    WHERE vc.user_id = $1
    `,
    [currentUserId]
  );

  result.rows.forEach((country) => countries.push(country.country_code));
  return countries;
}

/**
 * Get all registered users from the database.
 */
async function getCurrentUser() {
  let users = [];

  const result = await pool.query(`
    SELECT *
    FROM users u
  `);

  users = result.rows;
  return users;
}

/**
 * GET /
 * Render the homepage with:
 *  - visited countries for current user
 *  - all users
 *  - current user's color
 */
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    const currentUser = await getCurrentUser();

    console.log(currentUser[currentUserId - 1]); // Debug: current user info
    console.log(countries); // Debug: visited countries

    res.render("index", {
      countries: countries,
      total: countries.length,
      users: currentUser,
      color: currentUser[currentUserId - 1].color,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Oops something went wrong on our server" });
  }
});

/**
 * POST /add
 * Add a new visited country for the current user.
 * 1. Find country_code by user input (case-insensitive)
 * 2. Validate: country exists
 * 3. Validate: not already visited by this user
 * 4. Insert into visited_countries table
 */
app.post("/add", async (req, res) => {
  try {
    const currentUser = await getCurrentUser();

    const { country } = req.body;

    // Find country_code by country name
    const query = `
      SELECT *
      FROM countries
      WHERE LOWER(country_name) = $1
    `;
    const result = await pool.query(query, [country.toLowerCase()]);

    // Country not found
    if (result.rows.length === 0) {
      const countries = await checkVisited();
      return res.render("index", {
        countries,
        total: countries.length,
        users: currentUser,
        color: currentUser[currentUserId - 1].color,
        error: "Country not found, try again!",
      });
    }

    const countryCode = result.rows[0].country_code;

    // Check if already visited by current user
    const checkCountry = await pool.query(
      `
      SELECT *
      FROM visited_countries vc
      WHERE vc.country_code = $1
        AND vc.user_id = $2
      `,
      [countryCode, currentUserId]
    );

    // Country has been visited
    if (checkCountry.rows.length > 0) {
      const countries = await checkVisited();
      return res.render("index", {
        countries,
        total: countries.length,
        users: currentUser,
        color: currentUser[currentUserId - 1].color,
        error: "Country already been visited, try again!",
      });
    }

    // Insert new visited country
    await pool.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [countryCode, currentUserId]);

    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Oops something went wrong on our server" });
  }
});

/**
 * POST /user
 * - If "new", show the new user form
 * - Else, switch current user and reload homepage
 */
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new", { status: null });
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

/**
 * POST /new
 * Register a new user.
 * Requires both name and color fields.
 * Uses RETURNING to immediately get the new user's ID.
 */
app.post("/new", async (req, res) => {
  try {
    const addNewUsername = req.body.name;
    const addNewColor = req.body.color;
    let status;

    if (addNewUsername && addNewColor) {
      const result = await pool.query(
        `
        INSERT INTO users (name, color)
        VALUES ($1, $2)
        RETURNING *
        `,
        [addNewUsername, addNewColor]
      );

      const id = result.rows[0].id;
      currentUserId = id; // switch session to new user

      res.redirect("/");
    } else {
      status = "Please fill your name and select the colors!";
      res.render("new", { status });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Oops something went wrong on our server" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
