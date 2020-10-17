---
title: 前端学习week24
date: 2019-10-29 09:48:14
comments: true
tags:
- front-end
mathjax: false
---

​	最后一点收尾知识

<!-- more -->

### Webpack

- 把非js文件转化为js文件，loader：转换工具
  - 即使js文件(jsx, es6+)也会转换， babel-loader
  - 一个loader一般只处理一种文件
  - 体积较小的图片会打包成dataURL
- plugin： 对整体的打包结果进行处理的插件机制
  - 如压缩，混淆，处理通用(vender)模块的抽离(common-chunks-plugin)
  - 自动生成入口html页面
- 代码分割
  - 将一开始不需要的模块打包到其他一个/多个文件中，待需要时再加载
    - `(await import(xxx)).default`
    - 减少初始打包文件体积
- treeshaking 去除无用代码
  - 依赖es module语法 静态分析

### 前端发布流程

- 前提
  - 使用强缓存(cache-control，浏览器不会再为同一个资源发送请求)
  - 静态文件与动态资源不在同一组服务器上
  - 静态资源部署于cdn，动态资源部署于应用服务器
- 版本更新步骤
  - 静态资源以文件内容的hash来命名
  - 新版本上线时，先将静态资源在所有cdn服务器上线
    - cdn上新旧资源共存
  - 然后分批上线应用代码(此时客户端能从cdn请求到新资源，且新版本上线期间新旧版本能共存)
- 不用版本号命名文件的原因是希望版本升级但文件没改变时文件路径也不变，文件如果变化了，文件名也会发生变化，也就不会存在文件覆盖问题
  - 自动实现了静态资源多版本共存
  - 实现了浏览器长缓存

#### 性能优化

- vue
  - 路由懒加载
  - import(module)
- 后端开启gzip

### 零碎知识

- 注意axios/ajax跨域请求时不带cookie，需要设置，不跨域时会自带cookie
  - 或者服务端设置proxy代理，因为服务器之间直接请求不存在跨域问题
- 绝对定位的起始点是paddingbox。。又忘了

- 获取1-bit diff的list

  - ```js
    var circularPermutation = function(n, start) {
        const res = []
        for(let i = 0; i < 1 << n; i++) {
            res.push(start ^ i ^ i >>1)
        }
        return res
    };
    ```

- node中js是用chrome v8引擎解析，所以是单线程，单线程指的是一个进程中只有一个线程，一个进程中的js不能开启另一个线程，但是可以开启另一个进程
  - 而v8引擎的实例是多线程的，包括编译执行，优化，垃圾回收等线程等，js的执行是其中一个线程
  - 每个进程都是一个v8实例
- HTTP的缓存机制步骤
  - 先判断强缓存 `cache-control:max-age(相对时间)  ->  expires(绝对时间)`，注意这一步是浏览器自己的判断，不会发送请求
  - 协商缓存
    - 先判断etag，请求头为条件请求`if-none-match`，判断结果返回304/200
      - etag优先级更高，因为http的时间单位是s，为解决文件更新频繁或服务器时间错误的情况
    - 判断last-modified，请求头为`last-modified-since`，服务器根据结果返回对应的响应
    - 注意 304 NOT MODIFIED
  - 顺便说下301和302的区别，301是永久重定向，302是临时重定向，永久重定向之后的请求都会发往新的url，而临时重定向之后的请求都发往旧url