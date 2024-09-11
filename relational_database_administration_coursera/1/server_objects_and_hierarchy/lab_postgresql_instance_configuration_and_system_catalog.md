# Lab: PostgreSQL Instance Configuration and System Catalog

## Launching

Install populate script in terminal

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/example-guided-project/flights_RUSSIA_small.sql
```

Open the PostgreSQL CLI

```sql
\i flights_RUSSIA_small.sql
```

Verify that the db was properly created

```sql
\dt
```

## Ex1: Configure Your PostgreSQL Server Instance

Look at the current setting of the `wal_level` parameter

```sql
show wal_level;
```

Modify the global defaults of a PostgreSQL instance without having to manually edit the configuration file
(And restart server for changes to take effect)

```sql
alter system set wal_level = 'logical';
```

Check again

```sql
show wal_level;
```

## Ex2: Navigate the System Catalog

Connect to the db

```sql
\connect demo
```

Start with a simple query of `pg_tables`, which is a system catalog containing metadata about each table in the database. Let’s query it to display metadata about all the tables belonging to the `bookings` schema in the `demo` database by entering the following command into the CLI:

```sql
select * from pg_tables where schemaname = 'bookings';
```

Suppose as the database administrator, you would like to enable row-level security for the `boarding_passes` table in the `demo` database. When row security is enabled on a table, all normal access to the table for selecting or modifying rows must be specified by a row security policy. Since row security policies are not the focus of this lab, we will not go in depth about specifying a policy but will simply enable it for demonstration purposes. However, if you wish to learn more about this topic, you can check out the PostgreSQL documentation. To enable row security on the `boarding_passes` table, enter the following command in the CLI:

```sql
alter table boarding_passes enable row level security;
```

Query the `pg_tables` to display metadata about the tables belonging to the `bookings` schema and confirm that the row security for the `boarding_passes` was succsessfully enabled

```sql
select * from pg_tables where schemaname = 'bookings';
```

Let’s connect your work in the previous section about PostgreSQL instance configuration to the system catalogs. Earlier, you used `SHOW` statements to display configuration parameters. There’s also a system catalog called `pg_settings` that stores data about configuration parameters of the PostgreSQL server. Let’s query with the following command:

```sql
select name, setting, short_desc from pg_settings where name = 'wal_level';
```

## Try it yourself

Try changing the name of the table by directly editing the `pg_tables` table from the system catalogs
(result in an error because changing individual values in a system catalog directly can severely mess up your db)

```sql
update pg_tables set tablename = 'aircraft_fleet'
where tablename = 'aircraft_date';
```

Try to change the name of the `aircrafts_data` again

```sql
alter table aircrafts_data rename to aircrafts_fleet;
```

Query `pg_tables` from the system catalog by `schemaname` 'bookings' to display the `tablename` column

```sql
select tablename from pg_tables where schemaname = 'bookings';
```
