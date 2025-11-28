### Các đối tượng hệ thống và Cấu hình cơ sở dữ liệu

Sau khi xem video này, bạn sẽ có thể:

- Mô tả mục đích của các đối tượng hệ thống,
- Nhận diện các loại đối tượng hệ thống khác nhau,
- Mô tả cách sử dụng tệp cấu hình,
- Giải thích các thiết lập cấu hình phổ biến, và
- Mô tả cách cấu hình cơ sở dữ liệu tại chỗ và trên đám mây

### Các đối tượng hệ thống và Siêu dữ liệu

- Siêu dữ liệu: Là dữ liệu chứa thông tin về cơ sở dữ liệu, như tên của cơ sở dữ liệu hoặc bảng, kiểu dữ liệu của cột, hoặc quyền truy cập
- RDBMS lưu trữ siêu dữ liệu: Trong các cơ sở dữ liệu đặc biệt, schema, hoặc catalog
- Các tên khác: Một số thuật ngữ khác cho nơi lưu trữ này là từ điển dữ liệu (data dictionary) và catalog hệ thống

### Các đối tượng hệ thống trong RDBMS

Db2: Sử dụng `catalog` và `directory`

- Catalog: Bao gồm các bảng dữ liệu về mọi thứ được định nghĩa trong hệ thống Db2
- Directory: Chứa dữ liệu kiểm soát nội bộ của Db2, được sử dụng trong quá trình hoạt động bình thường

MySQL: Sử dụng `system schema` để lưu trữ siêu dữ liệu

- Ví dụ: MySQL có các cơ sở dữ liệu hệ thống như `information_schema`, `mysql`, `performance_schema`, và `sys`

PostgreSQL: Sử dụng `system catalog`, là một schema với các bảng và khung nhìn chứa siêu dữ liệu về tất cả các đối tượng khác trong cơ sở dữ liệu

### Tệp cấu hình và Thiết lập

Tệp cấu hình: Lưu trữ thông tin mà cơ sở dữ liệu cần khi khởi tạo

- Thiết lập chung: Vị trí của dữ liệu và tệp nhật ký, cổng mà máy chủ lắng nghe các yêu cầu
- Thiết lập hiệu suất: Bao gồm phân bổ bộ nhớ, thời gian chờ kết nối, kích thước gói tối đa, v.v

Các tệp cấu hình trong RDBMS:

- Db2: Sử dụng tệp `SQLDBCONF`
- MySQL: Sử dụng `my.ini` trên hệ thống Windows và `my.cnf` trên hệ thống Linux
- PostgreSQL: Sử dụng tệp `postgresql.conf`

### Cấu hình cơ sở dữ liệu

Cơ sở dữ liệu tại chỗ (On-premises):

- Dừng dịch vụ cơ sở dữ liệu, sửa đổi tệp cấu hình, sau đó khởi động lại dịch vụ để áp dụng các thay đổi

Cơ sở dữ liệu trên đám mây:

- Chọn các tùy chọn cấu hình khi tạo cơ sở dữ liệu
- Có thể mở rộng các tùy chọn cấu hình như dung lượng lưu trữ và sức mạnh tính toán mà không cần chỉnh sửa tệp cấu hình

### Tóm tắt

- Đối tượng hệ thống: Lưu trữ siêu dữ liệu cơ sở dữ liệu
- Truy vấn siêu dữ liệu: Để lấy thông tin về cấu hình và hiệu suất của cơ sở dữ liệu
- Tên gọi khác nhau: Các RDBMS sử dụng các tên khác nhau cho đối tượng hệ thống của họ, như `system schema`, `system tables`, `catalog`, hoặc `directory`
- Tệp cấu hình: Lưu trữ thông tin cần thiết để cơ sở dữ liệu khởi động
- Cấu hình tại chỗ và trên đám mây: Tại chỗ yêu cầu chỉnh sửa tệp cấu hình, còn trên đám mây có thể mở rộng thiết lập một cách động
