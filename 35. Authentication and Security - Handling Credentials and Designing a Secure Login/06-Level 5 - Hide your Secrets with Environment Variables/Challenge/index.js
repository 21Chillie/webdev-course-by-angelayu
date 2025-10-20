import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

dotenv.config();
const app = express();
const port = 3000;
const saltRounds = 12;

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

// Session Configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

passport.use(
	new Strategy(async (username, password, cb) => {
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
				// Get the username password from database
				const user = result.rows[0];
				const hashPassword = user.password;

				// Then, compare it with user typed password
				const isValidPassword = await bcrypt.compare(password, hashPassword);

				// Check if password is valid
				if (isValidPassword) {
					return cb(null, user);
				} else {
					return cb(null, false);
				}
			} else {
				// Else, username not found
				return cb(null, false, { message: "Username not found" });
			}
		} catch (err) {
			return cb(err);
		}
	})
);

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

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
	console.log(req.user);

	// Check if user is authenticated, if yes render secret.ejs
	if (req.isAuthenticated()) {
		res.render("secrets.ejs");
		// else, redirect to login page
	} else {
		res.redirect("/login");
	}
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({
			error: "All required fields must be filled.",
		});
	}

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
			return res.status(409).json({ error: "Username is already exists. Try logging in." });
		} else {
			// Hash the password
			const hash = await bcrypt.hash(password, saltRounds);

			// Else, insert username and password in database
			const insertAccount = await pool.query(
				`
      INSERT INTO user_account (username, password)
      VALUES ($1, $2)
      RETURNING *
      `,
				[username, hash]
			);

			const user = insertAccount.rows[0];

			// After registering, user data will be pass to Strategy then trying to login and redirect to /secret routes
			req.login(user, (err) => {
				console.log(err);
				res.redirect("/secret");
			});
		}
	} catch (err) {
		res.status(500).json({ error: `Registration error!`, err: err.message });
	}
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login",
	})
);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
