-- Practice some SELECT queries using GROUP functions and GROUP BY

-- List the total (unitprice * quantity) as “Total Value” by orderid for the top 5 orders.  (That is, the five orders with the highest Total Value.)
select orderid,
    sum((unitprice * quantity)) as "Total Value"
from orderdetails
group by orderid
order by 2 desc limit 5;

-- How many products does Northwinds have in inventory?
select sum(unitsinstock)
from products;

-- How many products are out of stock?
select count(*) as "Products out of stock"
from products
where unitsinstock = 0;

-- From which supplier(s) does Northwinds carry the fewest products?
select supplierid, count(productid) as "Supplier's number of products"
from products
group by supplierid
order by 2 limit 1;

-- Which Northwinds employees (just show their employeeid) had over 100 orders ?
select employeeid, count(*) as "Number of orders"
from orders
group by employeeid
having count(*) > 100
order by 2 desc


