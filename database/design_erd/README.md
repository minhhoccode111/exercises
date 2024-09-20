# Design ERD Level 1

## System Objectives

- Manage information about products, customers, and orders.
- Support online sales activities such as adding products, managing inventory, processing orders, and payments.
- Provide statistical reports on sales, customers, and products.

## Main Entities and Attributes

**Product**:

- Product ID
- Product Name
- Description
- Sale Price
- Stock Quantity
- Image

**Customer**:

- Customer ID
- Customer Name
- Address
- Phone Number
- Email
- Password

**Order**:

- Order ID
- Order Date
- Delivery Date
- Total Amount
- Order Status (Processing, Delivered, Canceled)
- Payment Method

**Product Order Details**:

- Order ID
- Product ID
- Quantity
- Unit Price

**Category**:

- Category ID
- Category Name

**Supplier**:

- Supplier ID
- Supplier Name
- Address
- Phone Number

## Relationships

- A customer can place multiple orders.
- An order can contain multiple products.
- A product can belong to multiple categories.
- A product can be supplied by multiple suppliers.

## Business Rules to Consider

- A product must belong to at least one category.
- A product must be supplied by at least one supplier.
- An order must contain at least one product.
- Order status can only change according to a defined process.

## Solutions

### Entity-Relationship Diagram

<details>
    <summary>View use Draw.io</summary>

![Preview](design_erd_level_1.png)

</details>

### Database Creation Result in PostgreSQL

<details>
    <summary>View use DBeaver</summary>

![Preview](result_database_relationship.png)

</details>

### [Create Database](create_database.sql) Script
