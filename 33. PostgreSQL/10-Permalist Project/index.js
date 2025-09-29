import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Create a PostgreSQL pool
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

// Setting
app.set("view engine", "ejs");

// Middlewware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getPermalist() {
  let permaList = [];

  const result = await pool.query(
    `
    SELECT *
    FROM items
    `
  );

  result.rows.forEach((item) => permaList.push(item));

  return permaList;
}

app.get("/", async (req, res) => {
  try {
    const items = await getPermalist();

    // Debug
    console.log(items);

    res.render("index", { listTitle: "Today", listItems: items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Ooops something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
