1. What Are Constraints?:

Definition: Rules applied to tables or columns to maintain data integrity.
Purpose: Ensures clean and consistent data across the database.

2. Types of Constraints:

Table-Level Constraints:

- Primary Key: Uniquely identifies each row in a table.
- Foreign Key: Ensures referential integrity by linking tables.

Column-Level Constraints:

- NOT NULL: Prevents NULL values in a column.
- DEFAULT: Sets a default value if none is provided.
- UNIQUE: Ensures all values in a column are unique.
- CHECK: Enforces a condition on column values (e.g., `CHECK (price < 1000)`).

3. Table-Level Constraints Example:

Primary Key and Foreign Key:

```sql
CREATE TABLE items (
  itemID INT NOT NULL PRIMARY KEY,
  supplierID INT,
  ...
  CONSTRAINT fk_supplier FOREIGN KEY (supplierID)
  REFERENCES suppliers(supplierID)
  ON DELETE NO ACTION
);
```

4. Column-Level Constraints Example:

Example Table with Constraints:

```sql
CREATE TABLE items (
  itemID INT NOT NULL PRIMARY KEY,
  itemCode VARCHAR(5) UNIQUE,
  itemName VARCHAR(40) NOT NULL DEFAULT '',
  quantity INT NOT NULL DEFAULT 0,
  price DECIMAL(9,2) CHECK (price < 1000)
);
```

5. Understanding Foreign Key Constraints:

Parent-Child Relationship:

- Parent Table: `suppliers`
- Child Table: `items`

Actions on Update/Delete:

- CASCADE: Applies changes to related rows in the child table.
- NO ACTION/RESTRICT: Prevents changes if related child rows exist.

6. Examples of Constraint Usage:

Enforcing Unique Values:

- Insert fails if `itemID` already exists due to `PRIMARY KEY`.

Validating Foreign Keys:

- Insert fails if `supplierID` does not exist in the `suppliers` table.

Preventing Invalid Deletions:

- Delete fails if there are related child records in `items`.

7. Practical Application:

Example Scenario:

- Create Items Table: Use constraints to maintain data integrity.
- Test Constraints: Attempt to insert or delete data that violates constraints.
