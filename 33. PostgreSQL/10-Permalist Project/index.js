import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Create a PostgreSQL pool using environment variables
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

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing JSON, form data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get all items from the database
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

// Render the main page with all items
app.get("/", async (req, res) => {
  try {
    const items = await getPermalist();

    // Debug
    console.log(items);

    res.render("index", { listTitle: "Today", listItems: items, message: null });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Ooops something went wrong!" });
  }
});

// Add a new item to the database
app.post("/add", async (req, res) => {
  const { newItem } = req.body;
  let message;

  try {
    const result = await pool.query("INSERT INTO items (title) VALUES ($1) RETURNING *", [newItem]);

    if (!newItem) {
      const items = await getPermalist();
      message = "You must input something!";

      res.render("index", { listTitle: "Today", listItems: items, message });
    } else {
      console.log(`Items successfully added: ${result.rows[0].title}`);
      res.redirect("/");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database insert error!" });
  }
});

// Edit an existing item by ID
app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE
        items i
      SET
        title = $1
      WHERE
        i.id = $2
      RETURNING *
      `,
      [updatedItemTitle, updatedItemId]
    );

    if (result.rowCount > 0) {
      console.log(`Items successfully edited: ${result.rows[0].title}`);
      res.redirect("/");
    } else {
      console.log(`Edit error!`);
      res.redirect("/");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database edit error!" });
  }
});

// Delete an item by ID
app.post("/delete", async (req, res) => {
  const { deleteItemId } = req.body;

  try {
    const result = await pool.query(
      `
      DELETE FROM items
      WHERE id = $1
      RETURNING *
      `,
      [deleteItemId]
    );

    if (result.rowCount > 0) {
      console.log(`Items successfully deleted: ${result.rows[0].title}`);
      res.redirect("/");
    } else {
      console.log(`Delete error!`);
      res.redirect("/");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database delete error!" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
