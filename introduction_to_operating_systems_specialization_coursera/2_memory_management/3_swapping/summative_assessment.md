# Summative Assessment

### Example Random Run

Fill out the following table to illustrate the hit and miss of the random policy

| **Access** | **Hit/Miss** | **Evict** | **Cache State** |
| ---------- | ------------ | --------- | --------------- |
| 1          | Miss         |           | 1               |
| 7          | Miss         |           | 1, 7            |
| 6          | Miss         |           | 1, 7, 6         |
| 9          | Miss         | 7         | 1, 6, 9         |
| 2          | Miss         | 9         | 1, 6, 2         |
| 2          | Hit          |           | 1, 6, 2         |
| 7          | Miss         | 1         | 6, 2, 7         |
| 6          | Hit          |           | 6, 2, 7         |
| 3          | Miss         | 6         | 2, 7, 3         |
| 6          | Miss         | 3         | 2, 7, 6         |

Hit Rate Calculation

- **Number of Hits**: 2 (accesses 2 and 6)
- **Total Accesses**: 10

The **Hit Rate** is **20%**.

### Example FIFO run

Fill out the following table to illustrate the hit and miss of the FIFO policy

| **Access** | **Hit/Miss** | **Evict** | **Cache State** |
| ---------- | ------------ | --------- | --------------- |
| 7          | Miss         |           | 7               |
| 8          | Miss         |           | 7, 8            |
| 4          | Miss         |           | 7, 8, 4         |
| 2          | Miss         | 7         | 8, 4, 2         |
| 0          | Miss         | 8         | 4, 2, 0         |
| 6          | Miss         | 4         | 2, 0, 6         |
| 4          | Miss         | 2         | 0, 6, 4         |
| 7          | Miss         | 0         | 6, 4, 7         |
| 3          | Miss         | 6         | 4, 7, 3         |
| 7          | Hit          |           | 4, 7, 3         |

Hit Rate Calculation

- **Number of Hits**: 1 (access 7)
- **Total Accesses**: 10

The **Hit Rate** is **10%**.

### Example LRU Run

Fill out the following table to illustrate the hit and miss rate of the LRU policy

| **Access** | **Hit/Miss** | **Evict** | **Cache State** |
| ---------- | ------------ | --------- | --------------- |
| 6          | Miss         |           | 6               |
| 7          | Miss         |           | 6, 7            |
| 7          | Hit          |           | 6, 7            |
| 9          | Miss         |           | 6, 7, 9         |
| 7          | Hit          |           | 6, 9, 7         |
| 9          | Hit          |           | 6, 7, 9         |
| 0          | Miss         | 6         | 7, 9, 0         |
| 4          | Miss         | 7         | 9, 0, 4         |
| 9          | Hit          |           | 0, 4, 9         |
| 6          | Miss         | 0         | 4, 9, 6         |

Hit Rate Calculation:

- **Number of Hits**: 4 (accesses 7, 7, 9, and 9)
- **Total Accesses**: 10

The **Hit Rate** is **40%**.
