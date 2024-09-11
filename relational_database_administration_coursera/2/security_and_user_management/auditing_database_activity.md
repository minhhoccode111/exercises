### Kiểm Toán Hoạt Động Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Giải thích tại sao kiểm toán lại quan trọng,
- Mô tả cách kiểm toán truy cập cơ sở dữ liệu,
- Mô tả cách kiểm toán hoạt động cơ sở dữ liệu

### Kiểm Toán Hoạt Động Cơ Sở Dữ Liệu

Kiểm toán cơ sở dữ liệu: Giám sát hoạt động của người dùng trên các đối tượng cơ sở dữ liệu là một phần quan trọng của kế hoạch bảo mật

- Mặc dù kiểm toán không trực tiếp bảo vệ cơ sở dữ liệu, nhưng nó giúp bạn xác định những lỗ hổng trong hệ thống bảo mật và theo dõi các sai sót trong quản lý quyền hạn
- Một số ngành công nghiệp và quốc gia yêu cầu phải kiểm toán việc truy cập dữ liệu nhạy cảm

### Cách Thức Kiểm Toán

Truy cập cơ sở dữ liệu:

- Ghi lại các sự kiện truy cập và hoạt động của người dùng trên các đối tượng cơ sở dữ liệu
- Ví dụ: Trong Db2 on Cloud, bạn có thể sử dụng chức năng xác thực người dùng để ghi lại các sự kiện đăng nhập. Trong MySQL, plugin kiểm toán ghi lại các sự kiện kết nối và ngắt kết nối

Hoạt động cơ sở dữ liệu:

- Một số hệ quản trị cơ sở dữ liệu (RDBMS) sử dụng triggers để ghi lại hoạt động sau khi các sự kiện DML như lệnh INSERT diễn ra
- Ví dụ: Trong Db2 on Cloud, bạn có thể sử dụng chức năng giám sát lịch sử thay đổi để bật kiểm toán trên các bảng hoặc đối tượng cụ thể. Trong Postgres, bạn có thể sử dụng công cụ pgAudit để ghi lại các hành động

### Lợi Ích của Kiểm Toán

- Phát hiện sớm lỗ hổng bảo mật: Kiểm toán giúp bạn phát hiện các hoạt động đáng ngờ và phản ứng kịp thời với các mối đe dọa bảo mật
- Theo dõi truy cập không thành công: Theo dõi cả các nỗ lực truy cập thất bại, điều này có thể giúp phát hiện các cuộc tấn công như brute force

### Yêu Cầu Tuân Thủ

- Bạn nên đảm bảo rằng hệ thống kiểm toán của bạn đáp ứng các yêu cầu tuân thủ của khách hàng hoặc khu vực mà bạn đang hoạt động

### Tóm Tắt

- Kiểm toán không trực tiếp bảo vệ cơ sở dữ liệu, nhưng giúp xác định lỗ hổng bảo mật
- Một số ngành công nghiệp và quốc gia yêu cầu phải tạo và lưu trữ nhật ký kiểm toán
- Nên kiểm toán cả những lần truy cập thành công và thất bại
- Theo dõi và kiểm tra toàn bộ hoạt động trong cơ sở dữ liệu của bạn để đảm bảo an ninh
