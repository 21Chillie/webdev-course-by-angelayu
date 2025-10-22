import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";

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
	"local",
	new Strategy(async (username, password, cb) => {
		try {
			const result = await pool.query(
				`
			SELECT * FROM user_account
			WHERE email = $1
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

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		},
		async (accessToken, refreshToken, profile, cb) => {
			// DEBUG info
			console.log("Google Profile: ", profile);

			try {
				// Query to check user already exist with this Google ID
				const existingUser = await pool.query(
					`
					SELECT *
					FROM user_account
					WHERE google_id = $1
					`,
					[profile.id]
				);

				// Check if  google_id user's is existing in database
				if (existingUser.rowCount > 0) {
					// If already exist, return the data
					return cb(null, existingUser.rows[0]);
				} else {
					// Else, check if user exist with same email (to link account with google id)
					const emailCheck = await pool.query(
						`
						SELECT *
						FROM user_account
						WHERE email = $1
						`,
						[profile.emails[0].value]
					);

					// If email exist, then update existing account with Google ID
					if (emailCheck.rowCount > 0) {
						const updatedUser = await pool.query(
							`
							UPDATE user_account
							SET google_id = $1, type = $2
							WHERE email = $3
							RETURNING *
							`,
							[profile.id, profile.provider, profile.emails[0].value]
						);

						return cb(null, updatedUser.rows[0]);
					} else {
						// Else, create new user
						const newUser = await pool.query(
							`
							INSERT INTO user_account (email, google_id, type)
							VALUES ($1, $2, $3)
							RETURNING *
							`,
							[profile.emails[0].value, profile.id, profile.provider]
						);

						return cb(null, newUser.rows[0]);
					}
				}
			} catch (err) {
				return cb(err);
			}
		}
	)
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

app.get("/secret", async (req, res) => {
	// Check if user is authenticated, if yes render secret.ejs
	if (req.isAuthenticated()) {
		try {
			// Store user id
			const id = req.user.id;

			const getSecretData = await pool.query(
				`
				SELECT *
				FROM user_secret
				WHERE user_id = $1
				`,
				[id]
			);

			const secrets = getSecretData.rows.map((row) => row.secret);

			if (getSecretData.rowCount > 0) {
				res.render("secrets.ejs", { secrets });
			} else {
				res.render("secrets.ejs", { secrets: ["No secrets yet, try submit"] });
			}
		} catch (err) {
			res.status(500).json({ error: "Something wrong went fetch secret data from database", log: err });
		}
	} else {
		// else, redirect to login page
		res.redirect("/login");
	}
});

app.get("/submit", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("submit.ejs");
	} else {
		res.redirect("/login");
	}
});

// Initial Google Login
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

// Google Callback
app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/secret",
		failureRedirect: "/login",
		failureMessage: true,
	})
);

// Logout
app.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.error("Logout error:", err);
			return res.status(500).json({ error: "Logout failed." });
		}
		req.session.destroy((err) => {
			if (err) {
				console.error("Session destruction error:", err);
				return res.status(500).json({ error: "Session destruction failed." });
			}
			res.redirect("/");
		});
	});
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login",
	})
);

app.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({
			error: "All required fields must be filled.",
		});
	}

	try {
		// Check if user with email is available
		const checkUser = await pool.query(
			`
      SELECT * FROM user_account
      WHERE email = $1
      `,
			[username]
		);

		// if available, return status 500 with error
		if (checkUser.rowCount > 0) {
			return res.status(409).json({ error: "User is already exists. Try logging in." });
		} else {
			// Hash the password
			const hash = await bcrypt.hash(password, saltRounds);
			const signUpType = "password";

			// Else, insert email and password in database
			const insertAccount = await pool.query(
				`
      INSERT INTO user_account (email, password, type)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
				[username, hash, signUpType]
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

app.post("/submit", async (req, res) => {
	try {
		// Store user secret and id
		const { secret } = req.body;
		const id = req.user.id;

		// Insert user secret to database
		const insertSecret = await pool.query(
			`
			INSERT INTO user_secret (user_id, secret)
			VALUES ($1, $2)
			RETURNING *
			`,
			[id, secret]
		);

		// DEBUG
		if (insertSecret.rowCount > 0) {
			console.log("Inserting secret success!");
		}

		res.redirect("/secret");
	} catch (err) {
		res.status(500).json({ error: "Something wrong while submitting secret!", log: err });
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
