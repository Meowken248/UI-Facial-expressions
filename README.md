# UI Facial Expressions

Giao diện khuôn mặt robot/trợ lý ảo với 20 biểu cảm SVG động, tối ưu cho màn hình **Radxa Display 10 FHD 1920 × 1200 (16:10)**. Ứng dụng chạy hoàn toàn phía trình duyệt, không dùng backend, API ngoài hay ảnh raster cho khuôn mặt.

## Công nghệ và yêu cầu

- Vite, React, TypeScript, SVG và CSS thuần
- Fullscreen API, không backend, database, CDN hay API ngoài
- Node.js 20 trở lên và pnpm 9 trở lên

## Cài đặt và chạy

```bash
pnpm install
pnpm dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173`.

```bash
pnpm build
pnpm preview
pnpm lint
```

## Điều khiển

- Chọn trực tiếp một trong 20 nút biểu cảm.
- `ArrowLeft` / `ArrowRight`: chuyển biểu cảm.
- `Space`: bật hoặc tắt tự động phát 5 giây.
- `F`: toàn màn hình; `Escape`: thoát toàn màn hình.
- Các công tắc điều khiển chớp mắt, theo con trỏ và chuyển động.

## Đổi biểu cảm bằng code

```tsx
<EmotionFace emotion="love" autoBlink followPointer animated />

<EmotionScreen
  emotion="happy"
  speed={0}
  battery={80}
  rangeKm={120}
  temperature={28}
  autoBlink
  followPointer
  animated
/>
```

## 20 biểu cảm

`happy`, `excited`, `surprised`, `wink`, `laughing`, `playful`, `cute`, `proud`, `satisfied`, `relaxed`, `curious`, `thinking`, `confused`, `sad`, `disappointed`, `angry`, `warning`, `worried`, `sleepy`, `love`.

## Cấu trúc chính

```text
src/
  app/                   App và bàn phím/fullscreen
  components/emotion/    Thành phần khuôn mặt SVG
  components/dashboard/  Khung màn hình và thông tin xe
  components/controls/   Bảng chọn 20 biểu cảm
  config/                Nhãn và cấu hình typed
  hooks/                 Blink, pointer tracking, controller
  styles/                CSS giao diện và animation
  types/                 Union type và interface
```

Khung thiết bị luôn giữ `aspect-ratio: 16 / 10`, tự co theo viewport và căn giữa khi fullscreen. Chế độ `prefers-reduced-motion` tự tắt chuyển động liên tục.
