### Module 4, Lesson 1: SQL Joins Overview

1. Purpose of SQL Joins:

Connects multiple tables to retrieve data.
Requires a common key (usually a foreign key).

2. Types of Joins:

Inner Join (Equijoin): Retrieves rows where the key values match.
Implicit vs. Explicit Joins:

- Implicit Join: Joins are implied using the `WHERE` clause.
- Explicit Join: Uses `JOIN` verb with an `ON` clause.

3. Example: Joining Orders & Employees:

Tables: `Orders` and `Employees` (common key: `EmployeeID`).
Query: Count of orders per employee, sorted from highest to lowest.
Important SQL Syntax:

- `SELECT lastname, firstname, COUNT(orderID)`
- `FROM Employees E JOIN Orders O ON E.EmployeeID = O.EmployeeID`
- `GROUP BY lastname, firstname`
- `ORDER BY COUNT(orderID) DESC`

4. Handling Ambiguity:

Ambiguous Columns: Prefix with table name (e.g., `E.EmployeeID`).
Using Aliases: Simplifies queries (e.g., `Employees AS E`).

5. Resource Considerations:

Joins can be resource-intensive, especially with large datasets.
