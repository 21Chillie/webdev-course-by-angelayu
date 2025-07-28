import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store for blog posts
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  // Return all posts as JSON
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  // Find a post by its ID
  const id = parseInt(req.params.id);
  const findPost = posts.find((post) => id === post.id);

  if (!findPost) {
    res.status(404).json({ message: "Post not found" });
  } else {
    res.status(200).json(findPost);
  }
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  // Add a new post to the posts array
  const { title, content, author } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    date: new Date(),
  };

  // If all fields is empty will return an error with message
  if (!req.body || !title || !content || !author) {
    res.status(400).json({ error: "All required fields must be fill." });
  } else {
    posts.push(newPost);
    res.json(posts);
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  // Update specific fields of a post by ID
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => id === post.id);
  const { title, content, author, date } = req.body;

  if (!postIndex) {
    res.status(404).json({ error: `Post with ID ${id} not found.` });
  }

  if (!title || !content || !author) {
    res.status(400).json({ error: "Request body must contain at least one field to update (text, type)." });
  }

  if (title) {
    posts[postIndex].title = title;
  }

  if (content) {
    posts[postIndex].content = content;
  }

  if (author) {
    posts[postIndex].author = author;
  }

  if (date) {
    posts[postIndex].date = new Date();
  }

  res.status(200).json(postIndex);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  // Remove a post from the array by its ID
  const id = parseInt(req.params.id);

  // Loop until it's find the match ID then create a new array without that ID.
  posts = posts.filter((post) => id !== post.id);

  res.status(200).json({ success: `Post with ID ${id} has been deleted` });
});

app.listen(port, () => {
  // Start the server and listen on the specified port
  console.log(`API is running at http://localhost:${port}`);
});
