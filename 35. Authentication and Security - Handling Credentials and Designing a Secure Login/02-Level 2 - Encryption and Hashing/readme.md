# 🔐 Section 268: Level 2 – Encryption and Hashing

> **Goal**: Understand the difference between _encryption_ and _hashing_, and why **hashing is essential for password storage**.

---

## 🚨 Why This Matters

Storing passwords in **plain text** is a catastrophic security flaw:

- If your database is breached, **every user account is instantly compromised**.
- Companies can face **legal penalties**, loss of trust, and massive fines (e.g., under GDPR or CCPA).

✅ **Golden Rule**: **Never store passwords as plain text. Ever.**

---

## 🔤 Encryption vs. Hashing: What’s the Difference?

| Feature         | Encryption                                                     | Hashing                  |
| --------------- | -------------------------------------------------------------- | ------------------------ |
| **Reversible?** | ✅ Yes (with the key)                                          | ❌ No (one-way function) |
| **Uses a key?** | ✅ Yes                                                         | ❌ No                    |
| **Purpose**     | Protect data _in transit_ or _at rest_ (e.g., messages, files) | Securely store passwords |
| **Example**     | AES-256, RSA                                                   | bcrypt, SHA-256, Argon2  |

---

## 🔐 Encryption: A Double-Edged Sword

### ⚠️ Simple Example: Caesar Cipher

- Shift each letter by a fixed number (e.g., `A → D`, `B → E`).
- **Problem**: Easy to crack with frequency analysis.
- **Historical failure**: Mary, Queen of Scots used weak ciphers—her encrypted letters were decrypted, leading to her execution.

### 🔒 Modern Encryption: AES-256

- Used by governments and banks.
- **But**: If an attacker steals your **encryption key**, they can decrypt **everything**.
- ❗ **Not suitable for passwords**—because you \*should never be able to retrieve the original password\*\*.

> 💡 Use encryption for data you **need to read later** (e.g., user emails, payment info).
> ❌ Never use it for passwords.

---

## 🧊 Hashing: The Right Tool for Passwords

### How It Works:

1. User signs up with password: `mySecret123!`
2. System runs it through a **hash function**:
   `hash("mySecret123!") → a1b2c3d4e5f6...` (fixed-length string)
3. Only the **hash** is stored in the database.
4. On login:
   - User enters `mySecret123!`
   - System hashes it again → compares to stored hash
   - If they match → login successful

### Why Hashing Wins:

- **No key needed** → nothing to steal.
- **One-way**: You can’t “unhash” to get the original password.
- Even a tiny change creates a totally different hash:
  `hash("hello") ≠ hash("hello!")`

> 🔍 Think of hashing like blending a smoothie:
> Easy to make (`fruit → smoothie`),
> Impossible to reverse (`smoothie ↛ fruit`).

---

## ⚙️ Hash Functions: Fast to Compute, Hard to Break

- **Creating a hash**: Takes milliseconds.
- **Reversing a hash**: Requires guessing (brute force) — could take **centuries** for strong passwords.

However…
⚠️ **Weak passwords** (like `123456`) can still be cracked quickly using:

- Rainbow tables
- Precomputed hash dictionaries
- GPU-powered brute-force tools

➡️ That’s why we **combine hashing with salting** (covered next!).

---

## ✅ Best Practices for Developers

1. **Always hash passwords** before storing.
2. **Never log or display passwords**—even during debugging.
3. Use **adaptive hashing algorithms** like:
   - `bcrypt` (most common in Node.js)
   - `scrypt`
   - `Argon2` (winner of the Password Hashing Competition)
4. **Avoid** fast hashes like MD5 or SHA-1 for passwords—they’re too quick to crack.
