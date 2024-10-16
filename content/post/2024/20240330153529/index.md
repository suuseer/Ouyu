---
title: 【博客搭建】Hugo添加51LA统计数据挂件
description: 文章介绍了我在网站上添加51LA的统计数据和数据挂件的方式。介绍了添加数据挂件的步骤，并提供了删除内联样式和修改样式的JavaScript脚本。
keywords:
  - 统计功能
  - 51LA
  - 数据挂件
  - 样式修改
  - 内联样式删除
  - Hugo
  - 网站访问统计
date: 2024-03-30
color: "#5478b4"
slug: "20240330153529"
image: 51LA.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 博客搭建
tags:
  - 博客
  - Hugo
  - 网站工具
  - 主题
---

{{< notice notice-warning >}}

下述方法放弃，发现了Leonus 大佬的[这篇文章](https://blog.leonus.cn/2022/51la.html)，这种方式更好用。

{{< /notice >}}

---

在网上冲浪的时候，发现了张洪大佬[关于本站页面](https://blog.zhheo.com/about/)的访问统计功能。想在自己的网站上也弄一个，

![](https://images.morick66.com/post/2420240330170398.png)

## ❓问题

这是基于 51LA 的统计数据，自己就去尝试着弄了一下，统计功能可以直接在在页面添加SDK 追踪代码。

但是 hugo 上没有 51 LA 的插件可以安装，没有比较好看的数据挂件样式，官方提供的两种数据挂件样式——横排和竖排——都是在 51LA 上设置样式再添加到自己的网站，首先样式有点丑，而且是内联样式，难以修改，明暗主题色也无法适配。于是另辟蹊径，基本得到相对满意的效果。

![](https://images.morick66.com/post/2420240330170385.png)

## ⚡添加数据挂件

首先必然需要有 51LA 的账号，添加了自己的网站，并且自己网站页面也添加了统计代码。

统计功能正常后，再来添加数据挂件。

数据挂件可以在报表→配置→参数配置→数据挂件。

我选择竖排的样式，也可以选择横排，之后再修改脚本内容就可以。

![竖排](https://images.morick66.com/post/2420240330180326.png)

然后选择好自己想要展示的数据。

样式不用在这里修改，直接将最下面的嵌入代码粘贴到自己想放置数据挂架的位置。

构建发布后，就可以在自己的网站中看到数据挂件。样式就是上面的样式。

## ❌用脚本删除内联样式

要是想修改样式，需要先删除数据表的内联样式，再给挂件元素添加`class`。

将下面的脚本添加到你放置数据挂件的页面。

```javascript
document.addEventListener("DOMContentLoaded", function() {
// 递归函数，用于删除所有子元素的内联样式并设置特定的 ID 和类
function processChildren(element, parentId) {
    var children = element.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        // 删除子元素的内联样式
        child.removeAttribute("style");
        // 设置特定的 ID
        if (parentId !== null) {
            switch (i) {
                case 0:
                    child.id = "todayVisitors";
                    break;
                case 1:
                    child.id = "todayVisits";
                    break;
                case 2:
                    child.id = "yesterdayVisitors";
                    break;
                case 3:
                    child.id = "yesterdayVisits";
                    break;
                case 4:
                    child.id = "thisMonthVisits";
                    break;
            }
        }
        if (child.children.length > 0) {
            // 如果子元素还有子元素，则继续递归
            processChildren(child, parentId);
        } else {
            // 如果子元素没有子元素，则设置类
            switch (child.tagName.toLowerCase()) {
                case 'span':
                    if (i === 0) {
                        child.classList.add('name');
                    } else if (i === 1) {
                        child.classList.add('number');
                    }
                    break;
            }
            // 移除三级子元素的ID
            child.removeAttribute("id");
        }
    }
}

// 获取所有类名为 "la-widget" 的元素
var widgets = document.getElementsByClassName("la-widget");
  
// 循环遍历这些元素
for (var i = 0; i < widgets.length; i++) {
    var widget = widgets[i];
    // 删除当前元素的内联样式
    widget.removeAttribute("style");
    // 设置当前元素的唯一 ID
    var uniqueId = i;
    widget.id = uniqueId;
    // 递归处理子元素
    processChildren(widget, uniqueId);
}
});
```

## 🎨自己修改样式

上面的脚本删除了数据挂件的内联样式，并给元素添加了`id`和`class`，然后根据自己喜好修改样式就可以。

通过浏览器<kbd>F12</kbd>调试模式，看一下`html`结构，修改样式。

> 因为数据挂件在本地`localhost`无法展示，需要先发布网站再查看，可以写一个类似的html 结构，本地调试一下样式。

下面是我的css，可以参考。

```css
.la-widget {
	display: grid;
	grid-template-columns: 1fr 1.5fr;
	padding-left: 20px;
	min-height: max-content;
	span {
		padding: 5px 0;
	}
	.name {
		font-size: 15px;
		color: var(--card-text-color-secondary);
	}
	.number {
		display: block;
		font-size: 30px;
		font-weight: bold;
	}
}
```

完成！
