-------------------------- OPTIMIZE QUERIES ------------------------------------
-- 1. Yếu tố cần lưu ý khi tối ưu hóa:
-- - Hiểu rõ cấu trúc bảng: Hiểu rõ mối quan hệ giữa các bảng, các cột nào thường được truy vấn và các chỉ mục hiện có
-- - Sử dụng công cụ hỗ trợ: Sử dụng các công cụ như SQL Server Management Studio để xem kế hoạch thực thi của truy vấn, giúp xác định các điểm cần cải thiện
-- - Thử nghiệm: thử nghiệm nhiều cách khác nhau để tìm ra các tối ưu nhất cho từng truy vấn
-- - Lưu ý đến dữ liệu: Nếu lượng dữ liệu lớn, việc tạo chỉ mục có thể làm chậm quá trình cập nhật dữ liệu. Cần cân nhắc giữa hiệu suất truy vấn và hiệu suất cập nhật
-- 2. Gợi ý giải quyết:
-- Để tối ưu hóa các truy vấn trên, bạn có thể áp dụng các kỹ thuật sau:
-- - Sử dụng chỉ mục (index): Tạo các chỉ mục phù hợp cho các cột thường xuyên được sử dụng trong điều kiện WHERE, JOIN và GROUP BY
-- - Hạn chế sử dụng các hàm trong điều kiện WHERE: Ví dụ thay vì `WHERE YEAR(pubdate) = 1992`, hãy tạo một cột mới lưu trữ năm xuất bản và sử dụng cột này trong điều kiên WHERE
-- - Tránh sử dụng `SELECT *`: chỉ chọn các cột cần thiết để giảm lượng dữ liệu truy xuất
-- - Kiểm tra kế hoạch thực thi: sử dụng `EXPLAIN` hoặc các công cụ tương tự để xem SQL Server thực hiện truy vấn như thế nào và tìm các điểm cần cải thiện
-- 3. Lưu ý:
-- - Hiệu quả của các kỹ thuật tối ưu hóa có thể khác nhau tùy thuộc và cấu trúc của cơ sở dữ liệu, lượng dữ liệu và phần cứng
-- - Việc tối ưu hóa truy vấn là một quá trình thử nghiệm sai sót. Bạn cần thử nghiệm nhiều cách khác nhau để tìm ra cách tốt nhất

---------------------------------- EXERCISES -----------------------------------

-- NOTE: primary keys are indexed automatically
-- but not with foreign keys: https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver15#indexes-on-foreign-key-constraints
-- `create index` command by default creates a `nonclustered` index

-- 1. Find authors with more than 1 book. Optimize this query
select a.au_lname, count(*) as TotalBooks
FROM authors a
inner join titleauthor ta on a.au_id = ta.au_id
group by a.au_lname
having count(*) > 1;
-- => au_id: no need index because primary keys on both tables
-- => au_lname: create index for 'group by'
create nonclustered index idx_au_lname on authors (au_lname);

-- 2. Find books of type "business" published by publishers in California. Optimize this query, assuming we have indexes on the type, pub_id, and state columns
select t.title, p.pub_name
from titles t
inner join publishers p on t.pub_id = p.pub_id
where t.type = 'business' and p.state = 'CA';
-- a covering index is one which can satisfy all requested columns in a query without performing a further lookup into the clustered index (advanced optimization)
-- => create a covering index on the titles and publishers table if this query is frequently run
create nonclustered index idx_titles_covering on titles (title_id, type, pub_id) include (title, price, pubdate);
create nonclustered index idx_publishers_covering on publishers (state, pub_id) include (pub_name);

-- 3. Calculate the average price of books written by each author. Optimize this query
select a.au_lname, avg(t.price) as AveragePrice
from authors a
inner join titleauthor ta on a.au_id = ta.au_id
inner join titles t on ta.title_id = t.title_id
group by a.au_lname;
-- => au_id: no need index because primary keys on both tables
-- => title_id: no need index because primary keys on both tables
-- => au_lname: create index for 'group by' (already did at 1.)
-- => avg(t.price): creating a covering index on the titles table that includes price to optimize the aggregation (i.e., avg(t.price)). This will allow the database to retrieve the price column directly from the index without having to access the table (already did in 2.)

-- 4. Find authors with at least 2 books published in the same year. Optimize this query
select t.au_lname
from authors a
inner join titleauthor ta on a.au_id = ta.au_id
inner join titles t on ta.title_id = t.title_id
group by a.au_lname, year(t.pubdate)
having count(*) >= 2;
-- => au_id: already indexed
-- => title_id: already indexed
-- => au_lname: create index for 'group by' (already did in 1.)
-- => year(t.pubdate): add a compute column to avoid using function in the `group by`
alter table titles add pub_year as year(pubdate);
create nonclustered index idx_titles_pub_year on titles (pub_year);

select t.au_lname
from authors a
inner join titleauthor ta on a.au_id = ta.au_id
inner join titles t on ta.title_id = t.title_id
group by a.au_lname, t.pub_year
having count(*) >= 2;

-- 5. Look for publishers whose average book price is higher than $20
select p.pub_name
from publishers p
inner join titles t on p.pub_id = t.pub_id
group by p.pub_name
having avg(t.price) > 20;
-- => pub_id: already indexed
-- => pub_name: create index for 'group by'
-- => avg(t.price): covering index with t.pub_id (already did in 2.)

-- 6. Find authors with at least one book published after 2000 and priced above $30
select a.au_lname
from authors a
inner join titleauthor ta on a.au_id = ta.au_id
inner join titles t on ta.title_id = t.title_id
where t.pubdate > '2000-12-31' and t.price > 30;
-- => au_id: already indexed
-- => title_id: already indexed
-- => t.pubdate: covering index with t.title_id (already did in 2.)
-- => t.price: covering index with t.title_id (already did in 2.)

