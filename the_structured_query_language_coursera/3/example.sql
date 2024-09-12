-- group by with sum
select orderid,
    sum(unitprice) as "Total Price",
    sum(quantity) as "Total quantity"
from orderdetails
where orderid in (10248, 10249, 10250, 10251)
group by orderid;

select country, count(customerid) as "Total"
from customers
group by country;

select supplierid, round(avg(unitprice)::numeric, 2) as "Total"
from products
group by supplierid;

select suppliered, sum(unitsinstock) as "Inventory"
from products
group by supplierid
order by 2 desc limit 1;

select country, count(customerid) as "Total"
from customers
group by country
having count(customerid) > 5
order by 2 desc;

-- sub query
select productid, productname, unitprice 
from products
where unitprict = (
    select max(unitprice)
    from products
);

select customerid, orderid
from orders
where orderid in (
    select orderid
    from orderdetails
    where quantity > 100
)
order by customerid;

select productname, (
    select sum(unitprice * quantity) 
    from orderdetail
    where orderdetails.productid = products.productid
) as "Total"
from products;

select orderid
from (
    select orderid, sum(quantity)
    from orderdetails
    group by orderid
    having sum(quantity) < 100
) as DetailCount;

-- co-related sub-query 
-- example find all employees in company who earn more than the average salary in their department
select e1.employeeid, e1.employeename, e1.salary
from employees e1
where e1.salary > (
    select avg(e2.salary)
    from employees e2
    where e2.departmentid = e1.departmentid
)

