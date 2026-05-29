---
title: twikoo评论系统解系:Cloudfare通解+resend特解
categories: Hexo
tags: [域名,Hexo,resend,twikoo]
cover: https://pic.netbian.com/uploads/allimg/251024/224648-17613172086329.jpg
abbrlink: 8ce6
date: 2025-10-30 20:45:00
brief: 简述 Twikoo 在 Vercel 上的部署与配置要点
---
## 前言

事情的起因是我的vercel账号被封禁了(不知道是何时何种原因),然后在vercel上托管的twikoo就去世了(默哀1ms)

既然如此,就干脆不用vercel了,毕竟也比较慢,而且国内时常红红火火.

然后我想到了云服务界的大善人-**Cloudflare**(其实是在twikoo官方文档里看到有[cloudflare云部署](https://twikoo.js.org/backend.html))

但是后来又碰到个头疼的问题--由于nodemailer包的兼容性问题，在Cloudflare Workers环境中，无法直接通过SMTP集成发送邮件,仅可使用SendGrid和Machines两个方案

但是我对于这两个提供商都没有账号,而且注册也被阻止了...

那就到此为止了吗?要是的话就不会有这篇文章了.

那该如何解决这个问题呢?

我的方案是--改**twikoo云函数代码**+**resend** api调用

到此也得先介绍一下,本期的二号人物--**resend**了

```link-card
url: https://resend.com/emails
title: Resend
desc: Email for developers
img: https://ts4.tc.mm.bing.net/th/id/ODF.HneL3SgRPI5ISxHcESwIJg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2
```

目前提供了免费的发送邮件api(额度多少不记得了,反正应该够用)

废话说了这么多,赶紧开始吧!

---

## 正篇

首先给出参考文章:

```link-card
url: https://blog.mingy.org/2024/12/hexo-add-twikoo/
title: 一梦一孤舟
desc: Hexo博客系列（二） 为你的博客添加评论系统
img: https://blog.mingy.org/medias/logo.png
```

### 部署Twikoo

在前言部分已经提过了,Cloudflare Worker云部署是不支持Resend的,所有我们就不使用官方的云函数模板了

```link-card
url: https://github.com/qingkong143/twikoo-cloudflare
title: twikoo-cloudflare
desc: forked from wuzhengmao/twikoo-cloudflare
img: https://thf.bing.com/th/id/ODF.bYAvaN8MCaSZfP0o7q_Z_w?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2
```

这是我改的twikoo特调版云函数,直接fork即可,输入你自己的仓库名称，点击 Create fork 按钮创建自己的仓库。

接着阅读参考文章的内容就好了,因为方法完全相同,所以我觉得没必要抄来抄去.

### 评论配置部分

因为我们使用的是改版,所以配置方面比较简单

邮件通知部分只需要设置

```php
SMTP_SERVICE: resend
SMTP_USER: resend
SMTP_PASS: 填写你在resend中生成的api-key
```

后面的防止机器人之类的看你个人,个人感觉加上后要慢一点.