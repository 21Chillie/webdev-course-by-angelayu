import express from "express";
import bodyParser from "body-parser";
const app = express();

const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // For CSS
app.set("view engine", "ejs");

// In-memory blog storage
let posts = [];

// Routes
app.get("/", (req, res) => {
	res.render("index", { posts });
});

app.get("/posts/:id", (req, res) => {
	const post = posts.find((p) => p.id === req.params.id);
	if (!post) return res.status(404).send("Post not found");
	res.render("post", { post });
});

app.get("/new", (req, res) => {
	res.render("new");
});

app.post("/new", (req, res) => {
	const { title, content } = req.body;
	const id = req.body.title;
	posts.push({ id, title, content });
	res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
	posts = posts.filter((p) => p.id !== req.params.id);
	res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
