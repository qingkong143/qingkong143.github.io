---
title: " cc switch食用指南: agent配置管理的好帮手"
cover: 'https://img.318670.xyz/20260817174437624.jpg'
categories: 工具
date: 2026-05-27 11:10:20
abbrlink: aaa132
---

### 前言

也是好久没有更新了，今天来更新一下。

随着AI编程工具的普及，Claude Code、Codex、Gemini CLI 这些终端里的 AI 代理越来越多。但问题来了：**每个工具都要单独配置 API Key、模型供应商、提示词**，切来切去烦得要死。

后来不经意间发现一个好东西-**CC Switch**。

### 什么是 CC Switch

**CC Switch**（全称 Claude Code Switch）是一个开源桌面工具，核心就干一件事：**统一管理你所有 AI 编程工具的配置，一键切换供应商和模型**。

你可以把它理解为 AI 编程工具的 **"遥控器"**。

痛点场景：你 Claude Code 用的官方 API，想切到国产模型（智谱/DeepSeek）试试，原本要手动改配置文件、换 Key、重启终端。CC Switch 点一下，完事。

### 它能管什么工具

| 工具 | 说明 |
|------|------|
| Claude Code | Anthropic 官方终端 Agent |
| Codex | OpenAI 的编程代理 |
| Gemini CLI | Google 的终端工具 |
| OpenCode | 开源 AI 编程工具 |
| ... | 还在持续增加 |

### 安装 CC Switch

项目地址：[`github.com/farion1231/cc-switch`](https://github.com/farion1231/cc-switch)

**下载方式：**
- 去 Releases 页下载对应系统（Windows/Mac/Linux）的安装包
- 或者 `brew install cc-switch`（Mac）
- 或者 `winget install cc-switch`（Win）
- 也可以在官网直接下载：[cc-switch](https://www.ccswitch.io/zh/)

装完后打开，界面长这样：

```
┌─────────────────────────────────────┐
│  CC Switch  v2.x                     │
│                                      │
│  当前工具:  Claude Code              │
│  当前模型:  claude-3.5-sonnet       │
│  供应商:    Anthropic Official       │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ [切换模型]  [切换供应商]      │   │
│  │ [添加新配置] [导入/导出]      │   │
│  └──────────────────────────────┘   │
│                                      │
│  已配置工具:                         │
│  ✔ Claude Code                      │
│  ✔ Codex                            │
│  ○ Gemini CLI (未配置)              │
└─────────────────────────────────────┘
```

### 实战：配置 Claude Code + Deepseek

**第一步：添加供应商**

点"添加供应商"，填：
- 名称：`DeepSeek`
- API 地址：`https://api.deepseek.com/v1`
- API Key：填你的

**第二步：绑定到 Claude Code**

选择"工具" → Claude Code → "关联供应商"，选 DeepSeek。

**第三步：切换**

以后想换模型，打开 CC Switch 点一下就行，不需要动任何配置文件。

### 进阶玩法

**多配置一键切换**

你可以给不同项目预设不同配置：
- 项目A（国内项目）→ DeepSeek
- 项目B（海外项目）→ 官方 Claude
- 项目C（测试）→ 免费开源模型

在 CC Switch 里保存为不同 Profile，点一下全局切换。

**提示词管理**

CC Switch 还支持给不同工具预设 system prompt，省得每次重复输入。

### 写在最后

如果您觉得本篇文章对您有帮助的话，还请您将它分享给那些可能需要它的朋友们！

如果还有任何不太清楚的问题，请在评论区将它告诉我，我将尽可能及时地回复和帮助您！

非常感谢您的阅读，我们下次再见！
