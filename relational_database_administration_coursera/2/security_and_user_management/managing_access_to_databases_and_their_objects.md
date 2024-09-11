### Quản Lý Quyền Truy Cập Cơ Sở Dữ Liệu và Các Đối Tượng

Sau khi xem bài học này, bạn sẽ có thể:

- Cấp quyền truy cập vào các đối tượng trong cơ sở dữ liệu,
- Thu hồi quyền truy cập,
- Từ chối quyền truy cập vào các đối tượng

### Cấp Quyền Truy Cập Đối Tượng Cơ Sở Dữ Liệu

Sau khi người dùng được xác thực, họ cần quyền hoặc đặc quyền để truy cập các đối tượng và dữ liệu trong cơ sở dữ liệu
Quyền hạn: Được cấp cho người dùng, nhóm hoặc vai trò.

- Quyền hạn tổng thể của người dùng là sự kết hợp giữa các quyền cá nhân và các quyền từ nhóm hoặc vai trò mà họ thuộc về

Lệnh GRANT: Được sử dụng để cấp quyền truy cập vào cơ sở dữ liệu hoặc các bảng

- Ví dụ: Cấp quyền CONNECT để người dùng hoặc nhóm có thể kết nối với cơ sở dữ liệu

### Các Loại Quyền Hạn Cấp

Truy cập bảng:

- Cấp quyền SELECT, INSERT, UPDATE, và DELETE để người dùng hoặc nhóm có thể thao tác trên bảng
- Ví dụ: Cấp quyền SELECT cho nhóm salesteam trên bảng mytable trong cơ sở dữ liệu mydb

Tạo đối tượng:

- Cấp quyền cho nhóm hoặc người dùng để tạo các đối tượng như bảng hoặc thủ tục lưu trữ
- Cấp quyền EXECUTE để chạy thủ tục, hoặc ALTER để chỉnh sửa thủ tục

### Thu Hồi và Từ Chối Quyền Hạn

- Lệnh REVOKE: Sử dụng để thu hồi các quyền đã cấp trước đó. Tuy nhiên, vì quyền của một người dùng là sự kết hợp từ nhiều vai trò hoặc nhóm, người dùng vẫn có thể truy cập thông qua các quyền khác
- Lệnh DENY: Dùng để từ chối quyền truy cập, bất kể trước đó quyền đã được cấp thông qua nhóm hoặc vai trò nào

### Tóm Tắt

- Bạn có thể cấp quyền truy cập cho người dùng, nhóm, hoặc vai trò
- Các quyền điều khiển việc truy cập cơ sở dữ liệu và các đối tượng bên trong nó
- Quyền có thể bao gồm: SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, và DROP
- Bạn có thể thu hồi quyền truy cập hoặc từ chối quyền để ngăn chặn người dùng thực hiện hành động cụ thể
