# Astro Clean 主题使用教程

这个目录是从当前 Hexo `clean` 主题迁移出的 Astro 版本，保留了玻璃卡片、固定顶栏、暗色切换、首页 postcard、文章页、归档页和追番页的核心展示逻辑。

## 目录结构

```txt
astro-clean/
├─ astro.config.mjs          # Astro 配置
├─ package.json              # Astro 项目依赖与命令
├─ src/
│  ├─ components/            # PostCard、BangumiGrid 等组件
│  ├─ content/blog/          # Markdown 文章
│  ├─ data/                  # 站点配置与 bangumis.json
│  ├─ layouts/               # BaseLayout、PostLayout
│  ├─ pages/                 # 首页、关于、追番、归档、文章路由
│  └─ styles/global.css      # 主题样式
└─ public/                   # 静态资源
```

## 安装依赖

进入 Astro 主题目录：

```bash
cd astro-clean
npm install
```

## 本地预览

开发预览：

```bash
npm run dev
```

默认会启动本地服务，终端会输出访问地址。开发时修改 `src/pages`、`src/components`、`src/styles/global.css` 会自动热更新。

## 构建与生产预览

构建静态站点：

```bash
npm run build
```

构建产物会输出到：

```txt
dist/
```

本地预览构建结果：

```bash
npm run preview
```

## 部署

### 部署到 GitHub Pages

1. 在仓库中保留 `astro-clean` 目录，或将它作为单独仓库。
2. 确认 `astro.config.mjs` 中的 `site` 是你的正式域名。
3. 运行：

```bash
npm run build
```

4. 将 `dist/` 发布到 GitHub Pages。

如果仓库名不是根域名仓库，需要在 `astro.config.mjs` 增加 `base`：

```js
export default defineConfig({
  site: 'https://你的用户名.github.io',
  base: '/仓库名'
});
```

### 部署到 Vercel

1. 新建 Vercel 项目并选择该仓库。
2. Root Directory 填写：

```txt
astro-clean
```

3. Build Command：

```bash
npm run build
```

4. Output Directory：

```txt
dist
```

### 部署到 Netlify

1. New site from Git。
2. Base directory 填写：

```txt
astro-clean
```

3. Build command：

```bash
npm run build
```

4. Publish directory：

```txt
astro-clean/dist
```

## 写文章

文章放在：

```txt
src/content/blog/
```

Front matter 示例：

```md
---
title: 示例文章
date: 2026-05-26
categories: Hexo
tags: [Astro, Blog]
cover: https://example.com/cover.jpg
brief: 这是首页 postcard 上显示的手动摘要
abbrlink: demo
---

正文内容。
```

首页 postcard 逻辑在 `src/data/site.ts`：

```ts
postcard: false
```

- `false`：只显示文章 front matter 中的 `brief`、`summary` 或 `description`，没有就不显示摘要。
- `'enable'`：启用原样式的自动摘要。

## 修改站点信息

编辑：

```txt
src/data/site.ts
```

常用字段：

```ts
export const siteConfig = {
  title: 'Torch Blog',
  subtitle: '朝花夕拾，多愁善感',
  author: 'Torch',
  nav: [
    { href: '/', label: '首页' },
    { href: '/about/', label: '关于' },
    { href: '/bangumi/', label: '追番' },
    { href: '/archive/', label: '归档' }
  ]
};
```

## 更新追番页

追番数据位于：

```txt
src/data/bangumis.json
```

当前兼容 `hexo-bilibili-bangumi` 生成的数据结构：

```json
{
  "wantWatch": [],
  "watching": [],
  "watched": []
}
```

Astro 组件会自动将 B 站封面转换为 `images.weserv.nl` 代理地址，以减少防盗链导致的图片加载失败。

## 修改样式

主题样式集中在：

```txt
src/styles/global.css
```

主要区域：

- 顶栏与暗色按钮：`#header-nav`、`.dark-mode-switch`
- 首页卡片：`.post-wrap`、`.post-cover`、`.post-brief`
- 文章页：`.article-inner`、`.article-entry`
- 追番页：`.bangumi-hero`、`.bangumi-card`
- APlayer：`.aplayer`
- 页脚：`#footer`

## 从 Hexo 继续迁移内容

可以继续把 Hexo 的内容复制到 Astro：

- `source/_posts/*.md` → `astro-clean/src/content/blog/`
- `source/_data/bangumis.json` → `astro-clean/src/data/bangumis.json`
- 静态图片 → `astro-clean/public/`

Hexo 短代码不能直接在 Astro Markdown 中运行，需要改为 Astro 组件或普通 HTML。
