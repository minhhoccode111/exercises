-- Practice some SELECT queries using inner joins

-- List each order and its Total Value (unitprice * quantity) for all orders shipping into France in descending Total Value order.
SELECT o.orderid,
    (d.unitprice * d.quantity),
    o.shipcountry
FROM orders o
join orderdetail d
on o.orderid = d.orderid
where o.shipcountry = 'France';

-- Create a Suppliers List showing Supplier CompanyName, and names of all the products sold by each supplier located in Japan.
select  productid, productname, s.supplierid, companyname, country
from suppliers s
join products p
on s.supplierid = p.supplierid
where country = 'Japan'
order by 3;

-- Create a “Low Performers” list showing the employees who have less than $100,000 in total sales.  List the employee’s LastName, FirstName followed by their total sales volume (the total dollar value of their orders.)
select e.employeeid, e.firstname, e.lastname, 
    sum(d.unitprice * d.quantity) as "Total Sale"
from orderdetails d
join order o
on d.orderid = o.orderid
join employees e
on e.employeeid = o.employeeid
group by e.employeeid
having sum(d.unitprice * d.quantity) < 100000
order by 4 desc;

