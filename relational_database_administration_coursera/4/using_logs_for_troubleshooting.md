### Sử Dụng Log Để Khắc Phục Sự Cố

Sau khi hoàn thành nội dung này, bạn sẽ có thể:

- Mô tả log chẩn đoán và mục đích của chúng
- Liệt kê các loại log chẩn đoán khác nhau
- Xác định thông tin trong log chẩn đoán của cơ sở dữ liệu
- Giải thích nơi lưu trữ log chẩn đoán và cách truy cập chúng

### Chẩn Đoán Sự Cố

Chẩn đoán là quy trình có hệ thống để tìm ra nguyên nhân gây lỗi trong hệ thống, giúp xác định và khắc phục các sự cố phần cứng hoặc phần mềm

Log chẩn đoán theo dõi các sự kiện hoặc vấn đề trong hệ thống, giúp lưu lại các sự kiện quan trọng và lỗi theo thứ tự thời gian

Ví dụ: Khi máy chủ web nhận yêu cầu tải tệp bị thiếu, lỗi này sẽ được ghi vào log của máy chủ web

### Các Loại Thông Tin Trong Log

Log có thể chứa các sự kiện, thông điệp thông tin, cảnh báo, hoặc lỗi

Ví dụ về thông điệp cảnh báo là không gian đĩa sắp hết hoặc lỗi sao lưu cơ sở dữ liệu thất bại

### Các Loại Log Khác Nhau

- Log của thành phần máy chủ
- Log của thiết bị lưu trữ
- Log mạng
- Log của hệ điều hành
- Log ứng dụng và cơ sở dữ liệu

### Truy Cập Log

Nhiều file log ở dạng văn bản thuần (plain text), có thể mở bằng bất kỳ trình soạn thảo văn bản nào

Ví dụ: Trên hệ thống Windows, file LOG có thể mở bằng Notepad

Một số log khác yêu cầu công cụ đặc biệt để xem nội dung

### Các Thành Phần Của Thông Điệp Log

- Loại và mức độ nghiêm trọng của vấn đề
- Mã lỗi và thông điệp lỗi
- Địa điểm xảy ra lỗi
- Thời gian
- IP và thông tin của người dùng

### Ví Dụ về Log Chẩn Đoán

Log của Db2 (db2diag.log) chứa thời gian ghi nhận, loại sự kiện, thông tin hệ thống, và chi tiết về tài nguyên hệ thống

### Cấu Hình Vị Trí Lưu Log

Bạn có thể cấu hình vị trí lưu file log và mức độ chi tiết của thông điệp log

Ví dụ: Trong PostgreSQL, có thể cấu hình log đích (log_destination) để lưu log vào syslog (Linux), event log (Windows), hoặc CSVLOG để dễ dàng nhập vào bảng và truy vấn

Trong MySQL, log lỗi chứa thông điệp chẩn đoán và cảnh báo khi máy chủ khởi động và tắt máy

### Tóm Tắt

- DBA cần nắm rõ nhiều loại log, đặc biệt là log chẩn đoán của cơ sở dữ liệu
- Log chẩn đoán chứa thông tin sự kiện, cảnh báo, và lỗi theo thời gian
- Đa số log ở dạng văn bản và có thể cấu hình vị trí lưu và mức độ chi tiết của thông điệp
