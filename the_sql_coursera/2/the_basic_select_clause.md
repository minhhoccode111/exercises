### Introduction to SQL Select Statements

Importance of Select Statement:

- The `SELECT` statement is the most frequently used SQL command.
- It allows the retrieval of specific columns from a table.

Basic Syntax Structure:

- Begins with `SELECT`, followed by columns or expressions.
- Followed by the `FROM` clause specifying the table.
- Syntax essentials: commas between columns, semicolon at the end of the statement.

Code Readability:

- Place each clause on a separate line.
- Indent and vertically align code for clarity.

Writing "Pretty" Code:

- Clean, readable code is crucial for maintainability.
- Add comments to explain complex logic or steps.

### Practical SQL Examples

Simple Query:

- `SELECT  FROM employees;` - Retrieves all columns from the `employees` table.

Selecting Specific Columns:

- Example: `SELECT employee_id, last_name, first_name FROM employees;`

Using Expressions and Functions:

- Example of math in SQL: `SELECT unit_price  quantity AS total FROM order_details;`
- Example of a function: `SELECT TO_CHAR(hire_date, 'Month') AS hire_month FROM employees;`

Single-Line Comments:

- Use `--` to comment out single lines within the code.

Multi-Line Comments:

- Use `/ /` for comments spanning multiple lines.
- Comments enhance code readability and are essential for future maintenance.

### Conclusion and Next Steps

Recap of Key Concepts:

- Emphasis on the importance of clean, well-documented SQL code.

Practice and Application:

- Proceed with Lab Number 1 to apply these concepts in a practical environment.
