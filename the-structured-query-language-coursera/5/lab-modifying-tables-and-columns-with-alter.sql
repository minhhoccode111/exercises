-- Check to make sure that your ‘items’ table from Lab 8 is available and full of data
select * from items;

-- Change the name of the ‘items’ table to ‘demo’
alter table items rename to demo;

-- Change the name of the ‘itemcode’ column to ‘itemclass’
alter table demo rename column itemcode to itemclass;

-- Add a new column ‘iteminfo’ to your ‘demo’ table
alter table demo add column iteminfo varchar(255) null;

-- Add some data to your new column, copying the values from the itemclass column
update demo set iteminfo = itemclass;

-- Take another look at your ALTERed table
select * from demo;
