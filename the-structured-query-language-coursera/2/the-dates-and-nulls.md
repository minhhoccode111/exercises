### Introduction to Date Handling in SQL

- Dates are critical in data analytics, commonly used in various business contexts.
- SQL databases like Postgres offer multiple ways to store and manipulate dates.

### Date Data Types in Postgres

- Date: Stores date in `YYYY-MM-DD` format without time.
- Timestamp: Includes date and time (`YYYY-MM-DD HH:MM:SS`).
- Timestamp TZ: Timestamp with time zone awareness.
- Time: Stores only time (`HH:MM:SS`), without date.
- Interval: Represents the difference between dates, useful for calculating periods.

### How Dates Are Stored

- Dates and times are stored as binary numbers for efficient processing.
- Textual dates (e.g., `2024-08-28`) are converted to binary, often referenced from a fixed point in time.
- Timestamps are stored as 8-byte values (64 bits); dates as 4-byte values (32 bits).

### Practical Date Queries

Use built-in date functions to manipulate and query date values.
Example: `SELECT NOW();` returns the current date and time.
Example: Calculating age at hire:

```sql
SELECT last_name, first_name, AGE(hire_date, birth_date) AS hire_age FROM employees;
```

### Common Date Functions in Postgres

- `AGE()`: Calculates the difference between two dates.
- `CURRENT_DATE`, `CURRENT_TIME`, `CURRENT_TIMESTAMP`: Retrieve current date/time.
- `EXTRACT()`, `DATE_PART()`: Extract parts (e.g., year, month) from a date.
- `TO_DATE()`, `TO_TIMESTAMP()`: Convert text to date or timestamp.

### Working with Nulls in SQL

Nulls represent missing or undefined values in a database column.
Important in calculations:

- Nulls are ignored in functions like `AVG()`.
- They differ from zeros or blank strings, which are considered actual values.

### Handling Null Values in Queries

Example: Checking for nulls in a column:

```sql
SELECT product_name FROM products WHERE discontinued IS NULL;
```

Example: Update a column to null:

```sql
UPDATE products SET discontinued = NULL WHERE discontinued = 0;
```

### Practical Examples of Null Queries

Retrieve products that have been discontinued:

```sql
SELECT product_id, product_name FROM products WHERE discontinued = 1;
```

Update non-discontinued products to have null in the discontinued column:

```sql
UPDATE products SET discontinued = NULL WHERE discontinued = 0;
```

### Conclusion

Mastery of date handling and null management is essential in SQL for accurate data analysis.
These concepts are foundational for more advanced SQL operations in upcoming lessons.
