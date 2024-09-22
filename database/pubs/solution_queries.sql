-- 1. Tìm tên tác giả và tiêu đề sách mà họ viết
select authors.au_lname, titles.title
from authors
inner join author_titles on authors.au_id = author_titles.au_id
inner join titles on author_titles.title_id = titles.title_id;

-- 2. Tìm các nhà xuất bản chưa xuất bản sách nào trong năm 1992
select pub_name
from publishers
where pub_id not in (
   select pub_id
   from titles
   where pubdate between '1992-01-01' and '1992-12-31'
);

-- 3. Tính tổng số lượng sách của mỗi tác giả
select authors.au_lname, count(*) as TotalBooks
from authors
inner join author_titles on authors.au_id = author_titles.au_id
group by authors.au_lname;

-- 4. Tìm các sách có tiêu đề bắt đầu bằng chữ "The"
select title
from titles
where title like 'The%';

-- 5. Phân loại sách theo số lượng tác giả (sử dụng các câu lệnh điều kiện CASE WHEN)
select title,
   case when count(*) = 1 then 'Single Author'
      case when count(*) = 2 then 'Two Authors'
      else 'Multiple Authors'
   end as AuthorCount
from titles
inner join author_titles on titles.title_id = author_titles.title_id
group by title;

-- 6. Tìm các sách có giá bán cao hơn giá bán trung bình của tất cả các sách
with AveragePrice as (
   select avg(price) as AvgPrice
   from titles
)
select title, price
from titles, AveragePrice
where price > AvgPrice;
-- or

select title, price
from titles
where price > (
   select avg(price)
   from titles
);

-- 7. Tìm các tác giả đã viết nhiều sách nhất
select au_lname, count(*) as TotalBooks
from authors
where au_id in (
   select au_id
   from author_titles
   group by au_id
   having count(*) = (
      select max(book_count)
      from (
         select au_id, count(*) as book_count
         from author_titles
         group by au_id
      ) as BookCounts
   )
);

-- 8. Tìm các nhà xuất bản chưa xuất bản sách nào trong năm 1992
select pub_name
from publishers
where pub_id not in (
   select pub_id
   from titles
   where year(pubdate) = 1992
);

-- 9. Tính giá trị trung bình của các cuốn sách được xuất bản trong năm 1992
select avg(price) as AveragePrice_1992
from titles
where year(pubdate) = 1992;

-- 10. Tìm các tác giả có ít nhất 2 cuốn sách được xuất bản bởi nhà xuất bản 'New Moon Books'
select au_lname
from authors
where au_id in (
   select au_id
   from author_titles
   where title_id in (
      select title_id
      from titles
      where pub_id = (
         select pub_id
         from publishers
         where pub_name = 'New Moon Books'
      )
   )
   group by au_id
   having count(*) >= 2
);

-- 11. Tìm tác giả có số lượng sách viết nhiều nhất và số lượng sách đó là bao nhiêu
select au_lname, count(*) as TotalBooks
from authors
inner join author_titles on authors.au_id = author_titles.au_id
group by au_lname
having count(*) = (
   select max(book_count)
   from (
      select au_id, count(*) as book_count
      from author_titles
      group by au_id
   ) as BookCounts
);

-- 12. Tìm các nhà xuất bản có doanh thu trung bình cao hơn doanh thu trung bình của tất cả các nhà xuất bản
select pub_name, avg(price) as AverageRevenue
from publishers
inner join titles on publishers.pub_id = titles.pub_id
group by pub_name
having avg(price) > (
   select avg(price)
   from titles
);

-- 13. Tìm các tác giả có ít nhất một cuốn sách được xuất bản sau năm mà họ sinh ra
select au_lname, birthdate
from from authors
where exists (
   select *
   from titles
   inner join author_titles on titles.title_id = author_titles.title_id
   where author_titles.au_id = authors.au_id
   and pubdate > authors.birthdate
);

-- 14. Tìm các sách có giá bán nằm trong top 10% cao nhất
select title, price
from titles
where price >= (
   select percentile_count(0.9) within group (order by price)
from titles
);

-- 15. Tìm các tác giả có ít nhất 2 cuốn sách thuộc cùng một thể loại
select au_lname
from authors
where au_id in (
   select au_id
   from author_titles
   group by au_id, type
   having count(*) >= 2
);
