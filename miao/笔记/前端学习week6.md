---
title: 前端学习week6
date: 2019-06-06 22:30:47
reward: true
comments: true
tags:
- front-end
- css
mathjax: false
---

​	本周继续学习了CSS3的一些重要属性，重点有以下几个：列布局，渐变，2D/3D变换，还有渐变及动画。列布局与flex相比的优势在于实现一些单元素的多列布局，更类似于报纸杂志等文字排版。渐变主要应用于背景图片的颜色渐变，注意与混色模式搭配可以生成一些很有意思的效果。transform，transition及animation搭配生成页面中的动画效果，注意变换是不影响布局的，渲染的元素会默认覆盖在其他正常元素之上，渐变及动画的区别在于渐变是用时间控制，而动画是用帧来控制，且动画可以实现无限循环的动画。CSS3的基本概念的学习到这里应该就告一段落了。

<!-- more -->

### CSS3

#### multiple column 

- `column-count: columns;`将块元素折断
- 不能折断inline-block/inline     图片可以
  - `break-inside: avoid-column;` 可设置不折断
- `column-width`不支持百分比与负值值
- `column-fill: ;`
  - balance 默认
  - auto
- 同时设置`column-count`和`column-width`，前者作为最大列数，后者为每列最小宽度，可以都转化为count，哪个小哪个生效
- `column-gap`  支持百分比
- `column-rule`  列间边框样式，不影响布局

#### border and box effects

- border-radius
  - border-top-right-radius   先垂直方向再水平方向
  - 百分比值/具体数值 大于元素高度或宽度时会等比缩小
  - 百分值分别为高度和宽度的百分比
- border-image

#### opacity & color

- 添加opacity属性会触发图形加速
- 未设置z-index且设置过opacity的图层会盖住其他内容，实际上是渲染成了一张图片

#### gradients

- linear-gradient值生成的是图片 用于`background-image`
- linear-gradient(deg/direction, color1 color-stop, color2 color-stop)  color-stop写像素值是这个color-stop距开始的位置，若这个值小于前一个color-stop则会被重置为前一个的值
- repeating-linear-gradient
- radial-gradient
- conic-gradient

#### transformations

- 2D 

  - transform: func ;

    - rotate()

    - translateX/translateY/translate(X, Y)   取百分值为自身的宽高

    - scaleX/scaleY/scale(X, Y)  value为缩放倍数，负值翻转，坐标轴的刻度也会缩放

    - skewX/skewY/skew(X, Y)  倾斜

    - matrix(a, b, c, d, X, Y)  坐标变换 ，前四位矩阵，后两位平移

      [https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/)

    - 不影响布局，但是会盖住其他元素

    - 渐变时若函数名和数量相同，则每个函数值单独渐变，否则直接变化（未设置的值会被重置为默认值）

    - 平移尽量使用transform，显卡图层直接渲染，速度快 

  - `transform-origin: value;`

    - 不动点

- 3D

  - x-axis向右 y-axis向下 z-axis向外 z-axis随元素旋转变化

  - rotateX/rotateY/rotateZ

  - rotate3d(x, y, z, angle)

  - perspective  景深

    "viewport" 沿z-axis与xoy平面的距离   一般设置为1000px左右

    不能与rotate属性分开写，会覆盖失效，且必须写在第一位否则会被忽略

    单独写在父元素中相当于给每一个子元素增加属性

    值为0或none时相当于不观察该元素，元素投影在父元素上，0和none有一点区别但我不知道为什么

  - scaleZ

  - martix3D

  - `perspective-origin: x, y;`"viewport"原点在xoy平面位置

  - `transform-style: preserve-3D` 更符合实际，用在变换元素的父元素上

  - `backface-visibility: hidden;`更符合实际，使后面元素不可见

#### transition & animation

- transition

  - transition-property 默认为all

  - `transition-timing-function: value;` 距离时间函数

    - ease/linear/ease-out/ease-in-out

    - cubic-bezier(x1, y1, x2, y2)

      应当抽时间好好学习一下贝塞尔函数<https://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/>

    - steps()

  - transition-delay可以为负值，动画直接从中间开始

- animation

  - @keyframes
    - from = 0%  to = 100%
  - animation-iteration-count  迭代次数
    - infinite 
  - animation-direction
    - normal  重复时直接从结束帧跳到开始帧
    - alternate 重复时从结束帧反向播放
  - animation-timing-function
    - steps()
  - animation-fill-mode
    - none / backwards 动画前为0%状态 / forwards 结束时保留100%状态/both
  - animation-play-state: running/paused
  - 实现切片轮播图：
    - <https://tympanus.net/Tutorials/CSS3SlidingImagePanels/?tdsourcetag=s_pctim_aiomsg>



### 零碎知识

- 给body设置`overflow: hidden`不能触发BFC

  原因：`overflow:visible`以外的**块级**元素将创建BFC，**除非该值已经扩散到了视口**。

  <https://segmentfault.com/q/1010000002645174>

- div么有内容，只有width且height为0时，transform-origin为最左侧

- max-content/min-content

  <https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/>

  width属性的值

  min-content的包裹性(块元素绝对定位，浮动，inline-block时的宽度)，max-content使所有内容不这行

- background-blend-mode

- filter

  - blur(  x px) 模糊效果
  
- 一定要记住： 给元素绝对定位或者浮动会使其自动变为block

- 使用transition等变化时最好两边都申明属性，否则可能不出现或出现奇怪的效果

- input:submit/buttom比input:text默认高一点，是因为按下动画

- text-align对最后一行文字无效

- 忽略外层div使鼠标点击穿透： `pointer-event: none;`

- 给**包含块**设置 边框 和 内边距 可以使**子元素**包含在内而不与父元素产生外边距折叠

- 媒体查询不能引入css，也不建议这样做

- `display: content;` 浏览器会将所有将 `display` 设置为 `contents` 的元素从可访问性树]中移除。这会导致该元素及其后续元素不再被屏幕阅读技术访问。

- 布局/位置和其他样式尽量分开处理，CSS组件应当减少受到html结构的影响<https://blog.zfanw.com/css-architecture/>

- 绝对定位的宽高是根据包含块的(content+ padding)的和计算的(不包含border)，与box-sizing无关！！

- [伪元素中怎么添加换行符](https://yio.me/qdkf/269.html)



#### JavaScript 小记

- js中用getElementById.value方法获取的值的运算可以用在末尾加|0的方法使其从string 变为 integer

- Switch case 使用严格比较（===）

  Switching 的细节

  - 如果多种 case 匹配一个 case 值，则选择第一个 case。
  - 如果未找到匹配的 case，程序将继续使用默认 label。
  - 如果未找到默认 label，程序将继续 switch 后的语句。

- 除了空字符串""，其他字符串转化为布尔值都为真

- JavaScript 使用 32 位按位运算数

  JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。

  在执行位运算之前，JavaScript 将数字转换为 32 位有符号整数。

  执行按位操作后，结果将转换回 64 位 JavaScript 数。

