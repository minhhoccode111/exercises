### Introduction to the SQL WHERE Clause

Purpose of the WHERE Clause:

- Filters rows from a table based on specified conditions.
- Used in conjunction with the `SELECT` statement to retrieve specific subsets of data.

Basic Syntax:

- `SELECT columns FROM table WHERE condition;`
- Without a `WHERE` clause, all rows from the table are selected.

Condition Structure:

- Comprised of an operand, an operator, and another operand.
- Operands can be columns, literals, or expressions.
- Operators include: `=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`, `IN`, `BETWEEN`.

### Practical Examples of WHERE Clause

Filtering Rows:

- Example: `SELECT  FROM customers WHERE country = 'Brazil';` - Retrieves all customers from Brazil.

Negating Conditions:

- Example: `SELECT  FROM customers WHERE country != 'Brazil';` - Retrieves customers not from Brazil.
- Alternative syntax using `NOT`: `SELECT  FROM customers WHERE NOT country = 'Brazil';`

Using Numeric and Text Conditions:

- Example: `SELECT  FROM products WHERE unit_price > 60;` - Retrieves products with a price greater than $60.

Using LIKE for Pattern Matching:

- Example: `SELECT  FROM customers WHERE contact_name LIKE 'M%';` - Retrieves customers whose contact name starts with "M".
- Wildcards:
  - `%` matches any number of characters.
  - `_` matches exactly one character.

Using IN for Multiple Comparisons:

- Example: `SELECT  FROM products WHERE supplier_id IN (2, 4, 6, 8);` - Retrieves products from specified suppliers.

Using BETWEEN for Range Comparisons:

- Example: `SELECT  FROM products WHERE unit_price BETWEEN 20 AND 30;` - Retrieves products priced between $20 and $30 (inclusive).

### Combining Conditions with Boolean Operators

Combining Conditions:

- Example: `SELECT  FROM products WHERE (supplier_id = 1 AND category_id = 2) OR (unit_price > 20);`
- Use parentheses to ensure correct order of evaluation and improve readability.

Using Parentheses:

- Clarifies logic and ensures accurate query results.
- Enhances code readability for others.

### Conclusion and Next Steps

Recap of Key Concepts:

- Understanding and applying the WHERE clause to filter data effectively.

Practice and Application:

- Proceed with Lab Number 2 to practice WHERE clause conditions.
- Prepare for the next lesson on more advanced SQL techniques.
