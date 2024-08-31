-- Practice some SELECT queries using outer joins

-- Are there any Northwinds employees that have no orders?
select e.employeeid, e.firstname, e.lastname,
    count(o.orderid) as "Total Sales"
from employees e
left outer join orders o
on o.employeeid = e.employeeid
group by e.employeeid
having count(o.orderid) = 0;
-- => no

-- Are there any Northwinds customers that have no orders?
SELECT c.customerid, c.contactname, count(o.orderid) as "Total orders"
FROM customers c
left outer join orders o
on c.customerid = o.customerid 
group by c.customerid
having count(o.orderid) = 0;
-- => yes, 2

-- Are there any Northwinds orders that have bad (not on file) customer numbers?
select count(o.customerid)
from orders o
where o.customerid not in (
    select customerid from orders
);
-- yes, 45

-- Are there any Shippers that have shipped no Northwinds orders?
select count(*)
from shippers
where shipperid not in (
    select distinct shipvia from orders
);
-- no, 0




