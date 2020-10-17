---
title: 前端学习week1
date: 2019-05-04 09:05:18
reward: false
comments: true
tags: 
- front-end	
mathjax: false
---

一些前端的基本概念，没什么卵用

<!-- more -->

## 基础知识

### 浏览器

常见浏览器内核

- webkit
- blink
- gecko
- trigent

### 二进制

- 模拟信号  

  连续的信号

- 数字信号

  离散的信号

### 图片格式

+ jpg，jpeg
  - 有损压缩，压缩率高
  - 照片

+ png (portable network graphic)

  - 无损压缩
  - 适合有大块相同颜色区域的图像，不适合照片
  - 支持透明(Alpha通道)

+ gif

  + 只有256色(原图小于256色时是无损压缩)
  + 支持透明，但只支持全透明和不透明

+ bmp

  + 无压缩，无损
  + 多种颜色数量的格式
  + 体积大，不适合网页

+ psd

  Photoshop专用格式

+ webp

  + google开发的格式
  + 有损压缩
  + 各方面强过jpg
  + 适合移动端

### 命令行

+ GUI与CLI

  + GUI - Graphics User Interface
  + CLI - Command Line Interface
  + 两者区别只在于形式不一样

+ 概念

  + prompt 命令 提示符

  + 裸命令

    例：pwd 显示当前工作目录

  + pipe

    管道符，将前一个命令的Output作为下一个命令的Input

    例如：xxx | grep abc  过滤出含abc的输出结果

### 编码知识

+ ASCII表

  记忆：10-换行 48-0 65-A 97-a

+ Unicode  通用字符集

  + utf-8 针对Unicode的一种变长字符编码
  
+ BOM

  BOM是用来判断文本文件是哪一种Unicode编码的标记，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。

## HTML

### 嵌套规则

- 树状(递归)结构

### 标签

- 语义化 secmentic

  语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护。

  即：**合适的内容用合适的标签**

- 事实上，即使是有些非自闭合标签（如p，li），在一些情况下也是可以省略结束标签的，**而且，是完全符合html标准的**

  参考

  -  https://www.w3.org/TR/html-markup/p.html
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories

### 缩进 indent

### 属性

- 属性名大小写不敏感，属性值大小写敏感

- 当属性值没有空格和引号等特殊字符时，属性值**完全可以**不用引号包围

- 当属性值有复杂的引号时，考虑转义字符

- 一些通用/全局属性(Global Attributes)

  - id

  - name 标签名，主要用再表单类标签

  - title

  - style 给标签内指定内联样式

  - class

  - data-*  

    html5中新属性，储存页面的私有自定义数据，会被用户代理自动忽略

    例：

    - ```html
      <li data-animal-type="鸟类">喜鹊</li>
      ```

### html entity 字符实体

输入符号时，可能会与标签混在一起

两种转义(escape)格式

- &entityName; 
- &#entityNumber;
- 参考
  - https://dev.w3.org/html5/html-author/charref
  - http://www.w3school.com.cn/html/html_entities.asp
  - http://www.w3school.com.cn/tags/html_ref_entities.html

- 空白字符忽略

  - 用户代理默认忽略文字间**多余一个**的空格，换行符全部忽略

  - 可以用css改变忽略

  - 可以用字符实体让空格不被忽略

    例如`&nbsp;`，但这不是真正的空格

### 常用标签

- html

  只能有一个

- head

  - https://github.com/joshbuchea/HEAD

  - head内的内容不会显示在页面上

  - meta 元信息

  - title标签

    - 仅纯文本
    - 如果不出现在head内会自动移到head
    - 出现多个的话仅第一个生效

  - 页面图标

    也可以不用一个标签设置，浏览器会自动读取网站根目录下的favicon.ico这个文件

- body

  - 如果在body或者html标签的**结束标签之后**又出现了其它的标签，则之前的结束标签就会被认为无效，浏览器会自动添加结束标签

+ base 基准
  - 在标签之前加载的标签不会使用这个基准地址
  - `<base href="页面中所有相对路径的基准地址" target="全局设置页面中所有链接的打开位置">`
    - 必须以**/**即目录结尾，否则会把最后一个/的位置作为基准路径
    - target属性
      - _blank 新标签
      - _self  默认值
      - _parent 父窗体显示
      - _top 顶层窗体显示

- h1-h6

  - 一般页面不超过一个h1
    - seo (Search Engine Optimism)

- p

- a

  - 语义是一个链接

  - 绝对路径

  - 相对路径

  - 空的href连接到当前页面

    - 类似的，img标签的空src属性也连接到当前页面

      https://www.nczonline.net/blog/2009/11/30/empty-image-src-can-destroy-your-site/

  - download 属性 html5

    - 表示点击链接将下载链接对应文件，而不是跳转，下载的文件以download属性的值来命名
    - 只能下载自己网站的资源
    - 这个属性能让点击下载完全由前端实现

- img

  - alt属性 alternate

- span 和 div

  通用标签，是没有语义的标签

###  Git使用

常用命令：

+ git config

+ git init 初始化本地仓库

+ git status 当前仓库状态  -s紧凑显示

+ git add xx 将修改/新文件提交到stage区

+ git commit -m "提交信息" 提交暂存区文件

+ git diff  显示详细文件修改状态，-staged显示暂存区文件改动

+ git log

+ git merge

+ git clone [url]

  git clone https://github.com/libgit2/libgit2 mylibgit 可将本地仓库名改为mylibgit

+ git remote

+ git push/pull  从远程仓库拉取至本地并自动合并(远程仓库是无人值守的，只能快进不能处理冲突)

+ git fetch

+ git checkout  切换至其他分支

+ git branch

+ `https://<username>.github.io/`可以访问到`<username>.github.io`这个仓库里的资源

+ `https://<username>.github.io/<repo_name>`可以访问到`repo_name`这个仓库里的资源

- git cherry-pick -- 遴选 某部分需要的提交
- git rebase  xxx 将当前分支与xxx分支分离的部分断开(并删除)，重建至xxx分支的末端，xxx与此分支合并时直接快进且不用处理冲突(相当于将此分支的几次提交移到了xxx分支最后一次提交之后，直接覆盖)