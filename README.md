# Elsa 的每日数学小练

一个可离线使用的「每日任务 + 数学练习」网页应用（PWA），适合在 iPad 上给小朋友使用。

## 功能

- 首页仪表盘：秘密花园、今日小目标、坚持日历
- Elsa：阅读 / 运动 / 做家务 / 计算小练 / 思维小练
- Shawn：阅读 / 运动 / 数学思维 / 数学计算 / 英语语法 / 道法背诵 / 历史背诵 / 地理背诵 / 生物背诵 / 英语口语 / 语文
- 小四门背诵按「学期 → 单元（章节）→ 学期综合」组织（道法 6 学期 29 组、历史 6 学期 40 组、地理 4 学期 24 组、生物 4 学期 15 组，共 738 题）
- 计算题支持 iPad 手写答题 + 一键批改（按组或整体）
- 竖式：进位 / 退位标记格、答案按数位对齐
- 草稿画板：手写笔迹原样保留（不转文字），支持「画笔 / 橡皮擦 / 清空草稿」，落笔时不会触发页面滚动或其它操作
- 错题本入口：右上角常驻按钮 + 每个模块顶部「📓 错题本」，任何模块都能随时打开
- 英语（译林版）按学期 × 题型分组，每组 10 题（初一上句型填空 15 题），同一组内考点不重复
- 星星 / 钻石积分、连续打卡、花园成长
- 阅读记录、日历打卡（不同颜色圆点区分任务）
- 错题本（导出 / 导入 / 打印）

## 本地预览

Service Worker 不能用于 `file://`，需要本地服务器：

```bash
python -m http.server 8000
# 然后打开 http://localhost:8000/elsa.html
```

## 部署 / 安装

1. 把本目录部署到任意支持 HTTPS 的静态托管（Netlify / Vercel / GitHub Pages）。
2. iPad 用 Safari 打开 `https://你的域名/elsa.html`。
3. 分享 → 添加到主屏幕，即可作为独立 App 全屏使用，并支持离线。

GitHub Pages 开启方式：仓库 Settings → Pages → Source 选 `main` 分支（`/root`），保存后访问
`https://amonxia.github.io/ELSA/elsa.html`。

## 文件说明

| 文件 | 说明 |
| --- | --- |
| `elsa.html` | 应用主体（单文件，图片已内嵌） |
| `index.html` | 站点根目录自动跳转 |
| `manifest.webmanifest` | PWA 清单 |
| `sw.js` | Service Worker（离线缓存） |
| `icon-192.png` / `icon-512.png` / `icon-maskable-512.png` | 应用图标 |
| `apple-touch-icon.png` | iOS 主屏图标 |
| `elsa-logo.svg` | Logo |
| `assets/` | 图标精灵图源文件 |
