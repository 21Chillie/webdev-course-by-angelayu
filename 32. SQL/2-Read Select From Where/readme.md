# Section 243: SQL Basics – Reading Data with SELECT and WHERE

This section covers essential SQL commands for reading data from a database, focusing on the **"Read"** part of **CRUD**.

We build on previous knowledge of creating tables and inserting data, now learning how to **retrieve** that data effectively.

---

## 🔍 SELECT – Retrieve Data

The `SELECT` command is used to query data from a table.

### Get all columns and rows

```sql
SELECT * FROM products;
```

_This \* means "all columns"._

### Get Specific columns

```sql
SELECT name, price FROM products;
```

_Returns only the name and price columns._

## 🔎 WHERE – Filter Results

Use the WHERE clause to filter rows based on conditions.

**Example:**

```sql
SELECT * FROM products WHERE id = 1
```

You can use various operators in the WHERE clause:

### 📊 SQL Comparison Operators

[Read More About SQL Operator.](https://www.w3schools.com/sql/sql_operators.asp)

**Examples Using WHERE**

```sql
-- Find products priced over $2
SELECT * FROM products WHERE price > 2;
```

```sql
-- Find products with price between $1 and $3
SELECT * FROM products WHERE price BETWEEN 1 AND 3;
```

```sql
-- Find products whose name starts with 'A'
SELECT * FROM products WHERE name LIKE 'A%';
```

```sql
-- Find a specific product by name
SELECT id, name FROM products WHERE name = 'Apple';
```
