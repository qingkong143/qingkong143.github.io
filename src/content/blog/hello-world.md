---
title: 主题样式示例全集
cover: 'https://pic.netbian.com/uploads/allimg/251021/190826-176104490648d8.jpg'
tags: 水文
abbrlink: 3eeb
---

## 标题层级

# h1 一级标题
## h2 二级标题
### h3 三级标题
#### h4 四级标题
##### h5 五级标题
###### h6 六级标题

## 行内文字样式

- **加粗文本** — `**加粗文本**`
- *斜体文本* — `*斜体文本*`
- ***加粗并斜体*** — `***加粗并斜体***`
- ~~删除线文本~~ — `~~删除线文本~~`
- `行内代码` — `` `行内代码` ``
- [超链接](https://www.baidu.com) — `[超链接](https://www.baidu.com)`

## 链接样式

文章内的链接会自动使用主题色并带下划线，便于识别：

- 这是一段包含[内部链接](/about/)和[外部链接](https://github.com)的文字。
- 鼠标悬停时链接颜色会变亮。

## 图片

图片支持点击放大预览，悬停时有轻微放大效果和阴影：

![示例图片](https://pic.netbian.com/uploads/allimg/251020/102802-17609272828af0.jpg)

点击上方图片即可在全屏灯箱中查看大图，按 Esc 或点击背景区域关闭。

## 分隔线

---

上面和下面各有一条分隔线：

***

## 引用块

> 这是一段引用文字。引用块带有左侧红色边框和半透明背景。

> 嵌套引用：
> > 水生动物
> > 陆生动物
> >
> > > 猴子
> > > 人类
> > > > 程序猿
> > > > 攻城狮

## 代码块

```python
def hello():
    print("Hello, Astro!")
    return True
```

```javascript
const greeting = (name) => {
  console.log(`Hello, ${name}!`);
};
greeting('World');
```

## 表格

| 左对齐 | 居中 | 右对齐 |
| :----- | :--: | -----: |
| Computer | 5000 元 | 1 台 |
| Phone | 1999 元 | 1 部 |
| Tablet | 3299 元 | 2 部 |

## 列表

### 无序列表

- 第一项
- 第二项
  - 嵌套项 A
  - 嵌套项 B
- 第三项

### 有序列表

1. 步骤一
2. 步骤二
   1. 子步骤 a
   2. 子步骤 b
3. 步骤三

### 任务列表

- [x] 已完成的任务
- [ ] 待办任务
- [ ] 另一项待办

## 脚注

这里有一个脚注引用[^1]，还有一个长脚注[^longnote]。

[^1]: 这是一个脚注内容。

[^longnote]: 这是一个带有多个段落的长脚注。

    后续段落需要缩进来表明它们属于前一个脚注。

## HTML 内联样式

<span style="color: red;">红色文字</span>
<span style="color: #008000;">绿色文字</span>
<span style="color: blue;">蓝色文字</span>
<span style="font-size: 1.25em;">放大字号</span>
<span style="font-family: 黑体; color: green; font-size: 1.25em;">黑体 + 绿色 + 大号</span>

## HTML 表格（带背景色）

<table>
  <tr><td style="background-color: #FFFF00;">背景色 #FFFF00 黄色</td></tr>
  <tr><td style="background-color: #D1EEEE;">背景色 #D1EEEE 浅蓝</td></tr>
  <tr><td style="background-color: #C0FF3E;">背景色 #C0FF3E 黄绿</td></tr>
  <tr><td style="background-color: #54FF9F;">背景色 #54FF9F 绿色</td></tr>
</table>

## 诗歌居中

<div class="poem-center">

春眠不觉晓，<br>
处处闻啼鸟。<br>
夜来风雨声，<br>
花落知多少。

</div>

## 外链卡片

使用 fenced code block 语法，只需填写字段即可自动生成卡片：

````markdown
```link-card
url: https://resend.com/emails
title: Resend
desc: Email for developers
img: https://icon.url
```
````

实际渲染效果：

```link-card
url: https://resend.com/emails
title: Resend
desc: Email for developers
img: https://ts4.tc.mm.bing.net/th/id/ODF.HneL3SgRPI5ISxHcESwIJg?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2
```

<br>

无图片的卡片也一样简单：

```link-card
url: https://github.com
title: GitHub
desc: 全球最大的代码托管平台，数百万开发者共同协作。
```

> 必填字段：`url` + `title`，可选：`desc`（描述）、`img`（图标 URL）。

## 视频嵌入

iframe 视频会自动适配为 16:9 响应式容器：

<iframe src="//player.bilibili.com/player.html?bvid=BV1GJ411x7h7&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

---

以上覆盖了当前主题文章页支持的全部样式元素。
