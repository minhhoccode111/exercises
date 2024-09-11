### Các đối tượng Cơ sở Dữ liệu

Sau khi xem video này, bạn sẽ có thể:

- Nhớ lại hệ thống phân cấp của các đối tượng cơ sở dữ liệu
- Mô tả một phiên bản (instance) của cơ sở dữ liệu
- Định nghĩa thuật ngữ `schema`
- Liệt kê các đối tượng cơ sở dữ liệu thường được sử dụng

### Hệ thống phân cấp trong RDBMS

- Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS): Chứa nhiều đối tượng mà kỹ sư và quản trị viên cơ sở dữ liệu cần tổ chức
- Phiên bản (Instance): Một cách duy nhất để tổ chức cơ sở dữ liệu và mọi thứ bên trong nó
- Schema: Một nhóm logic các đối tượng trong cơ sở dữ liệu, định nghĩa cách đặt tên cho các đối tượng cơ sở dữ liệu và tránh nhầm lẫn

### Phiên bản (Instance)

- Là ranh giới logic cho một cơ sở dữ liệu hoặc tập hợp các cơ sở dữ liệu
- Mỗi cơ sở dữ liệu trong một phiên bản được gán một tên duy nhất, có tập hợp các bảng hệ thống riêng
- Bạn có thể tạo nhiều phiên bản trên cùng một máy chủ vật lý
- Các phiên bản khác nhau có thể được sử dụng cho môi trường phát triển và sản xuất, hoặc để kiểm soát quyền truy cập

### Schema trong RDBMS

- Schema: Là một đối tượng cơ sở dữ liệu chuyên biệt, cung cấp cách nhóm các đối tượng cơ sở dữ liệu khác nhau một cách logic
- Schema hệ thống: Chứa thông tin cấu hình và siêu dữ liệu của cơ sở dữ liệu
- Các đối tượng trong schema: Bao gồm bảng, chỉ mục, ràng buộc, và các đối tượng khác

### Các đối tượng cơ sở dữ liệu phổ biến

- Bảng (Tables): Cấu trúc logic bao gồm các hàng và cột để lưu trữ dữ liệu
- Ràng buộc (Constraints): Áp dụng các quy tắc hoặc hạn chế lên dữ liệu
- Chỉ mục (Indexes): Tập hợp các con trỏ để cải thiện hiệu suất và đảm bảo tính duy nhất của dữ liệu
- Khóa (Keys): Xác định duy nhất một hàng trong bảng, tạo mối quan hệ giữa các bảng
- Khung nhìn (Views): Cách khác để đại diện dữ liệu từ một hoặc nhiều bảng
- Bí danh (Aliases): Tên thay thế cho một đối tượng, như bảng
- Sự kiện (Events) & Kích hoạt (Triggers): Hành động DML hoặc DDL kích hoạt một loạt hành động khi có sự thay đổi trên bảng

### Tóm tắt

- Phiên bản (Instance): Là ranh giới logic để tổ chức cơ sở dữ liệu
- Schema: Là một đối tượng logic nhóm các đối tượng khác trong cơ sở dữ liệu
- Các đối tượng cơ sở dữ liệu: Bao gồm bảng, ràng buộc, chỉ mục, khóa, khung nhìn, bí danh, sự kiện, và kích hoạt
