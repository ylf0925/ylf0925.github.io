---
title: 前端学习week20
date: 2019-09-15 22:05:45
comments: true
tags:
- javascript
- front-end
mathjax: false
---

 本周的重点是promise， 理解异步的概念，js本来就是单线程的，理解也不难，重点是学会用法，注意点是异步程序是什么时候创建的，promise只是简化了使用回调函数的方式，此外理解promise什么时候创建什么时候执行，thend的返回值等问题。后面简单介绍了一些node的模块

<!-- more -->

### Promise

- 一个promise对象代表一个异步操作的结果

  - promise对象创建时就执行了，then类似于DOM中的监听
    - 与事件监听的区别：
    - 一次性
      - 即使promise已经成功/失败了，再调用then还是可以执行
  - promise状态确定后不能再更改，promise对象是一次性的，状态确定后其生命周期就结束了

- then方法有两个参数（分别是成功/失败时执行的回调函数，这两个函数就是创建promise对象时的两个回调函数参数），调用then方法根据调用的promise对象的状态执行参数中对应的回调函数，获得一个新的promise对象，其结果由then中执行的情况决定

  - 如果then中throw一个错误(不管在哪个函数中)，则新对象的状态都是rejected，值为throw出的内容， 原对象的状态和值根据其调用的哪个函数及传入的参数决定
    - 注意throw错误的方式，再promise创建时的回调函数中throw错误是无法被接住的，在resolve/reject函数中throw的错误能被之后链式调用的then/catch接住，因为返回了新的rejected状态的promise对象(不管这个error有没有被接住都会创建)
    - [JavaScript Promises - reject vs. throw](https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw)
  - 若then中return了一个promise对象，则新对象的状态和值与这个返回的对象相同
  - then没有传对应的回调函数参数(null)，则新对象获得原对象的状态和值
    - 链式调用跳转/穿透
    - 注意在回调函数中返回undefined并不能使穿透，因为会返回的值为undefined的新promise对象
  - then中函数正常执行，则新对象状态为resolved(无论正常执行的函数是哪个)，值为函数返回值
  - 再说一便then可以当做事件监听来理解，promise对象的状态一旦确定就会触发then中对应的回调函数
    - 注意then中回调函数不是返回一个promise对象则都是同步的
  - 如果promise对象(称为B)的resolve传入的参数是另一个promise(称为A)，则B要等到A的状态确定才能从pending状态转为确定， 且B的状态和值与A相同
    - 当B调用resove时，A的rejected和resolved状态都能**传递**，且值也能传递
    - 只有resolve能传递，reject不能(若A为resolved状态，则B为reject，value为promise)
    - 解释：promise对象到达rejected状态时相当于抛出了一个错误，要用catch接住，不然抛出错误
  - then是异步调用的，微任务
    - 宏任务setTimeout，setInterval， script脚本(整体代码)
    - 事件循环(Event Loop) 遵循以下步骤
      - 先检查宏任务队列(以script脚本开始)，按加入队列顺序执行
      - 再检查微任务队列
      - 重复以上步骤
      - **注意**主线程读取宏任务是一次事件循环读取**一个**， 读取微任务是一次直到微任务为空

- [JavaScript Promise：简介](https://developers.google.com/web/fundamentals/primers/promises)

- [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html?tdsourcetag=s_pctim_aiomsg)

- [Promises/A+](https://promisesaplus.com/)

  - [实现A+标准的promise](https://github.com/xieranmaya/blog/issues/3)

- promise与generator

  - 思路： 当有多步异步操作而我们需要获取每一步的返回结果， 解决方法就是使用迭代器， 因为迭代器可以分步执行和暂停， 只需要在异步执行的位置暂停等待异步程序的执行结果即可， 所以我们用生成器来包装一个函数表示内部有异步操作， 异步操作使用promise对象

  - async/await

    - 其实就是用async代替生成器的`*`，await代替`yield`，返回promise对象，async自带执行器，awiat相当于调用promise对象的then获取异步结果，执行函数就能得到完整结果(返回一个promise对象)，不需要生成迭代器再调用next

      - 除了常用的函数声明和函数表达式，也可用于class中的函数声明和箭头函数

    - 描述一下async函数的执行过程：若函数内有异步操作， 调用函数会**立即返回**一个挂起状态的promise对象(A)， 函数内部遇到await就**立即返回**，等待await后的异步操作(若接的不是一个promise对象，则会**转为**一个立即resolve的promise对象)执行完后再执行下一句， 最后函数的执行情况和返回值作为A的状态和value

      - 只要有一个await后得到了reject的promise对象，则整个函数的执行立即**中断**，reject状态及value传给整个函数的返回结果(无论是否有return)，除非使用try-catch处理(async函数内可以使用try-catch)或者await后有处理reject的catch调用

      - 若多个异步操作间没有联系，可让异步操作并发执行提高效率

        - ```js
          //例
          let res = await Promise.all(promises
          ```

    - [Even with async/await, raw promises are still key to writing optimal concurrent javascript](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
  
    - coroutine
    
      - ```js
        async function f() {
        	console.log(1)
        	var a = await Promise.resolve(5)
        	console.log(a)
        	var a = await Promise.resolve(5)
        	console.log(a)
        	var a = await Promise.resolve(5)
        	console.log(a)
        }
        //协程   纤程   coroutine
        async function g(){
        	console.log(3)
        	var b = await Promise.resolve(6)
            console.log(b)
        	var b = await Promise.resolve(6)
            console.log(b)
        	var b = await Promise.resolve(6)
            console.log(b)
        }
        
        f()
        g()
        
        console.log(2)
        ```
  
  

### NodeJS

- node版本问题
  
  - REPL 
    - 读取read 求值eval 求值print 循环loop
    - node中指的是交互式命令行解释器，即控制台
- node环境的全局对象是global
- process相当于浏览器环境的console
  
  - process.argv获取脚本的命令行参数， 字符串数组形式
- 调试 `node --inspect-brk=portID fileName params`，浏览器调试工具，停在第一行
  - vscode调试
  - ndb工具
- `require()`[模块加载检索顺序](http://nodejs.cn/api/modules.html#modules_all_together)
- http模块
  - 和net模块的区别： net模块是工作在传输层，而http模块是应用层的，http模块将net模块的连接抽象成了请求和响应(自带很多方法和属性，简便很多)，http模块应该是以net模块为基础实现的
  - 请求和响应上要绑定data事件才能获取对应具体内容
  - 连接中传入回调函数的request已经解析好了请求头， 所以可以绑定data事件，传入的data就是请求体
  
  

###  零碎知识

- [Generator中的Thunk函数](http://www.ruanyifeng.com/blog/2015/05/thunk.html)
- 页面加载时浏览器会默认向服务器发送获取favicon.ico的get请求，只影响页面title的图标，无法过滤