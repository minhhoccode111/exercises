1. What is the ALTER Command?:

Definition: A DDL (Data Definition Language) command used to modify existing database structures.
Capabilities:

- Rename tables or columns.
- Add or drop columns and constraints.
- Modify column datatypes and defaults.

2. Common ALTER Operations:

Rename a Table:

```sql
ALTER TABLE old_table_name RENAME TO new_table_name;
```

Rename a Column:

```sql
ALTER TABLE table_name RENAME COLUMN old_column_name TO new_column_name;
```

Add a Column:

```sql
ALTER TABLE table_name ADD COLUMN column_name datatype;
```

Drop a Column:

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

3. Practical Examples:

Creating and Populating a Table:

- Create `items` table and populate with data from `products` table.
- Example insert: Select data from `products` into `items`.

Renaming the Table:

- Rename `items` to `alters`.

Renaming a Column:

- Rename `itemname` to `itemdescription`.

4. Modifying Table Structure:

Add a Column:

- Add `itemunit` column to `alters` table.

Update Data:

- Update `itemcode` where `price < 20`.

Drop a Column:

- Drop the `itemcode` column from `alters` table.

5. Conclusion:

ALTER Command: Versatile tool for modifying database structures post-creation.
Next Step: Explore the `UPDATE` command in the following lesson.
