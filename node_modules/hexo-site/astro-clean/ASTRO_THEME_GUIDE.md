# Astro Clean 主题使用指南

本指南说明如何修改站点内容、配置主题属性，以及如何部署到 GitHub Pages。

## 项目结构

```txt
astro-clean/
├─ astro.config.mjs              # Astro 构建配置、站点域名和部署 base
├─ package.json                  # 依赖和 npm scripts
├─ public/                       # 原样复制到 dist 的静态资源
├─ src/
│  ├─ components/                # 文章卡片、侧栏、评论、播放器、追番列表等组件
│  ├─ content/blog/              # Markdown / MDX 文章
│  ├─ data/site.ts               # 站点与主题配置
│  ├─ data/bangumis.json         # 追番页数据
│  ├─ layouts/                   # 基础布局和文章布局
│  ├─ pages/                     # 首页、归档、关于、友链、追番、文章路由
│  ├─ styles/global.css          # 全局样式
│  └─ utils/paths.ts             # 处理 GitHub Pages base 路径
└─ .github/workflows/deploy.yml  # GitHub Pages 自动部署工作流
```

## 安装、开发和构建

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建静态站点：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

构建产物会输出到 `dist/`。

## 页面内容在哪里修改

- 首页：`src/pages/index.astro`，标题和副标题来自 `src/data/site.ts`。
- 文章详情页：`src/layouts/PostLayout.astro`，文章内容来自 `src/content/blog/`。
- 归档页：`src/pages/archive.astro`，自动读取全部文章。
- 关于页：`src/pages/about.astro`，直接编辑页面正文。
- 友链页：`src/pages/friend.astro`，直接编辑友链卡片和交换信息。
- 追番页：`src/pages/bangumi.astro` 和 `src/components/BangumiGrid.astro`，数据来自 `src/data/bangumis.json`。

## 修改 `src/data/site.ts`

`siteConfig` 是主题的主要配置入口。下面按字段说明用途。

### 基础信息

```ts
title: '站点标题',
subtitle: '站点副标题',
author: '作者名',
description: '站点描述'
```

- `title`：浏览器标题、导航站点名和首页主标题。
- `subtitle`：首页副标题和侧栏简介。
- `author`：侧栏作者名和页脚版权名。
- `description`：默认页面描述，用于 `<meta name="description">`。

### 导航

```ts
nav: [
  { href: '/', label: '首页' },
  { href: '/archive/', label: '归档' },
  { href: '/about/', label: '关于' }
]
```

- `href`：链接地址。站内链接建议以 `/` 开头，例如 `/about/`。
- `label`：导航显示文字。
- 顶部导航和侧栏导航都会读取这个数组。

### 社交链接

```ts
social: [
  { name: 'email', label: 'Email', href: 'mailto:name@example.com' },
  { name: 'github', label: 'GitHub', href: 'https://github.com/your-name' }
]
```

- `name`：用于生成 CSS 类名，例如 `icon-github`。
- `label`：侧栏按钮文字和无障碍标签。
- `href`：目标链接。`mailto:` 链接不会新开窗口，其他链接会新开窗口。

### 首页文章摘要

```ts
postcard: false
```

- `false`：首页只显示文章 frontmatter 中的 `brief`、`summary` 或 `description`。
- `'enable'`：没有手动摘要时，从文章正文自动截取一段摘要。

### 头像、横幅和默认封面

```ts
avatar: '/avatar/avatar.webp',
banner: '/images/banner.webp',
bannerSrcset: [
  { src: '/images/banner-600w.webp', media: '(max-width: 479px)' },
  { src: '/images/banner-800w.webp', media: '(max-width: 799px)' },
  { src: '/images/banner.webp', media: '(min-width: 800px)' }
],
defaultCover: 'https://example.com/default-cover.jpg'
```

- `avatar`：侧栏头像，通常放在 `public/avatar/`。
- `banner`：主题预留的横幅图片配置；当前页面主要使用 `globalBackground.image` 作为全站背景。
- `bannerSrcset`：主题预留的响应式横幅配置；如需在页面中展示横幅，可在组件中按需读取。
- `defaultCover`：文章没有 `cover` 时使用的默认封面。

站内静态资源建议放在 `public/` 下，并用 `/文件夹/文件名` 引用。

### 全站背景

```ts
globalBackground: {
  enable: true,
  image: '/images/banner.webp',
  opacity: 0.22,
  blur: 0,
  attachment: 'fixed'
}
```

- `enable`：是否启用全站背景图。
- `image`：背景图地址。
- `opacity`：背景透明度，常用范围是 `0` 到 `1`。
- `blur`：背景模糊半径，单位是 px。
- `attachment`：背景滚动方式，常用值为 `'fixed'` 或 `'scroll'`。

### 搜索

```ts
search: {
  enable: true,
  buttonLabel: '搜索',
  label: '搜索文章',
  placeholder: '输入标题、摘要、分类或标签',
  emptyText: '输入关键词开始搜索',
  noResultsText: '没有找到相关文章',
  maxResults: 8
}
```

- `enable`：是否显示顶部搜索按钮。
- `buttonLabel`：搜索按钮的无障碍标签。
- `label`：搜索面板标题。
- `placeholder`：输入框占位文字。
- `emptyText`：未输入关键词时的提示。
- `noResultsText`：没有搜索结果时的提示。
- `maxResults`：最多显示多少条结果。

搜索会匹配文章标题、描述、摘要、分类和标签。

### Twikoo 评论

```ts
comments: {
  twikoo: {
    enable: true,
    envId: 'https://your-twikoo.example.com/',
    region: '',
    src: 'https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js',
    integrity: 'sha384-...'
  }
}
```

- `enable`：是否加载 Twikoo 评论。
- `envId`：Twikoo 环境地址或环境 ID。
- `region`：腾讯云环境可填写地域；不需要时留空。
- `src`：Twikoo 前端脚本地址。
- `integrity`：脚本 SRI 校验值；更换 `src` 时需要同步更新或移除校验逻辑。

单篇文章可以在 frontmatter 中设置 `comments: false` 关闭评论。

### 音乐播放器

```ts
player: {
  aplayer: {
    enable: true,
    src: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js',
    integrity: 'sha384-...',
    css: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css',
    cssIntegrity: 'sha384-...'
  },
  meting: {
    enable: true,
    id: '歌单或歌曲 ID',
    server: 'netease',
    type: 'playlist',
    src: 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js',
    integrity: 'sha384-...'
  }
}
```

- `aplayer.enable`：是否加载 APlayer 样式和脚本。
- `meting.enable`：是否加载 MetingJS 并渲染播放器。
- `meting.id`：歌单、专辑或歌曲 ID。
- `meting.server`：音乐平台，例如 `netease`、`tencent`、`kugou`。
- `meting.type`：资源类型，例如 `playlist`、`song`、`album`。
- `src` / `css`：脚本和样式 CDN 地址。
- `integrity` / `cssIntegrity`：SRI 校验值；更换 CDN 文件时需要同步更新或移除校验逻辑。

## 写文章

文章放在 `src/content/blog/`，文件名会参与生成文章路径。

### 创建步骤

1. 在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件，例如 `my-first-post.md`。
2. 在文件开头添加 frontmatter。`title` 为必填项；建议同时填写 `date`、`categories`、`tags`、`brief` 或 `description`，便于首页、搜索、分类和标签页展示。
3. 在第二个 `---` 后编写正文，支持 Markdown；需要更复杂内容时可使用 MDX。
4. 运行 `npm run dev` 本地预览，确认首页、文章页、归档、分类和标签页都能正常访问。
5. 发布前执行 `npm run build` 检查构建。

示例：

```md
---
title: 示例文章
date: 2026-05-27
updated: 2026-05-27
cover: /images/example-cover.webp
abbrlink: example-post
categories: 随笔
tags: [Astro, Blog]
brief: 首页显示的短摘要
description: 页面描述
comments: true
---

这里写正文。
```

支持的 frontmatter 字段来自 `src/content.config.ts`：

- `title`：必填，文章标题。
- `date`：发布日期。
- `updated`：更新日期。
- `cover`：文章封面。
- `categories`：分类，可写字符串或字符串数组。
- `tags`：标签，可写字符串或字符串数组。
- `brief`：首页优先显示的短摘要。
- `summary`：备用摘要。
- `description`：页面描述，也可作为首页摘要备用。
- `abbrlink`：自定义文章路径标识；值唯一时生成 `/posts/abbrlink/`，重复时自动回退到文件 slug，避免路由冲突。
- `comments`：设为 `false` 可关闭单篇文章评论。
- `copyright`：预留版权开关字段。

分类和标签会自动从文章 frontmatter 中收集，并生成 `/categories/分类名/` 与 `/tags/标签名/` 页面；侧栏对应项目会链接到这些列表页。

## 修改追番数据

追番数据位于 `src/data/bangumis.json`：

```json
{
  "wantWatch": [],
  "watching": [],
  "watched": []
}
```

三个数组分别对应“想看”“在看”“看过”。单个条目常用字段：

```json
{
  "title": "作品名",
  "type": "TV",
  "area": "日本",
  "cover": "https://example.com/cover.jpg",
  "totalCount": "全 12 话",
  "id": 123456,
  "score": 9.8,
  "des": "简介"
}
```

- `id` 存在时，标题会链接到 Bilibili 番剧页面。
- `cover` 是 HTTP(S) 图片时，会自动通过 `images.weserv.nl` 代理，减少防盗链导致的加载失败。

## 修改样式

全局样式位于 `src/styles/global.css`。常见区域：

- 颜色变量：`:root` 和 `[data-theme='dark']`。
- 顶栏：`#header-nav`、`.nav-inner`、`.main-nav-link`。
- 搜索面板：`.search-panel`、`.search-box`。
- 首页：`.home-hero`、`.post-list`、`.post-wrap`。
- 侧栏：`.sidebar-wrap`、`.sidebar-author`、`.sidebar-widget-card`。
- 文章页：`.article-inner`、`.article-entry`。
- 友链页：`.friend-grid`、`.friend-card`。
- 归档页：`.archive-list`。
- 追番页：`.bangumi-hero`、`.bangumi-grid`、`.bangumi-card`。
- 评论区：`#comments`、`.comment-title`。
- 播放器：`.player-card`、`.aplayer`。

## GitHub Pages 部署

仓库已包含 `.github/workflows/deploy.yml`。默认配置是在推送到 `master` 分支时自动构建并部署到 GitHub Pages。

### 1. 配置仓库 Pages 来源

在 GitHub 仓库中进入：

```txt
Settings → Pages → Build and deployment → Source
```

选择 `GitHub Actions`。

### 2. 修改 `astro.config.mjs`

自定义域名或 `用户名.github.io` 根站点：

```js
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
```

部署到项目页 `https://用户名.github.io/仓库名/` 时，需要增加 `base`：

```js
export default defineConfig({
  site: 'https://用户名.github.io',
  base: '/仓库名',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
```

主题中的站内链接和 `public/` 静态资源会通过 `src/utils/paths.ts` 自动带上 `base`。

### 3. 确认部署分支

`.github/workflows/deploy.yml` 默认监听：

```yml
on:
  push:
    branches: [ master ]
```

如果你的默认分支是 `main`，把 `master` 改成 `main`。

### 4. 自定义域名

如果使用自定义域名，在 `public/CNAME` 中写入域名，例如：

```txt
example.com
```

如果不使用自定义域名，可以删除该文件。仓库中的其他站点验证文件也应放在 `public/` 下。

### 5. 推送后查看 Actions

提交并推送到部署分支后，打开 GitHub 仓库的 Actions 页面，等待 `Deploy to GitHub Pages` 工作流完成。构建成功后，Pages 会发布 `dist/` 内容。

## 配置检查建议

- 不要提交 `node_modules/`、`.astro/`、`dist/` 这类生成目录；`.gitignore` 已添加忽略规则。
- 如果这些目录已经被 git 跟踪，新增 `.gitignore` 不会自动取消跟踪，需要你确认后再单独清理。
- 修改 CDN 地址时，要同步处理对应的 `integrity` 校验值。
- 修改 `site`、`base`、`nav.href` 或静态资源路径后，建议执行 `npm run build` 检查链接和构建是否正常。
