# QR Code Generator Tools

Free online QR code generator. Create QR codes for URLs, text, WiFi, vCards, and email. Customize colors, add logos, download PNG/SVG.

## Features

- **Multiple QR Types**: URL, Text, WiFi, vCard (business card), Email
- **Customization**: Custom foreground/background colors, logo overlay
- **Download**: PNG and SVG formats
- **Batch Generation**: Create multiple QR codes at once
- **SEO Landing Pages**: Dedicated pages for each QR type
- **Responsive**: Works on desktop and mobile

## Tech Stack

- Vue 3 + TypeScript + Vite
- qrcode.js (QR generation)
- Lucide icons
- Docker + nginx (deployment)

## Development

```bash
yarn install
yarn dev
```

## Build & Deploy

```bash
yarn build
docker-compose up -d
```

Access at http://localhost:8848

## 功能全景图 — 完成度: 100%

> 项目定义：纯前端二维码生成器工具站
> 当前阶段：开发中
> 下一步优先级：部署到 Mac Mini

```
qrcode-tools
├── 核心功能（src/components/）
│   ├── QR生成器（URL/文本/WiFi/名片/邮件） — ✅
│   ├── 自定义颜色 — ✅
│   ├── Logo叠加 — ✅
│   └── 下载PNG/SVG — ✅
├── 批量生成（src/views/Batch.vue）
│   └── 批量输入+生成+下载 — ✅
├── SEO落地页（src/views/seo/）
│   ├── Free QR Code Generator — ✅
│   ├── WiFi QR Code Generator — ✅
│   ├── vCard QR Code Generator — ✅
│   ├── Email QR Code Generator — ✅
│   └── URL QR Code Generator — ✅
└── 部署（Docker+nginx）
    ├── Dockerfile — ✅
    ├── nginx.conf — ✅
    └── docker-compose.yml — ✅
```
