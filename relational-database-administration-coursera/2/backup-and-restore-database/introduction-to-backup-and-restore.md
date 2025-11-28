### Giới thiệu về Sao lưu và Phục hồi

Sau khi xem video này, bạn sẽ có thể:

- Mô tả các kịch bản sao lưu và phục hồi phổ biến,
- Giải thích sự khác biệt giữa sao lưu vật lý và logic,
- Liệt kê các đối tượng có thể sao lưu và phục hồi, và
- Giải thích những điều cần cân nhắc khi sao lưu cơ sở dữ liệu và các đối tượng của nó

### Sao lưu và Phục hồi Cơ sở Dữ liệu

- Sao lưu và phục hồi: Là một thuật ngữ thường được sử dụng trong các cuộc thảo luận về cơ sở dữ liệu, liên quan đến việc bảo vệ dữ liệu trước những sự cố như mất dữ liệu do tắt máy đột ngột, xóa nhầm hoặc dữ liệu bị hỏng
- Các tình huống khác: Bạn có thể cần sao lưu hoặc phục hồi cơ sở dữ liệu để chuyển dữ liệu giữa các hệ quản trị cơ sở dữ liệu (RDBMS), chia sẻ dữ liệu với đối tác kinh doanh, hoặc tạo bản sao dữ liệu cho mục đích phát triển hoặc kiểm thử

### Sao lưu Logic và Vật lý

Sao lưu logic:

- Tạo một tệp chứa các lệnh DDL (như `create table`) và DML (như `insert`) để tái tạo các đối tượng và dữ liệu trong cơ sở dữ liệu
- Thường mất nhiều thời gian hơn với cơ sở dữ liệu lớn và có thể ảnh hưởng đến hiệu suất của các truy vấn đang chạy
- Cho phép sao lưu các đối tượng cụ thể như một cơ sở dữ liệu hoặc bảng, nhưng không thể sao lưu các tệp nhật ký hoặc thiết lập cấu hình cơ sở dữ liệu

Sao lưu vật lý:

- Tạo một bản sao của tất cả các tệp và thư mục lưu trữ vật lý thuộc về bảng, cơ sở dữ liệu, hoặc các đối tượng khác
- Thường nhỏ hơn và nhanh hơn so với sao lưu logic, hữu ích cho các cơ sở dữ liệu lớn hoặc quan trọng yêu cầu thời gian phục hồi nhanh
- Chỉ có thể phục hồi trên hệ thống tương tự do tệp sao lưu đặc trưng cho RDBMS

### Các Đối tượng và Lựa chọn Sao lưu

Đối tượng sao lưu: Bạn có thể chọn sao lưu toàn bộ cơ sở dữ liệu, nội dung của một schema, một hoặc nhiều bảng từ cơ sở dữ liệu, hoặc một tập hợp các đối tượng khác trong cơ sở dữ liệu

Tùy chọn sao lưu:

- Nén tệp sao lưu để giảm kích thước tệp, hữu ích cho cơ sở dữ liệu lớn hoặc khi sao lưu đến vị trí từ xa, nhưng làm tăng thời gian thực hiện
- Mã hóa tệp sao lưu để giảm rủi ro dữ liệu bị xâm phạm, nhưng cũng tăng thời gian sao lưu và phục hồi

### Lưu ý Khi Sao lưu và Phục hồi

- Kiểm tra tính khả dụng: Luôn kiểm tra tệp sao lưu để đảm bảo rằng chúng an toàn và có thể sử dụng, và kế hoạch phục hồi của bạn hoạt động hiệu quả
- Bảo mật: Đảm bảo rằng bạn bảo mật quá trình chuyển giao và lưu trữ tệp sao lưu tương tự như cách bạn bảo mật dữ liệu trong cơ sở dữ liệu

### Tóm tắt

- Sao lưu và phục hồi: Được sử dụng để khôi phục dữ liệu và các mục đích khác
- Sao lưu vật lý: Tạo bản sao của các tệp lưu trữ thô của cơ sở dữ liệu, trong khi sao lưu logic trích xuất dữ liệu và lưu trữ ở định dạng đặc biệt
- Sao lưu các đối tượng: Có thể sao lưu toàn bộ cơ sở dữ liệu hoặc các đối tượng bên trong nó
- Kiểm tra sao lưu: Luôn kiểm tra tính an toàn và khả năng sử dụng của tệp sao lưu và đảm bảo kế hoạch phục hồi hoạt động
- Tùy chọn sao lưu: Có thể sử dụng các tùy chọn để nén hoặc mã hóa tệp sao lưu
