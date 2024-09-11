# Lab: Automating Tasks in MySQL Using Shell Script

## Objectives

After completing this lab, you will be able to use the MySQL Command line to:

- Create the sell script to back up the database
- Create a cron job to run then back up script thereby creating a backup file
- Truncate the tables in the database
- Restore the database suing the backup files

## Task A: Create a Database

1. Go to `Terminal > New Terminal` to open a terminal from the side-by-side launched Cloud IDE
2. Download the `sakila_mysql_dump.sql` file to the Cloud IDE

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0110EN-SkillsNetwork/datasets/sakila/sakila_mysql_dump.sql
```

3. Start the MySQL service session using the `start MySQL in IDE button` directive
4. On the launching page, click on the `Start` button
5. Open the `.my.cnf` as root user, with vim editor in terminal to configure your mysql password

```bash
sudo vim ~/.my.cnf
```

6. Add the password you noteed in the previous step to the `.my.cnf` file. This aids in not entering the password over and over again and keeps the password hidden in the config file
   Once you open the `~/.my.cnf` file enter the line `password = <Your MySQL password` and replace the password with your password noted before

```bash
[client]

host = mysql
port = 3306
user = root
password = <Your MySQL Password>
```

7. Save the file and exit vim
8. Initiate the mysql command prompt session within the MySQL service session

```bash
mysql
```

Here you find that you are able to login to mysql without entering the password as it is already configured in the `~/.my.cnf` 9. Create a new database `sakila`

```sql
create database sakila;
```

## Task B: Restore the Structure and Data of a Table

1. Use the newly created empty `sakila` database

```sql
use sakila;
```

2. Restore the `sakila` mysql dump file (containing the `sakila` database table definitions and data) to the newly created empty `sakila` database

```sql
source sakila_mysql_dump.sql
```

3. To chec, list all the table names from the `sakila` database using

```sql
show full tables where table_type = 'BASE TABLE';
```

## Task C: Understanding the Process involved in Creating MySQL database backups

You will create a shell script that does the following:

Writes the database to an sqlfile created with a timestamp, using the mysqldump command

Zips the sqlfile into a zip file using the gzip command

Removes the sqlfile using rm command

Deletes the backup after 30 days

Before you create the script, let’s understand each of the command blocks you will be adding to the file.

1. To start with, you have a database that you want to back up. You will store the name of the database in a variable.

```sql
database='sakila'
```

2. It is always a good practice to print some logs, which can help in debugging

```bash
echo "Pulling Database: This may take a few minutes"
```

3. You will also set the backup folder where the SQL and zipped files will be stored

```bash
backupfolder=/home/theia/backups
```

4. You will decide and set the number of days the backup will need to be kept

```bash
keep_day=30
```

5. You will set the name of the SQL file where you will dump the database as "all-Database-" suffixed with the current timestamp and `.sql` extension, and the zip file in which you will compress the SQL file as "all-database-" suffixed with the current timestamp and `.gz` extension

```bash
sqlfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).sql
zipfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).gz
```

6. That all the placeholders are created, you will create the SQL backup. In MySQL, it can be accomplished with the `mysqldump` command. Depending on whether the operation is successful or not, a log is printed. If the operation is successful, you will compress the `.sql` file into a `.gz` and delete the `.sql` file

```bash
if mysqldujmp $DATABASE > $sqlfile; then
   echo 'Sql dump created'
   # Compress backup
   if gzip -c $sqlfile > $zipfile; then
      echo 'The backup was successfully compressed'
   else
      echo 'Error compressing backup was not created'
      exit
   fi
   rm $sqlfile
else
   echo 'pg_dump return non-zero code no backup was created'
   exit
fi
```

7. Finally, you will remove any backups that are in the system for longer than the time you decided to retain the backup

```bash
find $backupfolder -mtime +$keep_day -delete
```

Now that you have examined the components and understood what the shell script does, let's create a file and save the script in it

## Task D: Creating a Shell Script for MySQL Database Backups

1. Select `File` menu and then select `New File` to create a new shell script named `sqlbackup.sh`
2. Enter the following code in the new file

```bash
#!/bin/sh
# The above line tells the interpreter this code needs to be run as a shell script

# Set the database name to a variable
DATABASE='sakila'

# This will be printed on to the screen. In the case of cron job, it will be printed to the logs
echo "Pulling Database: This may take a few minutes"

# Set the folder where the database backup will be stored
backupfolder=/home/theia/backups

# Number of days to store the backup
keep_day=30


sqlfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).sql
zipfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).gz

# Create a backup
if mysqldujmp $DATABASE > $sqlfile; then
   echo 'Sql dump created'
   # Compress backup
   if gzip -c $sqlfile > $zipfile; then
      echo 'The backup was successfully compressed'
   else
      echo 'Error compressing backup was not created'
      exit
   fi
   rm $sqlfile
else
   echo 'pg_dump return non-zero code no backup was created'
   exit
fi

# Delete old backups
find $backupfolder -mtime +$keep_day -delete
```

2. Save your script using the `Save` option or pressing `Command + S`
3. Now you need to give executable permission for the shell script file, to the owner (yourself), by running the following command in the terminal

```bash
sudo chmod u+x+r sqlbackup.sh
```

4. You decided to create the backups in a folder, but that folder doesn't exist in the environment. You need to create it by running the following command

```bash
mkdir /home/theia/backups
```

## Task E: Setting Up a Cron Job

- Cron is a system that helps Linux users schedule any task. It can be a shell script or a simple bash command.
- A cron job helps us automate our routine tasks and it can be hourly, daily, monthly, etc.
- A crontab (cron table) is a text file that specifies the schedule of cron jobs.
- Each line in the crontab file contains six fields separated by a space followed by the command to be run.

```
* * * * * command(s)
- - - - -
| | | | |
| | | | ----- Day of week (0 - 7) (Sunday=0 or 7)
| | | ------- Month (1 - 12)
| | --------- Day of month (1 - 31)
| ----------- Hour (0 - 23)
------------- Minute (0 - 59)
```

The first five fields may contain one or more values separated by a comma or a range of values separated by a hyphen.

`*` The asterisk operator means any value or always. If you have the asterisk symbol in the Hour field, it means the task will be performed each hour.

`,` The comma operator allows you to specify a list of values for repetition. For example, if you have 1,3,5 in the Hour field, the task will run at 1 a.m., 3 a.m. and 5 a.m.

`-` The hyphen operator allows you to specify a range of values. If you have 1-5 in the Day of week field, the task will run every weekday (from Monday to Friday).

`/` The slash operator allows you to specify values that will be repeated over a certain interval between them. For example, if you have \*/4 in the Hour field, it means the action will be performed every four hours. It is same as specifying 0,4,8,12,16,20. Instead of an asterisk before the slash operator, you can also use a range of values. For example, 1-30/10 means the same as 1,11,21.

To understand how a crontab works, let’s set up a cron job that happens every 2 minutes.

1. To start the crontab, run the following command in the terminal

```bash
crontab -e
```

This will open a crontab editor 2. Scroll to the bottom of the editor page and add this code

```bash
*/2 * * * * /home/project/sqlbackup.sh > /home/project/backup.log
```

3. Press `Ctrl+O` then `Enter` to save theh file
4. Press `Ctrl+X` to quit the cron editor
5. The cron service needs to be explicitly started. Start the cron service by executing the following command

```bash
sudo service cron start
```

6. After 2 minutes, execute the following command to check whether the backup file are created

```bash
ls -l /home/theia/backups
```

> In real-life scenario, the cron service is a long-running service that runs in the background. To stop the cron job you can run `sudo service cron stop`

7. In this example, the cron is set for backup every 2 minutes. Stop the cron service using the command

```bash
sudo service cron stop
```

## Practice Exercise

1. Change the crontab schedule to create a backup every week on Monday at 12:00 a.m

```bash
0 0 * * 1 /home/project/sqlbackup.sh > /home/project/backup.log
```

2. Change the crontab schedule to create a backup every day at 6:00 a.m.

```bash
0 6 * * * /home/project/sqlbackup.sh > /home/project/backup.log
```

## Task F: Truncate the Tables in the Database

Now that you have automated the backup tak, let's replicate the scenario where the data is corrupted or lost and you will remove all the data in the database and restore the data from the backups
We will create a truncate script that does the following

- Connects to mysql RDBMS using the credential
- Lists tables using `show tables` and feeds the output using pipe (`|`) operator to the next command
- Iterates through each table using a while loop and truncate the table

1. Create a new file named `truncate.sh` under `home/project`
2. Copy this script and paste it in the new file

```bash
#!/bin/sh

DATABASE=sakila

mysql -Nse 'show tables' sakila | \
    while read table; do mysql \
    -e "use sakila;SET FOREIGN_KEY_CHECKS=0;truncate table $table;SET FOREIGN_KEY_CHECKS=1;" ;done
```

3. Change the permission of the file

```bash
sudo chmod u+x+r truncate.sh
```

4. Execute the script to truncate the tables

```bash
bash truncate.sh
```

5. Check whether the tables in the database are truncated, log in to the database with the credentials

```
mysql
```

6. Switch to the `sakila` database

```sql
use sakila;
```

7. Check all the tables in the database

```sql
show tables;
```

8. Retrieve all the rows from staff table. If the `truncate` was successful, the output should be an `Empty set`

```sql
select * from staff;
```

9. Quit the mysql prompt

```bash
\q
```

## Task G: Restore the Database

To restore the database:

- You pick up a compressed zip file present in the backup folder and unzip it to extract the sql file using the gunzip command
- You connect to the mysql database and restore the database with sqlfile

1. Find the list of backup files that have been created

```bash
ls -l /home/theia/backups
```

2. Select the file that you want to restore the data from and copy the file name
3. Unzip the file and extract the SQL file from the backup file

```bash
gunzip /home/theia/backups/<backup zip file name>
```

4. Populate and restore the database with the sqlfile that result from the unzip operation

```bash
mysql sakila < /home/theia/backups/<backup sql file name>
```

5. Go the the mysql prompt to check the restored database

```bash
mysql
```

6. Use the `sakila` table

```sql
use sakila;
```

7. Select all the rows from any one of thhe tbales, as given below. You should find that the database is restored.

```sql
selet * froms staff;
```

8. Quit the MySQL command prompt session

```bash
\q
```

## Practice Exercise

1. Create a shell script which takes the database name and back up directory as parameters and backs up the database as `<dbname>_timstamp.sql` in the backup directory. If the database doesn't exist, it should display appropriate message. If the backup dir doesn't exist, it should create one

```bash
dbname=$(mysql -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$1'" | grep $1)

if [ ! -d $2 ]; then
    mkdir $2
fi

if [ $1 == $dbname ]; then
    sqlfile=$2/$1-$(date +%d-%m-%Y).sql
    if mysqldump  $1 > $sqlfile ; then
    echo 'Sql dump created'
    else
        echo 'Error creating backup!'
    fi
else
    echo "Database doesn't exist"
fi
```

2. Write a shell script which takes the database name and the script file as parameter and restores the database from the sql file

```bash
if [ -f $2 ]; then
    dbname=$(mysql -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$1'" | grep $1)
    if [ $1 != $dbname ]; then
        echo "Created DB as it didn't exist"
        mysql -e "Create database $1"
    fi
    mysql -e "use $1"
    mysql $1 < $2
else
    echo "File doesn't exist"
fi
```

## Optional Exercise

Clean up the backups folder by using th following command

```bash
sudo rm -frv /home/theia/backups
```
