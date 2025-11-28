### Sử Dụng Biến Trạng Thái, Mã Lỗi và Tài Liệu

Sau khi hoàn thành nội dung này, bạn sẽ có thể:

- Mô tả cách lấy thông tin trạng thái của máy chủ
- Giải thích cách truy xuất mã lỗi và thông tin
- Sử dụng tài liệu RDBMS để khắc phục sự cố

### Kiểm Tra Trạng Thái Hệ Thống

Khi cơ sở dữ liệu gặp vấn đề, bước đầu tiên là kiểm tra sức khỏe và trạng thái của nó

- Mỗi cơ sở dữ liệu đều có các lệnh và tiện ích để nhanh chóng lấy thông tin về tình trạng hoạt động
- Các lệnh này có thể được truy cập qua dòng lệnh hoặc giao diện đồ họa

Ví dụ:

- Trong môi trường UNIX, bạn có thể dùng lệnh `SERVICE MYSQL STATUS` để xem trạng thái MySQL
- Với Db2, dùng lệnh `db2pd` để giám sát trạng thái
- Với PostgreSQL, dùng lệnh `PG_ISREADY` để kiểm tra kết nối

### Biến Trạng Thái

Cơ sở dữ liệu sử dụng nhiều biến trạng thái để cung cấp thông tin về hoạt động

- Biến GLOBAL: Thông tin trạng thái của toàn bộ server (ví dụ: `Aborted_connects`, `Bytes_received`, `Bytes_sent`)
- Biến SESSION: Thông tin trạng thái của kết nối hiện tại

Có thể dùng cú pháp `LIKE` trong câu lệnh `SHOW STATUS` để lọc biến trạng thái theo mẫu

Ví dụ: `SHOW STATUS LIKE 'KEY%'` sẽ chỉ hiển thị biến có chứa "KEY"

### Giao Diện Đồ Họa

Ngoài các lệnh, có thể sử dụng giao diện đồ họa để giám sát trạng thái cơ sở dữ liệu theo thời gian thực

Ví dụ:

- Với SQL Server trên Windows, bạn có thể dùng Activity Monitor để xem thông tin về quá trình hoạt động

### File Log

Log là công cụ quan trọng để xác định thời gian và vị trí lỗi xảy ra

- Log hệ thống: Ghi nhận hoạt động chung của server và kết nối
- Log lỗi cơ sở dữ liệu: Ghi nhận lỗi liên quan đến hoạt động cơ sở dữ liệu

Ví dụ trong SQL Server:

- Error Log: Tạo mỗi khi SQL Server khởi động
- Event Log: Hiển thị sự kiện và lỗi

### Mã Lỗi và Tài Liệu

Khi gặp mã lỗi, bạn có thể cần tra cứu thông tin từ các tài liệu hoặc trang web hỗ trợ để giải mã và khắc phục lỗi

Tài liệu hữu ích:

- IBM Db2: [ibm.com/docs/db2](https://ibm.com/docs/db2)
- PostgreSQL: [postgresql.org/docs](https://postgresql.org/docs)
- MySQL: [dev.mysql.com/doc](https://dev.mysql.com/doc)

### Tóm Tắt

- Cơ sở dữ liệu có các tiện ích để kiểm tra sức khỏe và trạng thái
- Lệnh và cú pháp khác nhau tùy thuộc vào hệ quản trị cơ sở dữ liệu
- Sử dụng các biến trạng thái GLOBAL và SESSION để nắm bắt hoạt động
- Giao diện đồ họa và log giúp theo dõi và khắc phục sự cố
- Có nhiều nguồn tài liệu để giải mã và xử lý mã lỗi
