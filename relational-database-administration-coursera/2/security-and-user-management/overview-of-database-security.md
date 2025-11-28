### Tổng Quan Về Bảo Mật Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Mô tả các mức độ bảo mật khác nhau của cơ sở dữ liệu,
- Giải thích sự khác biệt giữa xác thực và phân quyền,
- Xác định mức độ chi tiết của bảo mật đối với các đối tượng trong cơ sở dữ liệu,
- Mô tả cách kiểm tra, mã hóa, và bảo mật ứng dụng có thể cải thiện an ninh cơ sở dữ liệu của bạn

### Bảo Mật Cơ Sở Dữ Liệu

- Bảo mật dữ liệu: Một phần quan trọng trong việc quản lý cơ sở dữ liệu. Bạn cần đánh giá các rủi ro và áp dụng các biện pháp bảo mật để giảm thiểu rủi ro tại mọi cấp độ của hệ thống

### Các Cấp Độ Bảo Mật

1. Bảo mật máy chủ:

   - Đảm bảo máy chủ vật lý của bạn an toàn. Đối với các máy chủ tại chỗ, đánh giá ai có quyền truy cập và các biện pháp an ninh tại nơi đặt máy chủ. Nếu sử dụng môi trường đám mây, nhà cung cấp dịch vụ sẽ chịu trách nhiệm về bảo mật

2. Hệ điều hành:

   - Đảm bảo hệ điều hành hosting cơ sở dữ liệu được cập nhật, cấu hình bảo mật, và theo dõi liên tục để ngăn chặn truy cập trái phép

3. Hệ quản trị cơ sở dữ liệu (RDBMS):
   - Áp dụng các bản cập nhật bảo mật, kiểm tra các tùy chọn bảo mật có sẵn, và giới hạn quyền quản trị cho một nhóm người dùng đáng tin cậy

### Xác Thực và Phân Quyền Người Dùng

Xác thực: Xác minh người dùng có quyền truy cập vào cơ sở dữ liệu, tương tự như cách bạn dùng mã PIN hoặc vân tay để mở khóa điện thoại

- Có thể sử dụng xác thực qua hệ điều hành hoặc các phương pháp bên ngoài như PAM, LDAP, hoặc Kerberos

Phân quyền: Sau khi xác thực, người dùng cần được cấp quyền truy cập vào các đối tượng trong cơ sở dữ liệu, như quyền SELECT, INSERT, UPDATE, hoặc DELETE

- Sử dụng nguyên tắc quyền tối thiểu: chỉ cấp quyền truy cập đủ để hoàn thành công việc

### Kiểm Tra, Mã Hóa và Bảo Mật Ứng Dụng

- Kiểm tra và theo dõi: Theo dõi các hoạt động của người dùng trên cơ sở dữ liệu để phát hiện các lỗ hổng bảo mật
- Mã hóa dữ liệu: Bảo mật dữ liệu bằng cách mã hóa. Một số quy định yêu cầu sử dụng mã hóa cho dữ liệu nhạy cảm
- Bảo mật ứng dụng: Đảm bảo rằng mã nguồn và các ứng dụng tương tác với cơ sở dữ liệu được kiểm tra và bảo mật, ngăn chặn các cuộc tấn công như SQL injection
