---
title: 前端学习week19
date: 2019-09-08 22:55:27
comments: true
tags:
- network
- front-end
mathjax: false
---

​	本周的重点是ajax，http协议及模块的概念，前两个是硬的知识点没什么好说的。 模块应该是前端的一个比较重要也是一个难点了，主要搞清楚CommonJS, AMD, CMD规范的区别，以后的webpack，es6 module应该还会再涉及到

<!-- more -->

### Ajax

- 关于什么是ajax，就是可以通过XMLHttpRequest这个api，经由用户的交互等， 部分请求服务器的资源，而无需重新载入页面
- 基本流程就是new一个对象后，先后调用open和send方法向设定的url发送http请求，然后在response属性中获取服务器返回的响应
- 注意的点基本就是调用send时才会发送请求， open方法的第三个参数默认为true， 异步加载；设为false时为同步加载， 同步加载时页面会挂起不可交互，一般不使用

### Module

- 关于模块的动态静态加载的理解，什么是静态分析
  - CommonJS/AMD的模块加载是动态的(require)：即运行时才加载，无法静态分析，因为可以用任意表达式表示模块名称，路径，属性名等
    - CommonJS 同步加载，应用于服务端
    - AMD异步加载，应用于浏览器端
    - CMD依赖就近
  - es6的模块是静态加载的，即编译时就加载完成，并不能用各种表达式来表示其模块名称等，便于静态分析(tree-shaking，去除不需要的代码)，这是在语法层面的限制
- script标签引入es6模块要加属性`type="module"`

### HTTP

- 文本协议(文本格式)，请求/响应模型(双向通信)，基于tcp

- 状态码
  - 301
    - 重定向，根据location字段跳转
    - 服务器也可先返回200， 再通过js代码根据user-agent跳转
  - 302
    - 跳转对ajax是透明的，xhr获得的响应是跳转后的响应
  - 304
    - 协商缓存
    - 响应条件请求头
      - [cache-control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
      - age
      - expires
      - last-modified等
  - 401
  - 403
  - 404
  - 501
    - 服务器必须支持GET和HEAD方法
  
- 502

- 安全相关首部
  
  - content-security-policy
  
- CORS
  
  - 跨域的概念：只要请求资源的协议，域名，端口有一个不同就叫做跨域
  
  - access-control-allow-origin
  
    - 允许跨域的域，当请求带上了cookie(withCredentials)时不能设置为`*`
  
  - access-control-allow-methods
  
    - 用于预检请求，表示允许的跨域方法
  
  - access-control-allow-headers
  
    - 用于预检请求，表示允许的跨域请求头
  
  - access-control-max-age
  
    - 用于预检请求，表示一段时间内可以不用再次发送预检请求
  
  - CSRF
    - 浏览器虽然有同源策略，但是浏览器请求实际是已经发送出去的
    - 会产生副作用的请求会先发送OPTION预检请求[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
      - 有些请求有预检请求，有些没有：不能破坏web的兼容性
      - http/1.1才有预检请求，在发送有副作用的跨域请求之前会先发送预检请求，以获知服务器是否允许该请求
    
  - 通过html的标签(img, video, script)的src属性引入的外域资源是不受限制的
    - 原理可能是因为早期设计的时候没有考虑周全，并且这样是拿不到源码的，script标签通过src引入的内容是自动执行的
  
    - jsonp就是利用了script标签不受同源策略限制
  
      - ```php+HTML
        <p>//使用示例</p>
        <script>
            //在本地的脚本中声明了一个回调函数，回调函数名字可以自定义，但与url中要对应
            function getPrice(data) {
                console.log(data)
            }
        </script>
        <p>//向服务器请求了一个包括回调函数等信息的url的get请求，服务求收到请求时就返回对应响应的json内容，然后在本地调用这个回调函数
        
        //为什么会在本地自动调用这个回调函数?
            //解释：需要服务器的配合，服务端在将请求的json数据返回给客户端时会用客户端定义的回调函数名包裹json数据(想想模块的原理)，因为我们已经声明过这个函数，所以可以直接调用</p>
        <script type="text/javascript" src="http://wsdetail.b2b.hc360.com/getSupplyPrice?callback=getPrice&bcid=47296567"></script>
        ```
  ```
        
  - 由此可知jsonp只能用于get请求的跨域，被CORS的方式完爆，只是能支持老式浏览器
      
      - [说说JSON和JSONP](https://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html)
  ```
  
- http报文的时间单位一般是秒

- 远程过程调用(Remote Procedure Call)
  - 基本思想是将服务端作为运算的主体，客户端向服务端发送参数等信息，服务端返回调用结果等信息
  - JSON-RPC
    - 和JSON以及JSONP的区别和联系
    - 总结：JSON是一种数据格式，自不必多说； JSON-RPC是一种无状态的远程程序调用协议，通过特殊的JSON格式，包含几个特定的属性，例如method，id，params等，与具体实现有关，服务端根据客户端发来的JSON中的具体内容(参数，函数名等)来调用对应的函数，将函数的返回结果序列化成特定的JSON格式再传回；而JSONP是一种非正式的跨域方式，形式就是JSON格式的数据包裹一个回调函数
  - [restful](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

### 零碎知识

- node环境下的tcp套接字编程

  - 服务端
  
    - ```js
      let net = require('net')
      let server = net.createServer()
      server.listen(port)
      //第二个参数接host，不传则默认为localhost
      server.on('connection', con => {
          conn.on('data', data => {
              xxx
          })
      })    
      //另一种写法，只是形式不同，其他完全一样
      net.createServer(socket => {
          socket.on('data', data => {
              xxxx
          })
      }).listen(port, host)
      //监听到连接请求时才会创建一个新的socket对象，触发createServer()中的函数
      
      ```
  
  - 客户端
  
    - ```js
      let net = require('net')
          let client = new net.Socket()       
          //在给定的socket上初始化一个tcp连接
          client.connect(port, host, function() {
              client.write(xxx)    
      })
      ```
  
- data事件的触发机制
  
  - 同一个连接里多次write可能合并成一次触发也可能触发多次，应该是看网络环境
  - 在data事件中调用end方法来结束连接只是单方面结束了连接，整个连接会等待对方数据发送完才结束(想想**四次挥手**的概念)
  - 习惯每次data事件处理完后都调用`conn.end()`来结束连接，我的理解
  
    - 只是为了结束这个TCP连接而已
- 当连接localhost及本机的端口时，可以从服务端socket的remoteAddress看到客户端的ip也为`127.0.0.1`
  
    - 注意`remoteAddress/remotePort(远程客户端的地址和端口)`和`localAddress/localPort(本地服务端的地址和端口)`都只能在服务端的socket上获取
  - node中tcp的socket概念：我的理解：
    - 通过观察，客户端通过`new net.Socket()`创建的是一个socket类对象，确实是一个socket， 而服务端通过`net.createServer()`返回的是一个server类，这个server并不是socket，而server监听connection事件触发时得到的连接(即传给处理机的参数)是一个socket类，即在server端每次监听到client的连接请求时才创建一个socket，实际上是这个新创建的socket和客户端创建的socket建立了连接
    - server将事件处理全部写在`net.createServer`中的形式似乎更好理解
  - 再谈socket的理解：socket可以看作是封装好的传输层接口，提供了多个函数和属性用于建立通信，在一台主机上的一个端口只能bind一个socket，也即一个端口同时只能被一个进程占用，而一个socket可以与多个socket建立连接，而一个端口也能并发处理多个请求
    - [Socket编程之一个端口能建立多个TCP连接？](https://blog.csdn.net/u011580175/article/details/80306414)