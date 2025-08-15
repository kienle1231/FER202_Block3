# Ứng Dụng React với PropTypes

Đây là một ứng dụng React minh họa việc sử dụng PropTypes để validate dữ liệu trong các component.

## Tính năng

Ứng dụng bao gồm 4 ví dụ về việc sử dụng PropTypes:

### Ví dụ 1: UserProfile
- Component cơ bản với PropTypes
- Validate thông tin người dùng (tên, tuổi)
- Hiển thị thông báo lỗi khi dữ liệu không hợp lệ

### Ví dụ 2: UserProfile2
- Form với React Bootstrap
- Validation real-time
- Sử dụng useState để quản lý state

### Ví dụ 3: MyForm
- Form với useReducer
- Hiển thị Alert khi có lỗi
- Validation cho tên, email, mật khẩu

### Ví dụ 4: AdvancedForm
- Form validation đầy đủ với các yêu cầu:
  - Tên: 3-50 ký tự
  - Tuổi: 18-100 tuổi
  - Email: đúng định dạng
  - Số điện thoại: 10-15 chữ số
  - Đồng ý điều khoản

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

## Dependencies

- React 19.1.1
- prop-types
- react-bootstrap
- bootstrap

## Cấu trúc dự án

```
src/
├── components/
│   ├── UserProfile.js      # Ví dụ 1
│   ├── UserProfile2.js     # Ví dụ 2
│   ├── MyForm.js          # Ví dụ 3
│   └── AdvancedForm.js    # Ví dụ 4
├── App.js                 # Component chính
├── App.css               # Styles
└── index.js              # Entry point
```

## PropTypes được sử dụng

- `PropTypes.string.isRequired`: Chuỗi bắt buộc
- `PropTypes.number`: Số
- `PropTypes.oneOfType([PropTypes.string, PropTypes.number])`: Có thể là chuỗi hoặc số
- `PropTypes.func.isRequired`: Function bắt buộc

## Validation Rules

### AdvancedForm Validation:
1. **Tên**: Không được để trống, chứa 3-50 ký tự
2. **Tuổi**: Không được để trống, từ 18-100 tuổi
3. **Email**: Không được để trống, đúng định dạng email
4. **Số điện thoại**: Không được để trống, từ 10-15 chữ số
5. **Điều khoản**: Phải đồng ý với điều khoản sử dụng

## Sử dụng

1. Chạy ứng dụng: `npm start`
2. Mở trình duyệt tại `http://localhost:3000`
3. Chọn các tab để xem các ví dụ khác nhau
4. Thử nghiệm với các trường hợp validation khác nhau

## Lưu ý

- PropTypes chỉ hoạt động trong development mode
- Trong production, PropTypes sẽ bị loại bỏ để tối ưu hiệu suất
- Đây là công cụ để phát hiện lỗi trong quá trình phát triển
