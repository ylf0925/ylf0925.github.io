---
title: 前端学习week22
date: 2019-10-13 22:45:56
comments: true
tags:
- front-end
- vue
mathjax: false
---

​	有几周没有更新了，标题还是顺接上一篇吧，这几周主要学了一下vue，将一些理解记录如下



<!-- more -->



### 跨域的集中方式

- cors
- jsonp

- 服务器代理
- iframe
- document.domain  只能设置为上级域

### Virtual DOM

- [lit-html](https://lit-html.polymer-project.org/guide)
- dom diff
  - [dom diff的时间复杂度分析]( https://www.zhihu.com/question/66851503/answer/246766239 )
  - react中的diff算法是同层级比较，不同类型的元素会以此元素为根结点将整棵树拆解重新装载，同一类型的则会保留dom结点，只修改改变的属性/值，重新调用实例的render（这里可以在组件类中设置shouldComponentUpdate的生命周期方法，来达到性能优化的目的），当一个dom元素有多个子元素时可以给子元素设置单独的key来优化使利用重复元素，注意key只在不得已时可以使用index，因为重排会改变其index，而算法根据这个key对比，可能达不到预期效果，降低了算法处理的效率
- [vue中的虚拟DOM](https://blog.fundebug.com/2019/06/26/vue-virtual-dom/)



### Vue

- 创建实例的选项里不要用箭头函数！！(this啊this)
- 先注册的组件再创建实例，否则使用的组件第一次渲染时不会渲染 
  - 也可先不挂载el
  - dom节点在被挂载时渲染
- 所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象
- 生命周期钩子的 `this` 上下文指向调用它的 Vue 实例
- vue实例/组件生成时选项内data属性中的值会直接作为实例的属性
- mustache模板
  - 不能访问自定义的全局变量，因为是在一个沙盒中
  - 访问实例的属性不需要this
  - 只能放字符串或**一个**表达式，不能放语句和控制流
- 在标签中使用表达式，注意
  - 标签属性名中的空格和引号等符号会触发编译错误
  - html和css是大小写不敏感的，属性名用大写编译时也会强制转为小写
- vue中computed里的getter 只要响应式依赖不改变就不会重新求值而是直接返回缓存
  - 所以`return Date.now()`这种再次调用时不会再更新
- vue渲染时判断写在标签表达式真假是判断是否为truthy (类型转换后是否为true)，而不只是true
- 同一对v-if和v-else必须直接相邻
  - 在if和else中相同的元素在切换时不会重新渲染，而仅仅在渲染好的元素上改变属性，这个特性会使切换时保留用户的输入，给相同的标签添加不同的`key`属性可以关闭这个特性
  - 注意v-for中绑定key需要使用v-bind指令，而v-if/v-else中不用，key只能用基本类型的值，**v-for中使用key可以使更新时重排减少开销而不是重新渲染**
  - 组件上使用v-for时必须绑定key
  - v-for的优先级高于v-if
  - v-show不支持template元素，v-show和v-if的区别是v-show是创建时无论如何都会渲染的，操纵的知识css的display属性，而v-if会在切换时重新渲染
- 注意用索引向数组中加入元素和改变数组长度不会被检测，也就不会触发渲染
- 对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性(能加上，但不是响应式的)，但是可以用`Vue.set()/app.$set()`，这两个方法是一样的
- 使用组件元素时再原生标签上使用`is="name"`属性优于直接使用自定义的`<name></name>`，原因比如在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容
- 组件是可复用的vue实例，和new Vue接受的选项大致相同，除了el这种根实例特有的选项
  - 组件中的data选项需要写成函数返回对象的形式，必须是一个函数，因为每使用一次组件都会创建一个新的实例，这样就达成了复用的目的，每个实例都是独立的拷贝
  - 组件模板中必须要有一个根元素
  - 由浏览器解析的自定义标签不能写成自闭合形式(vue自己解析的可以)
  - 注意代码是由浏览器解析还是vue解析，主要是命名规则（大小写），和自闭和标签是否可用
    - 单文件组件中的template标签内可以将自定义空标签写成自闭合
  - prop传入的值是单向更新的，只能从父级向下更新，反之不行，子组件可通过事件向父组件反馈信息
- watch的变量只有在变量直接变化时才能侦听到，如果变量指向一个对象，对象属性变化是侦听不到的，可以加上`deep: true`选项
- data双向绑定的原理：利用`Object.defineProperty`选项中的set和get
- v-on后接绑定的函数名或可执行代码，若可执行的代码得到的是一个function，这个function并不会执行
- vue中的命名规则：kebab和camel是相通的，即`for-example`和`forExample`是相通的，<del>只要命名了一个另一个就能直接用，指向相同的值</del>(并不，目前只发现组件的props中的属性会相通，即用`for-example`命名的属性接受到数据后，可以用`this.forExample`在方法中调用)，但是仍需注意浏览器不认识大小写，思考了一下，应该是表达式中可以通用，用字符串表示不可以
- 在非template的地方使用该作用域中的值和方法($emit)不要忘了用this

#### Vuex

- 一种数据对象状态管理机制，基本思路就是对被多个实例引用的共享数据对象，不是直接给数据对象中的属性赋值来改变其状态，而是通过使用状态管理封装的方法来修改，通过封装计算属性来读取数据，这样能方便调试和追踪状态变化

- 两个组件中生成计算属性的辅助函数的原理

  - ```js
    //getter 相当于 vuex的store中的计算属性
    function mapGetters(getterFields) {
          var obj = {}
          for(let field of getterFields) {
            obj[field] = function(){
              return this.$store.getters[field]
            }
          }
          return obj
        }
    ```

  - ```js
    function mapState(obj) {
          var result = {}
          for(let key in obj) {
            let val = obj[key]
            result[key] = function()  {
              return val.call(this, this.$store.state)
            }
          }
          return result
        }
    
    ```

- 子组件中通过`this.$store`访问根实例中注册的store实例

- mutations 同步 actions 异步，因为actions要通过commit方法提交

- store中只有getters能访问其他getters，这个设定很是奇怪

#### Vue模块化机制(单文件组件)

- 现在已经是vue/cli的第三版了，配置简化了很多，通过`vue create xxx`创建项目后根据tutorial选择即可，甚至最后的项目文件中webpack等的配置文件也不给了，添加或修改配置需要自己创建文件

- 启用**路由**

  - 注意默认的路由模式是hash模式，即只改变url中#后面的值，这样访问的依然是同一个网页，只是内容不同，所以url中间有一个 `/#/`
    - 启用history模式，利用的是bom的原生`history.pushState()`api，可以没有`#`，具体操作需要在前端router中指定base，然后在后端设置对含有这个路由的请求都返回同样的页面
    - history模式下的base选项设置好后，router-link标签的to属性就不再需要写基路径了，仅此而已
  - `.router-link-active`的active class匹配是包容的，即只要url中有能匹配上的字段都能匹配成功， `router-link`中使用exact属性表示完全匹配才生效
  - 路由中使用的组件，即router中的routes属性的配置中的componet属性可以是`Vue.extend()` 创建的组件构造器，或者只是一个组件配置对象
  - html引入`vue-router.js`之前一定要先引入`vue.js`，否则报错
  - 子路由只能在父级路由的router-view中渲染，无法覆盖整个页面
  - 分清`$route`和`$router`，前者指的当前路由，可以从`$route.params.xxx`获取参数，后者指整个路由对象，可以调用go，push等方法使当前路由改变
    - 使用路由参数通过组件的props传参时注意参数名和组件中props属性名要对应
  - 为什么在原来的写法中直接引入`vue-router`就可以使用，而在单文件组件中需要先使用`Vue.use(vueRouter)`安装插件才能使用？
  - vue-router代码内部会检测全局是否存在Vue这个属性，存在则自动调用`window.Vue.use()`安装，注意是window的属性Vue，否则才需要手动调用(这也解释了原来的写法为什么不能在vue之前先引入vue-router就直接使用)，而在模块中我们是用import引入的(实际上vue-router的源码中并没有es6的export语法，是以module.exports形式导出的，import会被babel转化为es5语法)，所以并没有这个`window.Vue`这个属性，需要我们手动注册
  - 注意工具都是使用`-D`命令安装在开发依赖(一般放一些打包工具和编译工具等)中的，安装时注意是否需要安装到生产依赖中

- runtime版的vue没有compile函数，runtime版本和dev版本的区别

  - webpack打包时会将`.vue`格式文件编译成js文件，这个阶段会将组件中的template标签中的模板编译成render函数，最终渲染都是通过render函数，所以运行文件中是不带编译的，因此组件中不能写字符串形式的template模板，使用字符串或者基于html的template需要编译成render函数才能执行，也即需要客户端编译
  - 总结： 单文件组件只能使用render
  - render函数返回的是一个虚拟dom结点

- 单文件组件的生命周期

  - [vue生命周期及使用 && 单文件组件下的生命周期](https://www.cnblogs.com/zhuzhenwei918/p/6903158.html)

- 组件之间通信方式

  - 全局事件总线，在根实例的data属性中创建一个空的vue实例bus，然后在子组件中通过`$root.bus.$emit('eventName', data)`触发事件，在另一个组件中通过`$root.bus.$on('eventName', cb(data))`监听事件

    - 也可以在一个单独的文件中创建一个eventBus

    - ```js
      // event-bus.js
      import Vue from 'vue'
      export const EventBus = new Vue()
      //然后在需要通信的组件中引入
      ```

    - 或者在main.js中初始化`Vue.prototype.$EventBus = new Vue()`

- 单文件组件中css局部生效的原理是在选择器和对应标签上加上独一对应的data-set属性

- 在单文件中使用生命周期函数指的是当前组件的根组件，比如子组件重新渲染时update就不会触发，需要到对应的子组件中使用其生命周期函数

#### Web components

- https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
- template元素的内容会解析但不会渲染，使用content属性获取document-fragment，这是一个能储存并列dom结点的容器

### webpack

- [webpack动态加载模块](https://segmentfault.com/a/1190000015648036)

- [打包原理](https://juejin.im/post/5d0206a36fb9a07ee5661905)

- vue中的import
  - 两种形式
  - `import a from 'xxxx/a'`  这种是es6语法，需要在a文件中export导出内容才能使用
  - `import 'xxxxx/a'` 这种应该是webpack配置的，相当于html的script标签，可以直接引入可执行的js和css文件，但是在单文件组件中使用需要注意变量的作用域(是否挂载在window上)
  
- 关于vue打包时候的一些优化

  - vue中的组件注册时可以定义成返回一个Promise.resolve()的函数形式的异步组件，而在es module的import有一个`import()`的语法返回一个promise，所以可以将组件定义成`const component = () => import('path')`，再将其注册实现懒加载，这样webpack默认的配置会将其分开打包，减少文件体积
  - [路由懒加载]( [https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#把组件按组分块) )

  - [vue-cli3中的vue.config.js文件怎么配置，使得chunk-vendors被分离，以给不同的页面引用？]( https://github.com/vuejs/vue-cli/issues/3018 )

### Element UI

- 用了一下element组件库，记录一些坑

#### 表单

- 表单验证的两种方式

  - 文档没写怎么用，第一次使用看到这里一脸懵逼，表单输入框的验证大致由以下几个部分组成

    - 首先form组件元素中model属性需要传入一个对象`:model="obj"`，这个obj包含了几个form-item中对应的字段

    - 如果要使用表单验证，则在form-item组件元素上必须使用prop属性传入一个字符串，这个字符串必须和上一步中的obj的某个属性对应，猜测源码中是通过prop检索需要传入验证函数的参数

    - 然后需要制定验证的rules，先在data中创建一个rules对象，这个对象中包含需要验证的属性，记住属性名也需要和obj中属性对应，然后将这个rules传入form组件元素的rules属性中`:rules=rules`，一下是rules对象属性中两种规则写法

      - ```js
        //1
        username: [
            { validator: checkUsername, trigger: 'blur'}
        ]
        //2   
        email: [
            { required: true, message: "邮箱不能为空", trigger: 'blur' },
            { type: 'email', message: "请输入正确的邮箱", trigger: ['blur', 'change'] }
        ]   
        ```

      - 区别很显然，先说共同点trigger，可以指定触发什么事件时调用验证

      - 对于第二种，可以使用内置的验证规则，参见[async-validator](https://github.com/yiminghe/async-validator)

      - 对于第一种，可以自定义一个验证函数，这个验证函数有三个参数，rule，value，callback，第一个参数我还不知道怎么用，第二个value就是对应的form-item中input的value，第三个参数在做出验证判断时调用，验证失败则传入一个字符串或者error对象，验证成功不需要参数直接调用，示例如下

      - ```js
        const checkUsername = (rule, value, callback) => {
            if(!value.trim()) {
              callback(new Error("用户名不能为空"))
            } else if(!checkSpecificKey(value)) {
              callback(new Error('用户名不能包含特殊字符'))
            }
            callback();
        };
        ```

      - 最后说一下提交按钮可以在click事件上绑定一个处理机，调用`this.$refs[formName].validate((valid) => {})`，来调用整个表单的验证，并对验证结果做对应处理，回调函数的valid为true/false

- 表单的提交

  - 官网表单demo中的提交按钮给的是一个普通按钮，因为需要对表单内容做验证，所以点击事件触发时要调用表单组件的validate方法，对回调的结果做对应的操作，所以不能直接提交，如果不需要做验证，我想可以在表单元素中写上action和method，使用submit按钮提交<del>并没有试过</del>
  - 所以我们需要使用ajax来提交，这里我们使用axios，首先需要拿到数据，搜了一圈，比较好的办法是用[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)，[FormData的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)，另外请参考这个issue中的回答[示例](https://github.com/axios/axios/issues/318#issuecomment-218948420)，似乎是只能一条一条append的，然后可以作为axios的参数发送请求，上传文件必须使用FormData，似乎比普通提交的urlencode格式更规范了，后端做好对应的处理即可

#### vue中使用socket.io客户端

- [vue-socket.io]( https://www.npmjs.com/package/vue-socket.io )

#### 其他

- 强制刷新子组件的方法：利用v-if在值改变时的重新渲染，调用nextTick该百年值使异步重新渲染
  - [vue强制刷新子组件](https://www.jianshu.com/p/1a60557b74c1)
  - 或者直接forceUpdate，注意这里是强制执行实例的生命周期中update阶段，所以不如直接传一个props来控制刷新，而v-if是真正的销毁重建
- 记录一个奇怪的场景，因为首页中某个组件的生命周期函数中用到了某个外站的资源，防止打包文件过大，在app.vue中的生命周期函数中使用创建`script`DOM结点的方式直接添加到document中，但是因为是首页的组件，代码执行时资源还没加载完，得不到想要的效果，利用一下上面说的`v-if`，在app.vue中监听创建的cript结点的load事件，用一个vuex中的变量来存储结果，再在想要的组件中使用`v-if`根据这个变量的计算值来渲染

###  零碎知识

- [package.json](https://docs.npmjs.com/files/package.json)

- html的标签(例如form的action，a的href等)中使用`/`绝对路径开头的path会替换当前地址栏的url域名后第一个`/`所有的内容组成新的url并发送对应的请求，使用`./`相对路径则会加在最后一个`/`之后

- new Promise(f)的回调是构造过程中立即执行的

- Koa和express的区别，koa中next返回一个promise，使用await next()时，会等到next调用的下一个中间件执行完成才会执行当前中间件接下来的代码，而express中是直接将当前中间件执行完

- es6的class，构造函数中调用super前不能使用this，因为调用super相当于调用了父类的构造函数，创建了一个父类的实例再将this指向了这个实例(参考babel的实现)

- `class B extends A {}`中的关系

  - `B.__proto__ === A` es5中没有这一点
  - `B.prototype.__proto__ === A.prototype`

- script标签的integrity属性

- 利用`document.createTextNode()`将用户的输入转码

  - ```js
    function htmlencode(s){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        //这里将字符串创建文本结点并以结点的形式加入
        return div.innerHTML;
        //innerHTML就会将'<'等原本为html代码的字符自动转义成对应实例
        //注意不要用div.innerText获取
    }
    function htmldecode(s){
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    }
    ```

  - 

- 简单的函数柯里化

  - ```js
    function sum(...args) {
        const ret = sum.bind(null, ...args)
        ret.toString = function() {
            return args.reduce((a, b) => a + b, 0)
        }
        return ret
    }
    //注意这里args能拿到所有的值，bind得到的还是原来的函数，绑定的参数在...args会保留，可以简单的验证
    function sum(...args){
    	const a = sum.bind(null, ...args)
    	console.log(args) 
    	return a
    }
    ```