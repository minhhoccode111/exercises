### Người Dùng, Nhóm và Vai Trò Trong Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Mô tả khái niệm người dùng, nhóm, và vai trò,
- Giải thích cách người dùng, nhóm, và vai trò tương tác với nhau,
- Quản lý các đối tượng bảo mật cơ sở dữ liệu

### Người Dùng, Nhóm và Vai Trò

1. Người dùng cơ sở dữ liệu:

   - Tài khoản người dùng được phép truy cập vào các đối tượng cụ thể trong cơ sở dữ liệu
   - Người dùng có thể được tạo và xác thực trực tiếp trong hệ quản trị cơ sở dữ liệu (RDBMS) hoặc xác thực qua các hệ thống bên ngoài như hệ điều hành, Kerberos, LDAP, hoặc Cloud IAM

2. Nhóm người dùng:

   - Postgres: Định nghĩa nhóm người dùng trực tiếp trong cơ sở dữ liệu để đơn giản hóa việc quản lý
   - SQL Server và Db2: Ánh xạ nhóm cơ sở dữ liệu với nhóm quản trị của hệ điều hành
   - Amazon RDS: Sử dụng nhóm bảo mật VPC và DB để quản lý quyền truy cập người dùng

3. Vai trò trong cơ sở dữ liệu:

   - Vai trò xác định một tập hợp quyền hạn để thực hiện một chức năng cụ thể trong cơ sở dữ liệu (ví dụ: vai trò sao lưu sẽ có quyền thực hiện các chức năng sao lưu)
   - Một số hệ quản trị cơ sở dữ liệu cung cấp vai trò mặc định như chủ sở hữu cơ sở dữ liệu hoặc người vận hành sao lưu
   - Bạn có thể tạo các vai trò tùy chỉnh cho các nhu cầu riêng biệt, chẳng hạn như vai trò nhân viên bán hàng với các quyền truy cập cần thiết vào các bảng liên quan

### Đơn Giản Hóa Quản Lý Người Dùng Bằng Nhóm và Vai Trò

Quản lý dễ dàng: Thay vì cấp quyền riêng lẻ cho từng người dùng, bạn có thể đưa họ vào một nhóm hoặc vai trò và cấp quyền cho cả nhóm hoặc vai trò đó

- Nếu chức năng công việc của nhóm thay đổi, bạn chỉ cần cập nhật quyền cho nhóm mà không cần chỉnh sửa từng người dùng
- Thêm nhân viên mới cũng dễ dàng hơn: chỉ cần thêm họ vào nhóm hoặc vai trò tương ứng

Nguyên tắc quyền tối thiểu: Chỉ cấp quyền truy cập cần thiết để hoàn thành công việc, tránh việc cấp quá nhiều quyền không cần thiết

### Tóm Tắt

- Tùy vào hệ thống cơ sở dữ liệu, bạn có thể tạo và xác thực người dùng trực tiếp hoặc qua hệ thống bên ngoài
- Nhóm và vai trò giúp đơn giản hóa việc quản lý người dùng, quyền hạn
- Bạn có thể sử dụng các vai trò mặc định hoặc tạo vai trò tùy chỉnh để đáp ứng các yêu cầu cụ thể
- Quản lý bảo mật trở nên hiệu quả hơn với việc sử dụng nhóm và vai trò
