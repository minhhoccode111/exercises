1. What is an Outer Join?:

Inner Join: Returns rows where keys match between tables.
Left Outer Join: Returns all matching rows plus all rows from the left table (even if no match).
Right Outer Join: Returns all matching rows plus all rows from the right table.

2. Venn Diagram Explanation:

Inner Join: Intersection of A and B.
Left Outer Join: Intersection plus all rows from the left table.
Right Outer Join: Intersection plus all rows from the right table.

3. SQL Syntax Example:

Left Outer Join:

```sql
SELECT lastname, firstname, ...
FROM employees E
LEFT OUTER JOIN orders O
ON E.EmployeeID = O.EmployeeID;
```

Right Outer Join: Similar syntax, but with `RIGHT OUTER JOIN`.

4. Use Case: Data Integrity Analysis:

Objective: Identify orders with invalid customer references.
Steps:

1. Count customers in `Customers` table: 87 unique.
2. Count distinct customer IDs in `Orders`: 89 unique.
3. Discrepancy: Orders table has customer IDs not present in Customers.

4. Detecting Discrepancies with Outer Joins:

Left Outer Join: Find customer IDs in orders not in customers.
Example:

```sql
SELECT ...
FROM orders O
LEFT OUTER JOIN customers C
ON O.CustomerID = C.CustomerID
WHERE C.CustomerID IS NULL;
```

Result: Identify mismatched customer IDs.

6. Impact of Discrepancies:

Example Analysis:

- Inner Join (valid orders): 785 orders, $1.312M.
- Outer Join (all orders): 830 orders, $1.354M.
- Difference: $42,000 discrepancy in sales due to invalid customer IDs.

7. Business Implications:

Data discrepancies can fail audits, leading to financial and reputational risk.
Key Takeaway: Use outer joins to uncover and address data inconsistencies.

8. Conclusion:

Outer joins are powerful for data analysis and ensuring data integrity.
End of Module 4; stay tuned for Module 5.
