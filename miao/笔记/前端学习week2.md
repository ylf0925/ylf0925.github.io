---
title: 前端学习week2
date: 2019-05-11 21:30:06
reward: false
comments: true
tags: 
- front-end
- html
- css
mathjax: false
---

​	本周继续学习了html中剩余的常用标签，特别是表单，列表和表格的用法；理解什么是语义化；并进入css的学习，本周的重点是css选择器的种类和优先级，介绍了颜色，长度等数值和单位的用法，以及字体和文本属性的声明。

<!-- more -->

### html 常用标签

- i
  - 语义： 用来表示由于某些原因需要与普通文本区分的文本
- strong  em
  - 语义都为强调，strong更强一些
- pre
  - 块级标签
  - 有预定义格式的文本
  - 标签内文本格式都会保留
  - 与`code`(行内标签)标签配合显示高亮代码
- 列表
  - ol - ordered list
  - ul - unordered list
    - li - list item
  - dl - desciption list
    - dt - description term
    - dd - description description
    - 一个列表项由一个dt和多个dd为一组
    - 一个dt对应多个dd
    - dd和dt是同级元素，不是嵌套关系

### 可访问性

- accessibility - a11y
- internationalizition - i18n
- 各个设备访问/各种人群
- a r i a 属性
  - accessibly rich internet application
  - 和role属性组合使用，提示浏览器当前元素是一个何种视觉元素
  - aria-xxx="yyy" 提示浏览器单枪视觉元素的状态或其他信息

### 表单

- form

  最外层标签

  - 属性

    - action

      表单提交地址

    - target

    - method

      表单提交方式

      - get

        将表单字段拼成querystring

        http://abc.com/?a=1&b=2&c=3

        组合成：表单地址?"name="表单内容1&"name"=内容2&...

      - post

    - enctype

      编码方式

  - input

    - type属性

      - file

        - accept属性组合使用

          - 可以接受的文件类型
          - `<input type="file" name="" id="" accept="image/*,text/*">`
          - MIME Type  媒体类型
          - `<input type="file" name="" id="" accept=".jpg,.png,.gif,.jpeg,.webp,.exe" value="c:/user/xieran/desktop/a.pdf">`

        - multiple

          选择多文件，布尔值

      - hidden

        - 存放一些用户不可见、不可改的数据，在用户提交表单时，这些数据会一并发送出
        - 隐藏的输入域
        - value设置其值
        - name设置名字

      - 不能识别的值一律当text处理

    - 其他属性

      - value
        - datetime-local
          - https://zh.wikipedia.org/wiki/ISO_8601
      - name
        - 很重要，表单提交时，这个域/字段/框/FormControl的名字
        - 同时，在radio和checkbox阵列里，name相同的元素被分在一组里

    - 可以作为内联元素放入label标签

  - button

  - label

    通过for属性连接其他元素或直接嵌套，使文字可互动

  - select

    - option
      - value
        - 选择了该项目后它所属的select元素的值
      - selected
        - 默认被选中
      - disabled
        - 表示该项被禁用
      - hidden
        - 表示该项被隐藏
      - 以上三个属性均无值
    - optgroup // hgroup  colgroup
      - 给option分组
      - 用label属性表示这个分组的名字
      - 无法被选中，只能选择option

  - textarea 

    多行文本输入框

  - fieldset

    字段组，把一组输入域放在一起

    - legend

      只能作为 fieldset 的子元素，用来标识这组输入域的名字





name属性主要用于表单元素 id所有标签都能使用

### map

- “映射”标签
- name属性
- 若设置id属属性，id和name属性值必须一样
- 子元素area

### table 

- tbody 可以多个

  - tr 一行 table row
    - th 表头/居中加粗 table header
    - td table data
      - colsapn 跨行
      - rowspan跨列
      - 不能跨不存在的行列

- thead 表头行

- tfoot 表尾行

- caption 表名

- col/colgroup 设置列的样式

  放在tbody/thead之前，caption之后

- 从上到下，从左到右



### iframe

- inline frame
- 不能省略结束标签，否则之后的内容会被当做fallback后备内容不在页面显示
- name属性
  - _top ,   _parent
  - 自定义
- iframe的跳转也会被浏览器记录





### html5标签

不能用style标签引入css

- progress 进度条
  - https://www.zhangxinxu.com/wordpress/2013/02/html5-progress-element-style-control/

### 语义化

我的理解：应当用机器可读的语义来降低机器处理web内容的难度

- 语义化做的好的页面能方便人与机器理解
  - 可维护性
  - 搜索结果靠前（机器理解）
- 合适内容选用合适标签
- 合适的嵌套
- 元素合适的类名和id名称

标签分类

- 旧
  - 块级
  - 行内
- <https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories>

下面是常见标签语义

- p - 段落
- h1,h2,h3,h4,h5,h6 - 层级标题
- strong,em - 强调
- ins - 插入
- del - 删除
- abbr - 缩写
- code - 代码标识
- cite - 引述来源作品的标题
- q - 引用
- blockquote - 一段或长篇引用
- ul - 无序列表
- ol - 有序列表
- dl,dt,dd - 定义列表



zwj  零宽连字符





### CSS

cascading style sheet

注释不能嵌套

- 层叠

  - 冲突处理
  - 样式继承

- 注意代码规范，减少git diff信息

- 替换元素

  - 没有后代元素/标签/结点
  - 指内容被其他不在文档里的内容替换的

- 非替换元素

- 内容直接出现在标签中间

- 元素显示角色 role display

  - 块级元素 block
    - display 属性可以改变显示方式
  - 行内/行间/内联元素 inline

- 引入html

  - style标签

  - link标签

    - media属性 显示介质

      - all 默认

      - print 打印

        ...

  - 内联样式

  - DOM

- @import指令

  - `@import "xxxx.xx";`
  - 只能出现在开头，可以有多个
  - 树状依赖，导致串行下载

- 选择器

  - 声明的属性和值必须是支持的，否则会被用户代理忽略

  - 标签/元素 类 id

    - id只能是一个单词，中间不能有空格

  - 属性选择器

    - `[xx] {}` 
    - `[href$=".pdf"] {}`以.pdf结尾的href属性
    - `[href$=".pdf" i] {}`以.pdf结尾的href属性，且不区分大小写(case insensitive)
    - `[href^="a"] {}`以a开头的href属性
    - `[href*="abc"] {}`连续出现abc的href属性
    - `[href~="abc"] {}`出现abc单词的href属性
    - 类名以 bs- 开头的元素 
      `[class^="bs-"], [class*=" bs-"] {
        background-color: yellow;
      }`
    - `[lang|="en"] {}`相当于` [lang="en"], [lang^="en-"] {}` 

  - 层级选择器

    - 后代选择器
      - `div p {}`
    - 子元素选择器
      - `div > p {}`
    - 邻接选择器
      - `div + p {}`紧挨div的p  若有多个这样的组合则可选多个
      - `div ~ p {}`div后所有兄弟p

  - 选择器分组

    - `p,div,h1 {};`
    - `*`通配选择符
    - 复合 类选择器
      - `.foo.bar {}`选择foo&&bar

  - 伪类选择器 pseudo class

    - 链接伪类

      - :link

      - :visited 

        安全问题大部分属性无法设置，也无法获取颜色

    - 动态伪类

      - :hover
      - :active
      - :focus
      - 顺序LVFHA

    - 位置伪类

      括号中n一定要写在前面

      - :first-child
        - p:first-child 选择p，且p为第一个子节点
        - p :first-child 选择p里面的所有第一个子节点
      - :last-child
      - :nth-child(1)
        - 若有元素内嵌套多个标签，则嵌套的标签中对应位置也会被选择
      - :not()  单一条件

    - :first-of-type

    - :only-of-type

- 优先级

  从上至下，每有一项加一

  0,0,0,0

  - 内联样式

  - id

  - 类/伪类/属性

    - 元素/伪元素

    优先级一样，后出现的更高

  通配符`*`优先级为0

  连接符 无优先级

  ！important

  - `p {color: red !important;}`
  - 有与important冲突的属性，important都会占上风
  - important比内联样式优先级高

  继承没有优先级，比通配符还小

  同一个选择器内的属性，后出现的生效

  属性的值不会合并

### 值和单位

- 颜色

  - 十六进制表示法 hex

    缩写

  - rgb

  - hsl

- 长度

  - 绝对

    m，cm等

  - 相对

    - px

      为什么：屏幕的总像素数可以由用户指定，与ppi不是一回事

      常用于边框和定位，图像大小

    - em

      最常用

      相对父元素字体大小

    - ex

      字体中x字母一半的大小

    - rem

      font size of the root element

      指相对于根元素，一般是html，的字体大小，常用于web app自适应布局
    
    - vw视口宽度，vh视口高度
    
      视口包含滚动条
    
    - calc

### 字体

- 字体族不加引号 
- font-size默认继承的是父元素的计算值而非书写结果
- font

### 文本属性

- 缩进

- 水平对齐

- 垂直对齐

  适用内联元素

- text-decoration

  - 子元素无法去掉父元素留下的线
  - 线的位置粗细样式都不能指定，解决方案为使用背景图片

 