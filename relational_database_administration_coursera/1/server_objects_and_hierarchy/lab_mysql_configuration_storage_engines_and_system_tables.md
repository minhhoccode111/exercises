# Lab: MySQL Configuration, Storage Engines, and System Tables

## Launching

Install populate script in terminal

```bash
wget <https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/World/world_mysql_script.sql>
```

Open the MySQL CLI

Create new db

```sql
create database world;
```

Use newly created db

```sql
use world;
```

Execute the installed script

```sql
souce world_mysql_script.sql;
```

Display all the table names from the world db

```sql
show tables;
```

## Manage MsSQL Storage Engines

See a list of the Storage Engines supported on MySQL server

```sql
show engines;
```

Create a new table using the CSV engine

```sql
create table csv_test (i int not null, c char(10) not null) engine = csv;
```

Confirm that the table was succesfully created

```sql
show tables;
```

Add some data to it

```sql
insert into csv_test values(1, 'data one'), (2, 'data two'), (3, 'data three');
```

Check again

```sql
select * from csv_test;
```

## Navigate the MySQL System Tables

### Grant System Table Category

See all the dbs on the MySQL server

```sql
show database;
```

Connect to `mysql` data

```sql
use mysql;
```

Take a look at all the tables in the db

```sql
show tables;
```

The `user` table contains user accounts, take a look at with

```sql
select user from user;
```

Add a new user to the db

```sql
create user test_user;
```

Check again

```sql
select user from user;
```

### Query the `INFORMATION_SCHEMA` Database Tables

View all the dbs on the server

```sql
show databases;
```

Connect to the `information_schema`

```sql
use information_schema;
```

In the `information_schema` database, there exists a table called `COLUMNS` which contains meta data about the columns for all tables and views in the server. One of the columns in this table contains the names of all the other columns in every table. Let’s go ahead and look at the names of the columns in the `country` table in the `world` database

```sql
select column_name from columns where table_name = 'country';
```

Another point of interest in the `information_schema` database is the `TABLES` table which contains meta data about all the tables in the server. One of the columns in this table contains information about a table’s storage engine type. To tie this back to our earlier discussion about storage engines, run the following command in the CLI to view the storage engine type for the ‘country’, ‘city’, ‘countrylanguage’, and finally the ‘csv_test’ table you created:

```sql
select table_name, engine from information_schema.tables
where table_name = 'country' or table_name = 'city'
or table_name = 'countrylanguage' or table_name = 'csv_test';
```

Finally, the `TABLES` table in the `information_schema` database contains information on the the size of a given table in bytes. This information is stored in two columns: `data_length` and `index_length` which stores the size of the data in the table and the size of the index file for that table, respectively. Therefore, the total size of the table is the sum of the values in these two columns. This value would be given in bytes, however, if you wish to use a more convenient unit, the sum can be converted to kB by dividing by 1024. You can find the size of the tables (in kB) you queried in the previous step with the following command in the CLI:

```sql
select table_name, (data_length + index_length)/1024 from information_schema.tables
where table_name = 'country' or table_name = 'city'
or table_name = 'countrylanguage' or table_name = 'csv_test';
```

## Try it yourself

Connect to the `world` db

```sql
use world;
```

Create a new table `MyISAM_test` that uses the `MYISAM` storage engine

```sql
create table myisam_test (i int not null, c char(10) not null) engine = myisam;
```

Connect to `information_schema` db

```sql
use information_schema;
```

Using the CLI, query the `TABLES` table in the `information_schema` database to display the `table_name` and `engine` columns of all tables that have `table_schema = 'world'`

```sql
select table_name, engine from information_schema.tables
where table_schema = 'world';
```
