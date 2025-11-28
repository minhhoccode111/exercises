### Sử Dụng Nhật Ký Giao Dịch Để Phục Hồi Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Mô tả nhật ký giao dịch cơ sở dữ liệu,
- Giải thích cách sử dụng chính của nhật ký giao dịch,
- Chỉ ra vị trí lưu trữ nhật ký giao dịch và cách truy cập chúng,
- Xác định cấu trúc điển hình của nhật ký giao dịch

### Nhật Ký Giao Dịch Cơ Sở Dữ Liệu

- Nhật ký giao dịch: Lưu trữ tất cả các thay đổi hoặc sửa đổi trong cơ sở dữ liệu
- Chức năng chính: Được sử dụng để phục hồi cơ sở dữ liệu khi dữ liệu bị xóa nhầm hoặc có sự cố về hệ thống như hỏng đĩa
- Phục hồi bằng cách áp dụng nhật ký giao dịch (roll forward recovery): Áp dụng các giao dịch đã hoàn thành từ nhật ký giao dịch để khôi phục cơ sở dữ liệu đến thời điểm trước khi sự cố xảy ra

### Vị Trí Lưu Trữ Nhật Ký Giao Dịch

- Bạn có thể chỉ định vị trí lưu trữ nhật ký giao dịch trong cấu hình cơ sở dữ liệu

- Ví dụ:

  - Trong Db2, nhật ký giao dịch thường nằm trong thư mục con `sqlogdir`
  - Trong PostgreSQL, nhật ký giao dịch nằm trong thư mục con `pg_xlog`

- Nhật ký giao dịch (Write-ahead log - WAL): Trước khi các thay đổi được ghi vào tệp dữ liệu, DBMS sẽ ghi chúng vào WAL để đảm bảo tính nhất quán dữ liệu

- Thực hành tốt: Lưu trữ nhật ký giao dịch trên thiết bị lưu trữ riêng biệt với cơ sở dữ liệu để cải thiện hiệu suất và khả năng phục hồi

### Nâng Cao Khả Năng Phục Hồi

- Một số hệ quản trị cơ sở dữ liệu hỗ trợ tính năng nhật ký phản chiếu tự động hoặc log shipping (chuyển nhật ký) để sao lưu nhật ký giao dịch đến một hệ thống dự phòng
- Trong MySQL, bạn có thể sử dụng lệnh `SHOW BINARY LOGS` để kiểm tra xem nhật ký giao dịch đã được bật hay chưa

### Cấu Trúc Điển Hình Của Nhật Ký Giao Dịch

- ID giao dịch nhật ký: Mã định danh duy nhất cho bản ghi nhật ký
- Loại bản ghi: Mô tả loại bản ghi nhật ký cơ sở dữ liệu
- Số chuỗi nhật ký: Tham chiếu đến giao dịch tạo ra bản ghi nhật ký
- Số chuỗi nhật ký trước: Liên kết với bản ghi nhật ký trước đó, cấu trúc như danh sách liên kết
- Thông tin thay đổi: Chi tiết về các thay đổi đã kích hoạt việc ghi bản ghi nhật ký

### Tóm Tắt

- Nhật ký giao dịch ghi lại các hoạt động thay đổi cấu trúc cơ sở dữ liệu và các giao dịch như chèn, cập nhật, hoặc xóa dữ liệu
- Nhật ký giúp phục hồi cơ sở dữ liệu sau các sự cố như lỗi hệ thống, hỏng đĩa, hoặc xóa nhầm
- Tốt nhất là lưu trữ nhật ký giao dịch ở vị trí riêng biệt với cơ sở dữ liệu để đảm bảo hiệu suất và phục hồi tốt hơn
- Cấu trúc nhật ký giao dịch khác nhau giữa các hệ quản trị cơ sở dữ liệu, nhưng thường bao gồm ID bản ghi và chi tiết về các hoạt động cơ sở dữ liệu
