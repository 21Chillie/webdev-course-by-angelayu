# 📝 Permalist Project

A simple **permanent to-do list app** built with **Node.js, Express, EJS, and PostgreSQL**.
This project is designed to practice CRUD operations and full-stack integration with a real database.

---

## 🚀 Features

* Add new tasks
* View all tasks
* Edit existing tasks
* Delete tasks
* Persistent storage using PostgreSQL

---

## 🛠️ Tech Stack

* **Node.js** + **Express** – Backend server & routing
* **EJS** – Templating engine for rendering views
* **PostgreSQL** – Database for storing tasks
* **pg** – Node.js Postgres client

---

## 📂 Project Setup

1. Clone this repo:

   ```bash
   git clone https://github.com/yourusername/permalist.git
   cd permalist
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PGHOST=localhost
   PGUSER=your_username
   PGPASSWORD=your_password
   PGDATABASE=permalist
   PGPORT=5432
   ```

4. Create the database and table in PostgreSQL:

   ```sql
   CREATE DATABASE permalist;

   CREATE TABLE items (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255)
   );
   ```

5. Start the server:

   ```bash
   npm start
   ```

   App runs at: [http://localhost:3000](http://localhost:3000)

---

## 🐞 Debugging

* Use `console.log()` to trace values
* Check PostgreSQL logs if queries fail
* Ensure `.env` credentials match your DB setup

---

## 💡 Possible Enhancements

* Add a **created_at** timestamp column
* Support for **multiple lists**
* Support for multiple users

---

## 📚 Learning Goals

* Practice **CRUD operations** with a real database
* Understand full-stack flow (form → backend → DB → render view)
* Improve debugging and error-handling skills

---

## ✅ Final Note

This project is a stepping stone toward your **capstone challenge**.
Experiment, add features, and make it your own 🚀
