-- provide a listing showing northwinds employees and a count of each employee's orders sorted from highest to lowest
-- implicit join
select lastname, firstname, count(orderid) as "Order total"
from employees E, orders O -- select 2 tables
where E.employeeid = O.employeeid -- this is where we join 2 tables
group by lastname, firstname
order by 3 desc;

-- explicit join
select lastname, firstname, count(orderid) as "Order total"
from employees E
join orders O
on E.employeeid = O.employeeid
group by lastname, firstname
order by 3 desc;

-- three-way
select lastname, firstname, sum(unitprice * quantity) as "Total Sale"
from employees e
join orders o
on e.employeeid = o.employeeid
join orderdetails d
on d.orderid = o.orderid
group by lastname, firstname
order by 3 desc limit 5;

