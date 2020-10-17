---
title: 前端学习week16
date: 2019-08-18 21:07:12
comments: true
tags:
- front-end
- javascript
mathjax: false
---

​	本周学习了DOM和事件的操作，内容还是比较多的，DOM的各种属性非常多不可能全部记住，用的时候再查，重点是理解DOM的每一个文本/元素/注释等都是一个节点对象，全局下的document属性指向整个DOM树，同时也是其根节点，令外熟记一些常用的操作。事件方面主要是捕获和冒泡模型，另外定时器也是一个很好用的工具。

<!-- more -->

### DOM

- 根结点document.documentElement
  - HTML文档中根节点是document对象即文档节点，html节点是一个元素节点且父节点是document，document的父节点为null
- 节点对象的nodeTyoe属性，用数字表示节点类型
  - 文本节点是文档中的一段纯文本，是一个对象，不是字符串
- DOM 会为标签之间的空白创建文本节点--空白匿名文本
- nodeName和tagName返回的都是大写的标签名
- nodeValue属性返回文本节点内容的字符串，特性节点的属性值，注释节点的注释内容，其他种类的节点一般返回null
- getElementxxx方法只搜索当前节点的内容，不包括当前节点本身
  - 可以用于document对象，也可以用于element元素对象，用于调用该方法的元素的后代元素
  - getElementsByTagName这样的方法返回的节点列表(NodeList)是动态变化的，内容会随着DOM的修改而变化
    - 若采用正序(for-loop/for-of)遍历的方法删除节点，会发生隔一个删除一个的情况
    - 可以考虑用数组的slice方法使其返回值稳定不变，注意DOM方法得到的都是**类数组**，不能直接使用数组方法
    - 逆序遍历
  - getElementById("idName")
    - 若html文档中存在id属性，文档在渲染时会隐式在全局对象下自动创建一个以id属性名为属性名的全局变量指向这个id属性所处的节点(有点绕，即可以直接用id的属性名做作为节点对象的变量进行操作)(特殊情况：window中已存在该名称的属性和该属性值用作变量名不符合命名规范则无效)
- 标签初始化后property和attribute可能会解绑
  - 在DOM中attribute特指标签的属性，property指的节点对象的属性
- 获取元素节点内容
  - innerText得到的字符串格式受css影响，textContent不受css影响，此外内容是相同的
  - innerText和outerText的返回值是一样的，都是该节点及其后代渲染的文本内容
  - innerHTML 返回标签内的所有内容字符串，可覆写任意内容
  - outerHTML 返回包括该标签及其内部所有内容的字符串， 赋值操作是用等号右边字符串解析出来的元素替换本来的元素
  - 注意文本节点没有上面这四个属性，但是有textContent和nodeValue属性来获取内容
- removeChild方法只能删除节点的**直接**子节点
- 特性节点
  - 特性节点的父节点是null
    - 特性节点是否存在子节点在不同浏览器中不同，所以不考虑
    - 特性是节点对象，但不存在DOM树中
  - node.attributes得到的NamedNodeMap和NodeList一样都是**动态变化**的
  - 在元素节点上操作属性大部分时候比在特性节点上方便，所以特性节点不常用
  - 可以直接读取修改元素节点style属性下的各种样式属性，但注意读取和修改的都是内联样式
  - `data-xxx`形式的属性可以用element.dataset.xxx获取
- selector选择器
  - querySelector()方法，参数是css选择器(可以用伪类，但是不能选择伪元素)，返回匹配的第一个结点，没有匹配返回null
  - querySelectorAll()，返回类数组NodeList，没有匹配返回空的类数组
  - 也是可以用于document对象，也可以用于element元素对象，但是在元素上调用时，选择器中可以包含该元素或其父元素，例如参数为"div div"时，第一个div可能为调用该方法的元素，只要匹配到的元素是其子元素即可(全局匹配)
  - 和getElementxxx不同的是返回的虽然也是NodeList但**不是**动态对象
- 元素节点的matches方法， 参数为css选择器的字符串(和querySelector相同)，返回布尔值，也是全局匹配的
- 布局
  - offset偏移相关的属性
    - offsetParent 是元素的块级父元素
      - 元素自身有fixed定位，offsetParent的结果为null
      - 元素自身无fixed定位，且父级元素都未经过定位，offsetParent的结果为body
      - 元素自身无fixed定位，且父级元素存在经过定位的元素，offsetParent的结果为离自身元素最近的经过定位的父级元素
      - body元素的parentNode是null
    - 宽高是以border-box为基准，left和top分别是左外边框和上外边框到offsetParent的**内边框**偏移
    - 所有偏移量都是只读的
    - 每次访问都需要重新计算(不论布局是否发生变化)
    - 返回值是css像素
  - 客户区Client
    - 宽度和高度是以元素的padding-box基准
    - Top和Left是上边框和左边框的宽度
    - 同样都是只读属性，也会重新计算
    - `getBoundingClientRect()`返回一个对象，包含的上下左右位置是相对于视口的左上角
  - 滚动大小scroll
    - scrollHeight及scrollWidth返回元素的总高度和总宽度(包括溢出区域)，而客户区的属性返回的是页面可视区域的大小，不可覆写
    - Top/Left属性返回隐藏在上方/左方的像素高度，即滚动条位置，这两个属性是可写的，但是赋值为负时会静默失败
    - 以上符合`scrollHeight == scrollTop  + clientHeight`
    - scrollTop赋值为0时可以回到顶部
    - window上有两个全局属性可获取页面的滚动像素值
      - pageXOffset  水平方向
      - pageYOffset  垂直方向
- `window.requestAnimationFrame()`
  - 参数为一个回调函数的函数名，使下一次浏览器重绘时调用这个回调函数，时间间隔一般是16ms(刷新频率60帧)
  - 回调函数会被传入[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)参数，[`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)指示当前被 `requestAnimationFrame()` 排序的回调函数被触发的时间 ，这个参数是一个双精度浮点数
  - 这个函数的返回值是一个请求ID，表示当前执行的回调函数在回调列表中的位置，将这个值穿给`window.cancelAnimationFrame()`可以取消这次回调
  - 简单理解就是这个函数的功能是将参数里的函数加入到一个回调队列，延后执行
  - tips：注意在调用前检测和重置其他限制条件，注意逻辑

### 事件

- `window.addEventListener()`

  - 每个dom节点都有这个方法，可以绑定多个函数，前两个参数为事件类型和处理函数，第三个参数为true时为捕获绑定(默认为false)

  - 参数函数是事件触发时通过绑定的对象调用的，所以参数函数的this指向这个对象(箭头函数指向window)

  - `removeEventListener()`移除绑定时第二个参数一定是指向要解绑的处理函数

  - 节点的onclick属性功能相似，但只能绑定一个处理机

    - 在html标签中的`<p onclick="foo()">`相当于

      - ```js
        $0.onclick = function(){
            with(document){
                with(p){
                    foo()
                }
            }
        }`
        ```

  - 传给处理机的参数是一个事件对象，事件处理时window的event属性也会指向这个对象

- 捕获和冒泡

  - 目标元素触发事件时，其外层元素也触发了该事件
  - 捕获从外向内，冒泡从内向外，先执行捕获阶段再执行冒泡
    - 所以触发一个元素的某事件且外层元素也绑定了该事件时，先从最外层执行捕获处理该事件至目标元素，再从目标元素向外层冒泡执行处理该事件
    - 注意是同一个事件对象
  - 目标元素不区分捕获和冒泡的顺序，先绑定先执行
  - `stopPropagation()`阻止事件向下一个**元素**传播，当前元素当前阶段的所有处理机都会执行
    - `stopImmediatePropagation()`当前元素剩下的函数也不执行
  - event对象的target属性，指向事件触发的节点，currentTarget属性指向当前事件传播到的位置
  - `event.preventDefalut()`阻止默认的事件 
    - scroll，关闭窗口等不能阻止
    - beforeunload 事件， 关闭窗口前弹窗
    - contextmenu事件，右键菜单

- 键盘事件

  - event.keyCode属性，默认按下是大写
  - **只有能获取焦点(有tabindex属性)的元素才能触发键盘事件**
    - tabindex不是css属性，是一个dom属性

- 鼠标事件

  - eventd的which属性： 0无 1左键 2中键  3右键  不能显示组合，只能显示最先按下的键
  - buttons属性可以表示哪些键被按下，返回的是十进制的值，但是用三位二进制从高到低分别表示中右左三个键是否按下(例如返回5表示中键和左键同时按下)，可以分别和(0b001  0b010  0b100)按位与来判断对应的键是否按下
  - button属性，0左1中2右
  - mouseenter/leave替代以前的mouseover/out ，同时enter和leave都**不会**传播

- 滚动事件

  - addEventListener()的第三个可选参数可以为一个对象，内部属性有capture/once/passive
    - `passive`: [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，设置为true时，表示 `listener` 永远不会调用 `preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。`浏览器可以在事件触发时就立即开始执行默认事件，不用执行完listener才发现没有preventDefault

- 焦点事件

  - 触发焦点focus，失去焦点blur，这两个事件**不会**传播
  - 用focusin，focusout替代，这两个事件**会**传播
  - 让非表单元素获取焦点：先将tabIndex属性设置为-1，再调用focus()方法
  - 表单元素有autofocus属性， 设置后页面加载完成自动聚焦， 非表单元素即使设置了tabindex也无效

- 加载事件

  - window.onload是在页面中所有原有资源加载完成的时候触发的（包括引用的图片，css等）
    - 外部资源加载完成也会触发各自的load事件，load事件不会传播
    - 注意如果页面从浏览器缓存加载，并不会触发load事件
    - 浏览器在解析文件时是遇到就解析的，所以写在头部的js代码可能要放在onload事件中
  - script的标签是遇到就执行的，执行完毕才执行之后的代码，原因是代码中可能修改了dom，浏览器为保持一致性
    - script标签的async/defer属性，使当前script不立即执行，在全部加载完才执行
    - [彻底搞懂 async & defer](https://github.com/xiaoyu2er/blog/issues/8)
  - DOMContentLoaded事件还在load事件之前，完成DOM树即触发，不管外部资源
    - 会冒泡到window，但目标是document
  - readystatechange事件
    - 这个属性主要是有几个不同的状态`document.readyState`，但是行为和触发时间很难预测，应该不常用
  - 页面关闭/跳转 触发beforeunload事件，默认弹出提示窗口是否关闭网页，这个事件不能用preventDefault阻止，且只有处理机在event.returnValue上赋值为真时生效，此外没有其他作用和修改方式

- 定时器

  - setTimeout，两个参数，第一个为待执行函数，第二个为延迟时间ms，返回值为设置的该定时器id(非常类似requestAnimationFrame)

    - 浏览器页面处理是单线程的，当设定的时间再执行其他程序，则待执行程序延后至当前程序执行完毕 ，即一定要同步队列执行完毕后才会执行异步队列，且setTimeout延迟时间是其加入异步队列时就(才)开始计算的，因此当之后的同步程序执行时间超过设置的延迟时间，则同步程序执行完后会立即按照加入队列的顺序执行异步。
    - 当延迟时间设为0时，也要等待当前函数调用栈(最外层)的程序全部执行完毕才执行定时器设置的函数
    - clearTimeout
    - setTimeout的函数参数和普通函数中的回调函数参数是一样的，this指向window(当前活动对象)

  - setInterval，以时间间隔重复执行，也返回一个id

    - clearInterval
    - 当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中，因为再次添加队列时之前的代码可能还没执行完成

  - setTimeout和setInterval加入的是同一个异步队列，所以用clearTimeout或者clearInterval都可以互相清除定时器

  - ```js
    setTimeout(`console.log(1)`, 1)
    setTimeout(`console.log(2)`, 0)
    //以上代码在chrome输出顺序是1， 2
    //因为chrome解析时会把0当做1
    ```

  - 注意：HTML5标准规定，setTimeout在**链式调用(嵌套)5层**以上时最短时间间隔是**4毫秒**；setInterval的最短间隔时间就是**4毫秒**，也就是说，设置小于4毫秒的时间间隔会被调整到4毫秒

    - 为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒
    - 最平滑的动画效果时间间隔是16.6毫秒(和显示屏刷新频率有关)

  - [官方文档](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers?tdsourcetag=s_pctim_aiomsg)

### 零碎知识

- 浏览器会等待js代码执行完成之后再重新渲染
  - 调试时代码是分段执行的
- 一句解决所有this的问题：在javascript引擎内部，obj和obj.foo储存在两个内存地址，简称为M1和M2。**只有obj.foo()这样调用时，是从M1调用M2**，因此this指向obj。由此可得，当不经过obj直接调用foo时，foo的this指向当前活动对象（一般是全局环境window）
  - 数组的forEach/map/filter方法可以传入一个参数作为调用函数的this，不传则this为window
  - 对于箭头函数，`this` 关键字是由词法作用域决定的，继承外层函数的this，指向的是它当前周围作用域（简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象），和闭包比较，闭包返回的函数的this是暴露在外面的，如果闭包返回的是一个箭头函数，那么this继承的是包裹函数的this，否则箭头函数的this就是window
- 进程和线程：
  - 不同进程之间不能共享内存
  - 同一个进程的多个线程可以共享这个进程的内存
  - cpu的时间片轮转是以线程为基本单位