# 🎬 Movie Explorer - Lab 2 React-Bootstrap

Ứng dụng web xem phim được xây dựng bằng React và React-Bootstrap theo yêu cầu của Lab 2.

## ✨ Tính năng chính

### 🎯 **Mục tiêu đánh giá đã hoàn thành:**
- ✅ Sử dụng React-Bootstrap: Navbar, Carousel, Card, Badge, Button, Form, InputGroup, Modal, Toast, Alert
- ✅ Tổ chức component theo props chuẩn, dùng PropTypes để validate
- ✅ Quản lý state với useState, useEffect, useMemo và localStorage cho favourites
- ✅ Thao tác danh sách: search, sort, filter theo genre, thêm vào favourites
- ✅ Xây dựng form có validate (client-side), show feedback (Alert/Toast)

### 🚀 **Chức năng chính:**

#### 1. **Trang chủ & Navigation**
- Navbar cố định với brand "Movie Explorer"
- 3 link navigation: Free Movies, My Favourite Movies, Movie Request Form
- Active state highlighting và responsive design

#### 2. **Hero Carousel**
- 3 slide với ảnh banner đẹp
- Caption với title và description
- Auto-play và điều khiển thủ công

#### 3. **Danh sách phim**
- Grid responsive (1-2-3 cột)
- Hiển thị đầy đủ thông tin: poster, title, description, year, country, duration, genre
- Badge cho genre
- Nút "Add to Favourites" với toggle functionality
- Nút "Details" mở Modal chi tiết

#### 4. **Tìm kiếm & Lọc**
- Tìm kiếm theo title và description
- Filter theo genre với dropdown
- Sort theo thời lượng (tăng/giảm)
- Hiển thị số kết quả
- Alert khi không tìm thấy phim

#### 5. **Hệ thống Favourites**
- Lưu trữ trong localStorage
- Toggle add/remove favourites
- Trang riêng cho favourites
- Toast notifications

#### 6. **Form Yêu cầu thêm phim**
- Form validation đầy đủ
- Client-side validation với error messages
- PropTypes cho tất cả components
- Success feedback

## 🛠️ **Công nghệ sử dụng**

- **React 19** với Hooks
- **React-Bootstrap** cho UI components
- **PropTypes** cho validation
- **localStorage** cho data persistence
- **CSS3** với animations và responsive design

## 📦 **Cài đặt và chạy**

1. **Clone repository:**
```bash
git clone <repository-url>
cd lab2
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy ứng dụng:**
```bash
npm start
```

4. **Mở trình duyệt:**
```
http://localhost:3000
```

## 📁 **Cấu trúc project**

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── HeroCarousel.js        # Hero carousel
│   ├── SearchFilterBar.js     # Search and filter controls
│   ├── MovieCard.js           # Individual movie card
│   ├── MovieRequestForm.js    # Movie request form
│   └── ToastContainer.js      # Toast notifications
├── data/
│   └── movies.js              # Movie data
├── App.js                     # Main application component
├── App.css                    # Custom styles
└── index.js                   # Entry point
```

## 🎨 **Giao diện**

- **Responsive design** cho mọi thiết bị
- **Modern gradient background**
- **Smooth animations** và transitions
- **Error handling** cho images
- **Accessibility features**

## 📝 **Dữ liệu phim**

Ứng dụng sử dụng dữ liệu mẫu với 9 bộ phim thuộc các thể loại:
- Sci-Fi, Comedy, Drama, Horror, Romance, Action, Thriller

Mỗi phim có đầy đủ thông tin:
- ID, Title, Description, Poster
- Genre, Year, Country, Duration

## 🔧 **Tính năng kỹ thuật**

- **State Management:** useState, useEffect, useMemo
- **Data Persistence:** localStorage cho favourites
- **Form Validation:** Client-side validation với error messages
- **Performance:** useMemo cho filter/sort operations
- **Error Handling:** Fallback images và error boundaries

## 📱 **Responsive Design**

- **Mobile:** 1 cột
- **Tablet:** 2 cột  
- **Desktop:** 3 cột

## 🎯 **Yêu cầu Lab 2 - Đã hoàn thành**

- ✅ React-Bootstrap components
- ✅ Props và PropTypes
- ✅ State management với Hooks
- ✅ Search, filter, sort functionality
- ✅ Favourites system với localStorage
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design

---

**Tác giả:** Lab 2 - React-Bootstrap & Props/PropTypes  
**Môn học:** FER202 - Frontend Development  
**Giảng viên:** traltb@fe.edu.vn
