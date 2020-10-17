---
title: 前端学习week7
date: 2019-06-16 11:04:48
reward: false
comments: true
tags: 
- front-end
- css
- javascript
mathjax:  false
---

​	本周将css的学习进行了收尾工作，介绍了目前还存活的css框架Bootstrap，重点在于grid layout系统是如何实现的。接下来进入了Javascript基础的学习，对于js的基础数据类型，这里坑比较多，按照比较受认可的《高程》的说法是五种数据类型，其中null和undefined分别为一种，特别注意的是number类型这里坑很多

<!-- more -->

#### Bootstrap

css框架

- grid layout
  - version 3.4 
    - 浮动实现  宽度百分比
  - version 4.3 
    - flex  利用flex特性



## Javascript

### 值，类型，运算符 

**five basic types of values in JavaScript**: numbers, strings, Booleans, null, and undefined values.

**使用`typeof (null)`**返回的是object

#### number

- js使用64位固定长度存储数字，其中一位表示正负，一位表示小数点位置。

  [浮点数在计算机中的存储方式](<https://www.cnblogs.com/jillzhang/archive/2007/06/24/793901.html>)

  补充： 对于64位双精度的11位符号位，是采取移位方式存储的，范围为(-1023 - 1024)，即(2^11 -1)加上E的值

  ![](http://chart.googleapis.com/chart?cht=tx&chl=V%20%3D%20(-1)%5Es%5Ctimes%20M%5Ctimes%202%5EE&chs=45)

  特例： 0 在浮点数中特殊存储为全0，-0首位为1。infinity：指数全1，尾数全0。NaN：指数全1，尾数第一位为1

  [How numbers are encoded in JavaScript](<http://2ality.com/2012/04/number-encoding.html>)

  - 1位符号位，11位指数位(exponent)，52位数值位，最大的数为2**53 -1, 再大的数就要占用exponent位，此时+1不会影响数值，因为相当于向左移了一位，最后一位补零，而数值位只能有52位

  - 存储的小数用二进制表示时可能会丢失精度(超过64位)

  - 所有的数字类型,在JavaScript中,都是双倍精度的浮点数类型，每一个数字,都是使用64位(8字节)来存储

  - 对于**位运算**, JavaScript会首先把浮点数转换成32位的整型来进行处理,而不是直接对浮点型进行操作.准确的来说,是转换成`32位`,`大端序`, `补码`, `有符号`的整型，因为整型不能表示小数，转换时会把小数部分抹去。转换时整数部分超过32位则保留右边32位<del>转换过程是将52位数值位的前20位**抹掉**，32位有符号整型的第一位作为符号位，此时负数为补码形式存储。</del>位运算之后再转为64位，负数补1，正数补0

    [了解 JavaScript 的 Number 类型](https://juejin.im/entry/587d8b4861ff4b006509784f)

- special numbers

  - Infinity     超过能存储的最大值的数字
  - -Infinity
  - NaN   not a number  无意义的结果以及NaN参与运算的结果

#### strings

Javascript使用UCS-2编码，**所有字符在这门语言中都是2个字节，如果是4个字节的字符，会当作两个双字节的字符处理**<http://www.ruanyifeng.com/blog/2014/12/unicode.html>

- 单双引号没有区别
- 字符串只能放在一行，所以不能出现明文回车
- 由于方括号操作的是编码单元而非字符，因此无法正确访问双字节字符

#### Boolean

- 比较

  - 字符串比较： 按照字母顺序第一个能比较的字符按ascii值比较决定大小

  - ```js
    console.log(NaN == NaN)
    // → false
    //Infinity的比较也是false，因为无穷大不一定精确相同
    ```

- 逻辑

#### 自动类型转换(隐式类型转换)

- == 两侧存在null或undefined时，只有两边都为null或undefined才为true
- 布尔类型转换： 0, NaN, "" 视为false
- ===  !==  严格比较，不会发生类型转换
- boolean == string 永远为false
- `+`号运算符作为*一元运算*符时，Expression将进行ToNumber()操作 [加号运算符详解](<https://www.cnblogs.com/polk6/p/js-adv-addopr.html>)
  - 在new Date()前面使用一元加符号，可以把日期字符串，转换为日期毫秒数
- a++ 会将a的数据类型转为number

##### 逻辑运算符短路特性

- 当 || 和  && 两侧表达式返回的**不是布尔值**时触发短路特性

- ||  左侧可以转为true时返回左边的值，用于添加右边的默认值fallback，当左边为false时返回默认值
- && 左侧可以转为false时返回左边的值，左边为true时返回默认值
- 只要左侧返回，右边会被直接忽略

#### Others

- 位运算

  只有整数才能做位运算
  - `|` 按位或
  - `&` 按位与     注意负数是补码形式
  - `^` 按位异或
  - `~` 按位非
  - `>>` 按位右移   保留符号位(负数左边补1，正数补0
  - `>>>` 按位右移  不保留符号 (都补0)
  - `<<`  按位左移 右边补0
  
- 逗号运算符：逗号运算符的作用是将若干表达式连接起来。它的优先级是所有运算符中**最低**的，结合方向是自左至右，返回最后一个表达式的值。请注意：**并不是所有的逗号都要看成逗号运算符**，如在函数调用时，各个参数是用逗号分隔开的，这里的逗号并不是逗号运算符。

- void运算符：出现在操作数之前，操作数正常计算，但忽略结果返回undefined

### 程序结构

- 当一行的开头是+，-，/,  [ ,  ( ,  ` ，前一行必须加分号 ，可以把分号写在这行开头，其他时候建议**不写分号**[JS的自动分号插入机制](<https://www.cnblogs.com/fsjohnhuang/p/4154503.html>)
- 所有不在引号里且不为保留字和标识符的都是变量
- 变量名只能以$ , _ ,字母开头，可以包含数字，不能包含空格和其他ascii码范围内的符号
- 在控制台所有表达式都有一个返回值 
- 注意isNaN()和Number.isNaN()的区别
  - 为什要有这两个函数：js中`NaN == NaN`及`NaN === NaN`都是返回false的
  - Number.isNaN()是isNaN()的es6进化版本
- es5中的isNaN()会先将参数进行Number()的数据类型转换，能转换成功的(如空字符串/布尔值/纯数字字符串)会返回false，NaN和转换成NaN的都会返回true
  -  Number.NaN()不会先做类型转换，所以只有NaN会返回true。(因为是数字类型构造函数的自由方法，应该可以理解为只会判断数字类型的NaN)
- [Js语句和表达式的区别](<http://2ality.com/2012/09/expressions-vs-statements.html>)