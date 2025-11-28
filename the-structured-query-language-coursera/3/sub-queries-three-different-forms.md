### Three Ways to Use Subqueries

1. As part of a WHERE clause
2. As part of a SELECT statement
3. As part of a FROM clause

### 1. Subquery in WHERE Clause (with equals)

Used as a predicate in the WHERE clause
Example: Finding the highest priced product

```sql
SELECT ProductID, ProductName, UnitPrice
FROM Products
WHERE UnitPrice = (SELECT MAX(UnitPrice) FROM Products)
```

### 2. Subquery in WHERE Clause (with IN)

Can return multiple rows, but only one column
Example: Finding orders with more than 100 units sold

```sql
SELECT CustomerID, OrderID
FROM Orders
WHERE OrderID IN (
    SELECT OrderID
    FROM [Order Details]
    WHERE Quantity > 100
)
```

### 3. Subquery in SELECT Clause

Must return one value (one row, one column)
Example: Calculating total sales for each product

```sql
SELECT ProductName,
    (SELECT SUM(UnitPrice * Quantity)
     FROM [Order Details]
     WHERE [Order Details].ProductID = Products.ProductID) AS TotalSales
FROM Products
```

### 4. Subquery in FROM Clause

Used as a pseudo table
Requires an alias
Example: Listing orders with fewer than 100 items sold

```sql
SELECT OrderID
FROM (
    SELECT OrderID, SUM(Quantity) AS TotalQuantity
    FROM [Order Details]
    GROUP BY OrderID
    HAVING SUM(Quantity) < 100
) AS DetailCount
```

### Correlated Subquery

Special case: inner query references a value from outer query
Inner query executed for each row in outer query
Can be slow due to repeated execution
Example:

```sql
SELECT O.EmployeeID, O.OrderID, O.ShipCity, O.CustomerID
FROM Orders O
WHERE O.ShipCity = (
    SELECT E.City
    FROM Employees E
    WHERE E.EmployeeID = O.EmployeeID
)
```

### Table Aliases

Used to avoid ambiguity in column names
Example: `Orders AS O`, `Employees AS E`
Useful when multiple tables have columns with the same name

### Key Takeaways

1. Subqueries provide powerful querying capabilities
2. Can be used in WHERE, SELECT, and FROM clauses
3. Correlated subqueries offer advanced functionality
4. Table aliases help avoid ambiguity
