1. What is the UNION Command?:

Definition: Combines the results of two or more SELECT queries into a single result set.
Purpose: Used to merge data from multiple queries.

2. UNION Rules:

Same Number of Columns: Both queries must have the same number of columns in the result set.
Same Data Types: The corresponding columns in each query must have the same data types.

3. Example Use Case:

Scenario: Summarize total units in stock by product category and provide a final total across all categories.

Steps:

- First Query: Sum units in stock grouped by category.
- Second Query: Sum units in stock across all categories.

4. SQL Example:

```sql
-- Query 1: Group by category
SELECT categoryname, SUM(unitsinstock)
FROM categories
JOIN products ON categories.categoryid = products.categoryid
GROUP BY categoryname

UNION

-- Query 2: Total across all categories
SELECT 'Total' AS categoryname, SUM(unitsinstock)
FROM products;
```

Result: Combines category totals and final total into a single report.

5. Ordering Results:

Sort for Clarity: Use `ORDER BY` to ensure the final total appears at the bottom.
Example: `ORDER BY 2 ASC` (orders by the sum column).

6. Conclusion:

UNION: A simple yet powerful tool for combining multiple result sets into one.
