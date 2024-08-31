-- Check to make sure that your view from Lab 11 is available and ready to use.
select * from topcustomers;

-- Let’s drop and recreate your view from Lab 11, adding a CASE expression.  Add a third column to your view called “Assessment”.
drop view if exists topcustomers;

-- Set the Assessment column equal to “Needs Focus” if the customer’s total sales is less than $60,000
-- Set the Assessment column equal to “Average” if the customer’s total sales is greater than or equal to $60,000 but less than $115,000.
-- Otherwise set the Assessment column equal to “Outstanding” if the customer’s total sales is greater than or equal to $115,000.
create view topcustomers as
select companyname,
    sum(unitprice * quantity) as "Total Sales",
    case
        when sum(unitprice * quantity) < 60000 then 'Needs Focus'
        when sum(unitprice * quantity) <= 115000 then 'Average'
        else 'Outstanding'
    end as Assessment
from customers c
join orders o
on c.customerid = o.customerid
join orderdetails d
on o.orderid = d.orderid
group by companyname
order by 2 desc;

-- Run a Query Against Your View to see the CASE results
select * from topcustomers;
