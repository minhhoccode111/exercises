optimize table accounts, employees, sales;

vacuum; -- all tables

vacuum accounts; -- one

vacuum full accounts; -- reclaim more space and lock table, takes longer to run

reindex index myindex;

reindex table mytable;

runstats on table employee
with distribution on columns (empid, empname);

runstats on table employee for indexes empl1, empl2;

db2 reorg table employee use mytemp1;

-- syntax
-- create index index_name
-- on table_name (column1, column2, column3, ...);

create unique index unique_name
on project (projectname);

-- syntax
-- drop index index_name;

-- creating primary key
create table team (
    pk_column team_id integer not null primary key,
    team_name varchar(20)
);

select pid, usename, datname, state, state_change, query from pg_stat_activity;

select pid, usename, datname, state, state_change, query from pg_stat_activity where state = 'active';

select datname, tup_inserted, tup_updated, tup_deleted from pg_stat_database;


