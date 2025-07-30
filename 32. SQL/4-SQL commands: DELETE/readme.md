# Section: SQL Commands – DELETE

This section covers the **'D' in CRUD** — **Deleting** data from a database.

The `DELETE` command allows you to remove records from a table. While powerful, it must be used with **extreme caution** to avoid accidental data loss.

---

## 🗑️ DELETE Command – Remove Records

Use `DELETE` to remove one or more rows from a table.

### 🔧 Syntax

```sql
DELETE FROM table_name WHERE condition;
```

**Example: Delete a Specific Product**

Suppose you want to remove a product named `Pencil` from the `products` table:

```sql
DELETE FROM products
WHERE name = 'Pencil';
```

Or, delete by ID (recommended for precision):

```sql
DELETE FROM products
WHERE id = 1;
```

✅ This removes only the row where the condition is true.

**⚠️ Critical Warning: Never Omit WHERE**

This command:

```sql
DELETE FROM products;
```

❌ Will delete all rows from the products table — without recovery (in most cases).

*🔒 There is no "undo" in raw SQL. Once deleted, data is gone unless you have backups.*
