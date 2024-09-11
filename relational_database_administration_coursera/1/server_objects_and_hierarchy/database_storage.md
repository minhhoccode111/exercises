### Lưu trữ Cơ sở Dữ liệu

Sau khi xem video này, bạn sẽ có thể:

- Phân biệt giữa lưu trữ vật lý và lưu trữ logic,
- Mô tả Tablespaces và giải thích lợi ích của chúng,
- Mô tả các Nhóm Lưu trữ (Storage Groups) và chức năng của chúng, và
- Nhận diện khi nào nên sử dụng phân vùng (partitions)

### Lưu trữ Cơ sở Dữ liệu

- Vai trò của DBA: Đảm bảo rằng cơ sở dữ liệu có đủ không gian lưu trữ cho tất cả dữ liệu cần lưu trữ, đồng thời phải dự đoán nhu cầu lưu trữ trong tương lai
- Cơ sở dữ liệu trên đám mây: Việc mở rộng không gian lưu trữ được thực hiện qua API hoặc giao diện đồ họa, dễ dàng mở rộng hoặc thu hẹp dung lượng lưu trữ
- Môi trường tự quản lý: DBA có thể lên kế hoạch cho không gian lưu trữ để cải thiện hiệu suất, ví dụ như lưu trữ các tài nguyên cạnh tranh trên các đĩa khác nhau

### Lưu trữ Vật lý và Logic

- RDBMS: Tách biệt lưu trữ vật lý của các tệp cơ sở dữ liệu trên đĩa khỏi thiết kế logic của cơ sở dữ liệu, cho phép linh hoạt hơn trong việc quản lý các tệp dữ liệu
- Quản lý dữ liệu: Bạn có thể quản lý dữ liệu qua một đối tượng logic mà không cần quan tâm đến bản chất của lưu trữ vật lý

### Tablespaces

Tablespaces: Là các cấu trúc chứa các đối tượng cơ sở dữ liệu như bảng, chỉ mục, đối tượng lớn và dữ liệu dài
Lợi ích của Tablespaces:

- Hiệu suất: Bạn có thể sử dụng tablespaces để tối ưu hóa hiệu suất. Ví dụ: lưu trữ chỉ mục được sử dụng thường xuyên trên SSD nhanh
- Khả năng khôi phục: Tablespaces giúp các thao tác sao lưu và phục hồi trở nên tiện lợi hơn
- Quản lý lưu trữ: RDBMS tạo và mở rộng các tệp dữ liệu hoặc container tùy theo nhu cầu

### Nhóm Lưu trữ (Storage Groups)

Nhóm lưu trữ: Là nhóm các đường dẫn lưu trữ hoặc container dựa trên các đặc tính hiệu suất tương tự
Quản lý dữ liệu đa nhiệt độ: Nhiệt độ dữ liệu đề cập đến tần suất truy cập dữ liệu

- Dữ liệu nóng: Được truy cập rất thường xuyên, lưu trữ trong nhóm thiết bị lưu trữ nhanh
- Dữ liệu ấm: Được truy cập thường xuyên, lưu trữ trong nhóm lưu trữ ấm
- Dữ liệu lạnh: Được truy cập ít, lưu trữ trong nhóm thiết bị lưu trữ chậm hơn và rẻ hơn

### Phân vùng Cơ sở Dữ liệu

- Phân vùng cơ sở dữ liệu: Là cách quản lý dữ liệu trong cơ sở dữ liệu quan hệ qua nhiều phân vùng khác nhau
- Lợi ích của phân vùng: Tăng cường hiệu suất khi làm việc với lượng dữ liệu lớn, ví dụ như trong kho dữ liệu và phân tích dữ liệu cho trí tuệ doanh nghiệp

### Tóm tắt

- Lưu trữ cơ sở dữ liệu: Được quản lý qua các đối tượng cơ sở dữ liệu logic và các tệp đĩa vật lý
- Tablespaces: Tổ chức các đối tượng cơ sở dữ liệu dựa trên nơi dữ liệu của chúng được lưu trữ
- Nhóm lưu trữ: Nhóm các đường dẫn lưu trữ hoặc container dựa trên đặc tính hiệu suất tương tự
- Phân vùng: Lưu trữ các tập hợp con của dữ liệu từ một cơ sở dữ liệu rất lớn để cải thiện hiệu suất
