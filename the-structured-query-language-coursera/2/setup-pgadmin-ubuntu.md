# Setup PgAdmin4 on my Linux Ubuntu 22.04 local

Install postgreSQL

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install postgresql postgresql-contrib libpq-dev
```

Start

```bash
sudo systemctl start postgresql.service && systemctl status postgresql.service
```

## fix `role "mhc" does not exist` (and we can't create a database in PgAdmin GUI)

Switch to postgres

```bash
sudo -i -u postgres
```

Then access postgresql prompt

```bash
psql
```

Create a new role with your username

```bash
CREATE ROLE mhc WITH LOGIN PASSWORD 'postgres';
```

Grant the necessary privilleges to new role

```bash
ALTER ROLE mhc CREATEDB;
```

Then exit

```bash
\q
```

Now we can create new server in PgAdmin GUI (remember to fill the form with the role name and password above)
