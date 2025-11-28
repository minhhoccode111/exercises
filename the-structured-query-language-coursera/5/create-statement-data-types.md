1. Introduction to DDL and DML:

DDL (Data Definition Language):

- Modifies database structures.
- Includes `CREATE`, `ALTER`, `DROP`.

DML (Data Manipulation Language):

- Modifies data within tables.
- Includes `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`.

2. Focus on the CREATE Statement:

Purpose: Defines a new table or view.
Syntax:

```sql
CREATE TABLE table_name (
  column1 datatype [constraint],
  column2 datatype [constraint],
  ...
);
```

Common Constraints: `NOT NULL`, `DEFAULT`, `PRIMARY KEY`.

3. Best Practices:

Drop Before Create: Use `DROP TABLE IF EXISTS` to avoid conflicts.
Readable SQL: Place parentheses on separate lines for clarity.

4. Example: Creating a Table:

Create Shippers Table:

```sql
CREATE TABLE shippers (
  shipperID INT NOT NULL,
  companyName VARCHAR(40) NOT NULL,
  phone VARCHAR(20) NOT NULL DEFAULT '0'
);
```

Result: Empty `shippers` table created; ready for data insertion.

5. Data Insertion:

INSERT Example:

```sql
INSERT INTO shippers (shipperID, companyName, phone)
VALUES (1, 'Company A', '123-4567');
```

Handling Defaults: Missing `phone` values default to `'0'`.

6. PostgreSQL Datatypes Overview:

Common Datatypes:

- Integer Types: `SMALLINT`, `INT`, `BIGINT`.
- Character Types: `CHAR(n)`, `VARCHAR(n)`, `TEXT`.
- Boolean: `TRUE`/`FALSE`.
- Date/Time: `DATE`, `TIMESTAMP`.
- Numeric Types: `DECIMAL(x, y)`, `FLOAT`, `REAL`.
- JSON: For key-value pairs (advanced use).
