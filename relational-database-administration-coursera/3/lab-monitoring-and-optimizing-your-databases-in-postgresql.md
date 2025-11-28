# Lab: Monitoring and Optimizing your databases in PostgreSQL

## Ex1: Create Your Database

### Task A: Start PostgreSQL in Cloud IDE

### Task B: Create Your Database

1. Download the `demo` database

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/example-guided-project/flights_RUSSIA_small.sql
```

2. Go to Postgres CLI and import the file

```bash
\i flight_RUSSIA_small.sql
```

3. Show how many tables are there

```bash
\dt
```

## Ex2: Monitor Your Database

### Task A: Monitor Current Activity

#### Server Activity

You can take a look at the server activity by running the following query;

```sql
select pid, usename, datname, state, state_change from pg_stat_activity;
```

If you wanted to see which query was most recently executed, you can add query column

```sql
select pid, usename, datname, state, state_change, query from pg_stat_activity;
```

#### Database Activity

When looking at database activity, you can use the following query

```sql
select datname, tup_inserted, tup_updated, tup_deleted from pg_stat_database;
```

To see the number of rows fetched and returned, you use the following query

```sql
select datname, tup_fetched, tup_returned from pg_state_database;
```

To filter the results so that only those from the `demo` database are shown, you use the following query

```sql
select datname, tup_inserted, tup_updated, tup_deleted, tup_fetched, tup_returned from pg_stat_database where datname = 'demo';
```

### Task B: Monitor Performance Over Time

1. To enable the `pg_stat_statements` extension

```sql
create extension pg_stat_statement;
```

2. Edit the PostgreSQL configuration file to include the extension you just added

```sql
alter system set shared_preload_libraries = 'pg_stat_statments';
```

Then restart PostgreSQL for changes to take effect 3. Once your session has started, open the PostgreSQL CLI

```bash
\connect demo
```

4. You can see if this extension has been loaded by checking both the installed extensions and the `shared_preload_libraries` with

```bash
\dx
```

You can also check the `shared_preload_libraries` with

```sql
show shared_preload_libraries;
```

5. Turn on expanded table formatting

```bash
\x
```

6. Retrieve the database id, the query, and total time that it took to execute the statement

```sql
select dbid, query, total_exec_time from pg_stat_statements;
```

7. Extract the database id and database name

```sql
select oid, datname from pg_database;
```

8. Drop extension

```sql
drop extension pg_stat_statement;
```

9. Reset the `shared_preload_libraries` in the configuration file

```sql
alter system reset shared_preload_libraries;
```

### Task C: Monitor with pgAdmin

## Ex3: Optimize Your Database

## Task A: Optimize Data Types

1. Connect to `demo` db

```bash
\connect demo
```

2. List out the tables in the db

```bash
\dt
```

3. Select table `aircrafts_data` and see what data you can pull from it

```sql
select * from aircrafts_data;
```

4. Check current data types (and additinal details such as the indexes and constraints) in `aircrafts_data` table

Drop `aircrafts` view because the SQL file included commands to create views and we will get errors if we try to change the data types with this view

```bash
drop view aircrafts;
```

Check the table's column and data types again

### Task B: Vacuum Your Databases

Check if the `autovacuum` feature is automatically enabled

```sql
show autovacuum;
```

To select the table name, number of dead rows, the last time it was autovacuumed, and the number of times this table has been autovacuumed

```sql
select relname, n_dead_tup, last_autoanalyze, autovacuum_count from pg_stat_user_tables;
```
