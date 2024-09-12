-- return all rows and all columns
select * 
from employees;

/*
return selected columns
*/
select employeeid, lastname, firstname 
from employees;

select lastname, firstname, hiredate, 
    current_date, date_part('month', hiredate)
from employees;

select orderid, uniprice, quantity, 
    unitprice * quantity as total
from orderdetails;

select concat(firstname, ' ', lastname) as fullname
from employees;

