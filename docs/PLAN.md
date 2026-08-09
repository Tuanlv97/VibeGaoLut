# MASTER DEVELOPMENT PLAN — GREENPANTRY (TASK TRACKING)

> **QUY TẮC TỐI CAO: DESIGN TRƯỚC — CODE SAU.**
> **TUYỆT ĐỐI KHÔNG VIẾT CODE FRONTEND / BACKEND / DATABASE TRƯỚC KHI BƯỚC GOOGLE STITCH DESIGN ĐƯỢC CHẤP THUẬN (APPROVED).**

- **Dự án**: GreenPantry Platform
- **Tác giả**: Senior Solution Architect & Senior Product Manager
- **Phiên bản**: 2.4.0 (Phase 5 Component Architecture Completed)
- **Trạng thái**: Phase 1, 2, 3, 4 & 5 Completed 🟢 -> Phase 6 Pending ⚪

---

## 1. WORKFLOW & STATUS OVERVIEW

```text
PHASE 1: Product Planning & Specifications                 [COMPLETED] 🟢
   │
   ▼
PHASE 2: UX / UI Specification & Design Tokens           [COMPLETED] 🟢
   │
   ▼
PHASE 3: Google Stitch UI/UX Design Generation (18 Screens) [COMPLETED] 🟢
   │
   ▼
PHASE 4: Design Review & Accessibility Audit            [COMPLETED] 🟢
   │
   ▼
PHASE 5: Stitch Design → Next.js Component Mapping        [COMPLETED] 🟢
   │
   ▼
PHASE 6: Frontend Development (Next.js, Tailwind, Stores)      [TODO] ⚪
   │
   ▼
PHASE 7: NestJS Backend Clean Architecture Development         [TODO] ⚪
   │
   ▼
PHASE 8: PostgreSQL Integration & TypeORM Data Mappers         [TODO] ⚪
   │
   ▼
PHASE 9: E2E Integration (Frontend + Backend REST APIs)        [TODO] ⚪
   │
   ▼
PHASE 10: Comprehensive Testing (Unit, Integration, E2E)       [TODO] ⚪
   │
   ▼
PHASE 11: Production Deployment & Infrastructure Setup         [TODO] ⚪
```

---

## 2. DETAILED TASK TRACKING PER PHASE

---

### PHASE 1 — PRODUCT PLANNING & SPECIFICATIONS 🟢 [COMPLETED]

#### TASK-P01-01
* **Status**: `COMPLETED` 🟢
* **Epic**: Product Definition
* **Feature**: Product Requirements Document (PRD)
* **Task**: Phân tích và biên soạn PRD toàn diện cho GreenPantry
* **Sub-tasks**:
  - [x] 1. Xác định tầm nhìn sản phẩm: Content → Discover → Learn → Trust → Buy → Review.
  - [x] 2. Định nghĩa các quy tắc Guest-First Experience (100% không bắt buộc login).
  - [x] 3. Xây dựng Personas & User Journeys cho Guest User.
  - [x] 4. Đề xuất Business Rules cho Sản phẩm mới (Hybrid Rule), Guest Review Verification và Guest Q&A Moderation.
  - [x] 5. Đánh giá phạm vi MVP vs Phase 2 & Phase 3.
* **Description**: Biên soạn file `docs/PRD.md` mô tả toàn bộ yêu cầu chức năng, phi chức năng, tiêu chuẩn SEO và tiêu chí nghiệm thu.
* **Dependency**: None
* **Priority**: HIGH
* **Expected Output**: File `docs/PRD.md` hoàn chỉnh.
* **Acceptance Criteria**: Đạt 100% tiêu chí nghiệm thu theo quy chuẩn PRD, được phê duyệt cho Phase 2.

#### TASK-P01-02
* **Status**: `COMPLETED` 🟢
* **Epic**: Architecture & Technical Design
* **Feature**: Technical Architecture Document
* **Task**: Thiết kế kiến trúc Clean Architecture & Database ERD
* **Sub-tasks**:
  - [x] 1. Lựa chọn Tech Stack: Next.js App Router, NestJS, TypeORM Data Mapper, PostgreSQL.
  - [x] 2. Phân chia ranh giới 5 Sub-Domains: Catalog, Commerce, Content, Community, Personal.
  - [x] 3. Vẽ sơ đồ kiến trúc hệ thống và sơ đồ cơ sở dữ liệu ERD bằng Mermaid (14 entities).
  - [x] 4. Thiết kế REST API Contracts cho tất cả các modules.
  - [x] 5. Viết các Architectural Decision Records (ADRs).
* **Description**: Biên soạn `docs/TECH_ARCHITECTURE.md` quy định cấu trúc code, quy tắc phân tầng và thiết kế cơ sở dữ liệu.
* **Dependency**: TASK-P01-01
* **Priority**: HIGH
* **Expected Output**: File `docs/TECH_ARCHITECTURE.md` hoàn chỉnh.
* **Acceptance Criteria**: Kiến trúc thỏa mãn các nguyên lý Clean Architecture, Type-safety và Guest User constraints.

#### TASK-P01-03
* **Status**: `COMPLETED` 🟢
* **Epic**: Project Management
* **Feature**: Master Development Plan
* **Task**: Lập kế hoạch phát triển Master PLAN.md
* **Sub-tasks**:
  - [x] 1. Xây dựng quy trình 11 bước phát triển bắt buộc tuân thủ Design First.
  - [x] 2. Soạn thảo 18 Google Stitch Prompts cho 18 màn hình MVP.
  - [x] 3. Phân chia chi tiết các công việc cho từng Phase.
* **Description**: Tạo lập `docs/PLAN.md` đóng vai trò kim chỉ nam cho toàn bộ đội ngũ phát triển.
* **Dependency**: TASK-P01-02
* **Priority**: HIGH
* **Expected Output**: File `docs/PLAN.md` hoàn chỉnh.
* **Acceptance Criteria**: Có đủ 11 Phase và 18 Google Stitch Prompts sẵn sàng cho handoff.

---

### PHASE 2 — UX / UI SPECIFICATION & DESIGN TOKENS 🟢 [COMPLETED]

#### TASK-P02-01
* **Status**: `COMPLETED` 🟢
* **Epic**: Design System
* **Feature**: Design Tokens & Typography Definition
* **Task**: Định nghĩa hệ thống Design Tokens và quy chuẩn hình ảnh thương hiệu
* **Sub-tasks**:
  - [x] 1. Xác định Bảng màu chuẩn Natural & Healthy: Primary Sage Green (`#2D5A27`), Off-White Background (`#F9F6F0`), Earth Terracotta Accent (`#C86D51`), Slate Dark Neutral (`#1E293B`).
  - [x] 2. Quy định Typography: Font Inter / Outfit từ Google Fonts, hệ thống font-scale từ `xs` tới `5xl`.
  - [x] 3. Quy định Spacing scale (4px tới 64px), Border Radius (4px, 8px, 12px, 16px, 24px, full), Box Shadows & Glassmorphic backdrop.
  - [x] 4. Định nghĩa quy chuẩn thiết kế nút bấm (Primary, Secondary, Accent CTA, Ghost, Outline), Input fields, Badges, Modals và Toasts.
* **Description**: Biên soạn thành công tài liệu `docs/DESIGN.md` quy định Design System chuẩn Stitch Handoff và Frontend Developers.
* **Dependency**: TASK-P01-03
* **Priority**: HIGH
* **Expected Output**: Tài liệu `docs/DESIGN.md` hoàn chỉnh.
* **Acceptance Criteria**: Đảm bảo phong cách Natural + Modern + Minimal + Premium Healthy Food.

#### TASK-P02-02
* **Status**: `COMPLETED` 🟢
* **Epic**: UX Design
* **Feature**: Screen Layout & Structural Wireframing
* **Task**: Xác định cấu trúc bố cục chi tiết cho 18 màn hình MVP và lưu giữ Screen IDs
* **Sub-tasks**:
  - [x] 1. Chuẩn bị danh sách 18 màn hình (`SCR-01` tới `SCR-18`) & Prompts trong `docs/PLAN.md`.
  - [x] 2. Xác định các Sections, Components, Navigation flow cho từng màn hình.
  - [x] 3. Quy định các trạng thái giao diện bắt buộc: Loading Skeleton, Empty State, Error State, Out of Stock.
* **Description**: Viết bản mô tả chi tiết Handoff Specification cho 18 màn hình kèm cây linh kiện React Component và Screen IDs tại Mục 3 trong `docs/PLAN.md`.
* **Dependency**: TASK-P02-01
* **Priority**: HIGH
* **Expected Output**: Bảng UX Specification & Component Mapping Matrix cho 18 màn hình.
* **Acceptance Criteria**: 100% màn hình có mô tả Screen ID, Layout, Component, Navigation và States.

---

### PHASE 3 — GOOGLE STITCH UI/UX DESIGN GENERATION 🟢 [COMPLETED]

- **Stitch Project Link**: [GreenPantry Project on Google Stitch](https://stitch.withgoogle.com/projects/5871919114350088925)
- **Stitch Project ID**: `5871919114350088925`
- **Local Design Assets**: Saved 18 UI Mockup PNG images in `.stitch/` directory.

#### TASK-P03-01
* **Status**: `COMPLETED` 🟢
* **Epic**: UI Design Generation
* **Feature**: E-commerce Core Screens Design
* **Task**: Thực thi Google Stitch Prompt cho các màn hình E-commerce (`SCR-01` tới `SCR-10`)
* **Sub-tasks**:
  - [x] 1. Run Stitch Prompt `SCR-01`: Home Page (`/`).
  - [x] 2. Run Stitch Prompt `SCR-02`: Product Listing (`/products`).
  - [x] 3. Run Stitch Prompt `SCR-03`: Product Detail (`/products/[slug]`).
  - [x] 4. Run Stitch Prompt `SCR-04`: Category Page (`/categories/[slug]`).
  - [x] 5. Run Stitch Prompt `SCR-05`: New Arrivals Page (`/new-products`).
  - [x] 6. Run Stitch Prompt `SCR-06`: Cart Page (`/cart`).
  - [x] 7. Run Stitch Prompt `SCR-07`: Checkout Page (`/checkout`).
  - [x] 8. Run Stitch Prompt `SCR-08`: Order Success Page (`/orders/success`).
  - [x] 9. Run Stitch Prompt `SCR-09`: Track Order Page (`/orders/track`).
  - [x] 10. Run Stitch Prompt `SCR-10`: Order Detail View (`/orders/[id]`).
* **Description**: Đã sinh và lưu 10 bản vẽ UI E-commerce cốt lõi dưới dạng file ảnh tại thư mục `.stitch/` và liên kết trên Google Stitch.
* **Dependency**: TASK-P02-02
* **Priority**: HIGH
* **Expected Output**: 10 Màn hình UI E-commerce chuẩn visual aesthetics tại `.stitch/SCR-01` -> `.stitch/SCR-10`.
* **Acceptance Criteria**: Giao diện sắc nét, đúng bảng màu Sage Green/Beige, không xuất hiện placeholder generic.

#### TASK-P03-02
* **Status**: `COMPLETED` 🟢
* **Epic**: UI Design Generation
* **Feature**: Content, Community & Personal Screens Design
* **Task**: Thực thi Google Stitch Prompt cho các màn hình Content, Q&A, Todo & Search (`SCR-11` tới `SCR-18`)
* **Sub-tasks**:
  - [x] 1. Run Stitch Prompt `SCR-11`: Blog Listing Page (`/blog`).
  - [x] 2. Run Stitch Prompt `SCR-12`: Blog Detail Page (`/blog/[slug]`).
  - [x] 3. Run Stitch Prompt `SCR-13`: Blog Category Page (`/blog/category/[slug]`).
  - [x] 4. Run Stitch Prompt `SCR-14`: Q&A Listing Page (`/questions`).
  - [x] 5. Run Stitch Prompt `SCR-15`: Q&A Detail Page (`/questions/[id]`).
  - [x] 6. Run Stitch Prompt `SCR-16`: Ask Question Form/Page (`/questions/new`).
  - [x] 7. Run Stitch Prompt `SCR-17`: Daily Todo Page (`/todo`).
  - [x] 8. Run Stitch Prompt `SCR-18`: Search Result Page (`/search`).
* **Description**: Đã sinh và lưu 8 bản vẽ UI Content, Q&A, Todo & Search dưới dạng file ảnh tại thư mục `.stitch/`.
* **Dependency**: TASK-P03-01
* **Priority**: HIGH
* **Expected Output**: 8 Màn hình UI Content/Q&A/Todo/Search hoàn chỉnh tại `.stitch/SCR-11` -> `.stitch/SCR-18`.
* **Acceptance Criteria**: Khối Content Commerce và Daily Todo nổi bật, thân thiện với người dùng.

---

### PHASE 4 — DESIGN REVIEW & ACCESSIBILITY AUDIT 🟢 [COMPLETED]

#### TASK-P04-01
* **Status**: `COMPLETED` 🟢
* **Epic**: Quality Assurance
* **Feature**: Visual & UX Review Checklist
* **Task**: Thực hiện kiểm duyệt toàn bộ 18 bản vẽ thiết kế Google Stitch trong `.stitch/`
* **Sub-tasks**:
  - [x] 1. Kiểm tra UX Flow: Kiểm tra tính thông suốt từ Blog → Product Detail → Cart → Checkout → Track Order.
  - [x] 2. Kiểm tra Mobile & Tablet Responsive Layout: Đảm bảo giao diện hiển thị mượt mà trên nhiều kích thước màn hình.
  - [x] 3. Kiểm tra Empty States (Giỏ hàng trống, không có kết quả tìm kiếm, không có Todo hôm nay).
  - [x] 4. Kiểm tra Loading & Out-of-stock States.
  - [x] 5. Kiểm tra tính đồng bộ của Design System (Color, Font, Buttons, Cards).
* **Description**: Đã thực hiện audit toàn diện thiết kế UI/UX trên 18 màn hình Stitch và cấp chứng nhận Approve tại tài liệu `docs/DESIGN_REVIEW_AUDIT.md`.
* **Dependency**: TASK-P03-02
* **Priority**: HIGH
* **Expected Output**: Bản đánh giá Design Review Checklist được Approve 100% tại `docs/DESIGN_REVIEW_AUDIT.md`.
* **Acceptance Criteria**: Không còn lỗi UX flow, giao diện đạt chứng nhận Approve 100% để chuyển sang Phase 5.

---

### PHASE 5 — STITCH DESIGN → NEXT.JS COMPONENT MAPPING 🟢 [COMPLETED]

#### TASK-P05-01
* **Status**: `COMPLETED` 🟢
* **Epic**: Frontend Architecture
* **Feature**: Atomic Component Breakdown & Mapping
* **Task**: Phân rã giao diện Stitch thành cây linh kiện React Component
* **Sub-tasks**:
  - [x] 1. Phân rã UI Components dùng chung (`components/ui/`): Button, Input, Card, Badge, Modal, Toast, Skeleton, Tabs, Breadcrumb, Pagination, Drawer.
  - [x] 2. Phân rã Feature Components (`features/*`):
     - `features/product`: ProductCard, ProductGrid, ProductFilter, ProductGallery, NutritionTable.
     - `features/cart`: CartItem, CartSummary, CartDrawer.
     - `features/checkout`: CheckoutForm, OrderSummary.
     - `features/order`: OrderTimeline, TrackOrderForm.
     - `features/blog`: BlogCard, BlogHeader, RelatedProductsWidget.
     - `features/qa`: QuestionCard, AnswerBox, AskQuestionModal.
     - `features/todo`: TodoItem, TodoList, DatePickerHeader.
  - [x] 3. Đánh dấu các Component cần Client State vs Server Component.
* **Description**: Tạo bảng Mapping từ Stitch Design sang đường dẫn file React Component cụ thể trong dự án Next.js.
* **Dependency**: TASK-P04-01
* **Priority**: HIGH
* **Expected Output**: Bảng Mapping Component Architecture chuẩn xác.
* **Acceptance Criteria**: Đảm bảo tái sử dụng tối đa component, không bị trùng lặp code.

---

### PHASE 6 — FRONTEND DEVELOPMENT (NEXT.JS & CLIENT STORES) ⚪ [TODO]

#### TASK-P06-01
* **Status**: `TODO` ⚪
* **Epic**: Frontend Setup
* **Feature**: Next.js Project & Global Infrastructure Initialization
* **Task**: Khởi tạo dự án Next.js App Router & cài đặt thư viện UI/State
* **Sub-tasks**:
  - [ ] 1. Khởi tạo `web/` với Next.js App Router + TypeScript strict mode.
  - [ ] 2. Setup Tailwind CSS, cấu hình `tailwind.config.ts` với Bảng màu Sage Green, Beige, Terracotta và Typography Inter.
  - [ ] 3. Cài đặt và cấu hình TanStack Query v5 Client Provider.
  - [ ] 4. Cài đặt Zustand, React Hook Form, Zod, Lucide-react icons.
  - [ ] 5. Xây dựng bộ UI Primitives tại `components/ui/`.
* **Description**: Tạo dựng bộ khung dự án Frontend tiêu chuẩn sẵn sàng lắp ráp UI.
* **Dependency**: TASK-P05-01
* **Priority**: HIGH
* **Expected Output**: Source code khung ứng dụng `web/` chạy thành công `npm run dev`.
* **Acceptance Criteria**: Không có lỗi lint/build, UI Primitives hiển thị chuẩn theo Design System.

#### TASK-P06-02
* **Status**: `TODO` ⚪
* **Epic**: Frontend Feature
* **Feature**: Client Stores (Cart & Daily Todo) Implementation
* **Task**: Triển khai các Zustand Stores cho Giỏ hàng & Daily Todo
* **Sub-tasks**:
  - [ ] 1. Tạo `stores/cart-store.ts`: Quản lý thêm/sửa/xóa sản phẩm, tự động tính tổng tiền Client, kết hợp `persist` middleware (`greenpantry_cart`).
  - [ ] 2. Tạo `stores/todo-store.ts`: Quản lý Todo theo ngày (`TaskDate` dạng `YYYY-MM-DD`), tính năng thêm/sửa/xóa/tích hoàn thành, `persist` middleware (`greenpantry_todos`).
  - [ ] 3. Viết Unit Test độc lập cho các thao tác trong Cart Store và Todo Store.
* **Description**: Hiện thực hóa quản lý state phía Client cho Guest User mà không cần Server DB.
* **Dependency**: TASK-P06-01
* **Priority**: HIGH
* **Expected Output**: Code Zustand Stores hoàn chỉnh tại `apps/web/stores/`.
* **Acceptance Criteria**: F5 trang hoặc đóng trình duyệt dữ liệu Giỏ hàng & Todo không bị mất, Todo phân tách đúng từng ngày.

#### TASK-P06-03
* **Status**: `TODO` ⚪
* **Epic**: Frontend Feature
* **Feature**: E-commerce Pages & Components UI Implementation
* **Task**: Lắp ráp giao diện các trang E-commerce (Home, Product, Cart, Checkout, Track Order)
* **Sub-tasks**:
  - [ ] 1. Xây dựng Home Page (`app/page.tsx`) & các sections (Hero, Categories, New Arrivals, Featured).
  - [ ] 2. Xây dựng Product Listing (`app/products/page.tsx`) & Lọc/Sắp xếp.
  - [ ] 3. Xây dựng Product Detail (`app/products/[slug]/page.tsx`) & Album ảnh, Nutrition, Reviews block, Q&A block.
  - [ ] 4. Xây dựng Cart (`app/cart/page.tsx`) & Checkout (`app/checkout/page.tsx`).
  - [ ] 5. Xây dựng Order Success & Track Order (`app/orders/track/page.tsx`).
* **Description**: Code hoàn chỉnh giao diện các trang E-commerce chuẩn Stitch Design.
* **Dependency**: TASK-P06-02
* **Priority**: HIGH
* **Expected Output**: Giao diện các trang E-commerce hoạt động mượt mà với Mock Data.
* **Acceptance Criteria**: Đúng 100% bản vẽ Stitch, responsive hoàn hảo trên Mobile/Desktop.

#### TASK-P06-04
* **Status**: `TODO` ⚪
* **Epic**: Frontend Feature
* **Feature**: Content, Q&A & Daily Todo Pages Implementation
* **Task**: Lắp ráp giao diện các trang Blog, Hỏi đáp Q&A, Daily Todo & Search
* **Sub-tasks**:
  - [ ] 1. Xây dựng Blog Listing (`app/blog/page.tsx`) & Blog Detail (`app/blog/[slug]/page.tsx`) tích hợp widget "Sản phẩm trong bài".
  - [ ] 2. Xây dựng Q&A Listing (`app/questions/page.tsx`) & Form gửi câu hỏi Guest.
  - [ ] 3. Xây dựng Daily Todo (`app/todo/page.tsx`) kết nối `todo-store.ts` có DatePicker chuyển ngày.
  - [ ] 4. Xây dựng Unified Search Page (`app/search/page.tsx`).
* **Description**: Code hoàn thiện các trang Content Commerce, Community Q&A và Daily Todo.
* **Dependency**: TASK-P06-03
* **Priority**: HIGH
* **Expected Output**: Các trang Blog, Q&A và Todo hoàn thiện.
* **Acceptance Criteria**: Đọc bài viết thấy sản phẩm liên quan, nốt Todo chọn ngày cũ hiển thị đúng lịch sử.

---

### PHASE 7 — NESTJS BACKEND CLEAN ARCHITECTURE DEVELOPMENT ⚪ [TODO]

#### TASK-P07-01
* **Status**: `TODO` ⚪
* **Epic**: Backend Setup
* **Feature**: NestJS Clean Architecture Project Initialization
* **Task**: Khởi tạo Backend NestJS & cấu hình Clean Architecture layers
* **Sub-tasks**:
  - [ ] 1. Khởi tạo dự án NestJS tại `api/` với TypeScript strict checks.
  - [ ] 2. Tạo cấu trúc thư mục phân tầng Clean Architecture: `domain/`, `application/`, `infrastructure/`, `presentation/`.
  - [ ] 3. Setup Global Pipes (`ValidationPipe` với class-validator), Global Exception Filters, Swagger OpenAPI Docs.
* **Description**: Dựng bộ khung NestJS tuân thủ nguyên lý Dependency Inversion.
* **Dependency**: TASK-P01-02
* **Priority**: HIGH
* **Expected Output**: Thư mục `api/` khởi tạo sẵn sàng cho Domain Entities & Use Cases.
* **Acceptance Criteria**: Clean Architecture phân tầng đúng, Domain Layer 100% độc lập với NestJS/TypeORM.

#### TASK-P07-02
* **Status**: `TODO` ⚪
* **Epic**: Backend Domain Logic
* **Feature**: Catalog Domain & Application Use Cases
* **Task**: Phát triển Use Cases & Services cho Catalog Domain (Products & Categories)
* **Sub-tasks**:
  - [ ] 1. Định nghĩa Domain Entities: `Product`, `Category`.
  - [ ] 2. Định nghĩa Repository Interfaces: `IProductRepository`, `ICategoryRepository`.
  - [ ] 3. Implement Application Use Cases: `GetProductsUseCase`, `GetProductDetailUseCase`, `GetNewProductsUseCase` (Hybrid Domain Rule: `released_at <= 30 days OR is_featured_new = true`), `GetCategoriesUseCase`.
  - [ ] 4. Viết Unit Tests cho các Business Use Cases.
* **Description**: Hiện thực hóa toàn bộ logic nghiệp vụ danh mục sản phẩm và sản phẩm mới.
* **Dependency**: TASK-P07-01
* **Priority**: HIGH
* **Expected Output**: Code Use Cases và Unit Tests hoàn chỉnh tại `domain/` và `application/`.
* **Acceptance Criteria**: Unit Tests đạt coverage > 85%, logic Hybrid New Product chạy chính xác.

#### TASK-P07-03
* **Status**: `TODO` ⚪
* **Epic**: Backend Domain Logic
* **Feature**: Commerce Domain & Order Calculation Use Cases
* **Task**: Phát triển Use Cases cho Đơn hàng, Checkout & Đánh giá xác thực (Verified Review)
* **Sub-tasks**:
  - [ ] 1. Định nghĩa Domain Entities: `Order`, `OrderItem`, `Review`.
  - [ ] 2. Implement `CreateOrderUseCase`: Validate sản phẩm, kiểm tra tồn kho (stock), tính toán lại tổng tiền từ Backend, sinh Mã đơn hàng ngẫu nhiên duy nhất (vd: `GP-883920`).
  - [ ] 3. Implement `TrackOrderUseCase`: Tìm đơn hàng bằng Mã đơn + Số điện thoại.
  - [ ] 4. Implement `CreateReviewUseCase` (Guest Verified Review): Bắt buộc xác minh đơn hàng tương ứng đã `DELIVERED` trước khi gán trạng thái `PENDING`.
* **Description**: Code nghiệp vụ lõi về bán hàng, tính tiền, kiểm kho và chống spam review.
* **Dependency**: TASK-P07-02
* **Priority**: HIGH
* **Expected Output**: Business Use Cases Commerce hoàn thiện.
* **Acceptance Criteria**: Giá tiền đơn hàng lấy từ DB Backend 100%, Guest chưa mua hàng không thể gửi Review.

#### TASK-P07-04
* **Status**: `TODO` ⚪
* **Epic**: Backend Domain Logic
* **Feature**: Content & Community Domain Use Cases
* **Task**: Phát triển Use Cases cho Blog & Hỏi đáp Q&A
* **Sub-tasks**:
  - [ ] 1. Định nghĩa Domain Entities: `BlogPost`, `BlogCategory`, `Question`, `QuestionAnswer`.
  - [ ] 2. Implement Use Cases Blog: `GetBlogPostsUseCase`, `GetBlogPostDetailUseCase` (trả về danh sách `relatedProducts`).
  - [ ] 3. Implement Use Cases Q&A: `GetQuestionsUseCase` (chỉ trả về `APPROVED`), `CreateQuestionUseCase` (tự động gắn cờ `PENDING` chờ kiểm duyệt).
* **Description**: Code nghiệp vụ cho Content Commerce và Cộng đồng Hỏi đáp.
* **Dependency**: TASK-P07-03
* **Priority**: HIGH
* **Expected Output**: Use Cases cho Blog và Q&A hoàn tất.
* **Acceptance Criteria**: Bài viết Blog trả đúng sản phẩm đính kèm, câu hỏi mới của Guest không lộ công khai trước khi duyệt.

---

### PHASE 8 — POSTGRESQL INTEGRATION & TYPEORM DATA MAPPERS ⚪ [TODO]

#### TASK-P08-01
* **Status**: `TODO` ⚪
* **Epic**: Infrastructure Persistence
* **Feature**: TypeORM Entities & Data Mapper Implementations
* **Task**: Tạo TypeORM ORM Entities, Database Mappers và Migrations
* **Sub-tasks**:
  - [ ] 1. Khởi tạo `infrastructure/database/entities/`: `ProductOrmEntity`, `CategoryOrmEntity`, `OrderOrmEntity`, `OrderItemOrmEntity`, `ReviewOrmEntity`, `BlogPostOrmEntity`, `QuestionOrmEntity`, v.v.
  - [ ] 2. Viết Mappers (`infrastructure/database/mappers/`): `ProductMapper.toDomain()`, `ProductMapper.toOrm()`, v.v.
  - [ ] 3. Implement Repository Implementations (`infrastructure/repositories/`) triển khai các Interfaces từ Domain Layer.
  - [ ] 4. Cấu hình TypeORM CLI & tạo Migration SQL khởi tạo 14 bảng database.
  - [ ] 5. Viết Database Seeder cho danh mục mẫu (Gạo lứt, Ngũ cốc, Trà), sản phẩm mẫu, bài viết mẫu và câu hỏi mẫu.
* **Description**: Kết nối hệ thống với PostgreSQL Database thông qua Data Mapper Pattern.
* **Dependency**: TASK-P07-04
* **Priority**: HIGH
* **Expected Output**: Bộ Schema PostgreSQL, Migrations và Seeders chạy thành công.
* **Acceptance Criteria**: TypeORM Mappers chuyển đổi dữ liệu không làm mất thuộc tính, PostgreSQL lưu trữ dữ liệu an toàn.

#### TASK-P08-02
* **Status**: `TODO` ⚪
* **Epic**: Presentation Layer
* **Feature**: REST API Controllers & Swagger Specs
* **Task**: Hiện thực hóa Controllers, Request DTOs & Swagger Documentation
* **Sub-tasks**:
  - [ ] 1. Tạo `ProductController`, `OrderController`, `BlogController`, `QuestionController`.
  - [ ] 2. Tạo Request DTOs với `class-validator` annotations (Check định dạng Email, SĐT Việt Nam, UUID).
  - [ ] 3. Đính kèm `@ApiTags`, `@ApiOperation`, `@ApiResponse` cho Swagger API Specs.
  - [ ] 4. Cấu hình Rate Limiting (`@nestjs/throttler`) bảo vệ các Guest APIs chống spam (`POST /orders`, `POST /questions`, `POST /reviews`).
* **Description**: Mở các REST Endpoints công khai giao tiếp với Frontend.
* **Dependency**: TASK-P08-01
* **Priority**: HIGH
* **Expected Output**: Swagger UI khả dụng tại `http://localhost:4000/api/docs`.
* **Acceptance Criteria**: APIs phản hồi đúng chuẩn REST JSON, Rate limit chặn spam hiệu quả.

---

### PHASE 9 — END-TO-END (E2E) FEATURE INTEGRATION ⚪ [TODO]

#### TASK-P09-01
* **Status**: `TODO` ⚪
* **Epic**: Integration
* **Feature**: Frontend API Client & TanStack Query Hooks
* **Task**: Tích hợp Frontend Next.js với NestJS REST APIs
* **Sub-tasks**:
  - [ ] 1. Xây dựng API Client Helper (`lib/api/client.ts`) quản lý baseURL, timeout và xử lý lỗi HTTP chuẩn.
  - [ ] 2. Tạo các TanStack Query Hooks (`lib/api/hooks/`): `useProducts()`, `useProductDetail()`, `useNewArrivals()`, `useBlogPosts()`, `useQuestions()`, `useCreateOrder()`, `useTrackOrder()`.
  - [ ] 3. Thay thế toàn bộ Mock Data phía Frontend bằng dữ liệu sống từ Backend APIs.
  - [ ] 4. Xử lý hiển thị Toast Notification phản hồi khi Đặt hàng thành công, gửi Đánh giá hoặc Đặt câu hỏi.
* **Description**: Kết nối hai nửa Frontend và Backend thành hệ thống hoàn chỉnh.
* **Dependency**: TASK-P08-02, TASK-P06-04
* **Priority**: HIGH
* **Expected Output**: Ứng dụng chạy mượt mà từ màn hình Home đến Checkout và Track Order với DB PostgreSQL.
* **Acceptance Criteria**: Luồng mua hàng Guest Checkout tạo thành công bản ghi trong DB PostgreSQL.

---

### PHASE 10 — COMPREHENSIVE TESTING ⚪ [TODO]

#### TASK-P10-01
* **Status**: `TODO` ⚪
* **Epic**: Quality Assurance
* **Feature**: Business-Critical Flow Testing
* **Task**: Thực hiện kiểm thử Unit, Integration và E2E cho các luồng nghiệp vụ quan trọng
* **Sub-tasks**:
  - [ ] 1. **Backend Unit Testing**: Viết Jest tests cho `CreateOrderUseCase` (kiểm tra tính đúng tổng tiền, giảm stock), `GuestReviewVerification` (kiểm tra trạng thái đơn DELIVERED).
  - [ ] 2. **Frontend Component Testing**: Test giao diện Giỏ hàng Zustand và Daily Todo chọn ngày.
  - [ ] 3. **E2E Testing**: Viết Playwright/Cypress E2E test tự động chạy luồng Guest Checkout từ xem sản phẩm → thêm giỏ → checkout COD → xem Order Success → tra cứu Order Tracking.
* **Description**: Đảm bảo chất lượng sản phẩm không phát sinh lỗi nghiêm trọng (Zero Critical Bugs).
* **Dependency**: TASK-P09-01
* **Priority**: HIGH
* **Expected Output**: Bộ Test suite tự động qua 100% (Pass).
* **Acceptance Criteria**: Luồng Guest Checkout và Daily Todo đạt 100% kịch bản thành công.

---

### PHASE 11 — PRODUCTION DEPLOYMENT & INFRASTRUCTURE SETUP ⚪ [TODO]

#### TASK-P11-01
* **Status**: `TODO` ⚪
* **Epic**: DevOps & Deployment
* **Feature**: Production Build & Server Deployment
* **Task**: Triển khai dự án GreenPantry lên môi trường Production
* **Sub-tasks**:
  - [ ] 1. Build bản bundle tối ưu cho Next.js Frontend (`npm run build`).
  - [ ] 2. Build bản dist cho NestJS Backend (`npm run build`).
  - [ ] 3. Khởi tạo Managed PostgreSQL Instance trên Production (Cloud DB).
  - [ ] 4. Chạy SQL Migrations trên Production Database.
  - [ ] 5. Cấu hình biến môi trường (`.env.production`): `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_URL`.
  - [ ] 6. Thiết lập SSL Certificate (HTTPS) & cấu hình Domain (vd: `greenpantry.vn`).
* **Description**: Đưa hệ thống GreenPantry chính thức hoạt động công khai.
* **Dependency**: TASK-P10-01
* **Priority**: HIGH
* **Expected Output**: Website GreenPantry chạy trên domain chính thức với chứng chỉ HTTPS an toàn.
* **Acceptance Criteria**: Tốc độ tải trang < 1.5s, 100% tính năng Guest Checkout & Daily Todo hoạt động ổn định trên Production.

---

## 3. 18 SCREEN SPECIFICATIONS & COMPONENT MAPPING MATRIX

> Bảng quy chuẩn dưới đây lưu giữ **Screen IDs (`SCR-01` -> `SCR-18`)**, Google Stitch Prompts, Cấu trúc bố cục, Linh kiện React Component tương ứng và 4 Trạng thái UI chuẩn bị cho Hand-off Phase 3 và Phase 5.

---

### 3.1. E-COMMERCE DOMAIN SCREENS (SCR-01 -> SCR-10)

#### 🟢 SCR-01: Home Page (Trang Chủ Discovery & Content-Commerce)
* **Screen ID**: `SCR-01`
* **Route**: `/`
* **Local UI Image**: [SCR-01_home_page.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-01_home_page.png)
* **Target React Page**: `web/app/page.tsx`
* **Mapped React Components**:
  - `components/ui/Navbar.tsx` (Global Header with Search, Cart Badge & Navigation)
  - `features/home/HeroSection.tsx` (Asymmetric split hero with natural lifestyle imagery)
  - `features/home/CategoryGrid.tsx` (Category icons & fast entry cards)
  - `features/product/ProductGrid.tsx` (Featured healthy food products grid)
  - `features/home/NewArrivalsCarousel.tsx` (Hybrid new products spotlight)
  - `features/home/BlogHighlights.tsx` (Content commerce linked articles)
  - `components/ui/Footer.tsx` (Footer with trust badges & links)
* **Google Stitch Prompt**:
  ```markdown
  A clean, modern E-commerce Home Page for "GreenPantry" selling organic healthy food, red rice, grains, and herbal tea.
  PLATFORM: Web Desktop-first, fully responsive mobile single-column.
  PAGE STRUCTURE:
  1. Header: Sticky glassmorphism navbar with brand logo "GreenPantry", navigation links (Sản phẩm, Bài viết, Q&A, Nhật ký Todo), quick search bar, and cart drawer icon with item counter badge.
  2. Hero Section: Asymmetric split layout with left headline "Dinh Dưỡng Tự Nhiên Cho Thói Quên Sống Lành", supporting text, primary CTA button "Khám Phá Ngay", and right organic food photography grid with rounded corners (24px).
  3. Category Showcase: Horizontal grid featuring 6 natural product categories (Gạo & Ngũ cốc, Các loại hạt, Đậu & Bột, Trà herbal, Thực phẩm chay, Healthy Snacks) with subtle hover animation.
  4. Featured Products Grid: 4-column product grid featuring organic red rice ST25, lotus seed tea, black sesame powder. Each card displays 1:1 image, title, price, rating stars, and "Thêm vào giỏ" button.
  5. Content Commerce Spotlight: Asymmetric section featuring top blog article "5 Lợi ích của gạo lứt đỏ nguyên cám" with 2 linked product cards embedded directly next to the reading content.
  6. Footer: Clean 4-column footer with brand mission, customer support links, Guest order lookup, and copyright info.
  ```
* **Navigation Flow**: -> `/products` (Xem tất cả), -> `/products/[slug]` (Click sản phẩm), -> `/blog/[slug]` (Click bài viết), -> `/todo` (Click Todo Menu).
* **Interface States**:
  - *Loading*: Skeleton shimmer for Hero image and 4-column product grid.
  - *Empty*: N/A (Home page has static default fallback content).
  - *Error*: Top banner alert with retry action if server API fails.

---

#### 🟢 SCR-02: Product Listing Page (Trang Danh Sách Sản Phẩm & Bộ Lọc)
* **Screen ID**: `SCR-02`
* **Route**: `/products`
* **Local UI Image**: [SCR-02_product_listing.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-02_product_listing.png)
* **Target React Page**: `web/app/products/page.tsx`
* **Mapped React Components**:
  - `features/product/ProductFilterSidebar.tsx` (Category, price range, rating filter)
  - `features/product/ProductSortHeader.tsx` (Sort dropdown: Newest, Price Low/High)
  - `features/product/ProductGrid.tsx` (Responsive 3-column product list)
  - `components/ui/Pagination.tsx` (Page selector controls)
* **Google Stitch Prompt**:
  ```markdown
  A responsive Product Listing Page for "GreenPantry" healthy food catalog.
  PLATFORM: Web, 2-column layout on Desktop (Sidebar + Main Grid), single column on Mobile.
  PAGE STRUCTURE:
  1. Header & Breadcrumb: Sticky navbar + Breadcrumb link "Trang chủ > Sản phẩm".
  2. Page Header: Headline "Danh Sách Sản Phẩm Tự Nhiên", subtitle showing total product count (24 sản phẩm).
  3. Filter Sidebar (Left): Accordion filter for Categories, Price Range Slider (0đ - 500.000đ), Rating Filter (4 sao trở lên), and Clear All button.
  4. Sorting Header: Dropdown for sorting (Mới nhất, Giá tăng dần, Giá giảm dần, Đánh giá cao).
  5. Product Grid: 3-column grid of product cards showing badge "Mới", image, title, weight (500g), price in Sage Green, and "Thêm vào giỏ" button.
  6. Pagination: Centered page numbers (1, 2, 3) with next/previous arrow buttons.
  ```
* **Navigation Flow**: -> `/products/[slug]` (Click vào sản phẩm), -> `/categories/[slug]` (Chọn danh mục sidebar).
* **Interface States**:
  - *Loading*: 6 Product Card skeletons with shimmer effect.
  - *Empty*: "Không tìm thấy sản phẩm phù hợp bộ lọc" with CTA button "Xóa bộ lọc".
  - *Error*: Banner alert "Không thể tải danh sách sản phẩm. Vui lòng thử lại."

---

#### 🟢 SCR-03: Product Detail Page (Trang Chi Tiết Sản Phẩm & Đánh Giá Verified)
* **Screen ID**: `SCR-03`
* **Route**: `/products/[slug]`
* **Local UI Image**: [SCR-03_product_detail.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-03_product_detail.png)
* **Target React Page**: `web/app/products/[slug]/page.tsx`
* **Mapped React Components**:
  - `features/product/ProductGallery.tsx` (Main image + thumbnail carousel)
  - `features/product/ProductInfo.tsx` (Title, price, stock status, quantity selector, add to cart button)
  - `features/product/NutritionTable.tsx` (Calories, protein, carbs, fat specs)
  - `features/product/ProductReviewSection.tsx` (Average rating, Verified buyer reviews list, Add Review Form)
  - `features/product/ProductQaSection.tsx` (Community Q&A block embedded in product detail)
  - `features/product/RelatedProducts.tsx` (Slider of related products)
* **Google Stitch Prompt**:
  ```markdown
  A comprehensive Product Detail Page for "Gạo Lứt Đỏ ST25 GreenPantry 1kg".
  PLATFORM: Web Desktop 2-column split (Gallery Left, Info Right), single column stacked on Mobile.
  PAGE STRUCTURE:
  1. Gallery Section (Left): Large main product image with 4 thumbnail selector previews, zoom effect on hover.
  2. Buy Box (Right): Product title, brand tag, Price (120.000đ), Original Compare Price (150.000đ, strikethrough), In-stock indicator, Quantity increment selector (- 1 +), Primary CTA "Thêm Vào Giỏ Hàng" and Secondary CTA "Mua Ngay".
  3. Tabs Section: Tabbed content for "Mô Tả & Thành Phần", "Bảng Giá Trị Dinh Dưỡng" (Nutrition Table with calories, fiber, protein), and "Hướng Dẫn Bảo Quản".
  4. Verified Reviews Block: Rating breakdown (4.9/5 stars), Verified Buyer reviews with badge "Đã mua hàng", customer photo attachments, and "Gửi đánh giá bằng Mã đơn hàng" modal trigger form.
  5. Embedded Product Q&A: Q&A list related to cooking rice, and "Đặt câu hỏi" form.
  6. Related Products Carousel: 4 cards of complementary products (Trà gạo lứt, Đậu đen xanh lòng).
  ```
* **Navigation Flow**: -> `/cart` (Khi bấm Thêm vào giỏ), -> `/checkout` (Khi bấm Mua ngay), -> `/blog/[slug]` (Khi click bài viết liên quan).
* **Interface States**:
  - *Loading*: Split layout gallery skeleton + line skeletons.
  - *Out of stock*: Price remains visible, quantity selector disabled, CTA changed to disabled "Tạm Hết Hàng" in dark red `#991B1B`.
  - *Error*: 404 Product Not Found page with button "Quay lại danh sách sản phẩm".

---

#### 🟢 SCR-04: Category Page (Trang Danh Mục Sản Phẩm)
* **Screen ID**: `SCR-04`
* **Route**: `/categories/[slug]`
* **Local UI Image**: [SCR-04_category_page.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-04_category_page.png)
* **Target React Page**: `web/app/categories/[slug]/page.tsx`
* **Mapped React Components**:
  - `features/category/CategoryBanner.tsx` (Hero banner for specific category)
  - `features/product/ProductGrid.tsx` (Products filtered by category)
  - `features/category/CategoryDescription.tsx` (SEO nutrition description text)
* **Google Stitch Prompt**:
  ```markdown
  A Category Page for "Gạo & Ngũ Cốc Cốc Lấy Dinh Dưỡng".
  PLATFORM: Web Desktop & Mobile responsive.
  PAGE STRUCTURE:
  1. Category Hero Banner: Sage Green background banner with category title, short description, and natural botanical background pattern.
  2. Sub-categories Navigation Pills: Horizontal scroll pills (Gạo lứt đỏ, Gạo lứt đen, Yến mạch nguyên cám, Nếp nương).
  3. Products Grid: 4-column layout displaying category products with sorting options.
  4. SEO Content Section: Bottom section with rich text explaining nutritional values of whole grains for SEO search engines.
  ```
* **Navigation Flow**: -> `/products/[slug]` (Click sản phẩm), -> `/categories/[other-slug]` (Click category pill).
* **Interface States**:
  - *Loading*: Banner skeleton + 4 Product skeletons.
  - *Empty*: "Hiện chưa có sản phẩm trong danh mục này".

---

#### 🟢 SCR-05: New Arrivals Page (Trang Sản Phẩm Mới - Hybrid Rule)
* **Screen ID**: `SCR-05`
* **Route**: `/new-products`
* **Local UI Image**: [SCR-05_new_arrivals.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-05_new_arrivals.png)
* **Target React Page**: `web/app/new-products/page.tsx`
* **Mapped React Components**:
  - `features/product/NewArrivalsHeader.tsx` (Header highlighting 30-day released products)
  - `features/product/ProductGrid.tsx` (Products with `is_featured_new = true` or `released_at <= 30 days`)
* **Google Stitch Prompt**:
  ```markdown
  A New Arrivals Page highlighting new organic healthy food additions.
  PLATFORM: Web responsive.
  PAGE STRUCTURE:
  1. Header Banner: Fresh headline "Sản Phẩm Mới Về Trong Tháng", subtitle explaining fresh harvests and new arrivals.
  2. Filter Bar: Quick filter tags (Tất cả, Vừa thu hoạch, Khuyến mãi ra mắt).
  3. Product Grid: 4-column product layout with prominent green "NEW" badge on each card.
  ```
* **Navigation Flow**: -> `/products/[slug]` (Click sản phẩm).
* **Interface States**:
  - *Loading*: 8 Product Card skeletons.
  - *Empty*: "Không có sản phẩm mới nào trong 30 ngày qua".

---

#### 🟢 SCR-06: Cart Page (Trang Giỏ Hàng & Tóm Tắt Đơn Hàng)
* **Screen ID**: `SCR-06`
* **Route**: `/cart`
* **Local UI Image**: [SCR-06_cart_page.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-06_cart_page.png)
* **Target React Page**: `web/app/cart/page.tsx`
* **Mapped React Components**:
  - `features/cart/CartItemList.tsx` (List of items in cart with quantity modifiers & remove buttons)
  - `features/cart/CartSummary.tsx` (Subtotal, shipping fee estimate, grand total & checkout button)
  - `features/cart/EmptyCart.tsx` (Empty cart illustration & CTA)
* **Google Stitch Prompt**:
  ```markdown
  A clean Cart Page for Guest Users.
  PLATFORM: Web 2-column layout (Items List Left, Summary Sticky Right).
  PAGE STRUCTURE:
  1. Page Header: Title "Giỏ Hàng Của Bạn", item counter tag (3 sản phẩm).
  2. Cart Items Table (Left): Rows containing product image (80x80px), name, unit price, quantity control buttons (- 1 +), line total price in Sage Green, and trash icon button to remove.
  3. Order Summary Box (Right): Card containing Subtotal (Tạm tính), Estimated Shipping Fee (Phí vận chuyển), Total Amount (Tổng thanh toán in bold 24px Sage Green), and prominent primary CTA button "Tiến Hành Thanh Toán (COD)".
  4. Trust Badges: Free shipping notice over 300k, COD payment assurance, and return policy guarantee.
  ```
* **Navigation Flow**: -> `/checkout` (Bấm Tiến hành thanh toán), -> `/products` (Bấm Tiếp tục mua hàng).
* **Interface States**:
  - *Empty State*: Illustration of empty basket + text "Giỏ hàng của bạn đang trống" + primary button "Khám phá sản phẩm ngay".

---

#### 🟢 SCR-07: Checkout Page (Trang Guest Checkout Thanh Toán COD)
* **Screen ID**: `SCR-07`
* **Route**: `/checkout`
* **Local UI Image**: [SCR-07_checkout_page.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-07_checkout_page.png)
* **Target React Page**: `web/app/checkout/page.tsx`
* **Mapped React Components**:
  - `features/checkout/GuestAddressForm.tsx` (Name, phone, email, province, district, ward, address detail)
  - `features/checkout/PaymentMethodSelector.tsx` (COD method default selection)
  - `features/checkout/OrderSummaryWidget.tsx` (Compact cart items list + final total calculation)
* **Google Stitch Prompt**:
  ```markdown
  A streamlined Guest Checkout Page with 0 registration requirement.
  PLATFORM: Web 2-column layout (Guest Form Left, Order Review Right).
  PAGE STRUCTURE:
  1. Guest Information Form (Left): Input fields for Full Name (Họ và tên), Phone Number (Số điện thoại), Email Address (Email nhận xác nhận), Province/City dropdown (Tỉnh/Thành), District dropdown (Quận/Huyện), Ward dropdown (Phường/Xã), Detailed Address textarea (Địa chỉ cụ thể), Order Note (Ghi chú giao hàng).
  2. Payment Method Card: Single default pre-selected option "Thanh toán khi nhận hàng (COD)" with explanation icon.
  3. Order Summary Widget (Right): Mini list of items being ordered, Subtotal, Shipping fee, Final Total, and primary CTA button "Xác Nhận Đặt Hàng (COD)".
  ```
* **Navigation Flow**: -> `/orders/success` (Tạo đơn thành công), -> `/cart` (Quay lại chỉnh sửa giỏ).
* **Interface States**:
  - *Form Validation Error*: Red inline validation errors below empty required fields (SĐT không hợp lệ, thiếu địa chỉ).
  - *Submitting*: Button disabled with loading spinner "Đang xử lý đơn hàng...".

---

#### 🟢 SCR-08: Order Success Page (Trang Xóa Giỏ & Xác Nhận Đơn Hàng Thành Công)
* **Screen ID**: `SCR-08`
* **Route**: `/orders/success`
* **Local UI Image**: [SCR-08_order_success.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-08_order_success.png)
* **Target React Page**: `web/app/orders/success/page.tsx`
* **Mapped React Components**:
  - `features/order/OrderSuccessCard.tsx` (Checkmark animation, Order Number display, Customer info summary, Track order quick button)
* **Google Stitch Prompt**:
  ```markdown
  An Order Success Page displaying order confirmation and generated Order Number.
  PLATFORM: Web centered single-column layout.
  PAGE STRUCTURE:
  1. Success Icon: Green checkmark animation with title "Đặt Hàng Thành Công!".
  2. Order Number Banner: Highlighted box displaying Generated Order ID "Mã Đơn Hàng: GP-883920" with a "Sao chép mã" button.
  3. Order Details Summary: Recipient name, phone number, shipping address, COD payment total, estimated delivery date.
  4. Actions Row: Primary button "Tra Cứu Đơn Hàng" linking to tracking page, Secondary button "Quay Về Trang Chủ".
  ```
* **Navigation Flow**: -> `/orders/track` (Click Tra cứu đơn hàng), -> `/` (Về trang chủ).
* **Interface States**:
  - *Default*: Shows complete order metadata from checkout submission.

---

#### 🟢 SCR-09: Track Order Page (Trang Tra Cứu Đơn Hàng Qua Mã Đơn & SĐT)
* **Screen ID**: `SCR-09`
* **Route**: `/orders/track`
* **Local UI Image**: [SCR-09_track_order.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-09_track_order.png)
* **Target React Page**: `web/app/orders/track/page.tsx`
* **Mapped React Components**:
  - `features/order/TrackOrderForm.tsx` (Order Number input + Phone Number input + Search action)
  - `features/order/OrderTimeline.tsx` (Status steps: PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED)
  - `features/order/OrderDetailsView.tsx` (Detailed items, total amount, shipping info)
* **Google Stitch Prompt**:
  ```markdown
  A Track Order Page allowing Guests to look up orders using Order Number and Phone.
  PLATFORM: Web centered column layout.
  PAGE STRUCTURE:
  1. Search Box Header: Headline "Tra Cứu Đơn Hàng GreenPantry", form with 2 inputs (Mã đơn hàng vd: GP-883920, Số điện thoại) and "Tra Cứu" button.
  2. Status Timeline Result: Horizontal timeline showing current status (Đã tiếp nhận -> Đã xác nhận -> Đang đóng gói -> Đang giao hàng -> Giao thành công).
  3. Order Info Card: Buyer details, shipping address, items ordered, and total payment status (COD).
  ```
* **Navigation Flow**: -> `/orders/[id]` (Direct link), -> `/products/[slug]` (Mua lại sản phẩm).
* **Interface States**:
  - *Initial*: Search form only.
  - *NotFound*: Error alert "Không tìm thấy đơn hàng với Mã đơn và SĐT trên. Vui lòng kiểm tra lại."

---

#### 🟢 SCR-10: Order Detail View (Trang Xem Chi Tiết 1 Đơn Hàng Bằng ID)
* **Screen ID**: `SCR-10`
* **Route**: `/orders/[id]`
* **Local UI Image**: [SCR-10_order_detail.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-10_order_detail.png)
* **Target React Page**: `web/app/orders/[id]/page.tsx`
* **Mapped React Components**:
  - `features/order/OrderTimeline.tsx` (Status timeline)
  - `features/order/OrderDetailsView.tsx` (Complete info card)
* **Google Stitch Prompt**:
  ```markdown
  A detailed Order View Page for a specific Order ID.
  PLATFORM: Web responsive layout.
  PAGE STRUCTURE:
  1. Order Header: Order ID "Đơn Hàng #GP-883920", Order creation date, Current status badge in Forest Green.
  2. Tracking Steps: Interactive order status timeline.
  3. Items List: Table of ordered products with price, quantity, total.
  4. Delivery & Payment: Recipient shipping address card and COD payment summary.
  ```
* **Navigation Flow**: -> `/orders/track` (Trở lại tìm kiếm đơn).
* **Interface States**:
  - *Loading*: Order details skeleton loader.

---

### 3.2. CONTENT & COMMUNITY DOMAIN SCREENS (SCR-11 -> SCR-16)

#### 🟢 SCR-11: Blog Listing Page (Trang Danh Sách Bài Viết Dinh Dưỡng)
* **Screen ID**: `SCR-11`
* **Route**: `/blog`
* **Local UI Image**: [SCR-11_blog_listing.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-11_blog_listing.png)
* **Target React Page**: `web/app/blog/page.tsx`
* **Mapped React Components**:
  - `features/blog/FeaturedBlogPost.tsx` (Large hero featured article layout)
  - `features/blog/BlogCategoryTabs.tsx` (Filter posts by category/tag)
  - `features/blog/BlogGrid.tsx` (3-column article cards grid)
* **Google Stitch Prompt**:
  ```markdown
  A nutrition & healthy living Blog Listing Page for "GreenPantry".
  PLATFORM: Web 3-column article grid with prominent Featured Hero post.
  PAGE STRUCTURE:
  1. Page Header: Title "Góc Sức Khỏe & Dinh Dưỡng Dưỡng Sinh", subtitle.
  2. Featured Hero Post (Top): Large 2-column card featuring top article " Hướng Dẫn Cách Nấu Cơm Gạo Lứt Dẻo Ngon Không Bị Cứng", cover photo, author, reading time (5 phút đọc), and excerpt.
  3. Category Filter Tabs: Horizontal filter pills (Tất cả, Công thức nấu ăn, Mẹo dưỡng sinh, Kiến thức dinh dưỡng, Trà & Detox).
  4. Article Grid: 3-column grid of blog cards showing image, tag badge, title, short summary, author avatar, date, and link "Đọc tiếp ->".
  ```
* **Navigation Flow**: -> `/blog/[slug]` (Click xem chi tiết bài viết), -> `/blog/category/[slug]` (Click filter category).
* **Interface States**:
  - *Loading*: Featured post skeleton + 6 article card skeletons.

---

#### 🟢 SCR-12: Blog Detail Page (Trang Chi Tiết Bài Viết & Gắn Thẻ Sản Phẩm)
* **Screen ID**: `SCR-12`
* **Route**: `/blog/[slug]`
* **Local UI Image**: [SCR-12_blog_detail.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-12_blog_detail.png)
* **Target React Page**: `web/app/blog/[slug]/page.tsx`
* **Mapped React Components**:
  - `features/blog/BlogHeader.tsx` (Title, author, published date, cover image)
  - `features/blog/BlogContent.tsx` (Rich typography body content with embedded headings)
  - `features/blog/RelatedProductsWidget.tsx` (Content Commerce widget: Product cards mentioned in article with direct Add to Cart button)
  - `features/blog/ShareAndTags.tsx` (Social share & tag pills)
* **Google Stitch Prompt**:
  ```markdown
  An editorial Blog Detail Page for "5 Lợi Ích Của Gạo Lứt Đỏ Nguyên Cám Cho Sức Khỏe".
  PLATFORM: Web centered reading layout with Content Commerce sidebar/widget.
  PAGE STRUCTURE:
  1. Article Header: Category pill, main title in Outfit font (36px), author name "Dược sĩ Minh Anh", publication date, reading time "6 phút đọc", cover photo.
  2. Body Content: Rich text layout with clear headings, blockquotes, bullet lists, optimized line length (65 characters per line).
  3. Content Commerce Embedded Widget (Crucial): A callout box inside article titled "Sản Phẩm Được Đề Cập Trong Bài Viết" displaying product cards for "Gạo Lứt Đỏ ST25 GreenPantry 1kg" with price (120.000đ) and direct "Thêm vào giỏ" button.
  4. Footer & Related Articles: Author bio card, tags, and 3 recommended reading posts.
  ```
* **Navigation Flow**: -> `/products/[slug]` (Click sản phẩm trong bài), -> `/blog/[slug]` (Click bài viết đề xuất).
* **Interface States**:
  - *Loading*: Content lines skeleton + widget skeleton.

---

#### 🟢 SCR-13: Blog Category Page (Trang Danh Mục Bài Viết)
* **Screen ID**: `SCR-13`
* **Route**: `/blog/category/[slug]`
* **Local UI Image**: [SCR-13_blog_category.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-13_blog_category.png)
* **Target React Page**: `web/app/blog/category/[slug]/page.tsx`
* **Mapped React Components**:
  - `features/blog/BlogGrid.tsx` (Filtered articles grid)
* **Google Stitch Prompt**:
  ```markdown
  A Blog Category Page for "Công Thức Nấu Ăn Chay & Dưỡng Sinh".
  PLATFORM: Web responsive.
  PAGE STRUCTURE:
  1. Category Header: Title and description of the specific blog category.
  2. Article Grid: 3-column blog grid filtered by category.
  ```
* **Navigation Flow**: -> `/blog/[slug]` (Click bài viết).

---

#### 🟢 SCR-14: Q&A Listing Page (Trang Hỏi Đáp Cộng Đồng Dinh Dưỡng)
* **Screen ID**: `SCR-14`
* **Route**: `/questions`
* **Local UI Image**: [SCR-14_qa_listing.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-14_qa_listing.png)
* **Target React Page**: `web/app/questions/page.tsx`
* **Mapped React Components**:
  - `features/qa/QuestionFilterTabs.tsx` (General, Product, Cooking, Nutrition)
  - `features/qa/QuestionCardList.tsx` (List of approved questions with official answers)
  - `features/qa/AskQuestionButton.tsx` (CTA button to open Ask Question modal)
* **Google Stitch Prompt**:
  ```markdown
  A Community Q&A Listing Page for "GreenPantry".
  PLATFORM: Web single column community stream.
  PAGE STRUCTURE:
  1. Page Header: Title "Hỏi Đáp Cùng Chuyên Gia Dinh Dưỡng", primary CTA button "+ Đặt Câu Hỏi Mới".
  2. Category Tabs: Filters for Tất cả, Sản phẩm, Công thức nấu, Dinh dưỡng thực dưỡng.
  3. Q&A List: Card stream containing Guest question (Author name, time ago, content), Official Answer box highlighted in Sage Green background with badge "Câu trả lời từ GreenPantry", and linked product tag if applicable.
  ```
* **Navigation Flow**: -> `/questions/[id]` (Click chi tiết Q&A), -> `/questions/new` (Click đặt câu hỏi).
* **Interface States**:
  - *Loading*: 4 Q&A Card skeletons.

---

#### 🟢 SCR-15: Q&A Detail Page (Trang Chi Tiết 1 Câu Hỏi & Câu Trả Lời)
* **Screen ID**: `SCR-15`
* **Route**: `/questions/[id]`
* **Local UI Image**: [SCR-15_qa_detail.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-15_qa_detail.png)
* **Target React Page**: `web/app/questions/[id]/page.tsx`
* **Mapped React Components**:
  - `features/qa/QuestionDetailView.tsx` (Question content + Official Answer + Related questions)
* **Google Stitch Prompt**:
  ```markdown
  A Q&A Detail Page for "Gạo lứt đỏ ngâm bao lâu trước khi nấu?".
  PLATFORM: Web centered column.
  PAGE STRUCTURE:
  1. Question Header: Question title, author, category tag, date.
  2. Detailed Answer Box: Official response from GreenPantry nutritionists.
  3. Related Product Card: Linked product "Gạo Lứt Đỏ ST25".
  ```
* **Navigation Flow**: -> `/products/[slug]` (Click xem sản phẩm liên quan).

---

#### 🟢 SCR-16: Ask Question Page/Modal (Form Đặt Câu Hỏi Mới Cho Guest)
* **Screen ID**: `SCR-16`
* **Route**: `/questions/new` (hoặc Modal Overlay `AskQuestionModal.tsx`)
* **Local UI Image**: [SCR-16_ask_question.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-16_ask_question.png)
* **Target React Page**: `web/app/questions/new/page.tsx` & `features/qa/AskQuestionModal.tsx`
* **Mapped React Components**:
  - `features/qa/AskQuestionForm.tsx` (Name, email, question type, product selector, content)
* **Google Stitch Prompt**:
  ```markdown
  An Ask Question Modal/Form for Guest Users.
  PLATFORM: Web Modal overlay / Standalone Form Page.
  PAGE STRUCTURE:
  1. Form Title: "Đặt Câu Hỏi Cho GreenPantry".
  2. Form Inputs: Full Name (Họ tên), Email (Email để nhận phản hồi), Question Type Dropdown (Sản phẩm, Dinh dưỡng, Cách nấu), Related Product Search Selector (optional), and Question Content Textarea.
  3. Notice Badge: Amber warning text "Câu hỏi của bạn sẽ được duyệt (PENDING) trước khi hiển thị công khai."
  4. Submit Button: Primary CTA "Gửi Câu Hỏi".
  ```
* **Navigation Flow**: -> `/questions` (Sau khi gửi thành công).
* **Interface States**:
  - *Submitted Success*: Banner notification "Câu hỏi của bạn đã được gửi thành công và đang chờ kiểm duyệt!".

---

### 3.3. PERSONAL & SEARCH DOMAIN SCREENS (SCR-17 -> SCR-18)

#### 🟢 SCR-17: Daily Personal Todo Page (Trang Nhật Ký Thói Quen Ăn Uống Lành Mạnh)
* **Screen ID**: `SCR-17`
* **Route**: `/todo`
* **Local UI Image**: [SCR-17_daily_todo.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-17_daily_todo.png)
* **Target React Page**: `web/app/todo/page.tsx`
* **Mapped React Components**:
  - `features/todo/DatePickerHeader.tsx` (Date switcher bar: Previous day, Today, Next day, Date Picker)
  - `features/todo/TodoList.tsx` (Interactive tasks checklist with checkbox, title, complete state)
  - `features/todo/AddTodoForm.tsx` (Inline input to create task for selected date)
  - `features/todo/TodoProgressBar.tsx` (Progress bar showing completed tasks ratio e.g., 3/5 done)
* **Google Stitch Prompt**:
  ```markdown
  A Daily Personal Todo & Habit Tracker Page for Guest Users.
  PLATFORM: Web centered interactive layout.
  PAGE STRUCTURE:
  1. Date Picker Header Bar: Date selector showing "Hôm nay, 09 Tháng 8, 2026", with left/right arrow buttons to navigate past and future dates, and a calendar picker button.
  2. Daily Progress Card: Sage Green card showing "Tiến độ hôm nay: 3/5 công việc hoàn thành" with a smooth animated progress bar.
  3. Add Task Bar: Inline input field "Thêm thói quen lành mạnh hôm nay..." (vd: Ngâm 200g gạo lứt, Uống 2L nước trà đậu) with a "+ Thêm" primary button.
  4. Interactive Todo List: Checklist items for the selected TaskDate. Each row has a circular checkbox, task text (strikethrough when checked), completion timestamp, and delete icon button.
  5. Privacy Footnote: Informational note "Tất cả dữ liệu Todo được lưu an toàn trên trình duyệt của bạn (Client Local Storage)."
  ```
* **Navigation Flow**: Independent page, state persisted in Client `localStorage`.
* **Interface States**:
  - *Empty State for Selected Date*: Illustration of a peaceful green sprout + text "Chưa có thói quen nào cho ngày này" + CTA "Thêm task đầu tiên".

---

#### 🟢 SCR-18: Unified Search Result Page (Trang Kết Quả Tìm Kiếm Hợp Nhất)
* **Screen ID**: `SCR-18`
* **Route**: `/search`
* **Local UI Image**: [SCR-18_unified_search.png](file:///c:/Users/Tho%20Code/DuAn_CongTy/VibeGaoLut/.stitch/SCR-18_unified_search.png)
* **Target React Page**: `web/app/search/page.tsx`
* **Mapped React Components**:
  - `features/search/SearchInputBar.tsx` (Main search input field)
  - `features/search/SearchResultTabs.tsx` (Tabs: Tất cả, Sản phẩm, Bài viết, Câu hỏi)
  - `features/product/ProductGrid.tsx` (Product search results)
  - `features/blog/BlogGrid.tsx` (Article search results)
  - `features/qa/QuestionCardList.tsx` (Q&A search results)
* **Google Stitch Prompt**:
  ```markdown
  A Unified Search Result Page combining Products, Blog Articles, and Q&A.
  PLATFORM: Web responsive.
  PAGE STRUCTURE:
  1. Search Header: Prominent search input bar pre-filled with query (vd: "Gạo lứt").
  2. Result Filter Tabs: Horizontal tabs showing counts "Tất cả (12)", "Sản phẩm (4)", "Bài viết (5)", "Hỏi đáp (3)".
  3. Search Results Sections: Grouped results displaying top matching products, relevant blog posts, and community Q&A items.
  ```
* **Navigation Flow**: -> `/products/[slug]`, -> `/blog/[slug]`, -> `/questions/[id]`.
* **Interface States**:
  - *Empty Results*: "Không tìm thấy kết quả phù hợp cho từ khóa 'xyz'" with search tips.

---

### 3.4. COMPONENT & SCREEN CROSS-REFERENCE SUMMARY

| Screen ID | Screen Name | Route Path | Primary Feature Component | State Management |
| :--- | :--- | :--- | :--- | :--- |
| `SCR-01` | Home Page | `/` | `HeroSection`, `BlogHighlights` | Server Component + Client Header |
| `SCR-02` | Product Listing | `/products` | `ProductFilterSidebar`, `ProductGrid` | TanStack Query (`useProducts`) |
| `SCR-03` | Product Detail | `/products/[slug]` | `ProductGallery`, `NutritionTable`, `ProductReviews` | TanStack Query (`useProductDetail`) |
| `SCR-04` | Category Page | `/categories/[slug]` | `CategoryBanner`, `ProductGrid` | TanStack Query |
| `SCR-05` | New Arrivals | `/new-products` | `NewArrivalsHeader`, `ProductGrid` | TanStack Query (Hybrid Rule) |
| `SCR-06` | Cart Page | `/cart` | `CartItemList`, `CartSummary` | Zustand Client Store (`cart-store.ts`) |
| `SCR-07` | Checkout Page | `/checkout` | `GuestAddressForm`, `PaymentMethodSelector` | React Hook Form + TanStack Query Mutation |
| `SCR-08` | Order Success | `/orders/success` | `OrderSuccessCard` | Client URL State |
| `SCR-09` | Track Order | `/orders/track` | `TrackOrderForm`, `OrderTimeline` | TanStack Query Mutation (`useTrackOrder`) |
| `SCR-10` | Order Detail View | `/orders/[id]` | `OrderDetailsView` | TanStack Query |
| `SCR-11` | Blog Listing | `/blog` | `FeaturedBlogPost`, `BlogGrid` | TanStack Query (`useBlogPosts`) |
| `SCR-12` | Blog Detail | `/blog/[slug]` | `BlogContent`, `RelatedProductsWidget` | TanStack Query (Content Commerce) |
| `SCR-13` | Blog Category | `/blog/category/[slug]` | `BlogGrid` | TanStack Query |
| `SCR-14` | Q&A Listing | `/questions` | `QuestionCardList`, `AskQuestionButton` | TanStack Query (`useQuestions`) |
| `SCR-15` | Q&A Detail | `/questions/[id]` | `QuestionDetailView` | TanStack Query |
| `SCR-16` | Ask Question Form | `/questions/new` | `AskQuestionForm` | TanStack Query Mutation |
| `SCR-17` | Daily Todo | `/todo` | `DatePickerHeader`, `TodoList`, `AddTodoForm` | Zustand Client Store (`todo-store.ts`) |
| `SCR-18` | Unified Search | `/search` | `SearchResultTabs`, `ProductGrid`, `BlogGrid` | TanStack Query (`useSearch`) |

---

## 4. ATOMIC COMPONENT BREAKDOWN & RENDER ARCHITECTURE MATRIX (CLIENT VS SERVER COMPONENTS)

> Phần dưới đây chi tiết hóa cây linh kiện React Component trong ứng dụng Next.js App Router (`web/`), phân tách vai trò UI Primitives (`components/ui/`) và Domain Feature Components (`features/*`), đồng thời phân ranh giới kỹ thuật giữa Server Component (RSC) và Client Component (`'use client'`).

---

### 4.1. SHARED UI PRIMITIVES (`web/components/ui/`)

| Component Name | File Path | Type | Render Boundary | Purpose & Description |
| :--- | :--- | :--- | :--- | :--- |
| `Button` | `components/ui/Button.tsx` | Base UI | Server Component | Nút bấm hệ thống với các variant (primary, secondary, outline, ghost, danger) và kích thước (sm, md, lg). |
| `Input` | `components/ui/Input.tsx` | Base UI | Client Component (`'use client'`) | Ô nhập dữ liệu hỗ trợ label, helper text, error text, icon prefix/suffix. |
| `Textarea` | `components/ui/Textarea.tsx` | Base UI | Client Component (`'use client'`) | Khung nhập văn bản nhiều dòng cho địa chỉ, câu hỏi, review. |
| `Select` | `components/ui/Select.tsx` | Base UI | Client Component (`'use client'`) | Dropdown lựa chọn tùy chỉnh (Tỉnh/Thành, Danh mục, Lọc giá). |
| `Card` | `components/ui/Card.tsx` | Base UI | Server Component | Thẻ container đa năng hỗ trợ Header, Content, Footer với shadow và border chuẩn Design System. |
| `Badge` | `components/ui/Badge.tsx` | Base UI | Server Component | Nhãn hiển thị trạng thái (NEW, Out of stock, Verified, Status Order). |
| `Modal` | `components/ui/Modal.tsx` | UI Overlay | Client Component (`'use client'`) | Hộp thoại popup dùng cho Ask Question, Image Preview, Confirm Dialog. |
| `Toast` | `components/ui/Toast.tsx` | Notification | Client Component (`'use client'`) | Thông báo nổi phản hồi hành động Thêm giỏ hàng, Gửi câu hỏi, Đặt hàng thành công. |
| `Skeleton` | `components/ui/Skeleton.tsx` | Feedback | Server/Client Component | Shimmer loader cho Product Card, Blog Card, Table và Form trong trạng thái đang tải. |
| `Tabs` | `components/ui/Tabs.tsx` | Navigation | Client Component (`'use client'`) | Chuyển đổi tab linh hoạt cho Blog Category, Search Results, Product Specs. |
| `Breadcrumb` | `components/ui/Breadcrumb.tsx` | Navigation | Server Component | Đường dẫn điều hướng vị trí người dùng (`Trang chủ > Sản phẩm > Gạo lứt`). |
| `Pagination` | `components/ui/Pagination.tsx` | Navigation | Client Component (`'use client'`) | Bộ phân trang cho danh sách sản phẩm, bài viết và câu hỏi Q&A. |
| `Drawer` | `components/ui/Drawer.tsx` | UI Overlay | Client Component (`'use client'`) | Khung trượt cạnh màn hình dùng cho Quick Cart Drawer và Mobile Navigation Menu. |
| `Navbar` | `components/ui/Navbar.tsx` | Header | Client Component (`'use client'`) | Sticky Glassmorphism Header chứa Brand Logo, Links, Quick Search Bar và Cart Icon Counter. |
| `Footer` | `components/ui/Footer.tsx` | Footer | Server Component | Khung chân trang tĩnh với thông tin thương hiệu, liên kết dịch vụ, lookup đơn hàng. |

---

### 4.2. DOMAIN FEATURE COMPONENTS (`web/features/*`)

#### A. Product Feature Domain (`web/features/product/`)
* `ProductCard.tsx` (`Client Component`): Thẻ sản phẩm chuẩn với hover animation, rating, giá tiền và nút "Thêm vào giỏ" kết nối Zustand `cart-store`.
* `ProductGrid.tsx` (`Server Component`): Bố cục lưới sản phẩm responsive (3 hoặc 4 cột) render danh sách từ Props.
* `ProductFilterSidebar.tsx` (`Client Component`): Accordion bộ lọc danh mục, khoảng giá slider và rating sao phía bên trái.
* `ProductSortHeader.tsx` (`Client Component`): Dropdown sắp xếp sản phẩm (Mới nhất, Giá tăng/giảm, Đánh giá cao).
* `ProductGallery.tsx` (`Client Component`): Khung xem ảnh sản phẩm chính + thumbnails gallery chọn ảnh xem chi tiết.
* `ProductInfo.tsx` (`Client Component`): Khối mua hàng bên phải (tiêu đề, so sánh giá, trạng thái kho, bộ tăng giảm số lượng `- 1 +`, nút Thêm giỏ & Mua ngay).
* `NutritionTable.tsx` (`Server Component`): Bảng thành phần giá trị dinh dưỡng (Calories, Protein, Carbs, Fiber, Fat) thiết kế sạch sẽ.
* `ProductReviewSection.tsx` (`Client Component`): Rating tổng quan + danh sách đánh giá Verified kèm nút mở Modal gửi đánh giá theo Order ID.
* `ProductQaSection.tsx` (`Client Component`): Danh sách Q&A rút gọn được nhúng trực tiếp trong chi tiết sản phẩm.
* `RelatedProducts.tsx` (`Server Component`): Carousel/Grid sản phẩm liên quan theo danh mục hoặc công dụng.
* `NewArrivalsHeader.tsx` (`Server Component`): Hero banner cho trang Sản phẩm mới tháng này (`/new-products`).

#### B. Cart Feature Domain (`web/features/cart/`)
* `CartItemList.tsx` (`Client Component`): Danh sách sản phẩm trong giỏ hàng render từ `cart-store`.
* `CartItemRow.tsx` (`Client Component`): Dòng sản phẩm trong giỏ cho phép đổi số lượng hoặc bấm icon thùng rác xóa sản phẩm.
* `CartSummary.tsx` (`Client Component`): Thẻ tóm tắt đơn hàng (Tạm tính, Phí ship ước tính, Tổng tiền) và nút "Tiến hành thanh toán".
* `CartDrawer.tsx` (`Client Component`): Quick Cart Drawer trượt phải khi bấm vào icon Giỏ hàng ở Navbar.
* `EmptyCart.tsx` (`Client Component`): Giao diện giỏ hàng trống với minh họa và button "Khám phá sản phẩm".

#### C. Checkout Feature Domain (`web/features/checkout/`)
* `GuestAddressForm.tsx` (`Client Component`): Form điền thông tin người nhận (Họ tên, SĐT, Email, Tỉnh/Thành, Quận/Huyện, Phường/Xã, Địa chỉ cụ thể, Ghi chú) kết hợp `react-hook-form` + `zod`.
* `PaymentMethodSelector.tsx` (`Client Component`): Lựa chọn phương thức thanh toán (mặc định COD - Thanh toán khi nhận hàng).
* `OrderSummaryWidget.tsx` (`Client Component`): Widget tóm tắt giỏ hàng rút gọn ở trang checkout kèm nút "Xác Nhận Đặt Hàng (COD)".

#### D. Order Feature Domain (`web/features/order/`)
* `TrackOrderForm.tsx` (`Client Component`): Form nhập Mã đơn hàng + Số điện thoại để tra cứu trạng thái đơn.
* `OrderTimeline.tsx` (`Server Component`): Timeline trạng thái 5 bước (PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED).
* `OrderDetailsView.tsx` (`Server Component`): Thẻ xem toàn bộ chi tiết đơn hàng, danh sách món, địa chỉ giao hàng và tổng tiền.
* `OrderSuccessCard.tsx` (`Client Component`): Thẻ thông báo đặt hàng thành công, hiển thị Mã đơn hàng vừa sinh và nút Copy mã.

#### E. Content & Blog Feature Domain (`web/features/blog/`)
* `FeaturedBlogPost.tsx` (`Server Component`): Bài viết blog nổi bật nhất thiết kế bố cục 2 cột.
* `BlogCategoryTabs.tsx` (`Client Component`): Navigation tab lọc bài viết theo chuyên mục/thẻ.
* `BlogGrid.tsx` (`Server Component`): Lưới 3 cột hiển thị thẻ bài viết dinh dưỡng.
* `BlogCard.tsx` (`Server Component`): Card xem trước bài viết (ảnh bìa, tag, tiêu đề, tác giả, thời gian đọc).
* `BlogHeader.tsx` (`Server Component`): Header bài viết chi tiết (Tiêu đề, Tác giả, Ngày đăng, Thời lượng đọc).
* `BlogContent.tsx` (`Server Component`): Khung nội dung rich text bài viết tối ưu khoảng cách dòng và typography.
* `RelatedProductsWidget.tsx` (`Client Component`): Callout widget **Content Commerce** nhúng sản phẩm được đề cập trực tiếp trong bài viết kèm nút "Thêm vào giỏ".
* `ShareAndTags.tsx` (`Client Component`): Nút chia sẻ mạng xã hội và các tag bài viết.

#### F. Community Q&A Feature Domain (`web/features/qa/`)
* `QuestionFilterTabs.tsx` (`Client Component`): Tabs lọc câu hỏi theo chủ đề (Tất cả, Sản phẩm, Dinh dưỡng, Công thức).
* `QuestionCardList.tsx` (`Server Component`): Danh sách thẻ hỏi đáp cộng đồng.
* `QuestionCard.tsx` (`Server Component`): Thẻ hiển thị 1 câu hỏi Guest + câu trả lời chính thức từ GreenPantry.
* `AskQuestionButton.tsx` (`Client Component`): CTA Button kích hoạt mở Modal hoặc chuyển hướng sang trang đặt câu hỏi.
* `QuestionDetailView.tsx` (`Server Component`): Màn hình xem chi tiết 1 câu hỏi và câu trả lời.
* `AskQuestionForm.tsx` (`Client Component`): Form gửi câu hỏi mới (Họ tên, Email, Loại câu hỏi, Nội dung câu hỏi).
* `AskQuestionModal.tsx` (`Client Component`): Modal chứa `AskQuestionForm` phục vụ trải nghiệm tại chỗ.

#### G. Daily Todo Feature Domain (`web/features/todo/`)
* `DatePickerHeader.tsx` (`Client Component`): Thanh chuyển đổi ngày (Ngày trước, Hôm nay, Ngày sau, Calendar Picker).
* `TodoList.tsx` (`Client Component`): Danh sách checklist thói quen cho ngày được chọn lấy từ `todo-store`.
* `TodoItemRow.tsx` (`Client Component`): Dòng 1 task thói quen với checkbox tròn, hiệu ứng gạch ngang và nút xóa.
* `AddTodoForm.tsx` (`Client Component`): Ô nhập nhanh thói quen lành mạnh cho ngày được chọn.
* `TodoProgressBar.tsx` (`Client Component`): Thanh tiến độ hoàn thành thói quen (vd: 3/5 hoàn thành).

#### H. Search Feature Domain (`web/features/search/`)
* `SearchInputBar.tsx` (`Client Component`): Thanh tìm kiếm hợp nhất có chức năng debounced search input.
* `SearchResultTabs.tsx` (`Client Component`): Dynamic tabs hiển thị số lượng kết quả theo danh mục (Tất cả, Sản phẩm, Bài viết, Hỏi đáp).

---

### 4.3. RENDER ARCHITECTURE BOUNDARY & STATE CLASSIFICATION

| Component Path | Component Type | Primary Reason for Boundary Choice |
| :--- | :--- | :--- |
| `web/app/page.tsx` | Server Component | Render HTML phía server cho Hero, Category Grid & SEO content. |
| `web/app/products/page.tsx` | Server Component | Tối ưu SEO catalog sản phẩm, truyền searchParams xuống Client filter. |
| `web/app/products/[slug]/page.tsx` | Server Component | Crawl SEO tốt nhất cho sản phẩm, nhúng JSON-LD Schema `Product`. |
| `web/app/blog/[slug]/page.tsx` | Server Component | Render toàn bộ nội dung bài viết phục vụ Google Indexing & OpenGraph metadata. |
| `web/app/todo/page.tsx` | Client Component (`'use client'`) | Phụ thuộc 100% vào Zustand Store `todo-store` & `localStorage` phía Client. |
| `web/app/cart/page.tsx` | Client Component (`'use client'`) | Phụ thuộc 100% vào Zustand Store `cart-store` & `localStorage` phía Client. |
| `web/app/checkout/page.tsx` | Client Component (`'use client'`) | Xử lý Form tương tác `react-hook-form`, validation realtime và gửi API Mutation. |
| `web/app/orders/track/page.tsx` | Client Component (`'use client'`) | Nhập thông tin tra cứu động và hiển thị kết quả từ API Query. |
| `web/components/ui/Navbar.tsx` | Client Component (`'use client'`) | Đọc số lượng sản phẩm từ `cart-store` để cập nhật badge số giỏ hàng realtime. |
| `features/product/ProductCard.tsx` | Client Component (`'use client'`) | Chứa handler click nút "Thêm vào giỏ hàng" kích hoạt Zustand action. |
| `features/blog/RelatedProductsWidget.tsx` | Client Component (`'use client'`) | Cho phép click "Thêm vào giỏ" ngay trong bài viết blog mà không cần chuyển trang. |


