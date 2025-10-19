# 🧂 Section 270: Level 3 - How to Salt Passwords for Improved Encryption

> **Goal**: Learn how to **defend against rainbow tables and brute-force attacks** using **salting** and the **bcrypt** hashing algorithm.

---

## 🚨 The Problem with Plain Hashing

Even if you hash passwords (e.g., with SHA-256), **common passwords remain vulnerable**:

- `password123` → always produces the same hash.
- Hackers use **precomputed rainbow tables** to reverse these hashes instantly.
- If two users have the same password, they’ll have **identical hashes**—making patterns obvious.

➡️ **Result**: Weak passwords get cracked in seconds.

---

## 🧂 What Is Salting?

**Salting** = Adding a **unique, random string** to each password **before hashing**.

### How It Works:

1. User creates password: `sunshine`
2. System generates a **random salt**: `x9#L2!qP`
3. Combine: `sunshine` + `x9#L2!qP` → `sunshinex9#L2!qP`
4. Hash the result: `hash("sunshinex9#L2!qP") → a8f3b1c...`
5. Store **both** the salt and the hash in the database.

### Why It’s Powerful:

- Even if two users pick `sunshine`, their **hashes will differ**.
- Rainbow tables become **useless**—attackers must recompute hashes for _every salt_.
- Brute-force attacks slow down dramatically.

> 💡 Think of salt like a **custom spice blend** for each password—same base ingredient, totally unique flavor.

---

## 🔒 Enter Bcrypt: The Gold Standard

**Bcrypt** is a **password-hashing function** designed specifically for security:

### Key Features:

- ✅ **Built-in salting** (you don’t manage salts manually).
- ✅ **Adaptive**: Slower by design → resists brute-force attacks.
- ✅ **Configurable cost**: Increase `salt rounds` as computers get faster.

### How Bcrypt Works:

- Uses **key stretching** (repeated hashing) to slow down computation.
- Default: 10–12 rounds (each round **doubles** the work).
- Example: 12 rounds = 2¹² = **4,096 iterations** per hash.

> ⏱️ While your app hashes in ~100ms, a hacker would need **years** to crack strong passwords.

---

## 💻 Practical Implementation (Node.js)

### 1. **Registration: Hash & Store**

```javascript
const bcrypt = require("bcrypt");

const plainPassword = "mySecurePass123!";
const saltRounds = 12;

// bcrypt automatically generates a unique salt
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// Save `hashedPassword` to your database (it includes the salt!)
user.password = hashedPassword;
```

> 🔍 The resulting hash looks like:
> $2b$12$x9L2qP8fKj3mN5vR7tYzOeH1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1u
> — the salt is embedded in the string!

### 2. Login: Verify Without Knowing The Salt

```javascript
const enteredPassword = "mySecurePass123!";
const storedHash = user.password; // from DB

// bcrypt extracts the salt from the stored hash automatically
const isMatch = await bcrypt.compare(enteredPassword, storedHash);

if (isMatch) {
	// ✅ Login successful!
}
```

✅ No need to store or manage salts separately! Bcrypt handles it all.
