# Lab: Backup and Restore using PostgreSQL

## Ex1: Restore a full database (db) from a Backup

Open new termial and install the script

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/example-guided-project/flights_RUSSIA_small.sql
```

Then open PostgreSQL CLI and restore the data into db call `demo`

```sql
\i flights_RUSSIA_small.sql
```

Check that the db has been restored by listing all the tables in current db schema

```sql
\dt
```

## Ex2: Modify the database and perform a full backup

### TaskA: Modify the db with the CLI

Take a look at the content of table `aircrafts_data`

```sql
select * from aircraft_data;
```

Add an aircraft to db

```sql
insert into
aircrafts_data(aircraft_code, model, range)
values (380, '{"en": "Airbus A380-800"}', 15700);
```

### TaskB: Backup your db using pgadmin (using GUI)

## Practice Exercise

Use the `booking_ref` parameter to query the database

```sql
select * from tickets where book_rof = '0002D8';
```

Then update the passenger's name to correct one

```sql
update tickets set passenger_name = 'SANYA KORELEVA' where book_ref = '0002D8';
```

Perform a full backup of the `restored_demo` db

```sql
pg_dump --username=postgres --host=localhost demo > demo_backup.sql
```
