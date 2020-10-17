---
title: 前端学习week23
date: 2019-10-20 20:50:41
comments: true
tags:
- fromt-end
- react
mathjax: false
---

​	本周主要在做vue的东西，多少是相通的，react之后再来整理	

<!-- more -->

### React

- 理清组件，元素的概念
  - 一个`<div />`就是一个元素，分为DOM类元素和组件类元素，即`React.createElement()`的返回结果
  - 组件分为函数组件和class组件，组件的作用是返回一个react元素
  - react元素有几个属性：type，props，所以可以直接拿到传给它的属性值
  - class组件有实例而函数组件没有，所有class组件实例能储存state且有生命周期，现在函数组件可以使用hooks达到相同的效果

- 组件名第一个字母一定为大写字母，否则会被当做自定义标签编译成react元素

  - `React.createElement("div", null);`
  - `React.createElement(Div, null);`

- props和state的区别：props是父级传给子组件的属性的值，通过`this.props.xxx`获取，且禁止修改。而state是组件的私有数据对象，可以调用`this.state.xxx`获取，只能通过`this.setState()`更新(可以直接赋值改变，但不会触发重新渲染)

  - class式组件不需要用state时可以省略constructor，这是es6的class语法！！，相当于自动执行了`constuctor(...args) {super(...args)}`
  - 函数式组件不能使用state，简洁，只接收一个props参数， 返回一个react元素

- 组件中调用`this.setState()`每次改变时都会重新调用render，注意{}中表达式调用方法的**this**，可以利用箭头函数的this绑定特性，[class field]( https://2ality.com/2019/07/public-class-fields.html )

  - 因为将函数名传入事件处理机时this会隐式丢失！！回忆概念，所以需要特别注意，建议无脑写成箭头函数内调用的形式比较保险
  - 传入箭头函数在每次执行render时都相当于传入了一个新的函数，由于这个属性值改变，该元素会重新渲染，react的做法是会先重新调用一次旧函数，传入参数null(防止内存泄漏)，再执行一次新函数，传入对应的参数。注意两次调用的作用域也不同

- 关于事件处理函数，在组件标签上的自定义时间的处理函数传入的参数都需要自己设置，而在原生标签的原生属性上第一个传入的参数默认为事件对象

  - 原生时间直接绑在组件标签上不会生效

- `this.setState()`更新是异步的，微任务，回调可以接一个state参数，作为上个setState更新后的state(与this.state不是同一个对象！)，注意setState是回调形式的异步，不是promise，所以不能用await

- JSX

  - 其实只是`React.createElement()`的语法糖，所以组件标签类型可以是首字母大写的组件名称，可以是首字母大写的**变量**，可以用首字母大写的**对象点语法**引用，但不能是表达式，其他情况会当做原生标签的字符串传入`React.createElement()`
  - jsx返回的内容也只能有一个根结点
  - 不产生单独的作用域
  - 标签属性不能用中划线，只能驼峰式
  - 语法实际被编译成`React.createElement()`调用
  - 时刻记住代码中写的是类html而不是真正的html，注意一些细节：属性名可以大写，自闭和标签一定要加斜杠等
  - style属性不能接字符串，只能传对象
  - 数字0依然会被渲染为0，其他的falsy会被忽略不会被渲染

- 表单onChange事件按键即触发，原生change事件(vue)在光标移开/回车才触发

- 特殊的propss属性

  - children
    - 可以传递多种类型的值，会将写在A组件标签中间的元素都传入这个属性(中间可以不只一个根结点)，在A组件的定义中会渲染在`{props.children}`的位置，类似vue的插槽，但是不强制用children，可以用任意别的属性，然后在标签属性中传入react元素达到同样的效果
    - 当组件标签中间是函数或字符串时，它就是对应的值
  - 注意key/ref属性是单独处理的，并不在props里面

- 标签的ref属性传入函数时会在元素渲染完成后调用并传入参数为结点对象

  - 现在的做法，构造器中创建一个`React.creatRef()`对象，将该对象传入ref属性，然后在该对象的current属性调用对应dom结点，需要多个ref就创建多个对象
  - 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
  - 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
  - **不能在函数组件上使用 ref 属性**，因为它们没有实例 (函数式组件在使用时是直接调用，class式组件是创建一个实例)，但是可以在函数组件内部的元素上使用
  - **不要用字符串形式的ref**
  - ref转发`React.forwardRef`
  - ref不在props里，是单独处理的属性，不会向下传递

- 三个被标记为unsafe即将废弃的生命周期函数

  - `componentWillMount`
    - 不建议在这一步调ajax等异步请求，因为render是紧随其后运行的，相当于在constructor中调用
  - `componentWillReceiveProps`
  - `componentWillUpdate`
  - 原因是在异步渲染时会造成未预料的问题[update on async rendering]( https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html )----fiber架构异步渲染使render之前的函数可能执行多次，若这些函数会产生副作用，则会产生bug

- render method should be pure function of props & state

- portals可以让组件中的元素渲染在组件的dom树之外的位置，但是react内的事件处理逻辑等还是在原来的组件中(比如冒泡)

- context，需要在全局创建一个变量` xxxContext value= React.createContext(defaultValue); `，然后用`<xxxContext.Provider value="xxx">`包裹父组件，在需要使用这个值的class子组件中挂载`static contextType = xxxContent`，在通过`this.context`消费最近的value，并且可以在任何生命周期中访问到。

  - 当子组件为函数组件时：

  - ```jsx
    <MyContext.Consumer>
      {value => /* 基于 context 值进行渲染*/}
        //value就是provider上的值
    </MyContext.Consumer>
    ```

  - 

- SyntheticEvent，事件处理时传入处理机的事件对象其实都是在原生事件上包装过的合成事件，保留了一些原生的接口，主要是为了兼容问题，此外为了节省内存，同一个类型的事件触发可能会复用同一个合成事件对象，并且处理完成后会清空，所以尽量不要异步访问事件(譬如当使用`this.setState(state => {xxx: e.target.value})` 时)

- 不可变数据，便于在组件更新是比较前后的props和state(===即可)，节省空间，性能优化

  - [immer]( https://immerjs.github.io/immer/docs/introduction )
  - 原理是将原对象转为一个不可变数据结构，当想要修改原对象时，会返回一个新的对象，只改变被改变的部分不变的值指向原来的引用

- Reat.lazy()接收一个返回promise对象的函数，返回一个异步加载的组件`React.lazy(() => import('./OtherComponent'))`，

  - 这一步在vue中已经封装好了，在vue中可以直接使用`component = () => import('./OtherComponent')`作为异步组件
  - 这种用法是为了方便webpack做代码分割

- suspense  通过 React.lazy动态加载组件，用`React.lazy()`构造普通组件的高阶组件

  - ```react
    <React.suspense fallback={<div>loading。。。<div>}>
    	<LazyedComponent />  //这个子组件可以在子树中的任何位置，也可以有多个这样的组件
    </React.suspense>
    ```

  - suspense组件使用了错误边界

  - [Dan Abramov - Suspense!]( https://www.youtube.com/watch?v=6g3g0Q_XVb4&tdsourcetag=s_pctim_aiomsg )

  - [Beyond React 16 by Dan Abramov]( https://www.youtube.com/watch?v=v6iR3Zk4oDY&tdsourcetag=s_pctim_aiomsg )

- `React.memo()` 包装函数子组件使防止父组件更新时的该子组件重新渲染，props浅对比

#### Hooks

- useState 返回的赋值函数会完全覆盖之前的值，不是合并(与class中的this.setState不同)
- useState内部可能是通过栈来判断是哪个组件在调用这个函数，同一个函数组件中多个useState的返回结果依赖其调用顺序，所以要包证该组件函数在多次调用时其useState的个数和变量名不变
  - useState内部是由useReducer实现的，useReducer是useState的替代方案
  - useReducer第一个参数为一个reducer函数第二个参数为初始值，执行useReducer返回的dispatch函数实际上就是执行这个reducer来修改state，值得注意的是这个dispatch是稳定的，不会在重新渲染时改变，事实上所有的hooks返回的内容都是稳定的
- useEffect传入第二个数组参数跳过这个步骤时，注意内部函数的作用域，数组中要包含useEffect要使用的变量，这些变量改变时才执行，否则会执行最初作用域的函数(空数组表示只有挂载卸载时会执行)
  - useEffect在第一次渲染和每次更新后都会执行(相当于 componentDidMount  +  componentDidUpdate  但不会阻塞浏览器更新屏幕)
  - 注意useEffct是在渲染**后**和更新**后**才执行的
- useCallback和useMemo的参数和useEffect是一致的，区别是只有useEffect才能处理副作用， useMemo返回缓存的变量 ， useCallback返回缓存的函数 
  - useMemo和useCallback在渲染期间执行的意思是其返回值是直接参与渲染的，所以只能在其中写一些计算类的工作， 为未来并发渲染的考虑，在 render 时做 mutation 非常危险（因为最后一次 render 并不意味着是最新的 commit )
  - 函数组件的性能优化方式之一
  - 并不是解决创建函数造成的性能问题，第一个参数的函数每次更新还是会创建的，这两个函数真正目的在于缓存了inline函数的实例，若第二个参数数组中的值没变，返回的就是缓存的函数实例，这样再将这个返回结果传入元素的属性时就不是新的props，减少了re-render
  - 实际上这三个hook都会产生闭包，内部的变量在更新前都保留了上一次的值

#### react in css

- [9 Ways To Implement CSS in React JS]( https://medium.com/@dmitrynozhenko/9-ways-to-implement-css-in-react-js-ccea4d543aa3 )

### react-router

- [guide]( https://reacttraining.com/react-router/web/guides/quick-start )
- 支持不使用浏览器自带的history api，而是自己实现了一个类似的api，区别在于不会把路由地址显示在地址栏里(没有地址这个概念)

### redux

- 单向数据流(和vuex基本相同)
- 中间件机制，类似express
  - thunk

