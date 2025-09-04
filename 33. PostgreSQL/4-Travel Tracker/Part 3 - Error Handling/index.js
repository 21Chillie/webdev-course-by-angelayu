import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Connection error:", err);
  });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  let countries = [];

  const result = await pool.query("SELECT * FROM visited_countries");
  result.rows.forEach((country) => countries.push(country.country_code));

  return countries;
}

app.get("/", async (req, res) => {
  // Write code here
  try {
    const countries = await checkVisited();
    res.render("index", { countries: countries, total: countries.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Oops something went wrong on our server" });
  }
});

app.post("/add", async (req, res) => {
  try {
    // Store user input country name in variable
    const { country } = req.body;

    // Query to find country_code from countries table by input country name
    const query = `
    SELECT country_code
    FROM countries
    WHERE LOWER(country_name) = $1
    `;

    const result = await pool.query(query, [country.toLowerCase()]);
    console.log(result.rows[0]);
    // If country not found will return error 404
    if (result.rows.length === 0) {
      const countries = await checkVisited();
      return res.render("index", {
        countries: countries,
        total: countries.length,
        error: "Country not found, try again!",
      });
    }

    // Store country code into variable
    const countryCode = result.rows[0].country_code;

    // Check if country code exist in visited_countries table before insert
    const checkCountry = await pool.query("SELECT * FROM visited_countries WHERE country_code = $1", [countryCode]);

    if (checkCountry.rows.length > 0) {
      const countries = await checkVisited();
      return res.render("index", {
        countries: countries,
        total: countries.length,
        error: "Country already been visited, try again!",
      });
    }

    // Country code from variable const countryCode will be insert into visited_countries table
    await pool.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);

    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Oops something went wrong on our server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
