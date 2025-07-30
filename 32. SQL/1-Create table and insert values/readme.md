# Section 242: SQL Basics – CREATE TABLE & INSERT DATA
---
## OVERVIEW
## What is CRUD?

**CRUD** is an acronym that stands for the four basic operations you can perform on data in a database:

```
| Operation | SQL Command | Description |
|---------|-------------|-------------|
| **C**reate | `INSERT` | Add new data |
| **R**ead   | `SELECT` | Retrieve existing data |
| **U**pdate | `UPDATE` | Modify existing data |
| **D**elete | `DELETE` | Remove data |
```

These operations form the foundation of almost all data-driven applications — from websites to mobile apps.

---

In this section, we focused on two key SQL commands:
`CREATE TABLE` and `INSERT INTO`.
These are used to define database tables and add data to them.

## CREATE TABLE

To create a table, define the structure using column names, data types, and constraints.

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);
```

This creates a table named products with three columns:

- id: integer, used as the primary key
- name: text with up to 100 characters
- price: decimal number (ideal for currency)

## INSERT INTO

After creating the table, use INSERT INTO to add data.

**Option 1: Specify column names (recommended)**

```sql
INSERT INTO products (id, name, price) VALUES (1, 'Apple', 0.99);
```

**Option 2: Insert values without column names**

```sql
INSERT INTO products VALUES (2, 'Banana', 1.49);
```
*⚠️ Make sure the values are in the correct order — this method relies on column order.*

---

These commands are essential for setting up and populating a database.
Next, we’ll learn how to retrieve data (READ) using `SELECT` and `WHERE`.
