drop view if exists TopEmployeesOrders;

create view TopEmployeesOrders as
select lastname, firstname,
    to_char((sum(unitprice * quanity)), '999,999,999.99') as "Total Sales"
from employees e join
orders o on e.employeeid = o.employeeid join
orderdetails d on o.orderid = d.orderid
group by lastname, firstname
order by 3 desc limit 5;

select * from TopEmployeesOrders;

-- case
select productid, productname, unitprice,
    case 
        when unitprice < 20 then 'Economy'
        when unitprice < 80 then 'Standard'
        else 'Premium'
    end category
from products;

-- union 
select categoryname, sum(unitsinstock)
from categories c 
join products p
on c.categoryid = p.categoryid
group by categoryname
union
select 'Total', sum(unitsinstock)
from products;

-- identity
drop table if exists shoppers;

create table shoppers
(
    shopperid int not null primary key generated always as identity,
    shoppername varchar(40) not null,
    phone varchar(20) not null default '0'
);

-- see highest last used id
select currval(pg_set_serial_sequence('shoppers', 'shopperid'));

-- set the identity to start with 10
alter table shoppers
alter column shopperid
restart with 10;


