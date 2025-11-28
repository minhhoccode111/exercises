# Lab: Backup and Restore using MySQL

## Example exercise A: Perform a Logical Backup and Restore

Open a new terminal and download 2 scripts

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/World/world_mysql_script.sql
```

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/World/world_mysql_update_A.sql
```

Create a new db `world`

```sql
create database world;
```

Use newly created `world` db

```sql
use world;
```

Execute the `world_mysql.sql` script to complete the `world` db creation process

```sql
source world_mysql_script.sql;
```

List all table names from the `world` db

```sql
show tables;
```

Retrieve all the Canada (countrycode = 'CAN') related records from the `countrylanguage` table (no records found)

```sql
select * from countrylanguage where countrycode = 'CAN';
```

Run the update script `world_mysql_update_A.sql` to insert the records you were looking for

```sql
source world_mysql_update_A.sql;
```

Redo to verify

```sql
select * from countrylanguage where countrycode = 'CAN';
```

Then quit

```sql
\q
```

Back to terminal and backup the `countrylanguage` table of the `world` db
(Enter your MySQL service session password from the MySQL servive session tab if necessary)

```bash
mysqldump --host=mysql --port=3306 --user=root --password world countrylanguage > world_countrylanguage_mysql_backup.sql
```

Then check if that script valid

```bash
cat world_countrylanguage_mysql_backup.sql
```

Run the command in terminal to drop the `countrylanguage` table

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="drop table world.countrylanguage;"
```

List all the table names from the `world` db to make sure that `countrylanguage` is no longer existed

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="show tables from world;"
```

Restore the structure and data of the table `countrylanguage`

```bash
mysql --host=mysql --port=3306 --user=root --password world < world_countrylanguage_mysql_backup.sql
```

Verify that the table `countrylanguage` exists

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="show tables from world;"
```

Now retrieve all the Canada (`countrycode = 'CAN'`) from the `countrylanguage` table to see the updated result

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="select * from world.countrylanguage where countrycode='CAN';"
```

## Practice 1: Perform logical backup and restore

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/World/world_mysql_script.sql
```

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/datasets/World/world_mysql_update_1.sql
```

```sql
create database world_P1;
```

```sql
use world_P1;
```

```sql
source world_mysql_script.sql;
```

```sql
SELECT * FROM city WHERE countrycode='BGD';
```

```sql
source world_mysql_update_1.sql;
```

```sql
SELECT * FROM city WHERE countrycode='BGD';
```

```sql
\q
```

```bash
mysqldump --host=mysql --port=3306 --user=root --password world_P1 city > world_P1_city_mysql_backup.sql
```

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="DROP TABLE world_P1.city;"
```

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="SELECT * FROM world_P1.city;"
```

```bash
mysql --host=mysql --port=3306 --user=root --password world_P1 < world_P1_city_mysql_backup.sql
```

```bash
mysql --host=mysql --port=3306 --user=root --password --execute="SELECT * FROM world_P1.city;"
```
