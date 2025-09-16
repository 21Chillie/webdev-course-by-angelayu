# PostgreSQL: Essential SQL Commands

This document covers essential PostgreSQL commands for updating and deleting data in a database. These commands are commonly used when managing tables, modifying schemas, and ensuring data integrity.

---

## 1. ALTER Command

The `ALTER` command is used to modify the schema of a table. You can rename a table, rename columns, change data types, or add/remove columns.

**Example: Rename a table**

```sql
ALTER TABLE student RENAME TO "user";
```

**Example: Add a new column**

```sql
ALTER TABLE users ADD COLUMN email VARCHAR(100);
```

**Example: Change a column data type**

```sql
ALTER TABLE users ALTER COLUMN name TYPE TEXT;
```

## 2. Constraints
Constraints ensure data integrity inside the database. For example, the UNIQUE constraint prevents duplicate values in a column or a combination of columns.

Example: Ensure unique user and country combination in `visited_countries`

```sql
CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  country_code VARCHAR(10) REFERENCES countries(country_code),
  CONSTRAINT unique_visit UNIQUE(user_id, country_code)
);
```

## 3. DROP Command
The DROP command permanently removes a table or a column. ⚠️ This action is irreversible and will delete all data in the table.

**Example: Drop a table**
```sql
DROP TABLE users;
```

**Example: Drop a column**
```sql
ALTER TABLE users DROP COLUMN email;
```

## 4. UPDATE Command
The UPDATE command modifies existing records in a table. Always use a `WHERE` clause to avoid updating all rows unintentionally.

**Example: Update a user's name**
```sql
UPDATE users
SET name = 'John Doe'
WHERE id = 1;
```

**Example: Update multiple columns**
```sql
UPDATE users
SET name = 'Alice', color = 'Green'
WHERE id = 2;
```

## 5. ORDER BY Clause
The `ORDER BY` clause is used to sort data in ascending (`ASC`) or descending (`DESC`) order.

**Example: Sort users by name descending**
```sql
SELECT * FROM users
ORDER BY name DESC;
```

**Example: Sort visited countries by `id` ascending**
```sql
SELECT * FROM visited_countries
ORDER BY id ASC;
```

## 6. DELETE Command
The `DELETE` command removes records from a table. Always use a `WHERE` clause to avoid deleting everything.

**Example: Delete one visited country**
```sql
DELETE FROM visited_countries
WHERE id = 6;
```

**Example: Delete all visited country for a specific user**
```sql
DELETE FROM visited_countries
WHERE user_id = 1;
```
