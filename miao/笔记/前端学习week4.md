---
title: 前端学习week4
date: 2019-05-23 22:27:05
reward: false
comments: true
tags:
- front-end
- css
mathjax: false
---

​	学习时间一个月了，到了一个结点，css2.1的规范学习也结束，下周将开始css3的学习。先回顾一下上周的知识：上周的重点是盒模型，行内元素以及行内块元素的规则，还有定位布局，注意文本的一些属性在不同的元素下表现形式会不一样，例如对齐规则在表格中就相对直观简单。本周主要学习了另外两种原始的布局方法：表格，浮动。表格需要注意的是表层和边框优先级的规则顺序：td>row>col>table。浮动摆放位置的规则和清除浮动以及闭合浮动的概念和方法。

<!-- more -->

#### 元素居中方法

##### inline

- 水平方向`text-align: center`即可

- 垂直方向

  - 使用伪元素

    - ```css
      .inline::after {
          content: "";
          display: inline-block;
          height: 100%;
          vertical-align: middle;
      }
      ```

    - 原理：画个图就明白了，`vertical-align: middle`的意思是使元素的中部与父元素的基线上的x中部对齐

  - 可以利用表格的对齐特性

    - ```css
      display: table-cell
      vertical-align: middle
      ```

  - 多行文本垂直据中

    - ```css
    div {
      	min-height: 150px;
      	line-height: 150px;
      }
      
      span {
      	display: inline-box;
      	line-height: normal;
      	vertical-align: middle;
      }
      ```
    
  
  - 图片和文字排列时垂直居中，使图片和文字均为行内元素且设置为`vertical-align: middle;`即可

##### 绝对定位居中

- ```css
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ```

见：[https://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/](https://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-绝对定位-水平垂直居中/)

原理：**当一个绝对定位元素，其对立定位方向属性同时有具体定位数值的时候，流体特性就发生了**，即元素的外边距会扩大或缩小以适应父元素或画布的实际大小

 过分受限自动填充父元素可用尺寸，注意正常流的`margin:auto`不能使垂直居中，而绝对定位中可以

##### flex

子元素`margin: auto`或调整父元素的`justify-content`和`align-items`

##### transform

利用`transform: translate();`和`position: relative` 百分值的特性

唯一一种子元素大于父元素也能居中的方法







#### 表布局

- visibility中的collapse只对表格中的列生效，且列或列组的visibility只有这一个声明，整列隐藏。

- 匿名表对象

  浏览器会自动补全遗漏的表格组件，可利用这个特性故意省略table，会自动补全一个`<div class="table">`，可以给表格增加滚动条

- caption视为块级元素

- 合并单元格边框

  表宽度是指两边框中线的距离

  次像素 subpixel

  边框优先级和表层的优先级是一样的，另外hidden优先级最高，none优先级最低，粗>细，上>下，左>右

- 表层

  所有颜色背景初始都是透明的，按顺序叠放，透过外层透明背景可以看到里层背景，td最高，table最低

- 表大小

  - 高度永远自动计算

  - 宽度

    - 固定布局

  - 自动布局

    表格及单元格宽度由其包含的内容决定，要在整个表格后加载解析完成之后才能最终确定，如果某行的列宽和前面的不一致，则之前绘制好的行也必须重新绘制

  - table-layout 

    默认为auto即自动布局，使用fixed值时表格第一行渲染即确定单元格宽度，可以加速渲染

  - 单元格width为百分比：参考<https://csspod.com/table-width-algorithms/>

    例：设置成1%？

  - 对齐

    - vertica-align: middle

      单元格内容中间对齐，可利用这个特性实现垂直居中

    - base-line

- col无法使用hover伪类，可以使用伪元素利用表层特性实现行列高亮

#### 回流和重绘

<https://www.cnblogs.com/chenjg/p/10099886.html>

- reflow/relayout

  页面样式变化涉及重新计算布局

  尽量不要触发回流，控制在一定范围内

- repaint

  页面样式变化不涉及计算布局，只改变颜色背景阴影等

**回流一定会触发重绘，而重绘不一定会回流**

#### IE hack

条件注释



#### 浮动

- 可用来清除图片间的空隙

- 包含块是最近的**块级**祖先

- 给行内元素设置浮动会变成块元素

- 块元素会忽略浮动元素布局，但是行内元素会环绕浮动渲染

- 浮动不会影响前面块元素的布局

- 浮动框没有空间会向下向左滑动

- 朋友圈照片布局优化，调整`li`的数量观察效果

  `li:first-child:nth-last-child(3)`

- 浮动和定位组合，只有`position:relative`生效，其他情况只有定位生效

- 浮动元素不会重叠

  垂直方向不同包含块的浮动元素也不会重叠

  水平方向的不同包含块的浮动元素会冲叠
  
- 浮动的负magin浮动块中内容的位置不会影响浮动布局盒子的位置，有点像定位中的relative。但是会改变布局盒子的大小，而浮动块的内容位置也是相对布局盒子的位置，当浮动布局盒子宽度为0时，位置会变为前面块元素的末尾，此时浮动块元素可以重叠，具体例子参见淘宝的双飞翼布局<https://www.cnblogs.com/langzs/archive/2013/01/27/taobaoshuangfeiyi.html>

##### 清除浮动

- 清除浮动

  - `clear` 块级 让块框下移，使两边没有浮动元素
  - 触发BFC，若块级元素在两个浮动之间，则变窄

- 闭合浮动

  块框高度增大使包含其浮动的后代元素，

  - 触发BFC：

    - overflow 除visible以外的值
    - display: inline-block/table-cell/table/flow-root;
      position: absolute/fixed;
    - float
    - position: absolute/fixed

  - 末尾使用一个行元素生成行框使其撑高

    缺点：会有不需要的一段高度

  - 末尾使用一个块元素`clear:both`使撑高，br亦可

    优化：可使用after伪元素<http://www.iyunlu.com/view/css-xhtml/55.html?tdsourcetag=s_pctim_aiomsg>
    
  - 常用示例：
  
    - ```css
      div::before,
      div::after {
          display: table;
          content: '';
      }
      div::after {
          clear: both;
      }
      ```

#### 列表

- 浏览器大多使用padding来实现列表项缩进，所以可以改变padding来调整缩进
- list-style-type属性会继承，但是用户代理的可能对样式表有定义。

#### 计数器

- counter-reset

- counter-increment

  浏览器第一次使用时会reset

- 伪类中:content: counter(name)

- 计数器可以定义列表样式：counter(name, list-styletype)

- counters(name, ".")

  老计数器追加新计数器，并用 . 连接

- 计数器有作用域，counter-reset确定了计数器的作用域

#### 零碎知识

- p标签内不能写块元素，遇到块元素标签直接闭合

- 行内元素不能包含块元素，也会直接闭合

  - 这是旧标准的说法，新的html5中删去了block和inline的概念，能否嵌套应当查看元素的categories和content model

- 伪元素生成的内容无法选中

- `all: initial`将所有属性还原默认值

  例：用于去除`inline-block`间的间隙
  
- ```css
  html {
  box-sizing: border-box;
  }
  
  *,
  ::after,
  ::before {
      box-sizing: inherit;
  }
  ```

  将所有元素设置为border-box的优化写法
  
- opacity不继承

- 圣杯布局和双飞翼布局区别

  - 圣杯布局：借助的是其他非主要元素覆盖了其父元素的padding值所占据的宽度，同一个杯子，非主要元素其只是占据了全部容器的padding值部分；

  - 双飞翼布局：给主要部分main-wrap添加一个外层元素main，其他非主要元素所占据的空间是主要部分(main-wrap)的margin空间，像鸟的两个翅膀，与主要部分main脱离

  - 双飞翼布局多了一个DOM节点，但是布局也更稳定