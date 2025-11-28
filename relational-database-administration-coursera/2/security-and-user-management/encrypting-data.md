### Mã Hóa Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Giải thích lợi ích của việc mã hóa dữ liệu,
- Mô tả các thuật toán và khóa mã hóa,
- Xác định sự khác biệt giữa mã hóa đối xứng và bất đối xứng,
- Giải thích mã hóa dữ liệu trong suốt (TDE),
- Giải thích khóa do khách hàng quản lý (BYOK),
- Liệt kê các cân nhắc về mã hóa và hiệu suất,
- Mô tả cách mã hóa dữ liệu trong quá trình truyền tải.

### Lợi Ích Của Mã Hóa Dữ Liệu

Mã hóa dữ liệu: Thêm một lớp bảo mật cho dữ liệu, bảo vệ cả khi dữ liệu đang ở trạng thái lưu trữ (at rest) hoặc đang truyền tải.

- Một số ngành nghề, khu vực, hoặc khách hàng yêu cầu mã hóa dữ liệu (ví dụ: PCI DSS yêu cầu mã hóa thông tin thẻ tín dụng).

### Thuật Toán Mã Hóa và Khóa

Mã hóa đối xứng: Sử dụng cùng một khóa để mã hóa và giải mã dữ liệu. Ví dụ: DES, AES.

- Dễ sử dụng nhưng rủi ro khi chia sẻ khóa.

Mã hóa bất đối xứng: Sử dụng hai khóa, khóa công khai để mã hóa và khóa riêng để giải mã. Ví dụ: RSA, ECC.

- Bảo mật cao hơn nhưng phức tạp và ảnh hưởng đến hiệu suất.

### Mã Hóa Dữ Liệu Trong Suốt (TDE)

Mã hóa dữ liệu trong suốt (TDE): Tự động mã hóa và giải mã dữ liệu khi người dùng hoặc ứng dụng yêu cầu, không yêu cầu quản lý phức tạp.

- TDE mã hóa cả các bản sao lưu cơ sở dữ liệu.

### Khóa Do Khách Hàng Quản Lý (BYOK)

BYOK (Bring Your Own Key): Khách hàng tự quản lý khóa mã hóa của mình, đảm bảo rằng nền tảng đám mây không có quyền truy cập vào khóa giải mã.

- Hỗ trợ quản lý vòng đời của khóa, bao gồm xoay vòng và hết hạn khóa.

### Cân Nhắc Về Hiệu Suất

Mã hóa ảnh hưởng đến hiệu suất: Do quá trình mã hóa và giải mã mất thời gian, cả mã hóa đối xứng và bất đối xứng đều làm giảm hiệu suất hệ thống.

- Mã hóa bất đối xứng thường chậm hơn do sử dụng khóa dài hơn, trong khi mã hóa đối xứng như AES được khuyến nghị cho hiệu suất tốt hơn.

### Mã Hóa Dữ Liệu Trong Quá Trình Truyền Tải

Mã hóa dữ liệu khi truyền tải: Sử dụng giao thức bảo mật như TLS hoặc SSL để bảo vệ dữ liệu khi truyền qua mạng.

- Một số cơ sở dữ liệu mã hóa dữ liệu trong quá trình truyền mặc định, trong khi số khác yêu cầu bật cài đặt.

### Tóm Tắt

- Mã hóa giúp bảo vệ dữ liệu khi bị xâm phạm.
- Mã hóa có thể được thực hiện cho dữ liệu lưu trữ và dữ liệu truyền tải.
- Mã hóa đối xứng dễ sử dụng hơn nhưng ít an toàn hơn mã hóa bất đối xứng.
- TDE đơn giản hóa việc thiết lập mã hóa.
- Mã hóa làm giảm hiệu suất cơ sở dữ liệu và hệ thống.
- TLS và SSL được sử dụng để bảo vệ dữ liệu trong quá trình truyền tải.
