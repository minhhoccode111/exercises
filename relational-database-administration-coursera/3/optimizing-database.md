### Tối Ưu Hóa Cơ Sở Dữ Liệu

Sau khi xem video này, bạn sẽ có thể:

- Mô tả lý do tại sao cần tối ưu hóa cơ sở dữ liệu,
- Mô tả lệnh OPTIMIZE TABLE cho MySQL,
- Mô tả lệnh VACUUM và REINDEX cho PostgreSQL,
- Mô tả lệnh RUNSTATS và REORG cho Db2

### Tại Sao Cần Tối Ưu Hóa Cơ Sở Dữ Liệu?

- Theo thời gian, dữ liệu trở nên phân mảnh và các bảng có thể rỗng một phần, ảnh hưởng đến hiệu suất cơ sở dữ liệu
- Tối ưu hóa giúp nhận diện các điểm nghẽn, tinh chỉnh truy vấn và giảm thời gian phản hồi

### Các Lệnh Tối Ưu Hóa Cơ Sở Dữ Liệu

1. MySQL – Lệnh OPTIMIZE TABLE:

Dùng để tổ chức lại dữ liệu bảng và chỉ mục, giảm dung lượng lưu trữ và cải thiện hiệu suất I/O
Yêu cầu quyền SELECT và INSERT trên bảng

2. PostgreSQL – Lệnh VACUUM và REINDEX:

VACUUM: Thu hồi không gian lưu trữ bị chiếm dụng bởi các tuples không còn được sử dụng

- Có thể chạy song song với các tác vụ đọc/ghi
- Sử dụng tùy chọn FULL để tối ưu không gian nhưng tốn thời gian hơn và cần khóa toàn phần

REINDEX: Dùng để tái tạo lại các chỉ mục, thay thế các chỉ mục cũ hoặc bị hỏng

3. Db2 – Lệnh RUNSTATS và REORG:

RUNSTATS: Cập nhật thống kê cho các bảng và chỉ mục, giúp tối ưu hóa đường dẫn truy vấn
REORG TABLE: Tổ chức lại bảng để loại bỏ dữ liệu phân mảnh và nén thông tin
REORG INDEX: Tổ chức lại chỉ mục để tăng hiệu quả truy cập

### Ví Dụ Lệnh

- MySQL: Tối ưu hóa ba bảng bằng lệnh `OPTIMIZE TABLE`
- PostgreSQL: Chạy lệnh `VACUUM` và `REINDEX` để thu hồi không gian và tái tạo chỉ mục
- Db2: Chạy lệnh `RUNSTATS` để thu thập thống kê và `REORG` để tổ chức lại bảng và chỉ mục

### Tóm tắt

Tối ưu hóa cơ sở dữ liệu giúp cải thiện thời gian phản hồi và hiệu suất
Mỗi hệ quản trị cơ sở dữ liệu có các lệnh tối ưu hóa riêng:

- MySQL: OPTIMIZE TABLE,
- PostgreSQL: VACUUM và REINDEX,
- Db2: RUNSTATS và REORG
