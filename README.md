# astro-theme-anheyu

[hexo-theme-anzhiyu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 的 Astro 移植。页面用 Content Collection 渲染，视觉语言沿用安知鱼，并叠了一层「一图流」半透明卡片。

原主题预览：[hexo.anheyu.com](https://hexo.anheyu.com/) · 文档：[docs.anheyu.com](https://docs.anheyu.com/)

## 开始

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

`dev` / `build` 会先跑 `npm run css`。`scripts/compile-stylus.mjs` 把 `src/styles/anzhiyu` 编成 `public/css/index.css`；`src/styles/one-graph-flow.css` 再按 `theme.yml` 生成覆盖层。

## 目录

```
src/config/site.yml          站点名、作者、域名、分页
src/config/theme.yml         菜单、侧栏、一图流、评论、首页顶部
src/config/plugins.yml       前端依赖 CDN
src/content/posts/           文章
src/content/about/           关于页
src/content/todo/            任务清单
src/components/              页面组件
src/layouts/Layout.astro     页面骨架
src/pages/                   路由
src/styles/one-graph-flow.css  一图流与后续样式覆盖
src/styles/anzhiyu/          主题 Stylus 源（编译成 public/css/index.css）
scripts/                     CSS 生成脚本
public/                      静态资源
```

## 写文章

在 `src/content/posts/` 新建 Markdown：

```yaml
---
title: 标题
date: 2026-09-24
description: 可选摘要
cover: /img/default_cover.jpg
categories:
  - 工具
tags:
  - Blog
abbrlink: abc123
sticky: 0
copyright: true
top_group_index: 1
---
```

地址默认是 `/posts/<文件名>/`。写了 `abbrlink` 后变成 `/posts/<abbrlink>/`，方便迁站时保住旧链接和 Twikoo 评论。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `cover` | 首页卡片、侧栏最近文章用的封面 |
| `sticky` | 大于 0 置顶 |
| `top_group_index` | 首页顶部推荐位，数字越大越靠前 |
| `copyright` | `false` 时不显示版权卡 |
| `draft` | `true` 不发布 |
| `comments` | `false` 关闭这篇文章的评论 |

关于页改 `src/content/about/about.md`，任务清单改 `src/content/todo/todo.md`。TODO 里用 `> 创建：YYYY-MM-DD · 完成：YYYY-MM-DD` 标记进度。

## 配置

- 站点身份：`src/config/site.yml`
- 主题：`src/config/theme.yml`
  - `menu` 顶部导航
  - `background` 一图流壁纸、卡片透明度和模糊
  - `layout` 主栏宽度、侧栏宽度、卡片间距
  - `home_top` 首页标语和分类入口
  - `twikoo.envId` 评论后端
- 文案：`src/i18n/zh-CN.yml`

改完 `theme.yml` 或 `src/styles/one-graph-flow.css` 后，跑一次 `npm run css`（`dev` / `build` 会自动跑）。

## 页面

- `/` 首页双列卡片
- `/posts/<slug>/` 文章
- `/archives/` 归档
- `/tags/`、`/categories/` 标签和分类
- `/about/` 关于
- `/todo/` 任务清单
- `/404` 未找到

文章页有版权卡、相邻文章、相关推荐、目录和 Twikoo。侧栏是作者卡、标签云、归档和站点资讯。

## 许可

GPL-3.0。样式和脚本源自 [hexo-theme-anzhiyu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)，同样是 GPL-3.0。
