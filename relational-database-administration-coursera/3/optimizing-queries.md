### Tối Ưu Hóa Truy Vấn

Sau khi xem video này, bạn sẽ có thể:

- Giải thích cách sử dụng kế hoạch thực thi truy vấn,
- Giải thích tối ưu hóa truy vấn là gì,
- Và mô tả một số công cụ tối ưu hóa truy vấn khác nhau

### Kế Hoạch Thực Thi Truy Vấn

- Chuỗi bước để truy cập dữ liệu trong RDBMS
- Hiển thị chi tiết kế hoạch thực thi cho một câu lệnh truy vấn

#### Cách lấy chi tiết kế hoạch thực thi

- Sử dụng công cụ GUI,
- Thiết lập chế độ truy vấn,
- Sử dụng lệnh EXPLAIN

Kế hoạch thực thi truy vấn là chuỗi bước mà RDBMS sử dụng để truy cập dữ liệu khi thực thi truy vấn. Một số hệ quản trị cơ sở dữ liệu cung cấp các công cụ để tạo ra biểu đồ trực quan của kế hoạch truy vấn, hoặc cho phép trả về mô tả dạng văn bản thông qua lệnh EXPLAIN

### Tối Ưu Hóa Truy Vấn

- Bộ tối ưu hóa truy vấn tìm phương pháp hiệu quả nhất để thực hiện truy vấn
- Đánh giá các kế hoạch thực thi có sẵn
- Quản trị viên cơ sở dữ liệu có thể tinh chỉnh kế hoạch
- Một số RDBMS cho phép cung cấp "hints" cho bộ tối ưu hóa

Hầu hết các hệ quản trị cơ sở dữ liệu đều có tính năng tối ưu hóa truy vấn, sử dụng công cụ tối ưu hóa truy vấn để xác định phương pháp hiệu quả nhất khi thực hiện truy vấn. Quản trị viên có thể cung cấp thêm "hints" trong SQL để hướng dẫn bộ máy sử dụng các phương pháp như chỉ mục để tối ưu hiệu suất

### Công Cụ EXPLAIN

Lệnh EXPLAIN:

- MySQL,
- PostgreSQL,
- Db2

Công cụ EXPLAIN trực quan:

- Db2: Visual Explain,
- MySQL Workbench: Visual Explain Plan,
- PostgreSQL: Tính năng EXPLAIN đồ họa trên PgAdmin

Tất cả các hệ quản trị như MySQL, PostgreSQL và Db2 đều hỗ trợ lệnh EXPLAIN để hiển thị chi tiết kế hoạch thực thi truy vấn dưới dạng văn bản. Một số hệ quản trị cũng cung cấp phiên bản đồ họa của EXPLAIN, giúp tối ưu hóa các truy vấn dễ dàng hơn. Ví dụ, Db2 Visual Explain, MySQL Workbench với Visual Explain Plan, và PgAdmin cho PostgreSQL cung cấp tính năng EXPLAIN trực quan

### Tóm Tắt

- Kế hoạch thực thi truy vấn hiển thị chi tiết các bước truy cập dữ liệu khi thực hiện truy vấn
- Hầu hết các hệ quản trị đều cung cấp nhiều phương pháp để lấy chi tiết kế hoạch thực thi, bao gồm lệnh EXPLAIN và công cụ trực quan
- Tính năng tối ưu hóa truy vấn sử dụng bộ tối ưu hóa để xác định phương pháp thực thi hiệu quả nhất
- Lệnh EXPLAIN hiển thị chi tiết kế hoạch thực thi dưới dạng văn bản cho một truy vấn
