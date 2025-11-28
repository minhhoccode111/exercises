# Lab: Troubleshooting with PostgreSQL

## Objectives

After completing this lab, you will be able to:

- Enable error logging for your PostgreSQL instance
- Access server logs for troubleshooting
- Diagnose commonly encoutered issues caused by poor performance, improper configuration, or poor connectivity
- Resolve common issues you may encounter as a database administrator

## Ex1: Set Up Your Database in PostgreSQL

### Task A: Launch PostgreSQL in Cloud IDE

1. Select the Skills Network extension button in the left pane
2. Open the "DATABASES" dropdown menu and select "PostgreSQL"
3. Select the "Start" button. PostgreSQL may take a few moments to start

### Task B Download and Create the Database

1. Open a new terminal selecting the "New Terminal" button near the bottom of the interface
2. Run the following command in the terminal

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/example-guided-project/flights_RUSSIA_small.sql
```

3. Open PostgreSQL CLI
4. Restore the data you downloaded into a new db called `demo`

```bash
\i flights_RUSSIA_small.sql
```

5. Verify that the db was properly created

```bash
\dt
```

## Ex2: Enable Error Logging and Observe Logs

### Task A: Enable Server Logging

1. You can open the file by first opening the file explorer on Cloud IDE then selecting `postgres > data > postgresql.conf`
2. With the configuration file open, scroll down to line 431. Replace `logging_collector = off` with `logging_collector = on` and uncomment the parameter by removing the `#` before the line
3. Save the changes to `postgresql.conf` by either navigating to `File > Save` at the top toolbar or by pressing `Ctrl + S`
4. Changing this parameter requires a server restart in order to take effect. Select the PostgreSQL tab in Cloud IDE
5. Then Click `Stop`
6. Then Click `Start` and re-open the PostgreSQL CLI
7. Confirm that the configuration parameter was successfully changed and loaded into the PostgreSQL instance

```sql
show logging_collector;
```

(you should see that the command return `no`)

### Task B: View the Server Logs

1. Find where the system logs are stored

```sql
show log_directory;
```

2. Open up the file explorer and navigate `postgres > data > log`
3. You will see a file with a name of the form `postgresql-YYYY-MM-DD-<number>.log`. Go ahead and open it
4. Inspect and familiarize yourself with the logs given for a PostgreSQL server startup. Every time you start the server again, a new `.log` file will be created in the `log` folder
5. Navigate back to the PostgreSQL tab
6. Top the PostgreSQL server and close all terminal tabs by press `Stop`

## Ex3: Test the Performance of the PostgreSQL Server

### Task A: Preparation for the Exercises

1. Open a new terminal by navigating to the top menu bar and selecting `Terminal > New terminal`
2. Download a new `postgresql.conf` configuration file

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DB0231EN-SkillsNetwork/labs/PostgreSQL/Lab%20-%20Troubleshooting/postgresql.conf
```

3. Navigate to `postges > data`
4. Right-click `postgresql.conf` in this directory and select **delete**
5. You will be prompted to confirm that you wish to delete this file. Select **OK** to confirm
6. Drag the `postgresql.conf` file you downloaded in Step 1 sitting in the root directory into the `postgres > data` directory
7. Start up the PostgreSQL server again by selecting the `Start` button

### Task B: Test the Performance of the Server

1. Open PostgreSQL CLI
2. Connect to `demo` db

```bash
\connect demo
```

3. To inspect how long each query or command takes, enable the timer

```bash
\timing
```

4. Simple query on the `aircrafts_data` table

```sql
select * from aircrafts_data;
```

Relatively fast query 5. Try a little more computationally heavy query

```sql
update boarding_passes set ticket_no = ticket_no, flight_id = flight_id, boarding_no = boarding_no, seat_no = seat_no;
```

This query takes almost a minute to execute - a fairly long time 6. Open 3 more PostgreSQL CLI terminals to simulate other users
This Error: connection to server at "localhost", FATAL:: sorry, too many clients already

## Ex4:: Troubleshoot

### Task A: Diagnose the issue

1. Check the server logs to see what happened. Open up the Cloud IDE file explorer and navigate to `postgres > data > log`
2. Open up the most recent log file
3. Inspect the most recent logs, as you encountered the problem in Exercise 3
   Some of the most common connectivity problems are not being able to connect to the database server, the database server or instance not running properly, and client login credentials being incorrect.​ You can likely rule out the last two, since the login credentials are automatically inputted for us on Cloud IDE and you know that the server instance is running properly, since you are already connected to it on 3 other terminals. This likely means you could be experiencing some problems connecting to the database server when you open the fourth connection. But why is this?

Server configuration issues, such as inadequate hardware resources or misconfigured settings, can significantly impact performance.​ Perhaps this could explain the connection problem as well as the slow performance you saw on the database query in Exercise 3. Let’s take a look at the server configuration and see if you can spot anything.

4. Using the Cloud IDE file explorer, navigate to `postgres > data` and open the `postgresql.conf` configuration file

5. Scroll down to line 64 of the file and find `max_connection = 4`
   Aha! That’s where the issue was coming from. This parameter sets the maximum number of connections that can be made to the server at any given time. So when you tried to open that fourth CLI terminal, the max number of connections was reached, giving that FATAL error in the logs. Therefore, the problem you encountered comes from improper server configuration, since it’s reasonable to expect more than four users to be connected to the database. Let’s go ahead and fix the issue.

### Task B: Resolve the issue

1. Change the `max_connetion` from 4 to 100. A maximum connections of 100 is a standard value that will support more than enough connections for most applications
   That should fix the issue you encountered when opening those additional CLI terminals

2. Since the server can now support far more connections than before, it will also need more available memory to support these connections. The shared_buffers configuration parameter sets the amount of memory the database server has at its disposal for shared memory buffers. Scroll down to line 121 to find the shared_buffers parameter.
