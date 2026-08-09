# DESIGN SYSTEM & BRAND SPECIFICATIONS — GREENPANTRY

- **Dự án**: GreenPantry Platform (E-commerce + Content Commerce + Community Q&A + Daily Personal Todo)
- **Tác giả**: Senior Product Designer & Solution Architect
- **Phiên bản**: 1.0.0 (MVP Hand-off Specification)
- **Trạng thái**: Approved for Google Stitch Screen Generation & Next.js Implementation

---

## 1. VISUAL THEME & ATMOSPHERE

GreenPantry đại diện cho lối sống xanh, dưỡng sinh, sử dụng thực phẩm tự nhiên, sạch và lành mạnh (gạo lứt, ngũ cốc, hạt khô, bột nguyên chất, trà herbal). Giao diện ứng dụng phải truyền tải cảm giác **Tự nhiên (Natural) + Hiện đại (Modern) + Tinh tế (Minimal) + Cao cấp (Premium Healthy Food)**.

* **Density (Độ dày đặc)**: `Daily App Balanced (5/10)` — Whitespace rộng rãi, nội dung dễ thở, tập trung vào hình ảnh chân thực của nông sản và bài viết dinh dưỡng.
* **Variance (Độ bất đối xứng)**: `Offset Asymmetric (6/10)` — Phối hợp bố cục dạng Zig-zag giữa bài viết và sản phẩm đính kèm, tạo luồng khám phá tự nhiên.
* **Motion Intensity (Chuyển động)**: `Fluid Micro-Interactions (6/10)` — Hiệu ứng hover mượt mà trên nút bấm và card sản phẩm, hiệu ứng toast notification dịu nhẹ, hiệu ứng chuyển tab 0ms trễ.

---

## 2. COLOR PALETTE & FUNCTIONAL ROLES

Tất cả màu sắc sử dụng cho GreenPantry tuân thủ nguyên tắc phối màu đất & thiên nhiên (Earth & Plant Calibrated Palette). Tuyệt đối KHÔNG sử dụng màu đen thuần (`#000000`) hay hiệu ứng Neon/Purple rực rỡ của AI.

| Tên màu | Mã Hex Code | Vai trò chức năng (Functional Role) |
| :--- | :--- | :--- |
| **Primary Sage Green** | `#2D5A27` | Màu thương hiệu chủ đạo: Nút bấm chính, Header active links, Verified Badges, Primary Progress bars. |
| **Surface Off-White** | `#F9F6F0` | Màu nền chính toàn ứng dụng (Canvas background): Tạo cảm giác ấm áp, dễ chịu cho mắt. |
| **Pure Container Fill** | `#FFFFFF` | Nền các thẻ Card, Modal, Dropdown menu, Form input fields để nổi bật trên lớp Surface. |
| **Accent Terracotta** | `#C86D51` | Màu gốm đất nung nhấn: Nút mua hàng khuyến mãi, Tag giảm giá, CTA đính kèm trong Blog, Highlights. |
| **Slate Dark Ink** | `#1E293B` | Màu văn bản chính (Text primary), tiêu đề lớn (Headings), nét viền icon quan trọng. |
| **Slate Muted Steel** | `#64748B` | Màu văn bản phụ (Text secondary), mô tả ngắn, tác giả, ngày tháng, thông số dinh dưỡng phụ. |
| **Soft Sage Border** | `#E2E8F0` | Đường phân cách 1px, nét viền thẻ card, ô nhập liệu mặc định. |
| **Success Forest Green** | `#166534` | Thông báo thành công, badge "Đã giao hàng", "Verified Order". (Nền: `#DCFCE7`) |
| **Warning Amber** | `#D97706` | Thông báo cảnh báo, badge "Đang chờ duyệt", "Sắp hết hàng". (Nền: `#FEF3C7`) |
| **Destructive Red** | `#991B1B` | Cảnh báo hết hàng, lỗi nhập liệu, xóa item giỏ hàng. (Nền: `#FEE2E2`) |

---

## 3. TYPOGRAPHY ARCHITECTURE

GreenPantry kết hợp 2 Google Fonts hiện đại: `Outfit` (cho Headlines & Display Titles) tạo nét mộc mạc bo tròn tự nhiên, và `Inter` (cho Body copy & Form controls) đảm bảo độ đọc tối ưu trên mọi màn hình.

### 3.1. Font Families
* **Display / Headlines**: `Outfit`, sans-serif (Font-weights: `600` Semi-Bold, `700` Bold)
* **Body / UI Controls**: `Inter`, sans-serif (Font-weights: `400` Regular, `500` Medium, `600` Semi-Bold)
* **Monospace / Numbers**: `JetBrains Mono` hoặc `Inter` với `font-variant-numeric: tabular-nums` (cho Giá tiền, Mã đơn `GP-883920`, Số liệu Dinh dưỡng).

### 3.2. Typographic Scale Hierarchy

| Token Name | Pixel Size | Rem Value | Line Height | Tracking | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-5xl` | 48px | 3.00rem | 1.15 | `-0.02em` | Hero Main Heading |
| `text-4xl` | 36px | 2.25rem | 1.20 | `-0.02em` | Section Titles, Product Name in Detail |
| `text-3xl` | 30px | 1.875rem | 1.25 | `-0.01em` | Blog Title, Category Main Header |
| `text-2xl` | 24px | 1.50rem | 1.30 | `0em` | Card Subheadings, Modal Titles |
| `text-xl` | 20px | 1.25rem | 1.35 | `0em` | Block Quotes, Price Display |
| `text-lg` | 18px | 1.125rem | 1.40 | `0em` | Lead Text, Form Labels |
| `text-base` | 16px | 1.00rem | 1.50 | `0em` | Primary Body Text, Buttons |
| `text-sm` | 14px | 0.875rem | 1.50 | `0em` | Secondary Body, Badges, Table Items |
| `text-xs` | 12px | 0.75rem | 1.40 | `0.01em` | Metadata, Captions, Helper Text |

---

## 4. SPACING, RADIUS & ELEVATION SYSTEM

### 4.1. Spacing Scale
Hệ thống khoảng cách dựa trên bội số của 4px:
* `p-1` / `gap-1`: 4px
* `p-2` / `gap-2`: 8px
* `p-3` / `gap-3`: 12px
* `p-4` / `gap-4`: 16px
* `p-6` / `gap-6`: 24px
* `p-8` / `gap-8`: 32px
* `p-12` / `gap-12`: 48px
* `p-16` / `gap-16`: 64px

### 4.2. Border Radius Scale
* `rounded-sm`: 4px (Dùng cho Badge nhỏ, Checkbox)
* `rounded-md`: 8px (Dùng cho Input fields, Dropdown, Small Buttons)
* `rounded-xl`: 16px (Dùng cho Product Cards, Modals, Buttons chính)
* `rounded-2xl`: 24px (Dùng cho Hero Banners, Large Containers)
* `rounded-full`: 9999px (Dùng cho Avatars, Pills, Badges bo góc hoàn toàn)

### 4.3. Box Shadows & Glassmorphism
* **`shadow-soft-sm`**: `0 2px 8px -2px rgba(30, 41, 59, 0.05)` — Dành cho nút bấm hover, input focus.
* **`shadow-soft-md`**: `0 4px 16px -4px rgba(30, 41, 59, 0.08)` — Dành cho Product Cards, Dropdowns.
* **`shadow-soft-lg`**: `0 12px 32px -8px rgba(30, 41, 59, 0.12)` — Dành cho Modals, Cart Drawer, Navigation Bar dính.
* **`glass-backdrop`**: `background: rgba(249, 246, 240, 0.85); backdrop-filter: blur(12px)` — Sticky Header navigation.

---

## 5. COMPONENT DESIGN STANDARDS

### 5.1. Buttons
* **Primary Button**: Background `#2D5A27`, Text `#FFFFFF`, Border-radius 16px (`rounded-xl`), Padding `px-6 py-3.5`, Text `font-medium text-base`. Hover: scale `1.02` + hiệu ứng sáng dịu nhẹ. Active: translate-y `-1px`.
* **Secondary Button**: Background `#F1F5F9`, Text `#1E293B`, Border 1px `#E2E8F0`. Hover: Background `#E2E8F0`.
* **Accent CTA Button**: Background `#C86D51`, Text `#FFFFFF`. Dùng cho nút "Đặt mua ngay" trong bài viết Blog hoặc khuyến mãi.
* **Outline Button**: Background transparent, Border 1.5px `#2D5A27`, Text `#2D5A27`.
* **Ghost Button**: Background transparent, Text `#64748B`. Hover: Background `#F1F5F9`, Text `#1E293B`.

### 5.2. Input Fields & Form Controls
* **Default Input**: Background `#FFFFFF`, Border 1px `#E2E8F0`, Padding `px-4 py-3`, Border-radius 8px (`rounded-md`), Text `#1E293B`, Placeholder `#94A3B8`.
* **Focus State**: Border `#2D5A27`, Shadow `0 0 0 3px rgba(45, 90, 39, 0.15)`.
* **Error State**: Border `#991B1B`, Text Lỗi bên dưới chữ đỏ `#991B1B` cỡ `text-xs`.
* **Form Labels**: Đặt phía trên ô input, cỡ chữ `text-sm font-medium text-[#1E293B]`.

### 5.3. Badges & Tags
* **Verified Purchase Badge**: Background `#F0FDF4`, Border 1px `#DCFCE7`, Text `#166534`, kèm Icon Checkmark nhỏ.
* **New Arrival Tag**: Background `#2D5A27`, Text `#FFFFFF`, cỡ chữ `text-xs font-semibold uppercase px-2.5 py-1 rounded-full`.
* **Category Pill**: Background `#F9F6F0`, Border 1px `#E2E8F0`, Text `#64748B`. Active state: Background `#2D5A27`, Text `#FFFFFF`.

### 5.4. Product Cards
* **Layout**: Thẻ dọc gồm Ảnh sản phẩm tỉ lệ 1:1 (bo góc 12px), Tag (nếu có), Tên sản phẩm (`Outfit font-semibold text-lg hover:text-[#2D5A27]`), Giá tiền (`JetBrains Mono font-bold text-xl text-[#2D5A27]`), So sánh giá cũ (gạch ngang màu xám), Điểm Đánh giá sao + Nút "Thêm vào giỏ" nhanh.

---

## 6. INTERFACE STATES SPECIFICATIONS

Mọi màn hình trong ứng dụng bắt buộc phải khai báo đủ 4 trạng thái giao diện:

1. **Default / Success State**: Hiển thị đầy đủ dữ liệu mượt mà.
2. **Loading Skeleton State**:
   - Sử dụng các khối hình chữ nhật bo tròn màu xám nhạt `#E2E8F0` với hiệu ứng hiệu ứng lướt sáng (Shimmer animation `pulse`).
   - Kích thước Skeleton phải khớp 100% với kích thước của Card, Text line, hoặc Hero banner thực tế để không bị giật trang (Layout shift / CLS = 0).
3. **Empty State**:
   - Áp dụng khi Giỏ hàng rỗng, Tìm kiếm không thấy sản phẩm, Bài viết không có kết quả, hoặc chưa có Task Todo cho ngày được chọn.
   - Bắt buộc gồm: Icon minh họa trực quan + Tiêu đề ngắn gọn + Lời giải thích nhẹ nhàng + Nút bấm hành động CTA (vd: "Khám phá sản phẩm ngay").
4. **Error State**:
   - Áp dụng khi mất kết nối mạng hoặc server trả lỗi 500/404.
   - Hiển thị Banner Alert thông báo thân thiện + Nút "Thử lại" (Retry).
5. **Out of Stock State (Sản phẩm hết hàng)**:
   - Thẻ sản phẩm bị giảm độ mờ (opacity 0.7), nút "Thêm vào giỏ" bị vỡ hiệu ứng và mờ hóa (`disabled`), hiển thị Badge "Tạm hết hàng" màu đỏ đật `#991B1B`.

---

## 7. BANNED AI ANTI-PATTERNS

Để đảm bảo sản phẩm đạt tiêu chuẩn UX/UI chuyên nghiệp, các anti-patterns sau bị **CẤM HOÀN TOÀN**:

* ❌ KHÔNG sử dụng màu đen thuần `#000000` (Thay bằng Slate Ink `#1E293B`).
* ❌ KHÔNG sử dụng font `Inter` cho tiêu đề chính (Phải dùng `Outfit` cho Headlines).
* ❌ KHÔNG dùng biểu tượng cảm xúc Emoji làm icon trên sản phẩm thật (Dùng Lucide React Icons SVG mượt mà).
* ❌ KHÔNG tạo hiệu ứng bóng đổ Neon rực rỡ (Neon outer glow) hoặc Gradient tím/xanh nhấp nháy của AI.
* ❌ KHÔNG làm tràn chữ lên ảnh (Text overlapping images) làm mất độ đọc.
* ❌ KHÔNG tự bịa các con số thống kê AI giả lập ("99.9% hài lòng", "100k khách hàng") khi chưa có dữ liệu thật.
* ❌ KHÔNG dùng các tên placeholder giả tạo kiểu tiếng Anh generic ("John Doe", "Acme Corp") — dùng tên Việt Nam thực tế ("Nguyễn Văn An", "Trần Thị Mai").
