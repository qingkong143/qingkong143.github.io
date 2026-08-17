---
title: 图床?我选择Cloudflare_R2+PicGo
cover: 'https://img.318670.xyz/20260817181506439.webp'
date: 2026-08-17
categories: 图床
tags: [图床, Blog]
abbrlink: mftc233
---

### 前言

因为每次博客更新文章都需要一张封面（虽然我不经常更新），网上没有防盗链的图片又不太好找，就算有也有时不稳定。
于是乎，我打算自己搭建一个图床。但是肯定是不能花太多在这上面的，然后就想到了这个方案（到底哪抄来的你别管）。
搭建 Cloudflare R2 + PicGo 的免费图床！没错又是我们的赛博菩萨cloudflare！

整个过程主要分为在 Cloudflare 端配置和在 PicGo 客户端配置两大步，顺利的话几分钟分钟就能搞定。

### 🗺️ 流程图：搭建步骤概览

flowchart TD
    A[注册 Cloudflare 账号<br>并绑定支付方式] --> B[创建 R2 存储桶<br>建议区域选亚太]
    B --> C[配置公开访问<br>r2.dev 子域名或自定义域名]
    C --> D[生成 API 令牌<br>获取 Access Key 和 Secret Key]
    D --> E[安装 PicGo 及<br>cloudflare-r2 插件]
    E --> F[配置 PicGo 图床<br>填写账号ID、密钥、桶名等]
    F --> G[完成! 开始上传图片]

---

### 🚀 第一步：开通 R2

> 如果你还还没有cloudflare账号的话
1.  **注册账号**：访问 [Cloudflare 官网](https://dash.cloudflare.com/sign-up) 注册一个账号。（
2.  **开通 R2**：登录后，在左侧菜单栏找到 **“R2 对象存储”** 并点击进入。首次使用需要绑定一种支付方式（如信用卡或 PayPal），这**仅用于身份验证，不会扣费**。

### 🪣 第二步：创建存储桶 (Bucket)

1.  在 R2 页面点击 **“创建存储桶”** 按钮。
2.  为你的存储桶起一个**自定义名称**（如 `my-blog-images`）。
3.  **关键步骤**：在“位置”选项中，建议选择 **“亚太地区 (APAC)”**，这能优化在国内的访问速度。
4.  点击 **“创建存储桶”** 完成。

### 🔗 第三步：配置公开访问 (让图片能被外网看到)

为了让上传的图片能通过链接在博客中显示，需要将存储桶设置为公开访问。有两种方式：

*   **方式一：使用 R2.dev 子域名（最简单）**
    进入你的存储桶，在“设置”中找到 **“R2.dev 子域”** 选项，点击 **“允许访问”** 即可。你会获得一个类似 `https://pub-xxxx.r2.dev` 的链接。

*   **方式二：绑定自定义域名（更装逼）**
    如果你有自己的域名，可以在存储桶设置中点击 **“连接域”**，然后输入你的域名（如 `img.your-site.com`）。按照提示在 DNS 管理后台添加一条 CNAME 记录即可。

### 🔑 第四步：生成 API 令牌 (让 PicGo 有权限上传)

这是连接 PicGo 的关键一步。

1.  在 R2 页面右侧，找到并点击 **“管理 R2 API 令牌”**。
2.  点击 **“创建 API 令牌”**。
3.  **权限选择**：为了安全，权限选择 **“对象读和写” (Object Read & Write)**，这足够 PicGo 上传和管理图片了。
4.  **指定存储桶**：在“仅限于特定存储桶”中选择你刚刚创建的那个桶。
5.  点击 **“创建 API 令牌”**。
6.  创建成功后，页面会显示 **Access Key ID** 和 **Secret Access Key**......停在这个页面后不要手贱了，先放在一边。

---

### 🖥️ 第五步：配置 PicGo 客户端

1.  **安装 PicGo**：从 [PicGo 官方 GitHub 发布页](https://github.com/Molunerfinn/PicGo) 下载并安装适合你系统的版本。
2.  **安装插件**：
    *   打开 PicGo，进入 **“插件设置”** 选项卡。
    *   在搜索框中输入 `@tianlelyd/picgo-plugin-cloudflare-r2`（不是cloudflare-r2！）。
    *   选择并安装作者为 **`tianleyd`** 的插件。PicGo 默认不支持 R2，必须安装此插件。
3.  **配置图床**：
    *   插件安装成功后，进入 PicGo 的 **“图床设置”**，找到并点击 **“cloudflare-r2”**。
    *   按以下信息填写配置：
        *   **Account ID**：你的 Cloudflare **账户 ID**，可在 Cloudflare 仪表盘的右侧找到。
        *   **AccessKey ID**：上一步保存的 **Access Key ID**。
        *   **Secret Access Key**：上一步保存的 **Secret Access Key**。
        *   **Bucket Name**：你创建的存储桶名称（如 `my-blog-images`）。
        *   **Custom Domain**：**关键！** 这里要填写你在第三步获得的公开访问域名（例如 `https://pub-xxxx.r2.dev` 或 `https://img.your-site.com`）。
        *   **Endpoint**：填写 `https://<你的账户ID>.r2.cloudflarestorage.com`。注意将 `<你的账户ID>` 替换为实际值。
        *   **Region**：可以**留空**或填写 `auto`。

### ✅ 第六步：测试上传

配置完成后，将 PicGo 的“图床”设置为 **cloudflare-r2**，然后就可以通过拖拽或截图的方式上传图片了。上传成功后，PicGo 会自动将图片链接复制到你的剪贴板。

---

### 🛡️ 安全建议与注意事项

*   **设置 Referer 防盗链**：为防止图片被盗用或流量被刷，建议在 Cloudflare R2 存储桶的“设置”中，找到 **“CORS 策略”** 并配置 **`Referer`** 规则，只允许你自己的博客域名访问。
*   **保管好密钥**：**Secret Access Key** 如同密码，泄露后他人可随意操作你的存储桶，请务必妥善保管。
*   **留意用量**：Cloudflare R2 的免费额度（10GB 存储、100万次A类操作、1000万次B类操作）对个人博客非常充裕。但超出后会产生费用，建议偶尔登录后台查看用量。

按照以上步骤操作，你应该很快就能拥有一个稳定、免费的私人图床了。如果在操作的时候碰到什么问题，欢迎到评论区进行留言。