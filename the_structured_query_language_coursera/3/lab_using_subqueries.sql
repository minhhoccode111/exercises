-- Practice some SELECT queries using subqueries

-- List the productid, productname, unitprice of the lowest priced product Northwinds sells. 
select p1.productid, p1.productname, p1.unitprice
from products p1
where p1.unitprice = (
    select min(p2.unitprice)
    from products p2
);

-- How many orders in the orders table have a bad customerID (either missing or not on file in the customers table.) 
select count(*) as "Number of bad customerid"
from orders
where customerid is null 
or customerid not in (
    select customerid 
    from customers
);

-- Use a subquery in a SELECT to list something interesting.  
select productid, productname, unitprice,
    round((select avg(unitprice) from products), 2) as "Average Unit Price"
from products;


-- Use a subquery in a FROM to list something interesting. 
select count(*)
from (
    select * from products
) as products;


