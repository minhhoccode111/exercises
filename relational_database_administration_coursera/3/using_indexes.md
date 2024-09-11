### Sử Dụng Chỉ Mục (Indexes)

Sau khi xem video này, bạn sẽ có thể:

- Giải thích cách chỉ mục cải thiện hiệu suất truy vấn,
- Tạo chỉ mục hiệu quả,
- Mô tả các loại chỉ mục cơ sở dữ liệu,
- Tạo khóa chính,
- Tạo và xóa chỉ mục cơ sở dữ liệu,
- Liệt kê các yếu tố cần xem xét khi tạo chỉ mục

### Chỉ Mục Cơ Sở Dữ Liệu Là Gì?

- Giống như mục lục trong sách giúp bạn tìm thông tin nhanh hơn, chỉ mục trong cơ sở dữ liệu giúp tìm kiếm thông tin nhanh chóng
- Chỉ mục là bản sao sắp xếp của các cột được chọn trong bảng để thực hiện tìm kiếm hiệu quả mà không cần tìm qua tất cả các hàng

#### Ví dụ về việc sử dụng chỉ mục

- Chỉ mục được sử dụng để giúp người dùng tìm thông tin nhanh chóng và dễ dàng
- Tuy nhiên, chỉ mục cũng cần thêm dung lượng lưu trữ và phải được cập nhật thường xuyên

### Các Loại Chỉ Mục

1. Khóa chính (Primary Key):

   - Luôn duy nhất, không null, và chỉ có một khóa chính trên mỗi bảng
   - Khóa chính có sắp xếp thứ tự trong bảng theo giá trị của nó

2. Chỉ mục phụ (Secondary Indexes):

   - Có thể có nhiều cột và có thể không được sắp xếp
   - Có thể là duy nhất hoặc không duy nhất

3. Chỉ Mục Duy Nhất (Unique Indexes):

   - Không cho phép các giá trị trùng lặp trong cột chỉ mục
   - Sắp xếp theo thứ tự cột được chỉ định khi tạo chỉ mục (tăng dần hoặc giảm dần)

### Cách Tạo Chỉ Mục và Khóa Chính

- Tạo Khóa Chính: Khóa chính có thể được tạo khi tạo bảng hoặc thêm sau khi bảng đã tồn tại
- Cột `AUTO_INCREMENT`: Tự động tạo giá trị duy nhất cho cột khóa chính (MySQL sử dụng `AUTO_INCREMENT`)

#### Ví dụ

- Tạo bảng với khóa chính trên cột `team_id` trong bảng team
- Tạo chỉ mục với lệnh `CREATE INDEX` và chỉ định bảng và cột chỉ mục

### Xóa Chỉ Mục

- Sử dụng lệnh `DROP INDEX` để xóa chỉ mục
- Khóa chính và chỉ mục duy nhất không thể xóa trực tiếp bằng `DROP INDEX`; cần sử dụng lệnh `ALTER TABLE` trước

### Các Nguyên Tắc Khi Thiết Kế Chỉ Mục

1. Hiểu Cách Cơ Sở Dữ Liệu Được Sử Dụng: Hệ thống sẽ xử lý truy vấn lớn hay tập dữ liệu nhỏ?
2. Hiểu Các Truy Vấn Thường Dùng: Nếu biết truy vấn thường kết hợp nhiều bảng, bạn có thể chọn loại chỉ mục phù hợp
3. Đặc Điểm Của Các Cột: Xác định loại dữ liệu và xem xét việc tạo chỉ mục cho các cột có giá trị duy nhất

#### Cân nhắc khi tạo chỉ mục

- Tùy chọn chỉ mục trực tuyến: Được khuyên dùng khi xây dựng chỉ mục trên bảng lớn mà vẫn cần hoạt động đồng thời
- Lưu trữ chỉ mục ở đâu: Lưu trữ chỉ mục ở nhóm lưu trữ khác với bảng có thể tăng hiệu suất

### Tóm tắt

- Chỉ mục cơ sở dữ liệu cải thiện đáng kể hiệu suất tìm kiếm
- Chỉ mục có thể là khóa chính hoặc chỉ mục phụ
- Dùng lệnh `CREATE INDEX` để tạo chỉ mục và `DROP INDEX` để xóa chỉ mục
- Thiết kế chỉ mục hợp lý là rất quan trọng để tối ưu hóa hiệu suất ứng dụng cơ sở dữ liệu
