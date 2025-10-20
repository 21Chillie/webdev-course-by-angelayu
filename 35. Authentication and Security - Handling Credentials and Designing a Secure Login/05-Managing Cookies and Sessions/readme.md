# 🍪 Section: Managing Cookies and Sessions

> **Goal**: Understand how to **keep users logged in securely** across page visits using **cookies**, **sessions**, and **Passport.js** in Express.

---

## 🧠 Core Concepts

### 🍪 What Are Cookies?

- Small pieces of data **stored in the user’s browser**.
- Sent automatically with every request to your server.
- Used to **remember user preferences, cart items, login state**, etc.

> 💡 **Fun analogy**: Like a _fortune cookie_—your browser “eats” it and remembers the message inside!

**Example**:
On Amazon, adding an item to your cart creates a cookie so your cart stays full—even if you close the tab.

---

### 🕒 What Is a Session?

- A **temporary interaction** between a user’s browser and your server.
- Starts at login, ends at logout or timeout.
- The server stores **session data** (e.g., `userId`, role), while the browser holds only a **session ID** (via cookie).

✅ **Key benefit**: Users stay authenticated without re-entering passwords on every page.

---

## 🔗 How Cookies + Sessions Work Together

1. User logs in → server creates a **session** (e.g., `{ userId: "123", isLoggedIn: true }`).
2. Server sends a **Set-Cookie** header with a unique **session ID**.
3. Browser stores this ID as a cookie.
4. On next request, browser sends the cookie → server looks up the session → recognizes the user.

> 🔒 The **actual sensitive data stays on the server**—only a random ID is in the browser.

---

## ⚙️ Implementation in Express (with Passport.js)

### 1. **Required Middleware Setup (Order Matters!)**

```javascript
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

// 1. Parse incoming requests
app.use(express.urlencoded({ extended: true }));

// 2. Set up session middleware BEFORE Passport
app.use(
	session({
		secret: process.env.SESSION_SECRET, // ← from environment variables!
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
	})
);

// 3. Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // ← ties sessions to Passport
```

> ⚠️ Middleware order is critical:
> express.urlencoded → session() → passport.initialize() → passport.session()

### 2. Passport.js: Simplifying Authentication

- Passport handles login logic, serialization, and session binding.
- You define:
  - How to verify credentials (e.g., check DB for email/password).
  - How to verify credentials (e.g., check DB for email/password).

Example:

```javascript
// Serialize: What to store in the session?
passport.serializeUser((user, done) => {
	done(null, user.id); // Only store the ID
});

// Deserialize: How to get user back from session?
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});
```

## 🛡️ Security Best Practices

| PRACTICE                                   | WHY IT MATTERS                                                      |
| ------------------------------------------ | ------------------------------------------------------------------- |
| se `httpOnly: true`                        | Prevents JavaScript access → blocks XSS cookie theft                |
| Set <br>`secure: true` in production       | Cookies only sent over HTTPS                                        |
| Use strong `SESSION_SECRET`                | Protects session integrity (store in `.env`!)                       |
| Set short `maxAge`                         | Limits session lifetime (e.g., 1 hour for banking, 1 day for blogs) |
| Never store passwords or tokens in cookies | Only store a session ID                                             |

> 🔐 Never hardcode secrets!
> Use environment variables:

```
SESSION_SECRET=super_random_string_!@#456
```

## 💡 Real-World Impact (Especially in E-Commerce)

- Reduces cart abandonment: Users return to find their cart intact.
- Enables personalization: Show recently viewed items.
- Supports retargeting ads: Track interests (with user consent!).

> 🌐 But always respect privacy laws (GDPR, CCPA)—ask for cookie consent when required.

## 🔮 What’s Next?

Now that sessions are secure, how do you protect your secrets like API keys and session tokens?

Up next: _Environment Variables & Security Hardening_

- Using .env files
- Never committing secrets to GitHub
