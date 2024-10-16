---
title: 【博客搭建】Hugo添加随机文章小部件
description: 给你的hugo博客添加一个随机文章小部件
draft: false
keywords:
  - Hugo
  - 随机文章
  - 小部件
  - 博客
  - 静态网站
date: 2024-05-07
color: "#3dab5f"
slug: "20240506172253"
image: random.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 博客搭建
tags:
  - 博客
  - Hugo
  - 随机文章
  - 前端
  - 主题
---

把Stack 主题魔改的越来越乱七八糟了，干脆直接把他做成了一个主题，并且放在了Github 上，但是目前主题还不是很完善，尤其是右侧边栏，总是不知道该放什么部件，之前做的memos 小部件，把他做成了一个单独的**嘀咕**页面，想着做一下瀑布流，做成 [Leonus](https://blog.leonus.cn/)大佬那样，并且点击可以直接引用并评论，但是瀑布流失败，点击评论也失败了，只实现了一个**伪瀑布流**，评论直接在memos 页面里添加了Twikoo，倒也不错。

但是又出现了问题，右侧边栏很空，很难看，所以终究是“抄袭”[Leonus](https://blog.leonus.cn/)大佬，做了一个随机文章的小部件。

这是实现效果👇，点击刷新可以更新随机 5 篇文章。

![](https://images.morick66.com/post/2420240506170559.png)

由于Hugo 静态博客的特点，如果想要随机文章，只能添加一个包含所有文章数据的JSON 文件，然后用JS 实现随机获取 5 篇文章，并添加一个刷新按钮。但是自己不会JS，于是就借助伟大的chatGPT，实现了这样的功能。

## JSON

首先是JSON 文件，需要在执行`hugo`命令时，构建一个JSON 文件放在网站根目录。

### 配置文件

在`config.yaml`配置文件中，添加如下内容：

{{< notice notice-warning >}}

randomJSON可以为JSON，但是会和我使用的Hugo Stack主题的search冲突，不知道原因，于是就设置为了randomJSON

{{< /notice >}}

```yaml
outputs:
  home:
    - HTML
    - randomJSON
outputFormats:
  randomJSON:
    mediaType: "application/json"
    baseName: "random"
    isPlainText: true
    notAlternative: true
    noUgly: true
    path: "/"
```

### 控制JSON 输出

然后在`content`文件夹下的`_index.md`YAML 中添加下面内容，控制JSON 输出。

```yaml
outputs:
  - HTML
  - randomJSON
```

### 添加JSON 模板

在`layouts\_default\`文件夹下添加文件`index.randomjson.json`，这是JSON 文件的模板文件。

内容为：

```go
{
  "articles": [
    {{- $articles := where .Site.RegularPages "Type" "post" -}}
    {{- $numArticles := len $articles -}}
    {{- $comma := "" -}}
    {{- range $i, $article := $articles -}}
    {{ $comma }}{
      "title": {{ $article.Title | jsonify }},
      "url": {{ $article.Permalink | jsonify }},
      "image": {{ (printf "%s%s" $article.Permalink $article.Params.image) | jsonify }},
      "date": {{ $article.Date | jsonify }}
    }
    {{- $comma = "," -}}
    {{- end -}}
  ]
}
```

获取类型`type`为`post`的文章，也就是在文件夹`content/post`下的文章。获取文章的标题、链接、封面和发布日期数据。

## HTML 和 Javascript

接下来在要想要添加小部件的位置，或者新建一个文件`random.html`。写入如下内容：

```html
<div class="random-posts widget--card">
    <h2>📄 随机文章</h2>
    <button id="random-btn" onclick="loadRandomPosts()">
        {{ partial "helper/icon" "refresh" }}
    </button>
    <div id="random-posts"></div>
</div>
<script>
    function loadRandomPosts() {
        fetch('/random.json')  // 确保使用正确的 JSON 文件路径
            .then(response => response.json())
            .then(data => {
                const postsContainer = document.getElementById('random-posts');
                postsContainer.innerHTML = ''; // 清空现有的文章列表
                const shuffled = data.articles.sort(() => 0.5 - Math.random()); // 随机排序
                shuffled.slice(0, 5).forEach(post => { // 选择前5篇文章
                    const postElement = document.createElement('div');
                    postElement.innerHTML = `
                    <a href="${post.url}">
                        <div class="random-post">
                            <img src="${post.image}" alt="${post.title}">
                            <div class="random-post-content">
                            <h3>${post.title}</h3>
                                <p>${new Date(post.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </a>
                    `;
                    postsContainer.appendChild(postElement);
                });
            });
    }
    // 初始加载
    loadRandomPosts();
    </script>
```

## CSS

自定义CSS，下面是我的以供参考。

```css
.random-posts {
  background-color: var(--card-background);
  position: relative;
  h2 {
    margin: 0;
    font-size: 15px;
    color: var(--card-text-color-main);
  }
  #random-btn {
    position: absolute;
    top: 20px;
    right: 10px;
    border: none;
    background-color: transparent;
    svg {
      width: 20px;
      height: 20px;
      stroke: var(--card-text-color-secondary);
    }
  }
  .random-post {
    display: flex;
    margin-top: 15px;
    &:hover {
      img {
        margin-left: -15px;
      }
    }
    img {
      height: 60px;
      border-radius: 10px;
      margin-right: 10px;
      margin-left: 0;
      transition: margin-left 0.2s;
    }
    .random-post-content {
      position: relative;
      h3 {
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-weight: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2; /* 显示两行 */
        max-height: 3em; /* 控制显示两行文本的最大高度 */
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 15px;
        position: absolute;
        bottom: 0;
        color: var(--card-text-color-secondary);
      }
    }
  }
}
```
