1. What is DML?:

- Definition: Data Manipulation Language (DML) commands modify the data within tables.
- Key DML Statements: `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`.

2. INSERT Statement:

- Syntax 1: Specify columns:

```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

- Syntax 2: No column specification:

```sql
INSERT INTO table_name VALUES (value1, value2, ...);
```

- Example: Add a new employee record to the `employees` table.

3. UPDATE Statement:

- Syntax: Modify existing rows:

```sql
UPDATE table_name SET column1 = value1 WHERE condition;
```

- Example: Change the name and title of an employee.

4. DELETE Statement:

- Syntax: Remove rows based on a condition:

```sql
DELETE FROM table_name WHERE condition;
```

- Without WHERE Clause: Deletes all rows, similar to `TRUNCATE`.

5. TRUNCATE vs. DROP:

- TRUNCATE: Removes all rows but retains the table structure.
- DROP: Removes the entire table, including its structure.

6. Bulk Insert:

- Definition: Insert multiple rows into a table from another table.
- Example:

```sql
INSERT INTO items
SELECT productid, supplierid, productname, unitsinstock, unitprice
FROM products;
```

- Result: Fills the `items` table with data from the `products` table.

7. Conclusion:

- DML Commands: Essential for modifying and managing data in SQL databases.
