# 🔒 Section 269: How To Hack Passwords

> **Note**: This section is summarize from The Web Development Bootcamp By Angela Yu in Udemy Platform. The section is for understanding how attackers _think_ helps developers build more secure applications. Never attempt to hack systems without explicit permission.

---

## 🎯 Learning Objective

By the end of this section, you’ll understand:

- Why password security is critical in web applications.
- How real-world breaches happen (e.g., Adobe, LinkedIn).
- The techniques hackers use to crack passwords.
- How to protect user data using modern security practices.

---

## 📌 Key Concepts

### 1. **The State of Password Security Today**

Many websites still store passwords **in plain text** or use outdated methods. This makes them easy targets.
✅ **Best Practice**: Always **hash** passwords—never store them as plain text.

---

### 2. **Real-World Breaches**

- **Adobe (2013)**: 153 million accounts leaked due to poor encryption.
- **LinkedIn (2012)**: 6.5 million hashed passwords cracked because they used **unsalted SHA-1**.

> 🔥 Lesson: Reusing passwords across sites means **one breach = many accounts compromised**.

---

### 3. **How Hackers Crack Passwords**

#### 🔹 Step 1: Steal the Database

Attackers gain access to a site’s user database (often via SQL injection or server misconfigurations).

#### 🔹 Step 2: Use Precomputed **Hash Tables** (Rainbow Tables)

Hackers generate hashes for millions of common passwords like:

```
password → 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
123456 → 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```

If your hashed password matches one in their table—they know your password!

#### 🔹 Step 3: Brute Force & Dictionary Attacks

- **Brute force**: Try every possible combination (slow for long passwords).
- **Dictionary attack**: Try common words, phrases, and patterns (very fast).

> 💡 Modern GPUs can test **billions of passwords per second**.

---

### 4. **What Makes a Strong Password?**

✅ **Do**:

- Use **12+ characters**
- Mix uppercase, lowercase, numbers, and symbols: `T7$mQ!pL9@vK`
- Use a **passphrase**: `PurpleTiger$RunsFast42!`

❌ **Don’t**:

- Use `password123`, `qwerty`, or your pet’s name.
- Reuse passwords across sites.

> 🔐 Pro Tip: Use a **password manager** (like Bitwarden or 1Password) to generate and store unique passwords.

---

## 🛡️ Developer Defense Strategies (Coming Next!)

In the next lecture, you’ll learn how to **stop these attacks** by:

- Using **strong hashing algorithms** (like **bcrypt**)
- Adding **salts** to prevent rainbow table attacks
- Implementing **rate limiting** and **account lockouts**
- Enforcing **password strength rules** on signup

> Remember: **You are responsible for your users’ security.**

---
