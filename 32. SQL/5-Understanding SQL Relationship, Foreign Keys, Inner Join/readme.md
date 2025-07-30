# Understanding SQL Relationships: Foreign Keys & Inner Joins

This section covers essential concepts in **relational databases** — how tables are connected and how to query related data using **foreign keys** and **INNER JOIN**.

These tools are the foundation of powerful, scalable databases.

---

## 🗃️ What Are Relational Databases?

Relational databases store data in **tables** that can be **linked together** based on relationships. This allows you to avoid data duplication and maintain consistency.

For example:

- Customers → Orders
- Students → Courses
- Users → Posts

Instead of repeating customer names in every order, we **link** tables using keys.

---

## 🔗 Types of Relationships

| Type                   | Description                                                                     | Example                                                              |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **One-to-One (1:1)**   | One record in Table A links to **one** record in Table B                        | A `student` has one `passport`                                       |
| **One-to-Many (1:N)**  | One record in Table A links to **many** records in Table B                      | A `customer` can have many `orders`                                  |
| **Many-to-Many (M:N)** | Many records in Table A link to many in Table B (requires a **junction table**) | A `student` takes many `courses`, and a `course` has many `students` |

---

## 🔑 Foreign Keys: Linking Tables

A **foreign key** is a column in one table that references the **primary key** of another table.

### ✅ Example: `orders` table with `customer_id`

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    order_date DATE,
    total DECIMAL(10,2),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

_🔗 The `customer_id` in orders points to id in `customers`._

This ensures:

- You can’t add an order for a - - non-existent customer
- Data stays consistent (referential integrity)

**Many-to-Many Example: Students & Courses**

Since a student can take many courses and a course can have many students, we use a junction table:


```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE courses (
    id INT PRIMARY KEY,
    title VARCHAR(100)
);

-- Junction table
CREATE TABLE student_courses (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

**INNER JOIN: Query Related Data**
Use `INNER JOIN` to combine data from two or more tables based on a related column.

```sql
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;
```

*Only rows with matching values in both tables are returned.*

**Example: Get Orders with Customer Names**

```sql
SELECT
    orders.id AS order_id,
    customers.name AS customer_name,
    orders.total,
    orders.order_date
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
```
Sample Output:

| ORDER_ID | CUSTOMER_NAME | TOTAL | ORDER_DATE |
|----------|---------------|-------|------------|
| 01       | Alice         | 49.99 | 2025-04-01 |
| 02       | Bob           | 89.50 | 2025-04-02 |
