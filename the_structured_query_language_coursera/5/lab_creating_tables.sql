-- Create an “items” table with the following schema:

-- items
-- itemID integer primary key,
-- itemcode, varchar(5)null,
-- itemname varchar(40) not null default “ “,
-- quantity integer not null default 0,
-- price decimal (9, 2) not null default 0

create table items
(
    itemid int primary key,
    itemcode varchar(5) null,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price decimal(9, 2) not null default 0
);

-- Populate your new table with data from the Products table
-- Consisting of productid,
-- concat(supplierid, categoryid,discontinued),
-- productname, unitsinstock, unitprice
INSERT INTO items
(
    itemid,
    itemcode,
    itemname,
    quantity,
    price
)
VALUES
(
    1,
    'asdas',
    'item name',
    20,
    10
);

-- solution
INSERT INTO items
    (SELECT productid,
        concat(supplierid, categoryid,discontinued),
        productname, unitsinstock, unitprice
    from products);

