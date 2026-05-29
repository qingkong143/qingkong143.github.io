# Astro Clean Theme

一个基于 Astro 的静态博客主题，包含首页文章列表、文章详情、归档、关于、友链、追番、搜索、评论和音乐播放器等常用博客功能。

## 页面说明

- `/`：首页，展示站点标题、副标题、文章列表和侧栏信息；音乐播放器固定显示并在切页时保持播放。
- `/posts/[slug]/`：文章详情页，渲染 `src/content/blog/` 中的 Markdown / MDX 内容；文章设置唯一 `abbrlink` 时会优先生成对应路径。
- `/archive/`：归档页，按时间倒序列出全部文章。
- `/about/`：关于页，适合放个人介绍、站点说明或联系方式。
- `/friend/`：友链页，展示友站信息和本站交换信息。
- `/bangumi/`：追番页，读取 `src/data/bangumis.json` 展示想看、在看、看过的作品。

## 快速开始

```bash
npm install
npm run dev
```

构建静态站点：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 常用配置

主要配置集中在 `src/data/site.ts`：

- `title`、`subtitle`、`author`、`description`：站点基础信息。
- `nav`：顶部导航和侧栏导航。
- `social`：侧栏社交链接。
- `postcard`：首页文章摘要显示方式。
- `avatar`、`defaultCover`：侧栏头像和文章默认封面。
- `globalBackground`：全站背景图、透明度、模糊和固定方式。
- `search`：顶部搜索按钮、输入框文案和结果数量。
- `comments.twikoo`：Twikoo 评论配置。
- `player.aplayer`、`player.meting`：音乐播放器脚本、样式和歌单配置。

文章放在 `src/content/blog/`，追番数据放在 `src/data/bangumis.json`，页面内容可在 `src/pages/` 中修改。

### 创建文章

1. 在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件，建议使用能描述内容的短文件名，例如 `my-first-post.md`。
2. 在文件顶部写入 frontmatter，至少包含 `title`，建议补充 `date`、`categories`、`tags` 和摘要字段。
3. 正文从 frontmatter 后开始编写；构建时会自动生成文章详情页，若设置唯一 `abbrlink`，路径会优先使用 `/posts/abbrlink/`。

```md
---
title: 示例文章
date: 2026-05-27
categories: 随笔
tags: [Astro, Blog]
brief: 首页显示的短摘要
abbrlink: example-post
---

这里写正文。
```

更完整的配置字段说明和 GitHub Pages 部署步骤见 `ASTRO_THEME_GUIDE.md`。
