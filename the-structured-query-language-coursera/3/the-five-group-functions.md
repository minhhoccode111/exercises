### Module 2 Recap

- SELECT Basics: Using `WHERE` for filtering rows.
- DISTINCT: Removing duplicates.
- ORDER BY & LIMIT: Sorting and limiting results.
- Date Functions: Handling dates in PostgreSQL.
- NULLs: Understanding and dealing with NULL values.

### Module 3 Overview

1. Group Functions: `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`.
2. GROUP BY: Aggregating data.
3. HAVING: Filtering grouped data.
4. Subqueries: Nesting queries.

### Group Functions

Purpose: Perform calculations on sets of values to return a single result.
Functions:

- `SUM(column)`: Sum of non-null numeric values.
- `AVG(column)`: Average of non-null numeric values.
- `COUNT(column)`: Count of non-null values or total rows with `COUNT()`.
- `MIN(column)`: Smallest non-null value.
- `MAX(column)`: Largest non-null value.

Note: `SUM` and `AVG` work only on numeric columns; `MIN`, `MAX`, and `COUNT` work on any data type.

### Key Concept: Query Execution Order

WHERE: Filters rows to create an interim result set.
Group Functions: Apply after `WHERE` on the interim result set.

### Important Rule: Matching Detail Levels

The level of detail in `SELECT` must match the aggregation level.
Mismatch causes errors (e.g., trying to sum without proper grouping).

Example:

```sql
SELECT order_id, product_id, SUM(unit_price)
FROM order_details
GROUP BY order_id, product_id;  -- Corrects the mismatch
```

### Quiz

1. Which group functions will work ONLY with numeric columns?

- SUM, AVG

2. What is wrong with this query

```sql
SELECT OrderID, Sum(UnitPrice), SUM(Quantity)
FROM orderdetails
WHERE OrderID in (10248, 10249, 10250, 10251);
```

- The SUMs will produce a single row in the answer set, but do not match with the level of detail of the OrderID
