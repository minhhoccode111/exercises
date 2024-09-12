-- example

create table items
(
    itemid int not null primary key,
    itemcode varchar(5) unique,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price real not null default 0,
);

create table items
(
    itemid int not null primary key,
    supplierid int not null,
    itemcode varchar(5) unique,
    itemname varchar(40) not null defautl ' ',
    quantity int not null default 0,
    price decimal(9, 2) check (price < 1000)
);

create table items
(
    itemid int not null,
    supplierid int not null,
    itemcode varchar(5) unique,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price decimal(9, 2) check (price < 1000),
    primary key (itemid),
    constraint fk_supplier FOREIGN KEY(supplierid) REFERENCES suppliers(supplierid)
);

create table items
(
    itemid int not null,
    supplierid int not null,
    itemcode varchar(5) unique,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price decimal(9, 2) check (price < 1000),
    primary key (itemid, supplierid)
);

create table items
(
    itemid int not null,
    supplierid int not null,
    itemcode varchar(5) unique,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price decimal(9, 2) check (price < 1000),
    primary key (itemid),
    constraint fk_supplier FOREIGN KEY(supplierid)
    REFERENCES suppliers(supplierid)
);

drop table if exists items;

create table items
(
    itemid int not null,
    supplierid int not null,
    itemname varchar(40) not null default ' ',
    quantity int not null default 0,
    price decimal(9, 2) check (price < 1000),
    primary key (itemid),
    constraint fk_supplier foreign key(supplierid)
    references suppliers(supplierid)
    on delete no action
);

insert into items
(
    select productid, supplierid, productname, unitsinstock, unitprice
    from products
);

delete from suppliers
where supplierid = 27;

insert into items
    (
    select productid, supplierid, productname, unitsinstock, unitprice,
        (categoryid::text || reorderlevel::text || discontinued)
    from products
    );

alter table items
rename to "alters";

alter table alters
rename column "itemname" to "itemdescription";

alter table alters
add column "itemunit" varchar(5) null;

update alters
set "itemcode" = 22
where price < 20;

alter table alters
drop column "itemcode";


