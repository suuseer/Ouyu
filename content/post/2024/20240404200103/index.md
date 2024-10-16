---
title: 折腾一年半，我的Obsidian现状
description: 本文分享我使用Obsidian笔记软件一年半的经验总结。文章主要介绍了我目前使用的主题、插件和CSS样式，以及如何通过PARA方法组织和管理笔记。
keywords:
  - Obsidian
  - 笔记软件
  - 个性化设置
  - 插件使用
  - PARA方法
date: 2024-04-04
color: "#7148c0"
slug: "20240404200103"
image: Obsidian.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 
tags:
  - obsidian
  - 知识管理
  - PARA
---

从 2022 年底接触Obsidian到现在，各种教程看过不少，也尝试过很多示例库，复杂的简单的。

生命不息，折腾不止，这段时间也尝试过很多不同的笔记软件——Notion、思源笔记、AFFINE、Logseq 等等等，Obsidian 终究还是自己用起来最顺手的笔记软件。

尝试别的倒不是Obsidian 使用中有问题，而是有时候有点厌倦折腾，但是最终还是回到了Obsidian 的怀抱，毕竟只有obsidian 可以更好的定制自己的有些特殊功能需求。

所以记录一下自己目前Obsidian 的使用现状。

![我的Obsidian界面](https://images.morick66.com/post/2420240404200437.png)

## 库

自己偏向笔记内容都放在一个库，完全不相干的、不想互相干涉的内容再新建库，所以我目前只有一个笔记库和一个博客库，下面介绍的是我的笔记库的内容。

## 主题

Blue Topaz、Things、Minimal 等等主题商店里排名靠前的主题都有尝试过，这些主题大都自己带一些特殊的CSS 样式，但有些样式自己属实使用不到，很多主题都需要安装配置插件或者借助`style setting`配置，所以总觉得这些主题很臃肿，所以几乎自己一直使用的都是`Obsidian Nord`这个主题，简单、简单、还是简单，有什么特殊样式需求就自己写css。Nord 只用一套我本人看起来很舒服的配色，几乎它也只提供了一套配色。

## 插件

插件一定是根据需求去使用，很多很帅的插件你不一定用的到，比如对我来说，`Templater`这个插件，刚开始使用Obsidian 的时候就被推荐安装，然后实在找不到使用场景，软件核心插件的模板功能完全够我用，便没有使用这个插件。

目前我仍旧在使用的插件如下：

1. Banners——文章头图插件，我只用在了主页上，添加了一个头图。
2. Buttons——文章添加一个按钮，可以绑定各种命令。
3. Clear Unused Images——删除不再跟文件有关联关系的图片。
4. Commander——把命令添加到软件的各种位置，很方便，也可以自定义宏命令。
5. Custom Frames——把Obsidian 当成一个浏览器，可以Obsidian 中打开网页软件，并且可以修改样式，我只添加了**滴答清单**一个，修改了背景色，配合主题。![](https://images.morick66.com/post/2420240404210461.png)
6. DataLoom——最近发现的一个插件，可以添加类似于Notion 的数据表格，同类型还有一个**DB Folder**，不同的是`DB Folder`是检索文件夹里的文件形成表格，我创建表格只用来管理表格数据，导致文件夹里所有文件都只用YAML 属性，文件是空的，就换了这个插件。
7. Dataview——神级插件，根据要求检索整个笔记库，形成列表表格等，而且可以写dataviewjs，实现高级需求。
8. Easy Typing——一个输入体验增强的插件，首字母大写，符号配对，输入两个全角符号会转化成半角符号等等小功能，属于那种润物细无声的插件，习惯后不用这个插件就会很难受。
9. Excalidraw——开源白板软件excalidraw 的Obsidian 插件版，有很多增加的功能，个人需求不是特别大，但偶尔会用到的一个瞬间。
10. floating toc——浮动大纲，页面侧边添加一个文章大纲，鼠标悬停展示。自己用CSS修改了他的样式。 ![](https://images.morick66.com/post/2420240404210404.png)
11. Homepage——给Obsidian 添加一个主页。
12. Image auto upload Plugin——配合picgo 的图床插件，自己不太用图床，偶尔用的时候再打开。
13. Latex Suite——Latex 输入增强插件
14. Linter——根据自己的配置，格式化整个文档，可以设置关闭页面的时候格式化文档。
15. Pandoc Plugin——使用pandoc 把markdown 文件转换成各种格式导出。
16. Quick Add——创建快捷方式添加内容或者添加文件，好用。
17. Sortable——给Dataview表格一个点击标头可以正序倒序排序的功能。
18. Tag Wrangler——给标签管理增加了一些功能，用的很少，但还是会有需要的时候。

## CSS

Obsidian 的魅力之一，任何样式需求几乎都可以借助CSS 自定义，双栏、底色、边框之类，

Obsidian 的CSS 文件存放在`.obsidian\snippets`文件夹内，添加好CSS 文件记得在Obsidian 的设置→外观中启用样式。

因为想自己修改CSS 的样式，自己还上B 站自学了`HTML` 和`CSS`相关的知识。目前自己使用的CSS 很杂，大概有下面这几个。

> 当然，零碎细节修改也有很多，就不过多阐述。

### 主页分栏

主页分栏借助Obsidian 自带的callout，用下面这样的格式自定义一个内容块：

```md
> [!col-3] Title
> 
```

`col-3`是自定义的名字，切换成阅读视图，按<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>打开Obsidian 的调试模式，刚才定义的内容块就添加了一个`data-callout="col-3"`属性，

使用CSS 选择器`.callout[data-callout="col-3"]`选中元素，修改样式，callout 块可以嵌套，直接当一个`div` 盒子使用就可以，其实，Obsidian 可以直接写HTML 标签，但是属实有点麻烦。

### 按钮样式

在css样式文件夹新建一个`button.css`文件，添加button 按钮时，添加`class normal`调用样式。

实现效果：

![](https://images.morick66.com/post/2420240404220433.png)

```css
/* 标准圆角按钮 */
.normal {
  color: white;
  display: flex;
  margin-left: auto;
  margin-top: -70px;
  margin-bottom: 0px;
  width: min-content;
  height: 40px;
  border: 2px solid #1E1E1E;
  border-radius: 15px;
  transition: all 0.3s;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.199) !important;
  font-size: 17px;
  font-weight: 550;
  font-family: 'Montserrat', sans-serif;
}
.normal:hover {
  background: #1E1E1E !important;
  color: white;
  font-size: 20px;
}
```

### 标签云

原本的标签是直接竖排排列，显示内容太少了，修改一下CSS 样式实现简单的标签云效果。

![](https://images.morick66.com/post/2420240404220450.png)

{{< notice notice-note >}}

想重建标签体系，所以做了一次标签清理，几乎所有笔记的标签都被我删了。

{{< /notice >}}

```css
/* 标签栏 */
.tree-item-flair-outer {
    margin-left: unset !important;
}
.tag-container .tree-item {
    display: inline-block;
    margin-bottom: -5px;
    margin-right: -10px;
    margin-left: -10px;
}
.tag-pane-tag {
    pointer-events: none;
}
.tag-pane-tag:hover {
    background-color: transparent !important;
}
.tag-pane-tag-count {
    line-height: 0em;
}
.tag-pane-tag .tree-item-inner {
    pointer-events: auto;
}
.tag-pane-tag .tree-item-inner:hover {
    color: write;
}
```

### 页面全宽

```css
.home .markdown-preview-section {
    width: 100% !important;
    max-width: 100% !important;
}
```

这串代码只能在阅读视图下实现全宽，但是够用。

在需要使用这个CSS 代码的页面YAML 添加

```yaml
cssclasses: home;
```

### 浮动大纲

![](https://images.morick66.com/post/2420240404220480.png)

`floating toc` 插件可以通过`style settings`插件进行简单的样式修改，但不太满意，于是就自己写了css，这个css 是基于我使用的Obsidian Nord 主题做的配色，如果想用可以自己调整。

```css
:root {
    --box-width: 250px;
    --font-size: 15px;
    /* 标题前序号颜色 */
    --h1-list-graphic: #BF616A;
    --h2-list-graphic: #EBCB8B;
    --h3-list-graphic: #A3BE8C;
    --h4-list-graphic: #B48EAD;
    --h5-list-graphic: #8FBCBB;
    --h6-list-graphic: #81A1C1;
    /* 标题前序号颜色 */
    --h-font-color: #141414;
    --background-color: #3B4252;
    --border-color: #434C5E;
    --bg-opacity: 0.8;
}
/* 整体 */
ul.floating-toc {
    right: 0 !important;
    height: 100%;
}
/* 工具栏位置 */
.floating-toc-div .toolbar {
    background-color: transparent;
    top: 70px !important;
    right: 10px !important;
    margin-left: 0 !important;
}
/* 工具栏按钮 */
.toolbar>button {
    background-color: var(--background-color) !important;
    width: 50px !important;
    height: 30px !important;
    border: 1px solid var(--border-color) !important;
}
/* 字体大小 */
ul.floating-toc li {
    font-size: var(--font-size);
}
/* 背景外观设置 */
.floating-toc-div.pin .floating-toc,
.floating-toc:hover {
    width: var(--box-width);
    background-color: var(--background-color) !important;
    border: 2px solid var(--border-color) !important;
    border-right: 0 !important;
    border-radius: 10px 0 0 10px !important;
    padding: 10px !important;
}
ul.floating-toc li[data-level="1"] a {
    color: var(--h1-list-graphic) !important;
}
ul.floating-toc li[data-level="2"] a {
    color: var(--h2-list-graphic) !important;
}
ul.floating-toc li[data-level="3"] a {
    content: "3";
    color: var(--h3-list-graphic) !important;
}
ul.floating-toc li[data-level="4"] a {
    content: "4";
    color: var(--h4-list-graphic) !important;
}
ul.floating-toc li[data-level="5"] a {
    content: "5";
    color: var(--h5-list-graphic) !important;
}
ul.floating-toc li[data-level="6"] a {
    content: "6";
    color: var(--h1-list-graphic) !important;
}
/* 鼠标停留背景 */
ul.floating-toc li {
    padding-right: 0 !important;
}
/* 列表背景颜色 */
ul.floating-toc li>div>a {
    background-color: transparent !important;
}
```

## 文件夹结构

自己兴趣比较广泛，记录的东西有时候很杂，新建笔记的时候总是会纠结笔记放在哪里。

同样尝试了很多文件夹体系，也就是笔记整理体系，都很怪，也想自己建立适合自己的，但是每次更换体系就需要全库整理，实在累人，在深入了解PARA 结构后，决定就使用这个体系了。下面是我的使用方式。

![](https://images.morick66.com/post/2420240404220427.png)

P——项目，我的理解是要做的事，不一定非是大型项目，就是要做的事，会有结束的时间的一件事，读一本书，学一套课，一次旅行计划，等等。一个项目新建一个文件夹，建立一个总索引页面，命名用`@`开头，这个项目的笔记就通过这个索引页面自上而下建立管理，然后在主页用`dataview`检索`Project`文件夹标题含有`@`的文件，建立主页索引。

A——领域，自己的领域，可以是工作，不一定非是工作，自我成长也是一个领域，恋爱也是一个领域。领域，就是长期、自己需要负责的内容。一个领域一个文件夹，项目属于领域，项目完成后可以移动到领域文件夹，并在领域文件夹的索引页面创建链接。

R——资源，就是兴趣，记录自己感兴趣的事，同样一个兴趣一个文件夹。项目也可以属于资源（兴趣）。同领域，属于兴趣的项目完成移动到资源文件夹中相关的兴趣文件夹。

A——归档，存放不感兴趣的兴趣，未完成，暂时不想做的项目，不再是领域的领域，等等。

各个部分的内容都会相互流转，领域不再是领域，可能转化为兴趣，兴趣可能成为领域，项目可以是领域，也可以是兴趣。

而有些零碎的记录，不构成项目，就直接在相关领域或者兴趣文件夹的索引里创建文件链接记录。

基本涵盖了生活所有方面。

## 结束

Obsidian 是个很好的软件，希望自己可以少点折腾（自己都不信），多记笔记。
