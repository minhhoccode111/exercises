# Lab: Improving Performance of Slow Queries in MySQL

## Objectives

After completing this lab, you will be able to:

- Use the EXPLAIN statement to check the performance of your query
- Add indexes to improve the performance of your query
- Apply other best practices such as using the UNION ALL clause to improve query performance

## Ex1: Load the Database

Open new terminal and install the `sql` script

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/employeesdb.zip
```

Then unzip the content

```bash
unzip employeesdb.zip
```

Change dir so that we're able to access the files in the newly created `employeesdb` dir

```bash
cd employeesdb
```

And import the data (type in your password)

```bash
mysql --host=mysql --port=3306 --user=root --password -t < employees.sql
```

Then go the the MySQL CLI and

```sql
use employees;
```

See which tables are available in this db

```sql
show tables;
```

## Ex2: Check Your Query's Performance with EXPLAIN

1. Let's start with selecting all the data from the `employees` table

```sql
select * from employees;
```

2. We can use `EXPLAIN` to see how many rows were scanned

```sql
explain select * from employees;
```

## Ex3: Add an Index to your Table

1. First let's look at the existing indexes

```sql
show index from employees;
```

2. Let's say we wanted to see all the information about employees who were hired on or after January 1, 2000. We can do that with this query:

```sql
select * from employees where hire_date >= '2000-01-01';
```

3. With the `EXPLAIN` statement, we can check how many rows this query is scanning

```sql
explain select * from employees where hire_date >= '2000-01-01';
```

4. Add an index to `hire_date`

```sql
create index hire_date_index on employees(hire_date);
```

the `create index` command creates an index called **hire_date_index** on the table employees on column **hire_date**

5. To check your index, you can use the `show index` command

```sql
show index from employees;
```

6. Once more, let's select all the employees who were hired on or after Jan 1, 2000

```sql
select * from employees where hire_date >= '2000-01-01';
```

-> the difference is quite evident, rather than taking about 0.17 seconds to execute the query, it takes 0.00 seconds - almost no time at all

7. We can use the `EXPLAIN` statement to see how many rows were scanned

```sql
explain select * from employees where hire_date >= '2000-01-01';
```

8. Now if you want to remove the index, enter the following command

```sql
drop index hire_date_index on employees;
```

## Ex4: Use an UNION ALL clause

1. Run this query

```sql
select * from employees where first_name like '%C' or last_name like '%C';
```

2. Use `EXPLAIN` command to see how many rows are being scanned

```sql
explain select * from employees where first_name like '%C' or last_name like '%C';
```

3. Try adding an index to both the `first_name` and `last_name` columns

```sql
create index first_name_index on employees(first_name);
create index last_name_index on employees(last_name);
```

4. Re-run the query

```sql
select * from employees where first_name like '%C' or last_name like '%C';
```

and see how many rows are being scanned

```sql
explain select * from employees where first_name like '%C' or last_name like '%C';
```

5. Let's use `UNION ALL` clause the improve the performance of this query

```sql
select * from employees where first_name like '%C'
union all
select * from employees where last_name like '%C'
```

using the `EXPLAIN` statement to see why

```sql
explain select * from employees where first_name like '%C'
union all
select * from employees where last_name like '%C'
```

## Ex5: Be SELECTive

### Practice Ex1

1.

```sql
select * from salaries;
```

```sql
explain select * from salaries;
```

2.

```sql
select emp_no, salary from salaries;
```

```sql
explain select emp_no, salary from salaries;
```

### Practice Ex2

```sql
select emp_no, title from titles;
```

```sql
explain select emp_no, title from titles;
```
