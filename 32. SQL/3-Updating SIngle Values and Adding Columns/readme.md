# Section: Updating Single Values and Adding Columns in SQL

This section covers the **'U' in CRUD** — **Updating** data in a database.
You'll learn how to:

- Modify existing records using `UPDATE`
- Change table structure with `ALTER TABLE`

These skills are essential for keeping your data accurate and your schema flexible.

---

## 🛠️ UPDATE Statement – Modify Existing Data

Use `UPDATE` to change values in existing rows.

### 🔧 Syntax

```sql
UPDATE table_name
SET column = value
WHERE condition;
```

_⚠️ Always use a `WHERE` clause unless you want to update all rows._

**💡 Example: Update a Product's Price**

```sql
UPDATE products
SET price = 0.8
WHERE id = 1;
```

*❌ Without `WHERE`, all prices would become `0.8`!*

## ➕ ALTER TABLE – Add a New Column

```sql
ALTER TABLE table_name ADD COLUMN column_name data_type;
```

**Example: Add a stock Column**
```sql
ALTER TABLE products
ADD COLUMN stock INT;
```

Now the `products` table has a `stock` column (initially `NULL` for existing rows).

### 🧪 Challenge: Update Stock Values

Now that the `stock` column exists, update the `stock` levels for specific products.

```sql
-- Set stock for pen (id = 2)
UPDATE products
SET stock = 50
WHERE id = 2;
```

```sql
-- Set stock for pencil (id = 1)
UPDATE products
SET stock = 100
WHERE id = 1;
```
