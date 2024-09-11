# Lab: User Management and Access Control in PostgreSQL

## Downloading and creating databases

1. Open terminal
2. Install script file

```bash
wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/example-guided-project/flights_RUSSIA_small.sql
```

3. Go to PostgreSQL CLI
4. Restore the data into a new db called `demo`

```sql
\i flights_RUSSIA_small.sql
```

5. Verify that the db was properly created by entering the following command

```sql
\dt
```

## Ex1: Create new Roles and Grant them Relevant Privileges

### Task A: Create a `read_only` role and grant it privileges

1. To create a new role named `read_only`, enter the following command into the CLI

```sql
create role read_only;
```

2. This role needs the privilege to connect to the `demo` db itself. Enter command to grant this privilege

```sql
grant connect on database demo to read_only;
```

3. The role needs to be able to use the schema in use in this db. In our example, this is the `bookings` schema. Grant the privilege for the `read_only` role to use the schema by entering the following

```sql
grant usage on schema bookings to read_only;
```

4. To access the information in tables in the db, the `select` command is used. For the `read_only` role, we want it to be able to access the contents of the db but not to edit or alter it. So for this role, only the `select` privilege is needed. To grant this privilege, enter the following command.

```sql
grant select on all tables in schema bookings to read_only;
```

### Task B: Create a `read_write` role and grant it privileges

1. Create a new role called `read_write` with the following command in the PostgreSQL CLI

```sql
create role read_write;
```

2. First give the privilege to connect to the `demo` db. Grant this privilege with:

```sql
grant connect on database demo to read_write;
```

3. Give the role the privileges to use the `bookings` schema that is used in the `demo` db with the following:

```sql
grant usage on schema bookings to read_write;
```

4. So far the commands for the `read_write` role have been essentially the same as for the `read_only` role. However, the `read_write` role should have the privileges to not only access the contents of the db, but also to create, delete and modify entries. The corresponding commands for these actions are `select`, `insert`, `delete`, and `update`, respectively. Grant this role these privileges by entering the following command into the CLI

```sql
grant select, insert, delete, update on all tables in schema bookings to read_write;
```

## Ex2: Add a New User and Assign them a Relevant Role

1. Create a new user named `user_a`, enter the following command into PostgeSQL CLI

```sql
create user user_a with password 'user_a_password';
```

2. Assign `user_a` the `read_only` role by executing the following command in the CLI

```sql
grant read_only to user_a;
```

3. You can list all the roles and users by typing the following command:

```sql
\du
```

## Ex3: Revoke and Deny Access

1. You can use the `revoke` command in the CLI to remove specific privileges from a role or user in PostgreSQL. Enter the following command into the Postgresql CLI to remove the privileges to access the `aircrafts_data` table from `user_a`:

```sql
revoke select on aircrafts_data from user_a;
```

2. Now suppose `user_a` is transferred departments within the aiport and no longer needs to be able to access the `demo` db at all. You can remove all their `select` privileges by simply revoking the `read_only` role you assgined to them earlier. You can do this by entering the following command in the CLI

```sql
revoke read_only from user_a;
```

3. Now you can check all the users and their roles again to see that the `read_only` role was successfully revokes from `user_a` by entering the following command again

```sql
\du
```

## Practice exercise

**Scenario**: Suppose there is a new employee at the airline in which you are the database administrator for. They interact directly with clients to create new bookings for flights. As such, they will need to not only access the information in the database, but also to create new bookings.

1. You can create a new user using the following command

```sql
create user user_b with password 'user_b_password';
```

2. You can grant the user you just created the `read_write` role by entering the following command into the CLI

```sql
grant read_write to user_b;
```
