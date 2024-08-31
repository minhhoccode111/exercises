### Understanding the Answer Set

- SQL queries process tables as input and generate an answer set (output).
- The answer set is essentially a table that might contain duplicate rows.

### Using the DISTINCT Keyword

Purpose: Removes duplicate rows from your answer set.
Example Scenario: Analyzing unique countries in a customer database.
Basic Syntax: `SELECT DISTINCT column_name FROM table_name;`

- Example: `SELECT DISTINCT country FROM customers;`
- Without DISTINCT: Lists all countries, including duplicates.
- With DISTINCT: Lists only unique country names.
  Counting Distinct Values:
- `SELECT COUNT(DISTINCT column_name) FROM table_name;`
- Example: `SELECT COUNT(DISTINCT country) FROM customers;`

### Sorting the Answer Set with ORDER BY

Purpose: Sort the rows in your answer set based on one or more columns.
Basic Syntax: `SELECT column_name FROM table_name ORDER BY column_name [ASC|DESC];`

- Example: `SELECT product_name, unit_price FROM products ORDER BY product_name;`
- Default Sort: Ascending (ASC) order.
- To sort in descending order: `ORDER BY column_name DESC;`
  Sorting by Column Position:
- Use the column index in the ORDER BY clause instead of column name.
- Example: `ORDER BY 2 DESC;` (Sorts by the second column in descending order).

### Limiting the Number of Rows with LIMIT

Purpose: Restrict the number of rows returned in the answer set.
Basic Syntax: `SELECT column_name FROM table_name ORDER BY column_name LIMIT number;`

- Example: `SELECT product_name, unit_price FROM products ORDER BY unit_price DESC LIMIT 5;`
- Practical Use: Showing top N most expensive products.

### Database-Specific Variations

- Other SQL databases (e.g., Microsoft SQL Server, Oracle SQL) use different commands like `TOP` or `FETCH` instead of `LIMIT`.

### Conclusion

- These commands—DISTINCT, ORDER BY, and LIMIT—are fundamental for managing and refining the output of your SQL queries.
- Practice these concepts to efficiently manipulate your answer sets.
