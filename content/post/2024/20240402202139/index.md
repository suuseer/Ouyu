---
title: 【博客搭建】Hugo给不同页面设置不同的主题色
description: 本文介绍了如何通过自定义CSS属性和JavaScript脚本实现Hugo网站的主题色定制。
keywords:
  - 自定义主题色
  - CSS属性设置
  - Hugo主题色
date: 2024-04-02
color: "#f48471"
slug: "20240402202139"
image: maincolor.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 博客搭建
tags:
  - 博客
  - Hugo
  - 主题
  - 前端
---

之前在看[Leonus](https://blog.leonus.cn/) 的博客的时候，发现大佬不同文章的主题色是不一样的，开始自己并没有相关的需求，便没有研究。

随后在自己折腾腾网站主题的时候，给不同的页面添加了不同颜色的banner，全站用相同的主题色就很怪了，自己也需要给不同页面添加一下主题色。像下图这样。

![](https://images.morick66.com/post/2420240402200479.png)

![](https://images.morick66.com/post/2420240402200408.png)

实现过程很简单。

## 首先添加一个主题色

添加一个自定义CSS 属性。并设置默认主题色。我用的主题在`variables.scss`中，可以在这个文件中添加，也可以直接添加到`custom.scss`中，

```css
:root {
	--main-color: #6A6D73;
}
```

## 添加脚本

在`layouts/_default` 文件夹下的 `baseof.html`中添加脚本JavaScript 脚本。

```JavaScript
<script>
	var mainColor = '{{ .Params.color }}';
	document.documentElement.style.setProperty('--main-color', mainColor);
</script>

```

脚本是获取当前页面Yaml 中的color 属性，将它赋值给`--main-color`，很简单的一个脚本。

## 设置主题色

修改css 的时候，在需要使用这个主题色的属性中，`var(--main-color)`调用自己设置的颜色。

给页面设置主题色只需要在页面的yaml 属性中，添加一个color 属性，设置当前页面想要的主题色。

```yaml
color: '#264F78';
```

在设置了主题色的页面使用主题色，没有设置主题色的页面使用默认主题色。

完成！
