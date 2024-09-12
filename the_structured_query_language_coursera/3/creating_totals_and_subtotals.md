## Overview

GROUP BY: Used to create totals and subtotals by grouping rows based on specified columns.

## Key Concepts

Group Functions Recap: `SUM`, `AVG`, `COUNT`, `MIN`, `MAX` summarize values across rows.
GROUP BY: Ensures the level of detail in `SELECT` matches the aggregation.

### Example of GROUP BY Usage

```sql
SELECT OrderID, SUM(UnitPrice), SUM(Quantity)
FROM orderdetails
WHERE OrderID IN (10248, 10249, 10250, 10251)
GROUP BY OrderID;
```

Groups data by `OrderID` to calculate subtotals for `UnitPrice` and `Quantity`.

## Important Rule

When using `GROUP BY`, every column in `SELECT` must either be:

- A column listed in `GROUP BY`
- Or an aggregate function (e.g., `SUM`, `COUNT`).

### Example: Counting Customers by Country

```sql
SELECT Country, COUNT(CustomerID)
FROM customers
GROUP BY Country;
```

Counts customers in each country.

### Example: Average Product Price by Supplier

```sql
SELECT SupplierID, AVG(UnitPrice)
FROM products
GROUP BY SupplierID;
```

Averages product prices by supplier.

### Rounding Output

CAST and ROUND can format aggregate results.

```sql
SELECT SupplierID, ROUND(AVG(UnitPrice)::numeric, 2)
FROM products
GROUP BY SupplierID;
```

## Sorting with GROUP BY

ORDER BY: Sorts the final output. Example:

```sql
SELECT SupplierID, SUM(UnitsInStock)
FROM products
GROUP BY SupplierID
ORDER BY SUM(UnitsInStock) DESC;
```

## HAVING Clause

HAVING: Filters the grouped result set (like `WHERE` but after grouping).

### Example: Countries with More than 5 Customers

```sql
SELECT Country, COUNT(CustomerID)
FROM customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
```

## Summary

WHERE vs HAVING:

- `WHERE`: Filters rows before grouping.
- `HAVING`: Filters after grouping.
