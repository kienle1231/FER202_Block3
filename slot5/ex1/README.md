# Healthy Recipe Finder

Ứng dụng React tìm kiếm và quản lý công thức nấu ăn lành mạnh, được xây dựng với React Bootstrap và chia thành các component riêng biệt.

## 🚀 Tính năng

- **Header**: Logo, navigation menu và button Browse recipes
- **Hero Section**: Giới thiệu chính về ứng dụng
- **Filter & Search**: Tìm kiếm theo tên, nguyên liệu và lọc theo thời gian
- **Recipe Grid**: Hiển thị danh sách recipes dạng grid responsive
- **Recipe Cards**: Mỗi card hiển thị thông tin cơ bản của recipe
- **Modal Details**: Click "View Recipe" để xem chi tiết với 2 button "Add to Cart" và "Close"
- **Footer**: Thông tin và social media icons

## 🛠️ Công nghệ sử dụng

- **React 19.1.1**
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework
- **React Icons** - Icon library

## 📁 Cấu trúc Component

```
src/
├── components/
│   ├── Header.js          # Header với navigation
│   ├── Hero.js            # Hero section
│   ├── FilterSearch.js    # Filter và search bar
│   ├── RecipeCard.js      # Individual recipe card + Modal
│   ├── RecipeGrid.js      # Grid hiển thị recipes
│   └── Footer.js          # Footer
├── App.js                 # Main component
├── App.css                # Custom styles
└── index.css              # Global styles
```

## 🍳 Dữ liệu Recipes

Ứng dụng có sẵn 8 recipes mẫu:
1. Mediterranean Chickpea Salad
2. Avocado & Tomato Wholegrain Toast
3. One-Pan Lemon Garlic Salmon
4. Quinoa Veggie Power Bowl
5. Sweet Potato Black Bean Tacos
6. Greek Yogurt Berry Parfait
7. Lentil & Spinach Soup
8. Banana Oat Pancakes

## 🚀 Cách chạy ứng dụng

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Khởi chạy ứng dụng:**
   ```bash
   npm start
   ```

3. **Mở trình duyệt:**
   Ứng dụng sẽ chạy tại `http://localhost:3000`

## 🎯 Tính năng chính

### Tìm kiếm và Lọc
- Tìm kiếm theo tên recipe hoặc nguyên liệu
- Lọc theo thời gian chuẩn bị (Max Prep Time)
- Lọc theo thời gian nấu (Max Cook Time)

### Recipe Cards
- Hiển thị hình ảnh, tiêu đề, mô tả
- Thông tin servings, prep time, cook time
- Badge category
- Button "View Recipe"

### Modal Chi tiết
- Hình ảnh lớn của món ăn
- Thông tin chi tiết về servings, prep time, cook time
- Mô tả chi tiết bằng tiếng Việt
- Danh sách nguyên liệu
- Hướng dẫn nấu ăn từng bước
- **2 Button:**
  - **"Add to Cart"** - Thêm vào giỏ hàng (hiện tại hiển thị alert)
  - **"Close"** - Đóng modal

## 🎨 Styling

- Sử dụng Bootstrap classes
- Custom CSS với hover effects
- Responsive design cho mobile và desktop
- Color scheme: xanh lá (#198754) làm chủ đạo
- Shadow effects và border radius cho modern look

## 📱 Responsive Design

- Grid layout: 1 cột trên mobile, 2 cột trên tablet, 3 cột trên desktop
- Navigation collapse trên mobile
- Modal responsive với size="lg"

## 🔧 Cài đặt thêm

Để thêm hình ảnh cho recipes, đặt các file ảnh vào thư mục `public/images/` với tên tương ứng:
- mediterranean-chickpea-salad.jpg
- avocado-tomato-toast.jpg
- one-pan-lemon-garlic-salmon.jpg
- quinoa-veggie-power-bowl.jpg
- sweet-potato-black-bean-tacos.jpg
- greek-yogurt-berry-parfait.jpg
- lentil-spinach-soup.jpg
- banana-oat-pancakes.jpg

## 🚀 Build Production

```bash
npm run build
```

## 📝 Ghi chú

- Ứng dụng sử dụng tiếng Việt cho mô tả chi tiết
- Modal "Add to Cart" hiện tại chỉ hiển thị alert, có thể mở rộng để tích hợp với shopping cart
- Dữ liệu recipes được lưu trữ trong component, có thể chuyển sang API hoặc database
