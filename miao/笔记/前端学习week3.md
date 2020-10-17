---
title: 前端学习week3
date: 2019-05-18 12:01:03
reward: false
comments: true
tags:
- front-end
- css
mathjax: false
---

本周开始学习css的布局基础知识，基本视觉格式化从盒模型入手，介绍了块元素的盒模型及基本概念，水平方向和垂直方向的规则和要点很多，注意水平方向的width总和和垂直方向的margin折叠学习这些内容能方便预测页面中的基本布局，之后学习了背景图片的一些技巧和sprite图应用，接着是基本布局之一的定位，最后是行内元素的结构，注意行内框，行框，line-height的关系，内容很多很杂，需要梳理。

<!-- more -->

##  基本视觉格式化

###  盒模型

- 所有元素都有盒模型，只不过行内元素的宽高上下外边距设置无效

- 无法通过元素的margin box部分与此元素交互

- padding/border不能为负值

- 只有width/height/margin可以设置为auto

- box-sizing 默认为content-box 建议设置为border-box

- 利用border的特性使用css画出多种几何图形

  <http://www.webhek.com/post/40-css-shapes.html>

- border默认为前景色

  即文本的颜色

- 包含块：最近的块级祖先

- 常规流normal flow

#### 水平属性

- 内容，左右外边距可以设置为auto

- 块级元素框水平总和等于父元素内容区width(**不是width属性的值！！**) 百分数也是

- 水平方向外边距不会折叠

- 没有auto

  过分受限会把margin-right强制为auto(与文本书写方向有关)

- 一个auto

  根据父元素计算出值

  只有margin-left为auto时，不能计算出负值，会自动置0，负值给margin-right

- 两个auto(margin-left/right,width)

  - margin-left/right

    元素在父元素中居中

  - margin/width

    设置为auto的外边距为0

- 三个auto

  两个外边距会被设置为0

- 替换块级元素的宽度为auto时则为内容的固有宽度

- 边框宽度不能用百分比表示

- 利用min-width/max-width属性

####  垂直属性

- 浏览器渲染规则：**自上而下，自外而内，静态渲染，一次到位**

- 默认高度由内容决定

- margin-top/bottom都为auto时会自动设为0，不会居中

- height必须设置为auto或者非负值

- 常规流中，margin/padding的水平和垂直方向的百分数值都是基于包含块的内容区width计算的

- 若包含块height设置为auto且高度由内容撑大，子元素height设置的百分数会失效

  特殊情况：包含块只设置了`min-height`，有高度但子元素高度百分比依然无效

  解决方法：

  - 将包含块设置具体高度
  - 包含块的高度不由子元素撑大，例如子元素设置为绝对定位

- **外边距折叠** 

  只在垂直方向

  保留两者中较大的外边距 

  负margin和正margin相遇时两者相加得到新的外边距

  两个负margin重叠也只保留绝对值较大的

  多个margin接触时，正与负分别合并，最后正与负求和

- 常规流块元素没有边框和内边距且只包含块元素时，包裹子元素的 border-box，父子元素的margin会合并，但触发了BFC的元素，无论如何都会内容区包裹子元素的margin-box，父子元素的margin也不会合并

- **BFC**

- 列表项

  块级元素

- 隐藏元素

  - visibility: hidden 元素不可见，不可交互，但是仍占据布局中的位置
  - opacity: 0 元素透明，但是可交互
  - display: none 元素从布局中完全消失

### 颜色和背景

- 背景不继承

- 背景图片无法直接复制

- 背景颜色默认在border以内的区域包括border

- 背景图片：

  - background-repeat

  - background-size

    元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括**外边距**。

    以background-origin为基准 ，默认为padding-box，即背景图像一定是从padding开始摆放，如果不使用no-repeat，则背景图像会覆盖至包括边框

    - cover

      图片由无穷大等比缩小到正好覆盖元素

    - contain

      与cover相反

    - object-fit 

      img/video的属性

  - background-attachment

    - fixed

      相对于视口定位。

      可产生特殊的效果

  - background-position

    值可以写关键字，配合数值

    百分比：位置为box的百分比对准图片的百分比位置，注意图片比窗口大的时候增加百分比图片如何移动？

  - background-clip

### 定位

- position

  - static 默认

  - fixed

    相对视口

    上下/左右margin设置为auto可以居中

    默认位置为原先在常规流中的位置

  - relative

    相对自己原来的位置

    常规流会保留原来的位置

  - absolute

    相对定了位的最近祖先的padding-box(无定位祖先则相对第一屏)

    宽度未设置时，最大到包含块的border，最小为一个单词长度，可设置white-space使不折行

  - sticky

    不会离开包含块，结合了relative和fixed 的特性

  - z-index

    默认0，后盖前

    祖先后代都定位时，后代的z-index失效

- transition

  过度动画

  cubic-bezier

  - 与visibility组合时，注意visibility只要离开hidden状态就会visible，并不是渐变

### 行内元素

- 垂直方向内容区相连，有边框的话，边框会重叠显示

- 行内框是由行内元素产生，行框则是一行中所有的行内框构成

- box-shadow是元素折断之后生效，border是折断之前生效，可以利用这个特性为多行文本的每行增加边框

- 行内元素垂直方向margin不影响布局

- line-height值尽量写纯数字，用em容易产生奇怪的结果

- 只要行框形成就不会消失

- 给行内元素增加边框和padding不会影响行内框等布局，初始边框包围内容区

- 替换元素内容区包括外边距

- line-height可视为确定了行框的最小高度

- 将行内元素的`line-height `设置小于normal失效：会假设行内元素旁白会有一个空的匿名文本，行高继承自块元素

- inline原色无padding和border时，其底色区域的高度为当前字体line-height为normal时计算的值，与实际设置的line-height无关

- 替换元素line-height属性无效

- vertical-align的百分值是根据line-height计算

- 当包含块中只有行内替换元素时，例如只有一张图片，行框的计算要加上图片的行内款和相邻**空白节点**的行内框(假设改行有匿名文本)

#### 视觉格式化流程

1. 按照以下步骤确定行中各元素行内框以及高度：
   1. 获取各行内非替换元素及不属于后代内元素的所有文本的 `font-size`值和 `line-height`值， `line-height`和 `font-size`差值为行间距值。
   2. 获取替换元素高度及上、下外边距，上、下内边距，上、下边框值相加。
2. 对于内容区，需要确定各元素、匿名文本以及该行本身基线的位置，将其基线对齐。对于替换元素，需要底边放置该行基线上。
3. 对于指定 `vertical-align` 值的元素，确定其垂直偏移量。并改变元素在上方或下方超出的距离。
4. 确定各行内框的具体位置后再进行确定行框。行框高度为最高行内框顶端和最低行内框低端之间的距离。

#### inline-block

- inline-block的元素之间会产生**空格间隙**间隙影响布局，解决方法见：[https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-去除间距/)

  相邻的block元素中间产生匿名空格，让元素分行即可

- 行内框为margin-box的外边缘

- 基线为最后一行文字的基线/无内容时以margin-box的下边缘为准

- 替换元素设置为`display:inline`无效，会被当做`inline-block`

- inline-block的基线会影响布局，其基线取决于元素本身的特性，在该元素中没有行内子元素（注意是DOM树的子元素，有块子元素不算或者块子元素中有行元素这个行元素算）的时候或者overflow不为visible，该inline-block的基线为margin-bottom的下边界。否则，以该元素中最后一个行框子元素的基线为该元素的基线。

  - 假设两个inline-block并列，第二个又嵌套了一个inline-blok，会怎样布局

    解答：按照上面的规则，inline-block的基线为margin-box的底部，第二个inline-block的基线变成被嵌套的inline-block的基线，所以第一个和被嵌套的底端对齐。

  



#### 匿名盒子

匿名文本看作被包含在匿名盒中继承父元素属性

匿名块盒子

- 如果有多个块盒子，而它们中间又没有行内元素，则会在这些盒子的前面和后面创建两个匿名块盒子
- 如果块容器盒里面有一个块级盒，那么我们强制让它里面*只含有*块级盒
- 匿名盒子无法被选择器选中，可继承的属性都为inherit，不可继承的为initial

匿名行内盒

- 任何被直接包含在一个块容器元素中（不在行内元素里面）的文本，必须视为一个匿名行内元素
- 不分行的就是行内盒，因为内部分块的叫块盒

块容器盒

- 该元素的直接子元素只能是块级盒，或只能是行内级盒

### 零碎知识

- ```css
  * {
      background-color: rgba(0, 0, 0, 0.08);
  }
  /*练习时css预写能方便看到各元素区域*/
  ```

- 伪元素可看作该元素的元素
- 伪元素不能交互
- 改变分隔线hr的颜色

- ```css
  hr {
      /* 如何改变hr的颜色 */
      background-color: rgb(211, 213, 213);
      border: none;
      height: 1px;
  }   /* 直接改变border-color会变成2px高度，因为有上下两边框  */
  ```

- 设置html的width为100vw是包括滚动条的，设置为100%则不包括，默认即为100%

  html默认的overflow为auto  

  **而要设置块元素height100%显示，必须设置其包含块的height，否则无效**