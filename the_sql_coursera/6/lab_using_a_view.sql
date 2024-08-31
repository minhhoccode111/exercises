-- Create a "TopCustomers" view  using the following SELECT statement to populate the view.

-- SELECT companyname, sum(unitprice * quantity) as "Total Sales"
-- fromcustomers CJOIN
-- orders O ONC.customerid  =  O.customerid JOIN
-- orderdetails D ON O.orderid  =  D.orderid
-- GROUP BY companyname 
-- Order By 2 desc LIMIT5;

create view topcustomers as
select companyname, sum(unitprice * quantity) as "total sales"
from customers c
join orders o
on c.customerid = o.customerid
join orderdetails d
on o.orderid = d.orderid
group by companyname
order by 2 desc;

-- Run a Query Against Your View to ensure that it works
select * from TopCustomers limit 5;
