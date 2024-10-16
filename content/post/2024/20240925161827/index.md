---
title: 【博客搭建】Obsidian写作库：打造高效博客写作工作流
description: 本文介绍了我使用Obsidian构建个人博客写作库，并通过Obsidian实现快捷发布以及其他功能实现所使用的插件。
draft: false
date: 2024-09-25
color: "#ab3a9b"
keywords:
  - Obsidian
  - Hugo
  - 博客
slug: "20240925161827"
image: Obsidian-Hugo.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 博客搭建
tags:
  - 博客
  - obsidian
  - Hugo
---

先说为什么，再说怎么做。

Hugo 是一个很好的博客框架，但是问题就是作为静态博客，需要先本地构建网站然后再部署到服务器，这是一个相对来说比较复杂的流程，这是静态博客的通病，但是相对于具有后端的博客网站而言，文章的写作需要登陆后在 Web 端写作，所以自己的文章时存储在服务器上的，这又是诸如 Word press 之类的问题，如果在折腾的过程中不小心把服务器搞废了（怪我），文章什么的也就丢失了，得不偿失。

所以就引出了两个基本需求，

1. 快捷发布；
2. 本地文章存储（同步）。

然后就需要选择合适的趁手的工具来配置自己的博客写作工作流，最好的选择当然是 **Obsidian** 。

首先 Obsidian 保存在本地，并且可以使用各种同步工具或者 Webdav 进行同步，其次就是插件丰富，功能实现起来非常快捷。

## 我的 Obsidian 写作库 

首先展示一下我目前的 Obsidian 写作库吧。

![image.png](https://images.morick66.com/post/20240925161909.png)

### 界面&功能

在我的写作库中，界面的基本构成为：

- 左上角的文章大纲目录
- 左下角的选题盒子——快捷新建
- 右上角的文件属性编辑展示
- 右下角的标签管理
- 主页
	1. 网站部分页面的内容编辑
	2. 专栏文章筛选
	3. 所有文章列表的表格展示

所实现的功能：

- 粘贴图片上传到图床
- 点击按钮新建文章
- 快捷短代码
- 选题盒子
- 一键预览
- 一键发布
- 文章的自动格式化
- 主页的文章列表

### 工作流

所以当我有想写的选题想法的时候，点击选题盒子右上角的**新建选题**添加选题到我的选题盒子，并进行概述纪要。

![image.png](https://images.morick66.com/post/20240925163222.png)

需要写文章的时候，点击主页的新建文章按钮，输入标题新建文章（删除选题盒子中的选题文件）。

![image.png](https://images.morick66.com/post/20240925163440.png)

然后可以进行文章的撰写，图片截图之类直接粘贴到 obsidian 会直接上传到图床并替换文章中图片链接。

文章写作完成点击侧边栏中的预览按钮进行网站中的预览，没有问题可以点击发布按钮发布文章。

![image.png](https://images.morick66.com/post/20240925163804.png)

## 基础

实现这些功能的基础，需要将 Hugo 博客网站的整个文件夹做为 Obsidian 的库文件夹，出来 Obsidian 自动生成的`.obsidian` 配置文件夹之外，需要新建一个文件夹用来存放非 Hugo 构建使用的文件。

![image.png](https://images.morick66.com/post/20240925164141.png)

## 功能实现

### 图片上传图床

**插件：** Image auto upload Plugin

这个插件需要结合 Picgo 软件使用，插件会调用 Picgo 上传图片到图床，然后替换文章中的链接为图床链接。

### 新建文章

**插件：** Buttons、QuickAdd

QuickAdd 可以使用模板进行文件的创建，然后使用 Buttons 插件添加一个按钮在主页中。

### 快捷短代码

**插件：** QuickAdd

将博客支持的短代码添加到 QuickAdd 的配置中，可以使用快捷键进行调用，在文章中快捷插入短代码。

### 选题盒子

**插件：** Buttons、Dataview、QuickAdd

同样使用 Buttons 和 QuickAdd 进行文件创建到特定的文件夹，然后使用 Dataview 展示在下方。

### 一键预览/发布

**插件：** Shell commands、Commander

预览与发布原理一样都是需要使用 Shell commands 插件执行命令，进行预览和发布，命令如下：

预览：

```shell
start hugo server && start http://localhost:1313
```

发布：

```shell
 hugo --cleanDestinationDir && cd public && git add . && git commit -m "update" && git push && cd ..
```

然后使用 commander 插件将功能按钮添加到侧边栏中。也可以使用 buttons 按钮添加到主页中。

### 文章自动格式化

**插件：** Linter、Easy Typing

Easy Typing 时提高 Obsidian 输入中文体验的插件，Linter 则可以根据你的配置进行文章的格式化，比如说我就是使用，Ctrl+S 作为快捷键进行文章的格式化。

### 文章列表

**插件：** Dataview

使用 Dataview 展示文章列表以及一些基本信息在主页中，方便查看和管理。

```txt
Table without id
	link(file.link, title) as 文章标题,
	categories as 分类,
	tags as 标签,
	date as 发布时间
from "content/post" and !"content/post/_index"
sort file.ctime desc
```

### 其他

还有一些提升体验的插件，比如 Homepage 用来给 Obsidian 添加一个主页，Style Setting 进行一些美化等，就要看需求进行添加使用了。

## 服务器部署？

上面只说了使用 obsidian 的使用和插件，在发布的命令中可以看到我是使用 Git 进行的部署操作。

部署操作的大概流程为：

1. 本地执行 `hugo`构建网站
2. 将构建好的`public`文件夹 `git push`到服务器的远程 git 仓库。
3. 远程仓库中钩子文件`clone`仓库到临时文件夹，并强制覆盖删除网站路径下的文件。

具体的这部分内容可以参考[基于Hexo的静态博客网站搭建并部署至云服务器 | Glimound的个人技术经验分享](https://www.glimound.com/build-hexo-blog/)

## 小结

总的来说，发布文章是只需要自己点击一下鼠标，还是很方便的，并且文章存储在本地，可以根据需求进行备份或者同步。
