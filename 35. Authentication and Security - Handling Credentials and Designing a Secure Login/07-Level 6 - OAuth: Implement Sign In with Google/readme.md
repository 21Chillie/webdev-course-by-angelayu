# 🔑 Section 274: Implementing "Sign In with Google" Using OAuth 2.0

> **Goal**: Learn how to **authenticate users securely** using Google OAuth—**without handling passwords**—using Passport.js and Express.

---

## 🌐 What Is OAuth?

**OAuth 2.0** is an industry-standard authorization framework that lets users **grant limited access** to their data on one site (e.g., Google) to another application (your app)—**without sharing passwords**.

### ✅ Why Use OAuth?

- **No password storage** → eliminates password breach risks
- **Faster onboarding** → one-click login
- **Trusted identity** → Google verifies the user
- **User control** → users can revoke access anytime

> 🔒 You’re not logging in _to Google_—you’re asking Google to **vouch** for the user’s identity.

---

## 🔐 Granular Permissions & User Control

When integrating Google OAuth, you request only the **scopes** (permissions) you need:

| Scope     | Access                                  |
| --------- | --------------------------------------- |
| `profile` | User’s name, profile picture, Google ID |
| `email`   | Verified email address                  |

> 🛑 Never request unnecessary data (e.g., calendar, drive).
> **Principle of least privilege** = better security + user trust.

### 🔁 Users Can Revoke Access Anytime

- Go to: [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)
- Remove your app → instantly logs them out everywhere

---

## ⚙️ Implementation Steps

### 1. **Create a Project in Google Cloud Console**

1. Go to: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create a new project (e.g., `project-name`)
3. Enable the **Google+ API** (or **People API**)
4. Go to **Credentials → Create Credentials → OAuth client ID**
5. Set:
   - **Application type**: Web application
   - **Authorized redirect URIs**:
     ```
     http://localhost:3000/auth/google/callback   ← for development
     https://yourdomain.com/auth/google/callback  ← for production
     ```
6. Copy your:
   - **Client ID**
   - **Client Secret**

> 🔒 Store these in `.env`—**never in code!**

---

### 2. **Install Required Packages**

```bash
npm install passport passport-google-oauth20
```

### 3. Set Up Environment Variables (`.env`)

```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 4. Configure Passport Google Strategy

There is good documentation in PassportJS Website.

https://www.passportjs.org/packages/passport-google-oauth20/
