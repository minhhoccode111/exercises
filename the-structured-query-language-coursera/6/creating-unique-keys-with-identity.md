1. What is an IDENTITY Constraint?:

Definition: A SQL constraint used to create a surrogate key, which is an automatically incremented unique identifier for each row.

Purpose: Ensures a unique primary key for each new row without manual input.

2. How It Works:

Automatic Incrementation: The IDENTITY constraint sets up a sequence that auto-increments with each insert.

Sequence Object: Tracks the current value of the IDENTITY and updates with each new row.

Default Behavior: Starts at 1 and increments by 1, but can be customized.

3. Example: Creating an IDENTITY Column:

SQL Example:

```sql
CREATE TABLE Shoppers (
  ShopperID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ShopperName VARCHAR(40) NOT NULL,
  Phone VARCHAR(20) NOT NULL DEFAULT '0'
);
```

Insert Data:

```sql
INSERT INTO Shoppers (ShopperName, Phone) VALUES ('John Doe', '123-4567');
```

Result: ShopperID is automatically generated and incremented.

4. Managing the Sequence:

View Current Value:

```sql
SELECT CURRVAL(PG_get_serial_sequence('Shoppers', 'ShopperID'));
```

Reset Sequence:

```sql
ALTER TABLE Shoppers ALTER COLUMN ShopperID RESTART WITH 10;
```

5. Practical Application:

Example Output: ShopperID values increment automatically as new rows are added, ensuring uniqueness.

Customizing: Sequence can be reset or customized to start at different values or increment by different amounts.

6. Conclusion:

IDENTITY: A powerful and automatic way to ensure unique keys in your database tables.
