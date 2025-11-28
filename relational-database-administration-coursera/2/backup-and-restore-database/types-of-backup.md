### Các Loại Sao Lưu Cơ Sở Dữ Liệu

Sau khi xem bài học này, bạn sẽ có thể:

- Mô tả các loại sao lưu cơ sở dữ liệu phổ biến,
- Mô tả ưu và nhược điểm của các loại sao lưu cơ sở dữ liệu khác nhau

### Các Loại Sao Lưu Phổ Biến

1. Sao lưu toàn bộ (Full backup):

   - Sao chép toàn bộ dữ liệu trong cơ sở dữ liệu
   - Ưu điểm: Quá trình phục hồi đơn giản, chỉ cần khôi phục một tệp sao lưu mới nhất
   - Nhược điểm: Tốn nhiều thời gian, băng thông và dung lượng lưu trữ; dễ gặp rủi ro nếu tệp sao lưu bị hỏng

2. Sao lưu theo thời gian cụ thể (Point-in-time backup):

   - Phục hồi dữ liệu về thời điểm cụ thể bằng cách áp dụng lại các giao dịch từ tệp log
   - Ưu điểm: Khả năng phục hồi dữ liệu đến thời điểm mong muốn
   - Nhược điểm: Quá trình phục hồi phức tạp hơn, cần sử dụng thông tin từ tệp log

3. Sao lưu vi sai (Differential backup):

   - Sao lưu các thay đổi từ lần sao lưu toàn bộ gần nhất
   - Ưu điểm: Tập tin sao lưu nhỏ hơn, giảm thời gian và dung lượng cần thiết
   - Nhược điểm: Quá trình phục hồi lâu hơn so với sao lưu toàn bộ

4. Sao lưu gia tăng (Incremental backup):

   - Sao lưu chỉ những thay đổi kể từ lần sao lưu gần nhất (có thể là sao lưu toàn bộ hoặc vi sai)
   - Ưu điểm: Sao lưu nhanh hơn so với sao lưu vi sai
   - Nhược điểm: Quá trình phục hồi phức tạp hơn và mất nhiều thời gian hơn

### Ưu và Nhược Điểm Các Phương Pháp Sao Lưu

- Sao lưu toàn bộ: Dễ dàng khôi phục nhưng tốn nhiều tài nguyên
- Sao lưu theo thời gian cụ thể: Cung cấp khả năng khôi phục chi tiết hơn nhưng yêu cầu tệp log
- Sao lưu vi sai: Nhanh hơn so với sao lưu toàn bộ, nhưng quá trình khôi phục phức tạp
- Sao lưu gia tăng: Sao lưu nhanh nhất nhưng quá trình phục hồi phức tạp và dài hơn
