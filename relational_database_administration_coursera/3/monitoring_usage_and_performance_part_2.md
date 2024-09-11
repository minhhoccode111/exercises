### Giám sát Sử dụng và Hiệu suất – Phần 2

Sau khi xem video này, bạn sẽ có thể:

- Mô tả các chỉ số chính về sử dụng và hiệu suất cơ sở dữ liệu,
- Mô tả các công cụ có sẵn trong sản phẩm để xem xét các chỉ số,
- Giới thiệu các công cụ giám sát của bên thứ ba

### Các Chỉ Số Chính về Hiệu Suất Cơ Sở Dữ Liệu

1. Thông lượng Cơ sở Dữ liệu: Đo lường khối lượng công việc cơ sở dữ liệu đang xử lý, thường được đo bằng số truy vấn thực hiện mỗi giây
2. Sử dụng Tài nguyên Cơ sở Dữ liệu: Theo dõi việc sử dụng CPU, bộ nhớ, dung lượng lưu trữ và không gian log
3. Tính sẵn sàng của Cơ sở Dữ liệu: Xác định cơ sở dữ liệu đang hoạt động hay không, thông qua phần trăm thời gian khả dụng
4. Độ phản hồi của Cơ sở Dữ liệu: Đo thời gian phản hồi trung bình cho mỗi truy vấn
5. Cạnh tranh Cơ sở Dữ liệu: Xác định cạnh tranh giữa các kết nối, thông qua đo lường lock-waits và các kết nối đồng thời
6. Đơn vị công việc: Theo dõi các giao dịch tiêu thụ nhiều tài nguyên nhất

### Các Chỉ Số Bổ Sung

1. Kết nối: Hiển thị thông tin kết nối mạng tới cơ sở dữ liệu và theo dõi các kết nối mở, giúp phát hiện truy vấn chạy lâu
2. Truy vấn thường gặp: Theo dõi các truy vấn phổ biến nhất và độ trễ trung bình của chúng
3. Đối tượng bị khóa: Cung cấp thông tin chi tiết về các quá trình bị khóa và nguyên nhân khóa
4. Thủ tục lưu trữ: Hiển thị các chỉ số thực thi cho các thủ tục lưu trữ và hàm ngoại vi
5. Buffer pools: Theo dõi việc sử dụng buffer pools để cải thiện hiệu suất cơ sở dữ liệu
6. Người tiêu thụ nhiều nhất: Xác định các người tiêu thụ tài nguyên hàng đầu để giúp lập kế hoạch dung lượng

### Các Công Cụ Giám Sát Sẵn Có

- Db2: Sử dụng Db2 Data Management Console, Workload Manager, và Snapshot Monitors
- PostgreSQL: Dùng pgAdmin Dashboard – một công cụ mã nguồn mở phổ biến để giám sát truy vấn
- MySQL: Sử dụng Performance Dashboard, Performance Reports, Query Statistics và MySQL Query Profiler

### Các Công Cụ của Bên Thứ Ba

- pganalyze: Tối ưu hóa hiệu suất và cung cấp thông tin phân tích truy vấn tự động cho PostgreSQL
- PRTG Network Monitor: Giám sát truy vấn cho PostgreSQL, MySQL, SQL Server, Oracle
- SolarWinds Database Performance Analyzer: Giải pháp giám sát dựa trên đăng ký
- Foglight for Databases: Giám sát toàn diện mọi nền tảng cơ sở dữ liệu trong một giao diện duy nhất
- Datadog: Nền tảng SaaS kết nối với hơn 450 hệ thống khác nhau

### Tóm tắt

- Có nhiều chỉ số khác nhau để giám sát sử dụng và hiệu suất cơ sở dữ liệu
- Nhiều công cụ giám sát có sẵn từ nhà cung cấp cơ sở dữ liệu, và cũng có các công cụ từ bên thứ ba
