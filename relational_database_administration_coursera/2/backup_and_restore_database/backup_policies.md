### Chính Sách Sao Lưu Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Giải thích sự khác biệt giữa sao lưu nóng và sao lưu lạnh,
- Xác định chính sách sao lưu phù hợp

### Sao Lưu Nóng và Sao Lưu Lạnh

1. Sao lưu nóng (Hot backup):

   - Sao lưu dữ liệu trong khi hệ thống vẫn đang hoạt động
   - Ưu điểm: Không ảnh hưởng đến tính khả dụng, người dùng có thể tiếp tục làm việc trong suốt quá trình sao lưu
   - Nhược điểm: Có thể làm giảm hiệu suất và gây ra rủi ro về tính toàn vẹn dữ liệu nếu dữ liệu thay đổi trong quá trình sao lưu

2. Sao lưu lạnh (Cold backup):
   - Sao lưu khi hệ thống cơ sở dữ liệu đã được tắt (offline)
   - Ưu điểm: Tránh được rủi ro về tính toàn vẹn dữ liệu
   - Nhược điểm: Gây gián đoạn cho người dùng và không phù hợp với hệ thống hoạt động 24/7

### Các Yếu Tố Cần Xem Xét Khi Xây Dựng Chính Sách Sao Lưu

- Tần suất sao lưu: Phụ thuộc vào mức độ quan trọng của dữ liệu và tần suất thay đổi của dữ liệu

  - Ví dụ: Bảng thông tin sản phẩm có thể được sao lưu ít thường xuyên hơn so với bảng đơn đặt hàng
  - Sử dụng sao lưu vi sai hoặc gia tăng để tránh sao lưu toàn bộ thường xuyên

- Thời điểm sao lưu: Thực hiện sao lưu ngoài giờ làm việc nếu dữ liệu chủ yếu được truy cập trong một múi giờ nhất định

  - Nếu dữ liệu được truy cập suốt ngày, có thể thực hiện sao lưu toàn bộ vào cuối tuần và sao lưu vi sai hoặc gia tăng hàng ngày

- Tự động hóa sao lưu: Sử dụng chức năng tự động hóa sao lưu nếu hệ quản trị cơ sở dữ liệu (RDBMS) hỗ trợ, để giảm tải công việc

### Sao Lưu Trên Đám Mây

- Các cơ sở dữ liệu trên đám mây có thể tự động sao lưu, cần kiểm tra và cấu hình chức năng sao lưu tự động hoặc thủ công tùy theo dịch vụ bạn đang sử dụng
  - Ví dụ: Db2 on Cloud hỗ trợ sao lưu mã hóa tự động hàng ngày và phục hồi tại thời điểm
  - Google Cloud SQL hỗ trợ sao lưu gia tăng tự động và sao lưu theo yêu cầu

### Tóm Tắt

- Sao lưu nóng: Sao lưu khi cơ sở dữ liệu đang hoạt động, trong khi sao lưu lạnh yêu cầu tắt cơ sở dữ liệu
- Chính sách sao lưu nên dựa trên nhu cầu phục hồi và tính khả dụng của hệ thống, cùng với mẫu sử dụng dữ liệu
- Hầu hết các cơ sở dữ liệu đám mây được quản lý cung cấp chức năng sao lưu tự động với các tùy chọn cấu hình
