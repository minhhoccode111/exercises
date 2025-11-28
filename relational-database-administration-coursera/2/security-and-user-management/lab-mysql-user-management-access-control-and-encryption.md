# Lab: MySQL User Management, Access Control and Encryption

## Ex1: Manage MySQL user accounts and roles

## Ex2: Control access to MySQL dbs and their objects

## Ex3: Secure data using encryption

1. Go to MySQL CLI

2. First, you will need to hash your passphrase (consider your passphrase is My secret passphrase) with a specific hash length (consider your hash length is 512) using a hash function (here you will use hash function from SHA-2 family). It is good practice to hash the passphrase you use, since storing the passphrase in plaintext is a significant security vulnerability. Use the following command in the terminal to use the SHA2 algorithm to hash your passphrase and assign it to the variable key_str:

```sql
SET @key_str = SHA2('My secret passphrase', 512);
```

3. Let's take a look at the `world` db. First connect to the db

```sql
use world;
```

4. let take a quick look at the `countrylanguage` table in our db

```sql
select * from countrylanguage limit 5;
```

5. For demonstration purposes, suppose that the last column in the table, labeled Percentage contains sensitive data, such as a citizen’s passport number. Storing such sensitive data in plain text is an enormous security concern, so let’s go ahead and encrypt that column.

To encrypt the Percentage column, we will first want to convert the data in the column into binary byte strings of length 255 by entering the following command into the CLI:

```sql
alter table countrylanguage modify column Percentage varbinary(255);
```

6. To actually encrypt the `Percentage` column, we use the AES encryption standard and our hashed passphrase to execute the following command:

```sql
update countrylanguage set Percentage = AES_ENCRYPT(Percentage, @key_str);
```

7. Let's go ahead and see if the column was successfully encrypted by taking another look at the `countrylanguage` table. we again run the same comand as in step 4

```sql
select * from countrylanguage limit 5;
```

8. The supposedly sensitive data is now encrypted and secured from prying eyes. However, we should still have a way to access the encrypted data when needed. To do this, we use the `AES_DECRYPT` command, and since AES is symmetric, we use the same key for both encryption and decryption. In our case, recall that the key was a passphrase which was hashed and stored in the variable `key_str`. Suppose we need to access the sensitive data in that column. We can do so by entering the following command in the CLI:

```sql
select cast(AES_DECRYPT(Percentage, @key_str) as char(255)) from countrylanguage;
```
