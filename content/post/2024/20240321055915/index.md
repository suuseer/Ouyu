---
title: 【博客搭建】我的Hugo博客搭建记录
description: 本文是我博客搭建的记录，介绍了自己目前的使用流程和搭建过程，以及搭建过程中踩到的一些坑。从本地构建到部署 Vercel 或者服务器，再到文章创建发布自动化流程，以及一些有趣的小功能，具有较小的参考价值。
keywords:
  - Hugo
  - 博客
  - Stack
date: 2024-03-20
color: "#842ed1"
slug: "20240321055915"
image: Hugoblog.svg
canonicalURL: 
categories:
  - 经验分享
math: false
columns: 博客搭建
tags:
  - Hugo
  - 博客
  - obsidian
---

> 首先，这不是一个教程，只是我用 Hugo 搭建博客的记录，可以作为参考。因为本人技术很差，只是喜欢折腾。✌️
> 
> 所以，本文应该会有一些你可能也会遇到的大佬教程中可能没有详细解释的问题，或者一些我因为我的愚蠢导致的不常见的问题😉。

从开始折腾 Hugo 到现在已经有大概一个月的时间了。在我开始有了搭建博客的想法后，从实现本地预览，到上传到 GitHub Pages，再部署 Vercel，又买了域名绑定自己的域名，发现了阿里云有学生优惠，领了几个月服务器适用，到域名备案，备案完成后把博客部署在了服务器，但是又觉的发布流程很复杂，又研究自动化创作发布，到现在，目前实现了这样的一套简单自动化的流程：Obsidian 创作，一键预览，一键发布。

大概记录一下这个流程及实现方式，希望对你有参考价值。

> 首先介绍一下我目前的使用环境，使用[Hugo](https://gohugo.io/)框架，魔改后的 [Stack](https://themes.gohugo.io/themes/hugo-theme-stack/)主题，阿里云购买的域名，部署在阿里云服务器，用 Obsidian 进行文章创作。

So，让我们开始吧💪！

## 🎆准备一下

### ⬇️下载软件

> ✔必须： Hugo
> 
> ❓非必须：Git，VsCode，Obsidian

下载 **Hugo** 可以去 [Hugo 官网]( https://gohugo.io/ ) 查看，官网提供了不同系统的安装方式，或者在[Github页面](https://github.com/gohugoio/hugo)Releases 下载。

**Git** 用来发布到 Github，在我的流程中，部署到自己的服务器也用 Git，如果想纯手动上传到服务器，也不是不可以。

**VsCode** 用来进行网站的配置，也有可视化的 Git 界面可以使用。

Obsidian 是个笔记软件，可以用来创作，插件丰富，可**疯狂**自定义。

**Git**、 **Obsidian**和 **VsCode** 直接上官网下载安装就好，可以看 [L1nSn0w'](https://blog.linsnow.cn/)的这篇文章《[（1）带着Stack主题入坑Hugo](https://blog.linsnow.cn/p/join-hugo-and-stack/)》

> 1. ⚠Hugo 需要 Go 环境。
> 2. ⚠如果要使用 Stack 主题的话，请一定下载 extended 版本的。或者不管什么主题直接下 extended 版本。

### 💻Git 基本配置

安装好 Git 需要一些基本配置。

随便一个位置鼠标右键打开 Git Bash，配置用户名和邮箱。

```bash
git config --global user.name "用户名"
git config --global user.email "你的邮箱"
```

然后在 Git bash 使用：

```bash
git config --global user.name
git config --global user.email
```

查看你的用户名和邮箱配置信息。

### 🔗与 Github 创建连接

> 如果网站部署在 Github 上的话需要本地与 Github 创建链接。

同样在 Git Bash，输入

```bash
ssh-keygen -t rsa
```

创建公钥文件，然后

```bash
cat ~/.ssh/id_rsa.pub
```

查看公钥文件。

> 也可以直接到`C:\Users\你的用户名\.ssh\`文件夹下查看 `id_rsa.pub` 文件

**然后去 Github 添加 SSH 链接。**

> 登录 GitHub，点击右上角头像，进入设置，把 SSH 公钥填进去就 OK 了。

再打开 Git Bash，输入下面的命令查看连接🔗状态。

```bash
ssh -T git@github.com
```

显示下面的内容证明链接成功。

![](https://images.morick66.com/post/2420240320.png)

### 📲服务器&域名

如果想要将博客部署在自己的服务器，建议提前购买好域名和服务器。

如果是大陆内服务器，可以进行域名备案，域名备案很简单，我在阿里云买的服务器和域名，通过阿里云进行备案，阿里云上提示是大约 20 天，但是我的域名备案 10 天就通过了。正好在等待域名备案的这段时间配置自己的网站，或者在服务器测试。域名备案通过了解析一下，配置一下反向代理就可以访问了。

如果通过 Vercel 部署，也尽量买一个域名，Vercel 大陆无法访问，将域名解析到 Vercel 分配的域名，大陆才能访问。

> ⚠️ 域名请三思后再买，要不自己网站建很长时间了不喜欢这个域名再去更换的话，再更换域名的话就很麻烦。

我在阿里云注册的域名，`.com`的域名首年 35 块，划算。

## 🎈第一阶段——基本配置、本地预览

做好上述准备就可以开始构建自己的第一个网站了。

### 🕸创建网站

Hugo 安装成功后，可以找个你想创建网站文件夹的文件夹，按住 Shift，点击鼠标右键，点击此处打开 PowerShell。然后输入

```bash
hugo new site MyBlog
```

> MyBlog 是文件夹名称，可以自己换。

### 🎀主题

#### ✨下载安装主题

我用的是 Stack 主题，你也可以到 [Hugo主题列表](https://themes.gohugo.io/)找自己喜欢的主题。

![](https://images.morick66.com/post/2420240320-1.png)

进入 Stack 主题 Github 仓库，可以`git clone`仓库，也可以直接把代码下载压缩包，解压到`MyBlog/themes`文件夹下。

> ⚠️`themes`下面的主题文件夹一定要跟主题名称一样，要不 Hugo 找不到文件夹会报错。

把主题文件夹下的`exampleSite`里的`config.yaml`配置文件复制到根目录`MyBlog`文件夹下。

同样主题文件夹，`exampleSite\content` 文件夹下的 `page`、`categories` 文件夹和两个 md 文件复制到`MyBlog/content`文件夹里。

> ⚠️ `posts`文件夹是存放博客文章的文件夹，不要复制！示例博客文章有的内容无法显示就会报错，一会自己看一下他的文件格式自己新建 post 就行。

之后可以用 vscode 操作，在`MyBlog`文件夹右键用 code 打开。

终端运行命令`hugo server`创建本地端口调试配置。

输出下面类似的内容就可浏览器预览了。

![](https://images.morick66.com/post/2420240320-2.png)

浏览器打开`localhost:1313`，就能看到网站的雏形了。

> ❌这里有一个问题，有可能本地端口被占用。自己找了很长时间问题，然后发现是因为电脑开启了`Hyper-V`，不知道为什么，把他关了就好了。

如果`1313`端口打不开，Hugo 还给分配了另一个端口。

![](https://images.morick66.com/post/2420240320-3.png)

最后成功浏览器本地打开网站，长这样⬇️

![](https://images.morick66.com/post/2420240320-4.png)

#### 🎃基本配置

主题基本的配置还是要去官网看文档，但是，Stack 的主题文档写的不是特别全面，有时候还需要再结合 Hugo 的官方文档，基本上可以搭建成功。

基本的配置只需要修改前面复制到根目录的`config.yaml`里的内容就好了。

一些基本的内容文档也写清楚了，不基本的内容就需要根据自己的情况修改了。

大概看一下主题文件夹，你会发现跟你根目录下的文件夹结构差不多，需要修改什么文件的时候，就把主题文件夹里的文件夹复制到根目录同样的文件夹里。然后再修改，这样会直接覆盖主题文件夹的同一个文件，如果发现配置错的离谱了，直接把复制过去的文件删掉就好，这样就恢复主题默认了。

> ⚠️ 任何修改尽量不要在主题文件夹修改，免得以后忘了都修改过什么内容，更新主题的时候把自己配置的内容覆盖了。

### 📃试着创建篇文章

Hugo 是用 Markdown 创建文章，文章都保存在`content`文件夹下。可以通过`YAML`语法给文章配置元数据。

使用命令`hugo new post/文件夹名称/index.md`可以新建一篇博客。

### 📂文件结构

整个网站目录里，几个重要的文件夹：

1. assets：存放图标、图片、js(ts)脚本文件，css(scss)样式文件；
2. content：文章、页面、分类页面等文件；
3. layouts：网页布局文件；
4. public：hugo 编译后的网站文件夹；
5. static：图片等静态文件；
6. themes：主题文件夹。

在`content`文件夹下，

- `categories`是分类页面目录。
- `page`是归档、友链、关于之类页面的目录。
- `post`（也可能是`posts`）是存放博客文件的目录。

有两种图片等文件存放方式比较建议。

1. `post`文件夹下一篇文章是一个文件夹，文件夹里文章文件命名为`index.md`，所有图片文件都存放在这个文件夹下，引用时直接用图片名就可以`![图名](image.png)`
2. `post`文件夹下直接存放 Markdown 文件，图片存储在`static/images`文件夹下，引用时`![图名](/images/image.png)`

### 📋YAML

大概说一下stack主题给的示例：

```YAML
---
title: ## 文章标题
description: ## 文章描述、摘要
date: ## 发布时间
slug: ## 就是网址上这个页面的链接
image: ## 封面图链接，遵循上面说到的，图片存储规则。
categories: ## 文章分类
    - Test
    - 测试
---
```

也可以添加

```yaml
tags:
	- 标签1
	- 标签2
```

标签会显示在主页标签云内。

下面是我的 YAML 模板，可以参考。

```YAML
---
title: 标题
description: 小标题
keywords:
  - 关键词1
  - 关键词2
date: 日期
slug: 
image: 封面
canonicalURL: 
categories:
  - 分类
math: false
tags:
  - 标签1
  - 标签2
---
```

> 然后，好像没什么了。本地成功调试 OK 就可以把他给发布到网上了。

## 👨‍💻第二阶段——网站部署

[上文](https://blog.morick66.com/p/20240305055915/)已经将自己的网站在本地运行成功了👀，但是运行在自己本地的网站怎么能叫网站呢，当然要让他**上网**🕸了。

### 💥部署在 Vercel。

#### 🛠仓库发布到 Github

还是回到 Vscode，在 VSCode 的侧边栏进入源代码管理。

![](https://images.morick66.com/post/2420240320-5.png)

初始化仓库，建立本地 Git 仓库（在根目录会创建一个`.git`文件夹）。

然后会有一大堆`更改`内容。在**消息内输入内容**（⚠️不输入内容无法提交），点击提交，将文件夹内的更改提交到本地 `git` 仓库。

![](https://images.morick66.com/post/2420240320-6.png)

提交到本地仓库后，急须点击`发布Branch`可以将自己的仓库发布到 Github（前提是已经用 Github 登录了 Vscode）。

![](https://images.morick66.com/post/2420240320-7.png)

命名 Github 仓库，选择公开仓库或者私人仓库（如果部署到 Vercel 的话，私人仓库也可以的）。

> 看到一些文章里说的需要把仓库名称设置为`用户名.github.io` 的，其实不用，直接命名为`MyBlog`就可以，当然其他的也可以。

> ❌这里可能会报错，如果报错，应该就是代理的问题。

到终端用下面的命令改一下 git 的代理，7890 改为自己的端口。

```bash
git config --global http.proxy "127.0.0.1:7890"
git config --global https.proxy "127.0.0.1:7890"
```

然后成功把自己本地 Git 仓库发布到了 Github 远程仓库。

#### 🔗部署到 Vercel

注册登录 Vercel，点击右上角 `Add New...`添加一个新的`Project`。

从 Github 仓库选择刚才创建的博客仓库。

![](https://images.morick66.com/post/2420240320-8.png)

然后给`Project`命个名，点击`Deploy`进行部署，稍微等一会，就部署成功了。

![](https://images.morick66.com/post/2420240320-9.png)

进入`Dashboard`，`Domains`下就是 Vercel 给这个仓库分配的域名。就能进入自己的网站了🎉。

![](https://images.morick66.com/post/2420240320-10.png)

但是这个域名在国内访问基本没有速度。所以最好是购买一个自己的域名。

#### 🕸Vercel 绑定域名

回到 Vercel，在新建的项目里进入设置，`Domains`里绑定自己的域名。直接输入域名，`Add`就可以。

![](https://images.morick66.com/post/2420240320-11.png)

#### 🎇域名解析

上一步添加域名后，会给我们 Type、Name、Value 三个值，这时需要回到域名服务商，以阿里云为例，进入域名控制台。

在你的域名列表里，点击表格最后的有一个`解析`，进入`解析`并添加解析记录。

![](https://images.morick66.com/post/2420240320-12.png)

Vercel 中给我们的 Type 就是类型，Name 是主机记录，Value 是记录值，然后确认。

完成自己域名到 Vercel 的解析。

再回到 Vercel，发现已经成功绑定域名，这时你的网站就搭建完成。

可以愉快的用自己的域名访问自己的网站了！

### 👑部署在自己的服务器

本部分参考《[基于Hexo的静态博客网站搭建并部署至云服务器](https://www.glimound.com/build-hexo-blog/)》，大佬的教程十分详细，绝大部分都可以用在 Hugo 上，部分自动化流程相关会在下一节说明。

⚠服务器访问需要防火墙开放 80 （http）和 443（https） 端口。参考—[这篇文章](https://blog.csdn.net/PEABRAIND/article/details/125073418)

## 🎿第三阶段——自动化流程

Hugo 一类的静态网站的小缺点就是发布比较麻烦，作为 obsidian 的重度用户，希望还是能在 obsidian 中写文章。

同样是介绍两类部署，部署在 **Vercel** 和部署到**服务器**。

### 🏈Obsidian 的配置

使用 Obsidian 实现如下功能：

1. 选题盒子
2. 一键新建文章
3. 一键预览
4. 一键发布
5. 文章管理

最终的 Obsidian 效果如下：

![](https://images.morick66.com/post/2420240320-13.png)

### 🕳准备

Obsidian 的一个仓库就是一个文件夹，直接用网站目录作为 Obsidian 的仓库。建立一个`@Extras`文件夹存放非网站内容的 Obsidian 文件。

![](https://images.morick66.com/post/2420240321100320.png)

> ⚠如果部署在 GitHub，整个网站目录是 git 仓库的话，建议把`@Extras`和`.obsidian`添加到`.gitignore`。看自己需求，如果感觉可以上传那就不用。

### 📦选题盒子

我的选题都是一个个文件，也可以不这么麻烦，直接写在一个文件里。

> 我的选题盒子使用到的插件，`Dataview、QuickAdd、Buttons`

- Dataview：内容检索列表展示。
- QuickAdd：快捷指令
- Buttons：添加按钮

QuickAdd 使用 Template 创建一个在确定文件夹里新建文件的指令。然后用 Buttons 绑定这个指令。

新建个文件，粘贴以下内容（记得删除转义`\`）：

```
---
cssclasses:
  - sidebar
---

**选题盒子**

\```button
name 新建选题
type command
action QuickAdd: 新建选题
class normal
\```

\```dataview
list
from "@Extras/选题"
sort file.mtime desc
\```

```

给页面定义一个 CSS 类`sidebar`，然后在 obsidian 设置👉外观，添加 css 代码片段。样式自定义，下面是我的，提供参考。

```css
/* 选题盒子 */
.sidebar .markdown-preview-section .metadata-container {
    display: none !important;
}
.sidebar strong {
    font-size: 35px;
}
.sidebar a {
    text-decoration: none !important;
    font-size: 20px;
    color: white !important;
}
.sidebar .list-view-ul {
    margin: 0;
    padding: 0 !important;
}
.sidebar .list-view-ul li {
    border: 1px solid #ffffff !important;
    padding: 10px !important;
    border-radius: 10px;
    margin: 0 0 10px 0;
}
```

Button 按钮 CSS 参考：

```css
/* 标准圆角按钮 */
.normal {
  color: white;
  display: flex;
  margin-left: auto;
  margin-top: -65px;
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

> 我的按钮向上偏移了一定量，为了跟标题在一行。

### 📃一键新建文章

> 使用到的 obsidian 插件：`QuickAdd、Buttons

新建一个模板文件夹，创建一个文章模板。

我的模板👇

```yaml
---
title: 标题
description: 小标题
featured: false
keywords:
  - 关键词1
  - 关键词2
date: "{{date}}T{{time:HH:MM:SS}}+08:00"
slug: 
image: 封面
canonicalURL: 
categories:
  - 分类
math: false
tags:
  - 标签1
  - 标签2
---
```

同上一节，使用 QuickAdd 创建快捷指令，将文章新建在`content/post`文件夹下。文件名称`{{Date:YYYYMMDDHHmmss}}/index`，含义是创建一个时间命名的文件夹，在这个文件夹下创建一个 index 文件。

> ⚠
> - obsidian `设置`👉`文件与链接`，将附件默认存储路径改为当前文件所在文件夹，往 obsidian 粘贴图片的时候就直接存在文章相同目录了。
> - 同样`文件与链接`改一下内部链接类型，关闭使用 wiki 链接，使用当前文件的相对路径，并使用标准 md 链接类型，如下图：

![](https://images.morick66.com/post/2420240321100311.png)

根据需求绑定在合适的位置添加一个按钮，绑定新建文章的 QuickAdd 命令。

### 💎一键预览

一键预览需要设置脚本，QuickAdd 可以定义脚本，但是我不会`JavaScript`，询问 Chatgpt 后，实现了这个功能。有两种方式：

#### 🎛本地 js 脚本

建立一个`preview.js`文件，写入以下内容：

```js
var shell = WScript.CreateObject("WScript.Shell");
// 定义要执行的命令
var command = "cmd /c cd /d D:/Morick/MyBlog && hugo server";
// 在终端执行命令
var terminalProcess = shell.Exec(command);
// 打开网页
shell.Run("http://localhost:1313");
// 等待命令完成
while (terminalProcess.Status === 0) {
    WScript.Sleep(50);
}
```

就是 shell 命令，`cd`到网站根目录，执行`hugo server` 然后浏览器打开`http://localhost:1313`。

⚠这会弹出一个终端窗口，关闭窗口就会关闭 `hugo server`

然后将这个脚本和主页标题创建链接：

![](https://images.morick66.com/post/2420240321110312.png)

点击主页标题就可以进行预览。

#### 💻Shell Commands 插件

新建一个 shell 命令，粘贴，

```shell
start hugo server && start http://localhost:1313
```

原理相同，打开 hugo 服务，浏览器打开`http://localhost:1313`。

同样会出现一个终端窗口，关闭终端退出 hugo server。

![](https://images.morick66.com/post/2420240321110306.png)

### 🧲文章管理

> 使用到的 Obsidian 插件：`Dataview`

![](https://images.morick66.com/post/2420240321120387.png)

Obsidian 主页添加一个数据表格，进行文章的管理。

```
\```dataview
Table without id
	title as 文章标题,
	categories as 分类,
	tags as 标签,
	date as 创作时间,
	file.link as 链接
from "content/post"
where file.name != this.file.name
sort file.mtime desc
\```
```

检索`content/post`文件夹下的文章，展示其元数据。

### 📰一键发布

一键发布分下面两种情况，实际操作流程一样。

#### 🔑自动部署到 Vercel

部署到 Vercel 的话，需要整个网站目录是 git 仓库，利用 Obsidian Git 插件将仓库`push`到 Github，再利用 GithubAction 实现自动编译，并把 public 目录添加到 gh-pages 分支。参考—[这篇文章](https://blog.zhangyingwei.com/posts/2022m4d11h19m42s28/)

需要在网站根目录创建`.github/workflows`目录，新建一个`main.yml`文件，写入以下内容：

```yaml
name: blog deploy pipline
on:
    push:
    tags:
        - '*'
    branches: [ main ]
 
env:
    REGISTRY: ghcr.io
    IMAGE_NAME: ${{github.repository}}

jobs:
    build:
        runs-on: ubuntu-latest
        concurrency:
            group: ${{github.workflow}} - ${{github.ref}}
        steps:
            - name: checkout
              uses: actions/checkout@v2
              with:
                submodules: true
                fetch-depth: 0
            - name: setup hugo
              uses: peaceiris/actions-hugo@v2
              with:
                hugo-version: '0.92.0'
                extended: true
            - name: build
            run: hugo --minify
            
            - name: deploy
            uses: peaceiris/actions-gh-pages@v3
            if: ${{github.ref == 'refs/heads/main'}}
            with:
                github_token: ${{secrets.GITHUB_TOKEN}}
                publish_dir: ./public

```

Github Action 检测到 main 分支新的 Push，将 main 分支自动编译成网页文件到`public`文件夹。并将 `public`文件夹同步到`gh-pages`分支。Vercel 部署`gh-pages`分支。

在 obsidian 中使用 Git 插件，执行 `git commit`和 `git push`。（可以用 QuickAdd 或者 Commander 插件将这两步骤创建宏。）

再用 Commander 插件将命令按钮添加到喜欢的位置。

#### 🗝自动部署到服务器

同样使用 git，但部署服务器只需要 `public` 目录作为 git 仓库。

根据《[基于Hexo的静态博客网站搭建并部署至云服务器](https://www.glimound.com/build-hexo-blog/)》这篇文章教程，服务器创建 Git 仓库后，本地与服务器连接也正常后，进行下面的步骤。

先删除网站目录的 public 文件夹。

在博客网站的根目录打开`git bush`，执行下面命令把服务器 Git 仓库`clone`到网站`public`目录。

```bash
git clone git@***.***.***.***:/home/repo/blog.git public
```

> 后面是你之前配置的仓库位置。

`clone` 下来后，执行`hugo -D`编译网站，再`cd public`到 `public` 目录。

```bash
git add .
git commit -m "update"
git push
```

一套操作下来，将本地编译好的`public`文件夹 push 到远程服务器仓库。

> ❗前提是正确配置钩子，同样参考上述文章。

push 成功，钩子会将你 push 的 public 文件夹内容`clone`到你设置的网站目录。

域名，代理，都正确的话，很快你就能访问域名看到博客的更新了。

步骤是不是还是很繁琐，自动化一下就好。

回到 Obsidian。

同样是 Git 仓库，但是 Git 插件 Git 仓库是 Obsidian 库，这个步骤的 Git 仓库是 public 文件夹，所以就不使用 Git 插件，换用`shell Commands`插件。

> ❗设置 shell 的工作目录是网站目录路径，也就是 obsidian 库根目录。

添加`shell`命令。

```shell
hugo -D && cd public && git add . && git commit -m "update" && git push && cd ..
```

> 这段命令首先`hugo -D`编译网站，然后转到 `public`文件夹，运行 git 发布三部曲。在`cd ..`回到网站根目录。

到此，完成，博客一键发布。

#### 🥽Vercel，服务器同步发布？

可以，因为两种方式都使用了 Git，可以直接用 shell command 插件写命令，先 `hugo -D`，发布到服务器，再将整个仓库 push 到 github，也可以用 QuickAdd 的宏，或者 Commander 的宏将两个步骤连起来。

#### 🎯上述用到的插件和其他推荐

1. Banners：主页的头图
2. Buttons：页面内添加按钮
3. Commander：给 Obsidian 不同位置添加快捷按钮。上述
4. Dataview：文章列表管理
5. Easy Typing：中文输入体验优化
6. Homepage：给 Obsidian 添加一个主页
7. Latex Suite：Latex 公式输入体验优化
8. Linter：文件自动格式化
9. Paste image rename：图片重命名
10. QuickAdd：给各种操作一个快捷指令
11. Shell commands：在 obsidian 使用 Shell 指令
12. Sortable：让 Dataview 点击表头改变排序
13. Git：Obsidian 内快捷使用 Git，可以用 Shell commands 替代

## 🎭第四阶段——一些有趣的小功能

### 💭评论

评论组件有很多，下面是 stack 内置支持的评论组件。

- [Cactus](https://cactus.chat/)
- [Cusdis](https://cusdis.com/)
- [Disqus](https://disqus.com/)
- [DisqusJS](https://github.com/SukkaW/DisqusJS)
- [Giscus](https://giscus.app/)
- [Gitalk](https://github.com/gitalk/gitalk)
- [Remark42](https://remark42.com/)
- [Twikoo](https://twikoo.js.org/)
- [utterances](https://utteranc.es/)
- [Vssue](https://vssue.js.org/)
- [Waline](https://waline.js.org/)

大部分都需要登录，对于路过游客比较不方便，所以我用的 [Twikoo](https://twikoo.js.org/),配置过程可以直接上官网查看，官网配置过程十分详细，提供了多种部署方式。

我使用 docker 将他部署在了服务器上。分配了个子域名。

### 🗨页面添加Memos

参考—[基于 Memos 实现说说和清单功能](https://blog.leonus.cn/2023/memeos.html)，脚本内容可能是 memos 的更新有些错误，做了一些修改，外观样式也做了一些魔改，更符合 stack 主题。方式如下：

在`layouts/partials/widget`文件夹下新建一个 memos.html 文件，粘贴如下内容。样式脚本都包含在这个文件内。

下面脚本里的网址都换成自己的 memos 域名。

```html
<style>
  /* 页面初始化 */
  div#memos {
    background: none;
    border: 0;
    padding: 0;
    overflow: auto;
    scrollbar-width: none;
  }
  .memos_item {
    background: var(--card-background);
    box-shadow: var(--shadow-l1);
    transition: all 0.3s ease-in-out;
    border-radius: 15px;
  }
  /* 页面初始化结束 */
  #memos {
    margin-top: 0rem;
  }
  #memos .loading {
    color: var(--card-text-color-main);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  #memos .loading img {
    width: 200px;
  }
  .memos_item {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-bottom: 15px;
  }
  .memos_bottom {
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 1.5;
  }
  .memos_bottom {
    justify-content: space-between;
  }
  span.memos_date {
    color: var(--card-text-color-main);
    opacity: 0.6;
  }
  .memos_content {
    color: var(--card-text-color-main);
    line-height: 1.5;
  }
  .zone_imgbox {
    display: flex;
    flex-wrap: wrap;
    --w: calc(25% - 8px);
    gap: 10px;
    margin-top: 5px;
  }
  .zone_imgbox a {
    display: block;
    border-radius: 12px;
    width: var(--w);
    aspect-ratio: 1/1;
    position: relative;
  }
  .zone_imgbox img {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    object-fit: cover;
  }
  /* 底部 */
  .memos_bottom {
    opacity: 0.9;
  }
  .memos_bottom .icon {
    color: var(--card-text-color-main);
    float: right;
    transition: all 0.3s;
  }
  .memos_bottom .icon:hover {
    color: #49b1f5;
  }
  .memos_content > a {
    margin: 0 3px;
    color: #ff7d73 !important;
  }
  .memos_content > a:hover {
    text-decoration: none !important;
    color: #ff5143 !important;
  }
  /* 提醒 */
  .limit {
    transition: all 0.3s ease-in-out;
    color: var(--card-text-color-main);
  }
  .limit {
    display: none;
    text-align: center;
    margin-top: 20px;
    color: var(--card-text-color-main);
  }
</style>

<h2 class="section-title" style="margin: 0;">MEMOS</h2>
<div id="memos">
  <div class="loading">加载中。。。</div>
</div>
<div class="limit">- 只展示最近10条MEMOS -
  <br><a href="https://memos.morick66.com/explore">- 查看更多 -</a>
</div>
<script>
  if (1) {
    let url = "https://memos.morick66.com";
    fetch(url + "/api/v1/memo?creatorId=1&tag=blog&limit=10")
      .then((res) => res.json())
      .then((data) => {
        // 注意修改域名和用户id
        let items = [],
          html = "";
        data.forEach((item) => {
          items.push(Format(item));
        });
        if (items.length == 10)   document.querySelector(".limit").style.display = "block";
        items.forEach((item) => {
          html += `
          <div class="memos_item">
            <div class="memos_content">${item.content}</div>
            <div class="memos_bottom">
              <div>
                <span class="memos_date">${item.date}</span>
              </div>
              <a href="${url}/m/${item.name}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                </svg>
              </a>
              </div></div>`; // 注意修改头像链接和名称
        });
      document.getElementById("memos").innerHTML = html;
      });
    // 页面内容格式化
    function Format(item) {
      let date = getTime(new Date(item.createdTs * 1000).toString()),
        name = item.name,
        content = item.content,
        imgs = content.match(/!\[.*\]\(.*?\)/g),
        text = "";
      if (imgs)
        imgs = imgs.map((item) => {
          return item.replace(/!\[.*\]\((.*?)\)/, "$1");
        });
      if (item.resourceList.length) {
        if (!imgs) imgs = [];
        item.resourceList.forEach((t) => {
          if (t.externalLink) imgs.push(t.externalLink);
          else imgs.push(`${url}/o/r/${t.name}`);
        });
      }
      text = content
        .replace(/#(.*?)\s/g, "")
        .replace(/\!?\[(.*?)\]\((.*?)\)/g, "")
        .replace(/\{(.*?)\}/g, "");
      content = text.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">@$1</a>`);
      if (imgs) {
        content += `<div class="zone_imgbox">`;
        imgs.forEach(
          (e) =>
            (content += `<a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}">
              <img class="no-lazyload" src="${e}"></a>`)
        );
        content += "</div>";
      }
      return {
        content: content,
        date: date,
        name: name,
        text: text.replace(
          /\[(.*?)\]\((.*?)\)/g
        ),
      };
    }
    // 页面时间格式化
    function getTime(time) {
      let d = new Date(time),
        ls = [
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate(),
          d.getHours(),
          d.getMinutes(),
          d.getSeconds(),
        ];
      for (let i = 0; i < ls.length; i++) {
        ls[i] = ls[i] <= 9 ? "0" + ls[i] : ls[i] + "";
      }
      if (new Date().getFullYear() == ls[0])
        return ls[1] + "月" + ls[2] + "日 " + ls[3] + ":" + ls[4];
      else
        return (
          ls[0] + "年" + ls[1] + "月" + ls[2] + "日 " + ls[3] + ":" + ls[4]
        );
    }
  }
</script>
```

然后到主题配置文件，引用一下新建的小部件。

```yaml
  widgets:
    homepage:
      - type: search
      - type: memos  #新添加的
```

实现的效果

![](https://images.morick66.com/post/2420240321130301.png)

右下角链接可以跳转到 memos 页面。

如果有需求，可以把 twikoo 也嵌入 memos 页面。

参考木木大佬的文章[Memos x Twikoo](https://immmmm.com/memos-with-twikoo/)

### 🔬软件&装备页面

参考空白大佬的[网站源码](https://github.com/koobai/blog/tree/main)并配合自己的主题进行样式修改。

关于这种添加侧边栏页面的操作，需要在 `content/page`文件夹下新建文件夹，新建的文件夹里创建一个`index.md`文件。

```yaml
---
title: 装备
description: 个人使用的装备
slug: equipment
layout: equipment
menu:
    main:
        weight: -80
        params:
            icon: laptop
comments: false
equipment:
    - title: 汉王Clear7
      image: clear7.png
      note: 我的第一本电纸书阅读器
      link:
---
```

`layout` 属性是指引用哪一个布局文件，存放在`layouts/_default`文件夹下。

```html
{{ define "body-classes" }}page-equipment{{ end }}
{{ define "main" }}
<!-- 装备页面 -->
<!-- 调用引用这个layout的页面的yaml数据 -->
{{ $equipments := .Params }}
<div class="section-card">
  <div class="section-details">
      <h3 class="section-count">{{ T "list.page" (len .Pages) }}</h3>
      <h1 class="section-term">{{ .Title }}</h1>
      {{ with .Params.description }}
          <h2 class="section-description">{{ . }}</h2>
      {{ end }}
  </div>
</div>
<div class="equipment">
  {{ range $equipments.equipment}}
  <div class="equipment-card">
    <div class="equipment-img">
      <img loading="lazy" decoding="async" src="{{ .image }}" />
    </div>
    <!--<a href="{{ .link }}" target="_blank"><div class="details">{{ .details }}</div></a>-->
    <div class="equipment-text">
      <div class="equipment-title">
          {{ .title }}
      </div>
      <div class="note">{{ .note }}</div>
    </div>
    {{ if .link }}
    <div class="link">
      <a href="{{ .link }}" target="_blank">查看文章</a>
    </div>
    {{ end }}
  </div>
  {{ end }}
</div>
{{ partialCached "footer/footer" . }}
{{ end }}
```

再给页面添加 CSS 样式，可以直接在`assets/scss`目录下新建一个 scss 文件，记得在 style.scss 导入新建的样式文件，也可以直接写在 `custom.scss`文件中。

```css
// equipment装备页样式
.equipment {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--section-separation); /* 中间空10px间距 */
    @include respond(2xl) {
        grid-template-columns: repeat(4, 1fr);
        gap: var(--section-separation); /* 中间空10px间距 */
      }
}
.equipment-card {
    position: relative;
    background: var(--card-background);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    .equipment-img {
        width: 100%;
        display: inline-block;
        margin: 0 auto;
        img{
            display: block;
            margin: 20px auto;
            width: 100%;
            @include respond(2xl) {
                max-width: 60%;
            }
        }
    }
    .equipment-text {
        color: var(--card-text-color-main);
        .equipment-title{
            margin-bottom: 10px;
            font-size: 2rem;
            font-weight: bold;
            @include respond(2xl) {
              padding: 0;
            }
        }
        .note {
            font-size: var(--article-font-size);
            color: var(--card-text-color-secondary);
        }
    }
    .link a {
        display: none;
        color: var(--accent-color-text);
        font-size: 12px;
        border-radius: 12px;
        padding: 8px 10px;
        background-color: var(--card-button-color);
        width: max-content;
        position: absolute;
        top: 15px;
        right: 20px;
    }
}
.equipment-card:hover {
    .link a {
        display: block;
    }
}
```

### ⭕加载界面

网页切换之间的加载页面。参考—[为网站加入Loading加载页](https://marsgrid.com/post/a09_loading/)

## 💟第五阶段——无止尽的主题折腾

因为我自己主题修改的很零散，代码很丑陋，并且直接在主题文件中修改。大部分主题文件都被我修改过内容，直接放弃后期的主题更新，冗余代码很多，如果有需要问的，可以评论区讨论。一些主题美化文章请看下一节的参考文章。

## 📑参考

包括但不仅限于：

1. [Memos x Twikoo](https://immmmm.com/memos-with-twikoo/)
2. [空白](https://koobai.com/)
3. [基于 Memos 实现说说和清单功能](https://blog.leonus.cn/2023/memeos.html)
4. [hugo stack 主题美化](https://yelleis.top/p/61fdb627/)
5. [为网站加入Loading加载页](https://marsgrid.com/post/a09_loading/)
6. [使用 Hugo 进行持续集成写作及同步](https://www.jianshu.com/p/bfa6575b6057)
7. [Twikoo 腾讯云函数部署转移到私有部署 | 张洪 Heo]( https://blog.zhheo.com/p/99d020fe.html )
8. [使用 Obsidian 免费建个人博客](https://zhuanlan.zhihu.com/p/673413550)
9. [Hugo 博客写作最佳实践](https://blog.zhangyingwei.com/posts/2022m4d11h19m42s28/)
10. [基于 Hexo 的静态博客网站搭建并部署至云服务器]( https://www.glimound.com/build-hexo-blog/ )
11. [Hugo 博客部署到阿里云服务器](https://shaohanyun.top/posts/env/hugo_aliyun/)
12. [（3）Stack主题的自定义](https://blog.linsnow.cn/p/modify-hugo/)
13. ...

## 结语

> - 本人技术小白，如果文章中有错误，恳请指正。
> - 文章中大部分参考文章均已贴出链接，或许有遗漏，再次找到出处后会及时补上，请谅解。
> - 如果遇到问题，欢迎评论。
