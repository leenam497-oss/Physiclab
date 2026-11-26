# PhysicsLab - Mô Phỏng Vật Lý 3D

Ứng dụng React hiện đại cho phép khám phá các hiện tượng vật lý và vũ trụ học một cách tương tác, giúp học sinh và giáo viên tìm hiểu về thế giới vật lý.

## 🚀 Tính Năng

- **Mô Phỏng 3D**: Khám phá các hiện tượng vật lý trong môi trường mô phỏng 3D tương tác
- **AI Chatbot**: Trợ lý AI thông minh hỗ trợ giải đáp câu hỏi về vật lý
- **Giao Diện Hiện Đại**: Thiết kế đẹp mắt, responsive với TailwindCSS
- **Mô Phỏng Vũ Trụ**: Khám phá cấu trúc Mặt Trời, lỗ đen, và hạt nhân galactic
- **Điều Hướng**: Nhiều trang với React Router
- **Biểu Tượng**: Icons đẹp từ Lucide React

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📦 Cài Đặt

1. **Di chuyển vào thư mục dự án**
   ```bash
   cd /Applications/FREELANCE/Mo-phong-hoa-hoc
   ```

2. **Cài đặt dependencies** (dùng npm hoặc yarn)
   ```bash
   npm install
   # hoặc
   yarn
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

   Ứng dụng sẽ tự động mở tại `http://localhost:3000`

## 🤖 AI Chatbot

Ứng dụng tích hợp chatbot AI thông minh sử dụng OpenRouter API để trả lời câu hỏi về vật lý.

### Tính Năng Chatbot

- **AI Thông Minh**: Sử dụng model Amazon Nova 2 Lite miễn phí
- **Chế Độ Offline**: Tự động chuyển sang câu trả lời cứng khi API không khả dụng
- **Ngữ Cảnh Vật Lý**: Được huấn luyện để trả lời câu hỏi về vật lý, thiên văn học
- **Giao Diện Thân Thiện**: Chat window hiện đại với typing indicator
- **Lịch Sử Hội Thoại**: Lưu trữ 10 tin nhắn gần nhất để duy trì ngữ cảnh

## 🎨 Chuyển Đổi Theme

Dự án hỗ trợ hai theme đẹp mắt:

### Các Theme Có Sẵn
- **Green Nature** (mặc định) - Màu xanh lá tự nhiên với nền slate mềm mại
- **Blue Sky** - Màu xanh da trời nhẹ nhàng với nền slate

### Cách Chuyển Theme

**Cách 1: Sử dụng script chuyển theme**
```bash
node switch-theme.js green
# hoặc
node switch-theme.js blue-sky
```

**Cách 2: Chuyển thủ công**
1. Mở file `src/config/theme.js`
2. Thay đổi `ACTIVE_THEME` thành `THEMES.GREEN` hoặc `THEMES.BLUE_SKY`
3. Mở file `tailwind.config.js`
4. Cập nhật bảng màu `primary` phù hợp với theme đã chọn
5. Khởi động lại dev server

## 📁 Cấu Trúc Dự Án

```
Mo-phong-hoa-hoc/
├── public/              # Tài nguyên tĩnh
├── src/
│   ├── components/      # React components
│   │   └── Navbar.jsx   # Component điều hướng
│   ├── pages/           # Các trang
│   │   ├── Home.jsx     # Trang chủ
│   │   ├── About.jsx    # Trang giới thiệu
│   │   └── Contact.jsx  # Trang liên hệ
│   ├── config/          # File cấu hình
│   │   └── theme.js     # Cấu hình theme
│   ├── App.jsx          # Component chính
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Cấu hình Vite
├── tailwind.config.js   # Cấu hình TailwindCSS
└── README.md            # File này
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Các Bước Tiếp Theo

1. **Tích Hợp Mô Phỏng 3D**: Thêm engine mô phỏng hóa học (Three.js, Babylon.js)
2. **Xác Thực Người Dùng**: Thêm chức năng đăng nhập/đăng ký
3. **Cơ Sở Dữ Liệu**: Lưu trữ tiến độ học tập và lịch sử thí nghiệm
4. **Chi Tiết Thí Nghiệm**: Tạo trang chi tiết cho từng thí nghiệm
5. **Tìm Kiếm & Lọc**: Thêm khả năng tìm kiếm thí nghiệm nâng cao
6. **Yêu Thích**: Cho phép người dùng lưu thí nghiệm yêu thích

## 📝 Ghi Chú Phát Triển

- Dự án sử dụng Vite để phát triển và build nhanh hơn
- TailwindCSS được cấu hình với các theme màu tùy chỉnh
- Tất cả components là functional components sử dụng React hooks
- Ứng dụng responsive hoàn toàn và thân thiện với mobile
- Sử dụng `yarn dev` hoặc `npm run dev` để chạy (không phải `yarn start`)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
