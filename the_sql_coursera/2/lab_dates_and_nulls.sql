-- Practice some SELECT queries using DATE functions

-- List the employeeid, firstname + lastname concatenated as ‘employee’, and the age of the employee  when they were hired.
select employeeid, 
    concat(firstname, ' ', lastname) as "Employee",
    age(hiredate, birthdate) as "Age when hired"
from employees;

-- Run a query to calculate your age as of today.  
select cast (age(now(), '2001-01-01')as text);
select age(now(), '2001-01-01')::text;

-- List the employeeid, firstname + lastname concatenated as ‘employee’, and hire date for all employees hired in 1993 
select employeeid,
    concat(firstname, ' ', lastname) as Employee,
    hiredate
from employees
where date_part('year', hiredate) = 1993;

