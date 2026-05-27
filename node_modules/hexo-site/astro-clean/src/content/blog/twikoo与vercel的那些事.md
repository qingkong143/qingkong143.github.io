---
title: twikoo与vercel的那些事
categories: Hexo
tags: [域名,Hexo,vercel,twikoo]
cover: https://pic.netbian.com/uploads/allimg/251024/224648-17613172086329.jpg
abbrlink: 8ce6
date: 2025-10-30 20:45:00
brief: 简述 Twikoo 在 Vercel 上的部署与配置要点
---
## 前言
因为喜欢折腾,所以就部署了个**twikoo**评论.

又因为只是喜欢折腾,而不想破费,

所以选择用vercel免费云部署.

至于为什么选twikoo评论系统而不是其他的,容我卖个关子.

话不多说,折腾之旅正式开始!

---
## 正篇
先展示出一些我们将要实现的功能:

- 是个人都会的评论
- 不是什么都能评论
- 让我知道谁评了论
- 让人知道谁评论了他的评论

好了,如果你觉得这些东西不是你需要的,那可以走了.

反之,我觉得你有可以**认真**看看下面这些内容,或许它们对你有帮助!

### 准备工作
