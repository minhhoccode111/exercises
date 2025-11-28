### Cải Thiện Hiệu Suất Của Truy Vấn Chậm Trong MySQL

Sau khi hoàn thành nội dung này, bạn sẽ có thể:

- Mô tả các nguyên nhân phổ biến gây ra truy vấn chậm trong MySQL,
- Xác định lý do hiệu suất truy vấn bằng lệnh EXPLAIN,
- Cải thiện hiệu suất truy vấn của bạn bằng cách sử dụng chỉ mục và các phương pháp tối ưu khác.

### Nguyên Nhân Phổ Biến Gây Ra Truy Vấn Chậm

1. Kích thước cơ sở dữ liệu: Cơ sở dữ liệu lớn với nhiều bảng và dữ liệu có thể làm truy vấn chạy chậm.
2. Truy vấn chưa được tối ưu hóa: Nếu cơ sở dữ liệu chưa được chỉ mục hợp lý, các truy vấn sẽ mất nhiều thời gian hơn để trả về kết quả.

### Lệnh EXPLAIN

- Lệnh EXPLAIN cung cấp thông tin về cách MySQL thực thi truy vấn.
- Nó giúp bạn xác định xem truy vấn có truy xuất nhiều dữ liệu hơn cần thiết hay không, ảnh hưởng đến hiệu suất.

#### Ví dụ

- EXPLAIN cho biết kiểu chọn dữ liệu, bảng được truy vấn, và số lượng hàng được kiểm tra.
- Nếu truy vấn kiểm tra quá nhiều hàng nhưng chỉ trả về ít kết quả, đó có thể là nguyên nhân của truy vấn chậm.

### Tối Ưu Truy Vấn Bằng Chỉ Mục

Chỉ mục giống như dấu trang, giúp truy vấn tìm kết quả nhanh hơn bằng cách tránh tìm qua toàn bộ bảng.
Các loại chỉ mục bao gồm:

- Chỉ mục thường: Giá trị không cần phải duy nhất và có thể là NULL.
- Chỉ mục chính (Primary Index): Dành cho khóa chính, các giá trị đều duy nhất và không NULL.
- Chỉ mục duy nhất: Các giá trị phải duy nhất nhưng có thể chứa giá trị NULL.
- Chỉ mục toàn văn (Full-Text Index): Tìm kiếm trong các cột chứa văn bản lớn.
- Chỉ mục tiền tố (Prefix Index): Sử dụng ký tự đầu tiên của chuỗi để cải thiện tốc độ truy vấn.

### Cách Sử Dụng Chỉ Mục Hiệu Quả

- Không nên thêm chỉ mục cho tất cả các cột, chỉ nên thêm cho các cột thường xuyên được truy vấn.
- Thêm chỉ mục có thể cải thiện truy vấn, nhưng cũng làm chậm các thao tác chèn, cập nhật và xóa do chỉ mục cần được cập nhật.
- Đối với bảng nhỏ hoặc bảng lớn với hầu hết các hàng cần được kiểm tra, chỉ mục có thể không giúp ích.

### Các Mẹo Cải Thiện Hiệu Suất Truy Vấn

1. Chọn cột cụ thể: Tránh chọn tất cả các cột từ bảng, chỉ chọn những cột cần thiết.

   - Ví dụ: Truy vấn chỉ chọn cột `employee_number` và `hire_date` có thời gian thực thi nhanh hơn chọn tất cả các cột.

2. Tránh wildcard dẫn đầu (%abc): Wildcard như vậy sẽ làm quét toàn bộ bảng, ngay cả khi có chỉ mục. Thay vào đó, sử dụng chỉ mục toàn văn.

3. Sử dụng UNION ALL thay vì OR: UNION ALL giúp cải thiện tốc độ truy vấn khi dùng với chỉ mục, trong khi OR có thể quét toàn bộ bảng và bỏ qua chỉ mục.

### Tóm tắt

- Nguyên nhân phổ biến gây ra truy vấn chậm là kích thước cơ sở dữ liệu và truy vấn không được tối ưu hóa.
- Lệnh EXPLAIN giúp xác định lý do tại sao truy vấn chạy chậm.
- Sử dụng chỉ mục đúng cách và các mẹo tối ưu hóa khác sẽ cải thiện hiệu suất truy vấn của bạn.
