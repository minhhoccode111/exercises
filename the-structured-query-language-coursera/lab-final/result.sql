-- Query SELECT Problems Using the Classic Models database

-- For this lab you must create and execute queries against the ClassicModels database to fulfill the requirements listed below.  As a HINT, the expected number of rows in the answer set is shown in parentheses.

---- List  the names of the cities in alphabetical order where Classic Models has offices. (7)
select * from offices order by city;

---- List the EmployeeNumber, LastName, FirstName, Extension for all employees working out of the Paris office. (5)
select employeenumber, lastname, firstname, extension
from employees
where officecode = 4;

---- List the ProductCode, ProductName, ProductVendor, QuantityInStock and ProductLine for all products with a QuantityInStock between 200 and 1200. (11)
select ProductCode, ProductName, ProductVendor, QuantityInStock, ProductLine 
from products 
where QuantityInStock between 200 and 1200;

---- (Use a SUBQUERY) List the ProductCode, ProductName, ProductVendor, BuyPrice and MSRP for the least expensive (lowest MSRP) product sold by ClassicModels.  (“MSRP” is the Manufacturer’s Suggested Retail Price.)  (1)
select productcode, productname, productvendor, buyprice, msrp
from products
where msrp = (
    select min(msrp) from products
);

---- What is the ProductName and Profit of the product that has the highest profit (profit = MSRP minus BuyPrice). (1)
select productname, (msrp - buyprice) as profit
from products
order by 2 desc
limit 1;

---- List the country and the number of customers from that country for all countries having just two  customers.  List the countries sorted in ascending alphabetical order. Title the column heading for the count of customers as “Customers”.(7)
select distinct country, count(*) as Customers
from customers
group by country
having count(*) = 2
order by 1 asc;

---- List the ProductCode, ProductName, and number of orders for the products with exactly 25 orders.  Title the column heading for the count of orders as “OrderCount”. (12)
select p.productcode, productname, count(ordernumber) as OrderCount
from orderdetails d
join products p
on d.productcode = p.productcode
group by p.productcode
having OrderCount = 25;

---- List the EmployeeNumber, Firstname + Lastname  (concatenated into one column in the answer set, separated by a blank and referred to as ‘name’) for all the employees reporting to Diane Murphy or Gerard Bondur. (8)
select e1.employeenumber, concat(e1.firstname, ' ', e1.lastname) as name
from employees
where reportsto in ('1002', '1102');

---- List the EmployeeNumber, LastName, FirstName of the president of the company (the one employee with no boss.)  (1)
select employeenumber, lastname, firstname
from employees
where reportsto is null;

---- List the ProductName for all products in the “Classic Cars” product line from the 1950’s.  (6)
select productname, productline
from products
where productline like 'Classic Cars'
and productname like '%195_%'
order by productname;

---- List the month name and the total number of orders for the month in 2004 in which ClassicModels customers placed the most orders. (1)
select to_char(orderdate, 'month') as month,
    count(*) as OrderCount
from orders
where date_part('year', orderdate) = 2004
group by month
order by OrderCount desc
limit 1;

---- List the firstname, lastname of employees who are Sales Reps who have no assigned customers.  (2)
select lastname, firstname
from employees
where jobtitle = 'Sales Rep'
and employeenumber not in (
    select salesrepemployeenumber from customers
    where salesrepemployeenumber is not null
);

---- List the customername of customers from Switzerland with no orders. (2)
select customername
from customers
where country = 'Switzerland'
and customernumber not in (
    select distinct customernumber from orders
    where customernumber is not null
);

---- List the customername and total quantity of products ordered for customers who have ordered more than 1650 products across all their orders.  (8)
select customername,
    sum(quantityordered) as "Total Quantity"
from orderdetails d
join orders o
on o.ordernumber = d.ordernumber
join customers c
on c.customernumber = o.customernumber
group by c.customernumber
having sum(quantityordered) > 1650
order by 2 desc;

-- Query DML/DDL Problems Using the Classic Models database

---- Create a NEW table named “TopCustomers” with three columns: CustomerNumber (integer), ContactDate (DATE) and  OrderTotal (a real number.)  None of these columns can be NULL.
create table TopCustomers (
    customernumber integer not null,
    contactdate date not null,
    ordertotal decimal(9, 2) not null defautl 0,
    constraint PKTopCustomers primary key (customernumber)
);

---- Populate the new table “TopCustomers” with the CustomerNumber, today’s date, and the total value of all their orders (PriceEach * quantityOrdered) for those customers whose order total value is greater than $140,000. (should insert 10 rows )

insert into TopCustomers
(
    select c.customernumber, now(),
        sum(PriceEach * quantityOrdered) as TotalOrder
    from orderdetails d
    join orders o
    on d.ordernumber = o.ordernumber
    join customers c
    on o.customernumber = c.customernumber
    group by c.customernumber
    having sum(PriceEach * quantityOrdered) > 140000
);

---- List the contents of the TopCustomers table in descending OrderTotal sequence. (10)
select * from TopCustomers order by ordertotal desc;

---- Add a new column to the TopCustomers table called OrderCount (integer).
alter table TopCustomers
add column ordercount integer;

---- Update the Top Customers table, setting the OrderCount to a random number between 1 and 10.  Hint:  use (RANDOM() *10)
update TopCustomers
set ordercount = floor((random() * 10));

---- List the contents of the TopCustomers table in descending OrderCount sequence. (10 rows)
select * from TopCustomers
order by ordercount desc;

---- Drop the TopCustomers table. (no answer set)
drop table TopCustomers;
