# PRD — GREENPANTRY PRODUCT REQUIREMENTS DOCUMENT

- **Dự án**: GreenPantry — Nền tảng E-commerce kết hợp Content Commerce & Community Q&A & Daily Personal Todo cho thực phẩm chay và sản phẩm tự nhiên.
- **Tác giả**: Senior Product Team (PM & BA & UX Designer)
- **Phiên bản**: 1.0.0 (MVP)
- **Trạng thái**: Draft approved for Design First phase

---

## 1. PRODUCT OVERVIEW

**GreenPantry** là một nền tảng Web độc đáo phục vụ người tiêu dùng thực phẩm sạch, thực phẩm chay, ngũ cốc, gạo lứt, trà và các sản phẩm thiên nhiên lành mạnh (Healthy Food). 

Khác biệt cốt lõi của GreenPantry nằm ở mô hình kết hợp nhuần nhuyễn giữa:
1. **E-commerce**: Trải nghiệm mua sắm thực phẩm lành mạnh tiện lợi, tối ưu.
2. **Content Commerce**: Blog kiến thức dinh dưỡng, mẹo sinh hoạt, công thức nấu ăn liên kết trực tiếp tới sản phẩm kinh doanh.
3. **Community Q&A**: Hỏi đáp cộng đồng chuyên sâu về dinh dưỡng, cách chế biến và thông tin sản phẩm.
4. **Daily Personal Todo**: Công cụ quản lý thói quen ăn uống/sinh hoạt lành mạnh theo từng ngày ngay trên ứng dụng mà không cần tạo tài khoản.

GreenPantry hoạt động theo triết lý **Guest-First Experience**: Người dùng mở website có thể trải nghiệm toàn bộ tính năng (xem, tìm kiếm, đọc bài viết, đặt câu hỏi, sử dụng Todo, thêm giỏ hàng, thanh toán COD và theo dõi đơn hàng) ngay lập tức mà **không bắt buộc đăng ký tài khoản**.

---

## 2. PRODUCT VISION

Vision của GreenPantry là xây dựng hành trình chuyển đổi tự nhiên từ Kiến thức tới Hành vi mua hàng:

```text
Google Search / Social
        │
        ▼
   [Content] (Bài viết: "5 Lợi ích của gạo lứt nguyên cám")
        │
        ▼
  [Discover] (Gợi ý sản phẩm liên quan: "Gạo lứt đỏ ST25 GreenPantry")
        │
        ▼
    [Learn] (Xem thông tin dinh dưỡng, xuất xứ, nguyên liệu)
        │
        ▼
    [Trust] (Xem Đánh giá verified + Hỏi & Đáp từ cộng đồng)
        │
        ▼
     [Buy] (Thêm vào giỏ hàng & Guest Checkout COD nhanh chóng)
        │
        ▼
    [Review] (Nhận hàng, trải nghiệm & Đánh giá xác thực bằng Mã đơn hàng)
```

Blog và Content không phải là tính năng phụ trợ (side feature) mà là **động lực tăng trưởng (Growth Engine)** chính để thu hút traffic hữu cơ (SEO Organic), tạo dựng niềm tin và chuyển đổi đơn hàng.

---

## 3. PROBLEM STATEMENT

1. **Rào cản tạo tài khoản**: Nhiều website e-commerce ép buộc người dùng đăng ký/đăng nhập, nhập OTP phức tạp trước khi trải nghiệm, dẫn đến tỷ lệ drop-off cao.
2. **Nội dung rời rạc với sản phẩm**: Bài viết chia sẻ kiến thức healthy/chay trên các trang hiện tại thường không liên kết trực tiếp với sản phẩm mua bán, khiến người dùng mất công tìm kiếm nơi bán đáng tin cậy.
3. **Thiếu sự xác thực trong đánh giá**: Đánh giá sản phẩm online thường bị thao túng hoặc spam. Người mua cần nhìn thấy review thực sự từ người đã phát sinh đơn hàng thành công.
4. **Thiếu công cụ gắn kết thói quen hằng ngày**: Người dùng ăn chay/healthy muốn duy trì thói quen (uống trà, ngâm đậu, ăn gạo lứt) nhưng phải dùng ứng dụng Todo riêng lẻ, không gắn kết với hệ sinh thái thực phẩm sạch.

---

## 4. GOALS & NON-GOALS

### 4.1. Product Goals (MVP)
* **Guest-First 100%**: Cho phép 100% luồng mua hàng và công cụ Todo hoạt động trơn tru không cần tài khoản.
* **Content-Commerce Synergy**: 100% bài viết Blog và câu hỏi Q&A đều có khả năng gắn thẻ (tag) sản phẩm liên quan.
* **SEO Excellence**: Tối ưu hóa SEO chuẩn Google cho các trang Landing, Product, Category, Blog để đạt vị trí cao trên Google Search.
* **Strict Design-First**: Hoàn thiện 100% giao diện trên Google Stitch trước khi viết bất kỳ dòng code frontend/backend nào.

### 4.2. Non-Goals (MVP - Phân ranh giới rõ ràng)
* KHÔNG hỗ trợ Đăng nhập / Đăng ký tài khoản người dùng ở MVP (được chuẩn bị sẵn kiến trúc cho Phase 2).
* KHÔNG tích hợp Cổng thanh toán trực tuyến (VNPay/MoMo/Stripe) ở MVP (chỉ hỗ trợ COD - Thanh toán khi nhận hàng).
* KHÔNG triển khai giao diện Admin Panel phức tạp ở MVP (dữ liệu được quản trị qua hệ quản trị dữ liệu hoặc API nội bộ).
* KHÔNG xóa tự động dữ liệu Todo của Guest sau 24h.

---

## 5. TARGET USERS & PERSONAS

### Persona 1: Chị Minh Anh (32 tuổi, Nhân viên văn phòng - Hà Nội)
* **Đặc điểm**: Quan tâm đến thực phẩm dưỡng sinh, ăn chay flexitarian, muốn giảm cân bằng gạo lứt và bột sắn dây nguyên chất.
* **Hành vi**: Thường search Google cách nấu cơm gạo lứt dẻo ngon.
* **Nhu cầu**: Đọc bài viết hướng dẫn -> Mua đúng loại gạo lứt chất lượng -> Đặt hàng nhanh không cần tạo tài khoản rườm rà.

### Persona 2: Anh Đức Nam (28 tuổi, Freelancer - TP.HCM)
* **Đặc điểm**: Sống xanh, thích tự pha trà và làm sinh tố các loại hạt buổi sáng.
* **Hành vi**: Cần công cụ nốt nhỏ công việc hằng ngày (uống trà detox, ăn hạt, tập thiền).
* **Nhu cầu**: Dùng trang Todo để check-in công việc hằng ngày và mua sắm định kỳ các loại hạt khô.

---

## 6. USER JOURNEYS

### Journey A: Discovery qua Blog & Mua hàng (Guest User)
1. User tìm kiếm "Tác dụng của bột sắn dây" trên Google và vào bài viết Blog GreenPantry.
2. Tại bài viết, User đọc nội dung kiến thức và thấy block "Sản phẩm gợi ý trong bài: Bột sắn dây ta nguyên chất 500g".
3. User click vào xem Product Detail, kiểm tra Nutrition, Origin và mục Q&A "Uống bột sắn dây lúc nào tốt nhất?".
4. User bấm "Thêm vào giỏ hàng", mở giỏ hàng và chọn "Thanh toán".
5. User điền Họ tên, SĐT, Địa chỉ nhận hàng, chọn COD và hoàn tất Đơn hàng.
6. Hệ thống cấp Order Number (vd: `GP-883920`) và cho phép User xem màn hình Order Success cùng trang Track Order.

### Journey B: Sử dụng Daily Todo (Guest User)
1. User truy cập `/todo` hoặc từ Menu chính.
2. User thêm các task cho ngày hôm nay (vd: "Ngâm 200g gạo lứt", "Pha trà đậu đen").
3. User tích chọn hoàn thành (Complete). Dữ liệu được lưu an toàn tại Client `localStorage`.
4. Ngày tiếp theo, User quay lại, trang tự chuyển sang ngày mới với danh sách checklist mới, đồng thời User có thể chọn lại ngày cũ để xem lịch sử.

---

## 7. INFORMATION ARCHITECTURE (IA)

```text
GreenPantry Web Platform
├── Home Page (Discovery & Overview)
├── E-Commerce Module
│   ├── Product Listing (/products)
│   ├── Product Detail (/products/[slug])
│   ├── Category Pages (/categories/[slug])
│   ├── New Arrivals (/new-products)
│   ├── Cart (/cart)
│   ├── Checkout (/checkout)
│   └── Order Tracking (/orders/track)
├── Content Module
│   ├── Blog Listing (/blog)
│   ├── Blog Detail (/blog/[slug])
│   └── Blog Category (/blog/category/[slug])
├── Community Module
│   └── Q&A Listing & Detail (/questions)
└── Personal Module
    └── Daily Todo (/todo)
```

---

## 8. FUNCTIONAL REQUIREMENTS

### 8.1. E-commerce Domain
* **FR-EC-01**: Hiển thị danh mục sản phẩm (Gạo & ngũ cốc, Các loại hạt, Đậu, Bột, Trà, Thực phẩm chay, Healthy food).
* **FR-EC-02**: Tìm kiếm sản phẩm theo tên, danh mục, lọc theo khoảng giá, đánh giá sao, sắp xếp (Mới nhất, Giá tăng/giảm, Bán chạy).
* **FR-EC-03**: Trang chi tiết sản phẩm hiển thị Album ảnh, Thông tin dinh dưỡng (Nutrition), Thành phần (Ingredients), Xuất xứ (Origin), Đánh giá verified, Hỏi đáp liên quan và Bài viết blog liên quan.
* **FR-EC-04**: Quản lý Giỏ hàng (Thêm, Xóa, Thay đổi số lượng, Tính tổng tiền, Tự động lưu giỏ hàng ở Client).
* **FR-EC-05**: Guest Checkout không cần tài khoản, nhập thông tin giao hàng (Tỉnh/Thành, Quận/Huyện, Phường/Xã, Địa chỉ cụ thể, Ghi chú), mặc định phương thức COD.
* **FR-EC-06**: Theo dõi đơn hàng (Track Order) thông qua Mã đơn hàng + Số điện thoại.

### 8.2. Business Rule: Sản Phẩm Mới (New Arrivals)
* **BR-EC-01**: Sản phẩm mới được xác định theo mô hình **Hybrid Domain Rule**:
  * Tự động lọc sản phẩm có ngày phát hành `released_at` trong vòng 30 ngày gần nhất.
  * Hoặc các sản phẩm được Admin bật cờ thủ công `is_featured_new = true` để ghim cố định trong danh mục Sản phẩm mới.

### 8.3. Content & Blog Domain
* **FR-BL-01**: Trang Blog hiển thị bài viết nổi bật (Featured), bài viết mới nhất, phân loại theo chuyên mục và thẻ (Tags).
* **FR-BL-02**: Đọc chi tiết bài viết với giao diện đọc chuẩn (Typography tối ưu, thời gian đọc ước tính Reading Time, Tác giả, Ngày đăng).
* **FR-BL-03**: Gắn kết bài viết với sản phẩm (Content Commerce): Bài viết hiển thị danh sách sản phẩm được đề cập (Product Cards) cho phép thêm trực tiếp vào giỏ hàng.

### 8.4. Community Q&A Domain
* **FR-QA-01**: Hiển thị danh sách câu hỏi cộng đồng phân loại (General, Product, Nutrition, Cooking, Lifestyle).
* **FR-QA-02**: Guest gửi câu hỏi (Họ tên, Email, Nội dung câu hỏi, Loại câu hỏi, ID Sản phẩm liên quan nếu có).
* **BR-QA-01**: Câu hỏi của Guest mặc định ở trạng thái `PENDING` và chỉ hiển thị công khai sau khi được Admin/Staff duyệt (`APPROVED`).
* **FR-QA-03**: Tích hợp khối Q&A trực tiếp bên trong trang Chi tiết Sản phẩm.

### 8.5. Daily Personal Todo Domain
* **FR-TD-01**: Tạo task, Sửa task, Xóa task, Tích chọn hoàn thành/chưa hoàn thành.
* **FR-TD-02**: Task được gắn cứng với ngày (`TaskDate` dạng `YYYY-MM-DD`).
* **BR-TD-01**: KHÔNG xóa dữ liệu Task cũ khi sang 00:00 ngày mới. Lịch sử các ngày trước luôn được giữ nguyên trong Client Storage.
* **BR-TD-02**: Todo lưu hoàn toàn ở Client-side (`localStorage` qua Zustand store).

### 8.6. Product Review & Verification Domain
* **FR-RV-01**: Hiển thị điểm rating trung bình, biểu đồ phân bổ 1-5 sao và danh sách đánh giá kèm hình ảnh thực tế.
* **BR-RV-01**: Cơ chế **Guest Verified Review**: Để gửi đánh giá, Guest bắt buộc nhập Mã đơn hàng + Số điện thoại/Email. Backend kiểm tra đơn hàng có trạng thái `DELIVERED` và chứa sản phẩm tương ứng mới cho phép gửi Review với trạng thái ban đầu là `PENDING`.

---

## 9. ACCEPTANCE CRITERIA (GIVEN / WHEN / THEN)

### AC-01: Guest Checkout thành công
* **GIVEN** Guest User có 1 sản phẩm trong giỏ hàng và đang ở trang `/checkout`.
* **WHEN** User điền đúng Họ tên, SĐT hợp lệ, Địa chỉ giao hàng và nhấn "Đặt hàng".
* **THEN** Hệ thống tính toán lại giá từ Backend, tạo đơn hàng thành công, hiển thị trang Order Success với Mã đơn hàng và xóa giỏ hàng Client.

### AC-02: Tạo Todo ngày mới không mất ngày cũ
* **GIVEN** User đã hoàn thành 2 task ngày 2026-08-08.
* **WHEN** Thời gian hệ thống chuyển sang ngày 2026-08-09.
* **THEN** Trang Todo hiển thị danh sách rỗng cho ngày 2026-08-09, đồng thời khi User chọn ngày 2026-08-08 trên lịch thì 2 task cũ vẫn hiển thị đầy đủ trạng thái đã hoàn thành.

### AC-03: Đánh giá sản phẩm của Guest bị từ chối nếu chưa mua hàng
* **GIVEN** Guest User nhập Mã đơn hàng `GP-999999` không tồn tại hoặc chưa giao thành công (`PROCESSING`).
* **WHEN** User nhấn gửi Đánh giá cho sản phẩm Gạo lứt.
* **THEN** Hệ thống trả về lỗi "Chỉ đơn hàng đã giao thành công mới có thể gửi đánh giá" và không tạo bản ghi Review.

---

## 10. SEO REQUIREMENTS

1. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Các trang Blog Detail, Product Detail, Category Page bắt buộc phải được render phía Server để Google Bot crawl nội dung.
2. **Dynamic Metadata & Open Graph**: Tự động sinh `title`, `description`, `canonical`, `og:image`, `og:title` cho từng Sản phẩm và Bài viết Blog.
3. **Structured Data (JSON-LD)**:
   * Trang Product: Schema `Product`, `Offer`, `AggregateRating`.
   * Trang Blog: Schema `Article`, `BreadcrumbList`.
   * Trang Q&A: Schema `QAPage`.
4. **URL Structure**: Sử dụng Slug chuẩn SEO tiếng Việt không dấu (vd: `/products/gao-lut-do-st25`, `/blog/5-loi-ich-cua-gao-lut`).

---

## 11. MVP SCOPE VS FUTURE PHASES

| Module | MVP Scope (Phase 1) | Phase 2 (User Accounts & Payments) | Phase 3 (AI & Advanced) |
| :--- | :--- | :--- | :--- |
| **Authentication** | Guest Only (No Login) | User Account (Email/OTP/OAuth) | Social Community Profiles |
| **Checkout & Pay** | COD Only | Bank Transfer, VNPay, MoMo, Stripe | Subscription / Recurring Order |
| **Todo** | Pure Client-side (localStorage) | Cloud Sync Todo với Account | AI Health Assistant Todo Suggestion |
| **Reviews & Q&A** | Guest Verification via Order ID | User Verified Badge | AI Automated Q&A Answer |
| **Content** | Editorial Blog + Linked Products | User Saved Articles / Wishlist | Personalized Content Feed |
