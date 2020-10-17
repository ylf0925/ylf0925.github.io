---
title: 前端学习week21
date: 2019-09-23 09:04:17
comments: true
tags:
- front-end
- nodejs
- http
mathjax: false
---

​	本周将nodejs的介绍进行了首尾，并学习了express和sqlite的使用，简要了解了websocket的原理来实现实时的数据交互，并用这些工具实现一个带登陆功能的投票系统，详见另一篇记录

<!-- more -->

### NodeJs

- stream

  - 可读流`fs.createReadStream()`

    - `end`事件
    - `pause,resume,pipe`方法

  - 可写流`fs.createWriteStream()`

    - 返回一个布尔值，false表示缓冲区已满
    - `drain`事件，当可写流有返回false的情况之后才可能触发，表示缓冲区枯竭
      - 在返回false到触发`drain`事件的**这段时间内**读取流不能向缓冲区写入数据，直到写入流将缓冲区的数据使用完
    - `end`方法

  - `fs`模块创建的可读可流和写流是将的`stream`模块功能的封装

    - ```js
      //创建可读流
      new Readable({
          read(size) {
          //被流系统自动异步调用
              this.push(buf)
              //将数据传入缓冲区
          }
      })
      //可写流
      new Writeable({
          write(chunk, encoding, done) {
          //流系统调用处理缓冲区数据
              fs.write(chunk,xxx,xx,xxxx)
              done()
              //调用callback表示当前处理完成
          }
      })
      //读写流
      new Duplex({
          read(size) {
              this.push(xxx
          }
          write(chunk, encoding, done){
              xxxx
              done()
          }
      })
      //转换流
      new Transform({
          transform(chunk, encoding, callback) {
              this.push()
              callback()
          }
      })
      ```

  - 除了读写流还有双工流`Duplex`和`Transform`，既可作为上游产生数据又可作为下游消费数据

    - `net.socket`是一个典型的Duplex实例
    - `duplex`的可读和可写部分是**独立**的，而`transform`的可读流经过一定处理自动进入可写流

  - 重点理解和使用`stream.pipe`，相当于Unix中的管道符，数据只能从可读流pipe到可写流，多级pipe调用中间的一定是双工流(因为要满足可读流->可写流)

    - pipe会自动处理枯竭，暂停，恢复等情况

  - `ObjectMode`，默认为false，对象模式，默认返回的数据会转为buffer字节流，可设置对象模式为true使保持数据原格式

- Buffer

  - 同es6中新增的[二进制数组](https://www.cnblogs.com/xiaohuochai/p/6534621.html)
  - Buffer是最底层的功能之一，在node中无需require可直接使用
  - 不再用构造函数创建实例，详见文档
  - buffer类数组，一个元素为两个16进制表示的一个字节
    - 给其中元素赋值，只保留整数舍弃小数部分，当未在0-255之间时会加上`k * 256`使其落在0-255之间

- 关于`process.nextTick(callback)`的理解

  - Node中的事件循环
  
  - [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
  
    - ```js
      //例子1
      seTimeout(() => {
          console.log(1)
      }, 0)
      setImmediate(() => {
          console.log(2)
      })//1,2顺序不确定
      //例子2 
      var fs = require('fs')
      fs.readFile('a.txt', (err, data) => {
          seTimeout(() => {
              console.log(1)
          }, 0)
          setImmediate(() => {
              console.log(2)
          })
      })//先2后1
      ```
  
    - timers阶段：定时器设定的回调函数
  
    - check阶段：setImmediate的回调
  
      - setImmediate和setTimeout是执行的时候将回调加入下一个对应的阶段执行
  
    - poll阶段：读文件等回调函数的执行阶段，一直pending状态并阻塞后面的流程直到数据到达然后执行回调，若下一个timers阶段有任务执行则会阻塞设定的时间
  
    - `process.nextTick()`的`nextTickQueue` 回调会在两个阶段之间执行(而不论当前在哪个阶段)，所以在`process.nextTick()`中递归调`process.nextTick()`会在进入下一阶段前就执行
  
    - node中的promise.then和process.nextTick一样不属于任何一个阶段，再两个阶段之间执行，但promise.then的优先级比process.nextTick低
  
  - 浏览器的事件循环只分为宏任务和微任务，先宏任务再微任务再循环，宏任务每次只执行队列中的一个，微任务阶段将微任务全部执行，微任务的异步递归也会阻塞宏任务的执行
  
    - 浏览器中微任务执行早于打印同步代码求值结果，宏任务晚于求值结果打印

### Express

- 没什么好说的，都是封装好的api，记录一些资料
- [Express.js 4.0 的路由（Router）功能用法教學](https://blog.gtwang.org/programming/learn-to-use-the-new-router-in-expressjs-4/)
- [关于app.use()比较好的解释](https://stackoverflow.com/questions/52802653/when-to-use-app-use-in-node-express-app)
  - `app.use()`可以传`app.router()`创建的对象(例如使用静态文件，解析cookie等)，而`app.get()`不可以，想想也知道，router能包含各种请求，get只能处理get请求
- [Express URL跳转（重定向）的实现：res.location()与res.redirect()](https://itbilu.com/nodejs/npm/EJD5cyg3l.html)

### SQL

- 衍生表需要给一个别名
- 使用COUNT时没用GROUP 返回的是表的第一个条数据
- IN 相当于 OR 的缩写，后面的括号中可以接逗号分隔的多个值，也可以接SELECT语句选出的数据(但是只能选出一个列，选出多个列报错)
- SELF JOIN 的原始写法是 FROM  两个自己，但是两个自己都要给别名
- DELETE + JOIN 的语法是 `DELETE (要删除的项所在的TABLE) FROM XXX`
- DATEDIFF() 计算两个date类型数据的差
- CASE用法示例`UPDATE salary SET sex = CASE sex WHEN "m" THEN "f" ELSE "m" END;`
- 注意理解聚合函数`COUNT,SUM,MIN,MAX,AVG`等和GROUP BY一同使用的写法，常用于查询结果相对原表的行列转置

### WebSocket

- 相对于http协议数据交换就断开连接，websocket协议能提供持久的全双工通信
  - HTTP通信中双方有一方是被动的(即服务端)建立连接数据交换完成后即中断
  - 在这之前一般使用长轮询(long polling)的方式实时从服务器获取数据更新
  - 长轮询即客户端想服务器发送HTTP请求后服务器没有立即响应，而是等到数据更新后再响应，在此之间这个请求一直是pending状态，客户端在接收到这个响应后这个HTTP连接就自动结束了，客户端再重新发送同样的请求。
    - 这样的缺点是数据更新有延迟，且开销过大，传输了很多冗余数据
  - [WebSocket规范](https://tools.ietf.org/html/rfc6455)
- websocket目前不受同源策略限制
- websocket是事件驱动的
- url对应的未加密连接是`ws://`，加密连接是`wss://`
- websocket和http是同级的协议，同样是基于tcp实现的，tcp连接建立后，客户端发送一个http的upgrade请求，服务端回复确认后双方才能建立ws连接，发送同样的数据，开销比http协议小很多，可以看这篇文章后半部分[websocket连接抓包分析](https://juejin.im/entry/5b21d934e51d4506ae71baee)
- 浏览器中`new WebSocket()`实例化后马上就会尝试建立连接
- node原生并没有websocket相关的实现，可以在node环境中使用基于websocket封装的[Socket.io](http://socket.io)
  - [WebSocket 与 Socket.IO](https://zhuanlan.zhihu.com/p/23467317)

###  零碎知识

- `Content-Disposition:atachment; filename="xxx"`响应头触发下载
- http无状态(指不记录访问用户的身份，数据交换后就结束连接)，不是持续的连接
  - 使用cookies解决保持登陆问题
    - [HTTP cookies 详解](https://humanwhocodes.com/blog/2009/05/05/http-cookies-explained/)
  - 说说cookie的理解：cookie并不是指整个数据交换的系统，而是指浏览器存储服务器发送过来的一小段数据的一种功能，每次访问服务器都会带上这段数据，以前是通过存储sessionID来达到保持登陆的效果，现在是存储token
    - [彻底理解cookie，session，token](https://zhuanlan.zhihu.com/p/63061864?utm_source=qq&utm_medium=social&utm_oi=825704129925120000)
    - 再聊聊cookie，token和session：cookie是什么上面已经说明了，token可以看作是一段只有服务端能验证的信息，而session是保存在服务器，存储了客户端一次会话的信息(通过sessionID+cookie的方式使客户端在一次会话中对该服务的的多次请求不再需要验证)，会话结束会被清除(因为服务器内存有限)
      - session是客户端第一次请求时在服务端创建的，而session的生命周期并不是客户端打开浏览器到关闭的这段时间(因为服务端无法判断客户端是否关闭了浏览器)，而是设置一段有效时间，当客户端在这个时间内再次请求则这个session会被激活(active)，否则被清除
  - 现在的解决方案是用JWT(json web token)，我理解的应该就是包含更多信息的token
    - [JSON Web Token 入门教程]( http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html )
    - base64URL编码(注意和传统的base64编码的区别，=+/这几个字符在url中有特殊含义)，包含三个部分(三个json对象编码转成的字符串)，以`.`分隔
      - header
      - payload
      - signature
- [curl命令](http://www.ruanyifeng.com/blog/2011/09/curl.html)
- [pug+stylus+bootstrap写页面](https://my.oschina.net/qiaotoubao/blog/658649)
- axios
  - 应该就是用promise封装过的Ajax
  - [中文文档](http://axios-js.com/zh-cn/docs/index.html)
- http1.0协议在一次request和一次response之后就结束了。http1.1多了一个`keep-alive`可以发送多次请求和响应
- MutationObserver监控dom节点的变化，微任务