-- 1. Tìm tên tác giả và tiêu đề sách mà họ viết
select au_fname, au_lname, title
from authors a, titles t, titleauthor ta
where a.au_id = ta.au_id and ta.title_id = t.title_id;

-- 2. Tìm các nhà xuất bản chưa xuất bản sách nào trong năm 1992
select p.pub_name
from publishers p
left join titles t -- keep all publishers
-- join titles that pubdate = 1992 on pub_id
on p.pub_id = t.pub_id and year(t.pubdate) = 1992
-- then select the one publisher didn't join
where t.pub_id is null;

-- 3. Tính tổng số lượng sách của mỗi tác giả
select au_fname, au_lname, count(*) as book_count
from authors a, titleauthor ta
where a.au_id = ta.au_id
group by au_fname, au_lname;

-- 4. Tìm các sách có tiêu đề bắt đầu bằng chữ "The"
select * from titles
where title like 'The%';

-- 5. Phân loại sách theo số lượng tác giả (sử dụng các câu lệnh điều kiện CASE WHEN)
select t.title,
   case
      when author_number = 1 then 'Single author'
      when author_number = 2 then 'Two authors'
      when author_number > 2 then 'Multiple authors'
      else 'Unknown'
   end as author_category
from titles t
join (
   select ta.title_id, count(*) as author_number
   from titleauthor ta
   group by ta.title_id
) sub
on sub.title_id = t.title_id

-- 6. Tìm các sách có giá bán cao hơn giá bán trung bình của tất cả các sách
select * from titles
where price > (
   select avg(price)
   from titles
);

-- 7. Tìm các tác giả đã viết nhiều sách nhất
-- duplicate 11.

-- 8. Tìm các nhà xuất bản chưa xuất bản sách nào trong năm 1992
-- duplicate 2.

-- 9. Tính giá trị trung bình của các cuốn sách được xuất bản trong năm 1992
select avg(price) from titles
where year(pubdate) = 1992;

-- 10. Tìm các tác giả có ít nhất 2 cuốn sách được xuất bản bởi nhà xuất bản 'New Moon Books'
select au_fname, au_lname
from titles t, titleauthor ta, authors a, publishers p
where ta.au_id = a.au_id
and ta.title_id = t.title_id
and t.pub_id = p.pub_id
and p.pub_name = 'New Moon Books'
group by au_fname, au_lname
having count(*) >= 2;

-- 11. Tìm tác giả có số lượng sách viết nhiều nhất và số lượng sách đó là bao nhiêu
select a.au_fname, a.au_lname, count(*) as book_count
from authors a, titleauthor ta
where a.au_id = ta.au_id
group by a.au_fname, a.au_lname
having count(*) = (
   -- max book count aggregate
   select max(count_books) from (
      select ta.au_id, count(*) as count_books
      from titleauthor ta
      group by ta.au_id
   ) as sub -- sub query in FROM clause must have alias
);

-- 12. Tìm các nhà xuất bản có doanh thu trung bình cao hơn doanh thu trung bình của tất cả các nhà xuất bản
with revenue_title as (
   select t.pub_id, t.title_id, sum(s.qty) * t.price as total_sales
   from titles t, sales s
   where t.title_id = s.title_id
   group by t.pub_id, t.title_id, t.price
),
average_publisher as (
   select p.pub_name, avg(rt.total_sales) as avg_revenue
   from publishers p
   join (
      select * from revenue_title
   ) rt
   on rt.pub_id = p.pub_id
   group by p.pub_id, p.pub_name
)
select * from average_publisher
where avg_revenue > (
   select avg(avg_revenue) from average_publisher
);

-- 13. Tìm các tác giả có ít nhất một cuốn sách được xuất bản sau năm mà họ sinh ra
-- NOTE: imagine that authors table has a field call birthdate
select a.au_id, a.au_fname, a.au_lname
from authors a, titleauthor ta, titles t
where a.au_id = ta.au_id
and ta.title_id = t.title_id
and year(pubdate) > year(a.birthdate);

-- 14. Tìm các sách có giá bán nằm trong top 10% cao nhất
with price_percentiles as (
   select title, price,
   percent_rank() over (order by price desc) as price_percentile
   from titles
)
select * from price_percentiles
where price_percentile <= 0.1;

-- 15. Tìm các tác giả có ít nhất 2 cuốn sách thuộc cùng một thể loại
select a.au_id, a.au_fname, a.au_lname, t.type, count(*)
from authors a, titleauthor ta, titles t
where a.au_id = ta.au_id
and ta.title_id = t.title_id
-- group by author and title type at the same time
group by a.au_id, a.au_fname, a.au_lname, t.type
having count(*) >= 2;
