---
title: 前端学习week8
date: 2019-06-19 14:27:06
reward: false
comments: true
tags:
- front-end
- javascript
mathjax: false
---

​	本周划水有点厉害，主要还是复习了一边js中数值类型的存储方式，即双精度浮点数(见上周内容)，需要注意的是双精度浮点数虽然能表示很大的数，但是有其能精确表示的数的范围，这是由其只有64位决定的，只有位运算的32位整型中负数是由补码表示的，js中只出现这两种存储格式，其他仅作了解。

<!-- more -->

#### 函数

- 变量的声明忌讳直接在前面声明一大坨，即插即用即可(反正编译的时候会全部提到前面)，因此，js可以调用语句后面声明的变量和值。即声明提升(hoisting)：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的，**注意声明会提升但是赋值不会**。函数声明也有这样的特性
- 注意局部变量和全局变量
- js的全局变量是全局对象的属性，用var声明的不可配置，而赋值声明的可以配置删除
- 局部变量可以覆盖重定义全局变量，然而只在局部生效

#### 零碎知识

- ```js
  var i = 0
  i = i++
  console.log(i)
  //会输出什么结果
  //答案： 输出 0 
  //原理： 先将i = 0 的赋值操作入栈，再将i + 1 入栈再按顺序出栈，最后得到的结果是将i赋值为0
  ```

- 变量名由`$`，字母，数字，下划线组成，只有**数字不能用作开头**

- 涉及return、break、continue、throw语句的场景中。如果这四个关键字后紧跟着换行，javascript会在换行处填补分号

- ++和--运算符单独一行时，会作为下一行的前缀解析

- js是变量松散类型语言，可以给变量赋不同数据类型的值，但**不建议**这么做

- var语句可以省略，直接对变量赋值会自动声明该变量，但在es5的严格模式下会报错，而且函数内未声明且直接赋值的变量会声明为全局变量，所以**不推荐省略**

- 由于undefined并不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用void 0 来替换undefined
- 不同的对象在底层都表示为二进制，在javascript中二进制前三位都为0会被判断为object类型，null的二进制表示是全0，所以执行typeof时返回'object'
  
  - 所以判断一个值是否为null类型的最佳方法是直接和null进行恒等比较
- 在Number()方法中空字符串和空白字符串都转换为0，而在Boolean方法中，空字符串""转换为false，而空白字符串" "转换为true
  
  - 自动类型准换中布尔类型只有七个假值(falsy value)，这7个值包括undefined、null、+0、-0、NaN、false、""(空字符串) 转换为false，其他任何情况都转换为true
- Number('')的结果是0，parseInt('')和parseFloat('')的结果是NaN
- null和undefined没有toString()方法，而String()函数在非undefined和null会调用toString()方法
  
  - 一般使用空字符串"" + 某个值，将该值转换为字符串
- 字符串的substring(start, end)和slice(start, end)方法(substr() 已弃用)
  - slice(start, end)
    - 返回从start位置到end(不包括)的字符串
    - 如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符
    - 如果start是负数，则start = max(length + start,0)
    - 如果end是负数，则end = max(length + end,0)
    - start和end无法交换位置 start < end时输出空字符串
    - start/end被传入NaN时相当于传入0
  - substring(start, end)
    - 如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符
    - 如果任一参数是NaN或负数，则被0取代
    - 如果任一参数大于字符串长度，则被字符串长度取代
    - 如果start 大于 end，则交换它们的值
- 数组的最大长度为2的32次方-1

