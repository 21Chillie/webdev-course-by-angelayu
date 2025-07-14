import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [
	{
		id: "stop-killing-games-preserving-digital-worlds-for-the-future",
		image: "/images/image-headline.jpg",
		category: "Gaming",
		title: "Stop Killing Games: Preserving Digital Worlds for the Future",
		content:
			`In an age where digital entertainment dominates, the growing trend of developers shutting down online games is raising concern. "Stop killing games" isn't just a nostalgic cry—it's a call to preserve culture, communities, and creativity.\r\n` +
			"\r\n" +
			"When a game is taken offline, years of player memories, artistry, and technological innovation vanish. Entire communities built around those worlds disappear overnight, often with no way to recover what was lost. Gamers are not just consumers; they are part of living, breathing ecosystems.\r\n" +
			"\r\n" +
			"It's time for studios to consider alternatives—offline modes, open-source releases, or transferring servers to the community. Games deserve digital preservation, and players deserve respect for their time and dedication.\r\n" +
			"\r\n" +
			"Let’s start treating games not just as products, but as digital heritage worth saving.",
		writer: "Resky Alamsyah",
		date: "Mon Jul 07 2025",
	},
	{
		id: "gaming-more-than-just-play",
		image: "/images/gaming.webp",
		category: "Gaming",
		title: "Gaming: More Than Just Play",
		content:
			"Gaming has evolved far beyond simple entertainment. Today, it's a powerful medium that blends art, technology, and storytelling. Whether it's exploring vast open worlds, solving complex puzzles, or competing in fast-paced tournaments, games offer experiences that challenge the mind and connect people across the globe.\r\n" +
			"\r\n" +
			"More than a hobby, gaming builds skills like teamwork, problem-solving, and creativity. It brings communities together, sparks innovation, and even shapes careers in development, streaming, and esports.\r\n" +
			"\r\n" +
			"In a digital age, gaming is not just play—it's a culture, a passion, and for many, a way of life.",
		writer: "Resky Alamsyah",
		date: "Mon Jul 07 2025",
	},
];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");
	},

	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploads = multer({ storage: storage });

app.get("/", (req, res) => {
	res.render("index.ejs", { posts });
});

app.get("/create-blog", (req, res) => {
	res.render("create.ejs");
});

app.post("/create-blog", uploads.single("image"), (req, res) => {
	const category = req.body.category;
	const title = req.body.title;
	const id = slugify(title);
	const content = req.body.content;
	const writer = req.body.writer;

	function slugify(text) {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
	}

	let imagePath = null;
	if (req.file) {
		imagePath = `/uploads/${req.file.filename}`;
	}

	const newPost = {
		id: id,
		image: imagePath,
		category: category,
		title: title,
		content: content,
		writer: writer,
		date: new Date().toDateString(),
	};

	posts.push(newPost);

	res.redirect("/");
});

app.get("/post/:id", (req, res) => {
	const postId = req.params.id;
	const findPost = posts.find((p) => {
		return p.id === postId;
	});

	if (!findPost) {
		res.status(404).send("Post not found!");
	}
	
	res.render("post.ejs", { post: findPost });
});

app.post("/delete/:id", (req, res) => {
	const postId = req.params.id;
	posts = posts.filter((p) => {
		return p.id !== postId;
	});

	res.redirect("/");
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
