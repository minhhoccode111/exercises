-- Practice some SELECT queries

-- List all the products in the Northwinds database showing productid, productname, quantity per unit, unitprice, and unitsinstock.
select productid, productname, quantityperunit, unitprice, unitsinstock
from products;

-- For all employees at Northwinds, list the first name and last name concatenated together with a blank space in-between, and the YEAR when they were hired.
select concat(firstname, ' ', lastname) as Fullname,
    (date_part('year', hiredate)) as "Hired year"
from employees;

-- For all products in the Northwinds database, list the productname, unitprice, unitsinstock,  and the total value of the inventory of that product as “Total Value”.  (HINT:  total value = unitsinstock * unitprice.) 
select productname, unitprice, unitsinstock, 
    (unitprice * unitsinstock) as "Total Value"
from products;

-- For all employees at Northwinds, list the first name and last name concatenated together with a blank space in-between with a column header “Name”, and the name of the month (spelled out) for each employee’s birthday.  
select concat(firstname, ' ', lastname) as Name,
    -- to_char spell out month
    (to_char('month', birthdate)) as "Birthdate Month"
from employees;
