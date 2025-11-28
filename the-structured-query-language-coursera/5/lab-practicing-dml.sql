-- Check to make sure that your ‘demo’ table from Lab 9 is available and full of data
select * from demo;

-- Insert a new row of data into your "demo" table using format # 1 of the INSERT.  Include these values:
-- VALUES
--     (101,'1234','Spicy Grillmate', 12, 1.99, '1234');
insert into demo 
( itemid, itemclass, itemname, quantify, price, iteminfo)
values
( 101,'1234','Spicy Grillmate', 12, 1.99, '1234');

-- Insert a new row of data into your "demo" table using format # 2 of the INSERT.  Include these values:
-- VALUES
    -- (102,'6789','GlobalWarmer', 24, 42.99, '6789');
insert into demo values
( 102, '6789', 'GlobalWarmer', 24, 42.99, '6789');

-- Update the iteminfo column to ‘0000’ for rows where the itemid is greater than 100
update demo
set iteminfo = '0000'
where itemid > 100;

-- Take another look at your updated table to make sure the updates took place as planned
select * from demo where itemid > 100;

-- Delete the rows you just added  to the “demo” table
delete from demo where itemid > 100;

-- Drop the “demo” table
drop table demo;

