---
title: 前端学习week5
date: 2019-06-01 16:51:07
reward: true
comments: true
tags:
- front-end
- css
mathjax: false
---

​	本周学习了CSS3中的一些新属性，本周有三个重点，1. 媒体查询：主要应用于移动页面的自适应，理解设备像素和CSS像素(设备独立像素)的区别和关系。2. flex布局，flex的使用大大简化 了很多复杂页面布局的工作量，细节也相对较少，`display: flex`的元素自动升级为块元素，而内容item则没有行内和块元素之分，可以理解为结合了浮动和inline-block的特性。 3. @font-face规则，利用这个规则可以引入字体图标，可以减少图片资源的加载还能自定义字体名字。

<!-- more -->

### CSS3

#### media query

- 使用媒体查询的三种方式

- CSS内的媒体查询不影响选择器优先级

- DPR  device pixel ratio

  physical pixel / css pixel

  单位： DPI  DPCM DPPX(常用)  D: dot

- `<meta name="Viewport" content="width=device-width">`

  让手机浏览器以设备屏幕宽度的初始包含块渲染页面，不设置一般是1000左右，仅支持移动端

  width后设置的是设备渲染的css像素宽度，不用写单位

  css像素也叫做设备独立像素(device-independent pixels (dips))

  [http://www.ayqy.net/blog/%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3px-dpr-dpi-dip/](http://www.ayqy.net/blog/完全理解px-dpr-dpi-dip/)

- 手机上缩放页面永远不会回流，用户缩放的时候css像素(例如width)是不变的，只是改变了DPR

- 移动端布局

  一般两种情况：

  - 页面在不同设备上显示比例一致
    - 使用vw单位
    - 使用` meta viewport`标签定宽
    - 以上旧版浏览器不支持时，使用rem单位，用js获取视口宽度，使用`100vw/(dips页面宽度)`作为1rem的大小`html {font-size: 100vw/x}  x为逻辑页面大小`，但要注意字号大小小于12px时会被浏览器强行重置为12px，所以需要将单位放大至12px以上，相应的rem使用时缩减相应倍数
  - 页面在更大的屏幕上显示更多内容
    - `width=devic-width`使用px以及流式布局(块元素自动占满宽度)
  - 混合页面
    - 布局使用rem，文字使用px，`width=devic-width`

#### pseudo-class&pseudo-element

- `:target`伪类：url中含有元素的id的值时选中
- `:not()`伪类中不能出现层级选择器即` > ~ +`以及空格等  **且not伪类在选择器中权重为0，但是not伪类里面的东西参与优先级**
- `::first-letter`伪元素会选中第一个文字字符前的所有符号字符

#### flexible box layout

- `display: flex`声名内部为flex，外部为块  `inline-flex`

- flex-container     

  - flex-direction     设置main-axis
    - column /column-reverse
    - row  默认值
  - justify-content  是item元素main-axis对齐
    - flex-start/flex-end
    - center
    - space-around/space-between
  - align-items  在cross-axis上对齐  **子元素本身在交叉轴的对齐**
    - flex-start/flex-end
    - center
    - baseline
    - stretch  默认值 设置为其他值时则失效
  - align-content 设置行间的空间，与justify-content值相同，只有一行时无效  **子元素整体在交叉轴对齐**
  - flex-wrap  设置cross-axis   发生折行 shrink失效 ，折行时不会发生外边距折叠
  - flex-flow ： direction | wrap

- flex-item

  - flex-basis

    对应行排列时的width或列排列时的height，比较灵活，item的理想大小

    content < width < flex-basis (limited by max|min-width)   **优先级**

  - flex-grow: 对container剩余空间的分配拉伸，若所有item中的值之和不超过1，那还会剩下1减去和的比例部分未分配

  - flex-shrink  缩减对应比例权重使items fit container，默认为1，具体收缩的值为各item初始宽度乘以权重再在多出的宽度下分配，和不足1时与grow类似

  - align-self  交叉轴上的对齐

  - order 顺序默认为0

- 理解flex-item的min-content

  - 看到zxx的文章<https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/>

  - 说一下自己的理解：flex布局自带shrink为1，而flex-item有一个最小内容宽度，一般被子元素的内容撑起，例如只有文本内容且为文本样式为nowrap时，最小内容宽度为最长的单词长度，内容为替换元素图片且未设置图片的宽度时，最小内容宽度即为图片的宽度(DOM结构为container>div>img，div作为flex-item有包裹内容的性质)。当最小内容宽度的和大于container的宽度，此时flex-item也无法再被压缩，表现为溢出。一个有意思的情况是在图片作为item的内容的情况下，当给图片设置`max-width: 100%` ，相当于flex-item的最小内容宽度的限制取消了，此时会依照shrink的规则来对flex-item进行压缩。 

    当图片宽度比容器小的时候设置了`max-width`会怎样：**flex布局可以理解成若item的shrink为0时先将元素按本来属性摆放，再按设置的shrink或grow等其他属性来伸长或压缩**。所以会直接按图片的尺寸摆放
  
- flex container在 column warp时宽度不能被items的内容撑开，可以在末尾使用伪元素来填充剩余的空间使形成完整的矩形

- https://output.jsbin.com/topegiw 利用flex实现自适应的正方形阵列，利用了伪元素的padding百分比值为父元素宽度的特性撑起父元素高度及grow属性实现自适应大小的正方形，增加几个高度为0的正方形元素使当最后一个行未铺满正方形时其大小不会过分拉伸

- 子元素可以用`margin:auto` 实现两端对齐， 设为auto的margin会占用这个方向剩余的所有空间



#### web font

- ```css
  @font-face {
      font-family custom name;
      src: url();
      src: url()  format('embedded-opentype'),   //ie8 above
      		woff
          	ttf ;
      font-style: ;
      font-weight: ;
      unicode-range: ;
  }
  /* custom name可以重复使用，引入斜体粗体等  
     @font-face分开写会造成第版本IE浏览器下加载多个字体请求。*/
  ```

- font-size-adjust:  number

  x的大小缩放

- font-stretch

  需要单独设计的字体文件

- 利用font引入icon

  用图标，符号替代不需要的字符编码作为字体引入 unicode PUA(private user area)  `\f000` 之后，使用类名及伪元素组合可以给图标命名和防止读屏软件读出，

#### svg

#### text effect & typographic styles

- text-shadow
- text-overflow
  - clip
  - ellipsis 超出的文本用(...)表示，只能应用于单行文本
- text-align :start/end

### 零碎知识

- max-width可以设置为none而min-width不可以，可以给min-width设置为0达到想要的效果

- 如何调整`input:text`中placeholder文本的样式

  使用::placeholder伪元素，但是不能调整垂直对齐，因为input内为 替换元素且为单行

- border  outline  box-shadow 区别

  border：占据空间

  outline： 不占空间，只能为矩形，不能圆角，不能模糊，有outline-offset属性，从border外侧开始渲染

  box-shadow：不占空间，形状跟随border，优于outline，从border内侧开始渲染，但是需要方框时可以用outline

  <https://juejin.im/post/591e478b0ce4630069308278>

- FoUT (the Flash of Unstyled Text)

  页面加载时间比引入的样式短，加载到样式时造成页面闪烁

  解决方案：

  - 把首屏的样式写入页面的style标签中
  - 使用link标签放在页面上方而不是@import

- bacground-positon

  百分值是图片水平或垂直方向的百分值位置对应元素的百分值位置

- background-size的cover和contain不是数值属性，不能动画

- background-origin的默认值是padding-box

- 不要忘记为替换元素（比如 img 、 object 、 video 、 iframe 等）设置一个 max-width ，值为 100% 。

- 无法给img等自闭合标签添加伪元素！因为伪元素是子元素