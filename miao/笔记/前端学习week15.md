---
title: 前端学习week15
date: 2019-08-11 22:44:16
comments: true
tags: 
- javascript
- front-end
mathjax: false
---

​	本周主要学习了js的模块化的基本概念CommonJs，以及一点点编译原理的知识，字符令牌(token)化处理(其实在js的正则中捕获分组就是将字符token化)和递归下降，其实递归下降的概念很好理解，就是分析一个表达语句的字符串，遇到不同的操作交给不同的函数处理，这个过程叫做下降，而操作的表达式又需要递归处理。另外的重点是es6中的生成器以及Symbol数据类型，概念比较好理解，通过了迭代器也解释了为什么for-of，扩展运算符等可以对数组字符串等进行操作，Symbol还有很多边边角角的概念就懒得看了。这周还纠结了一些作用域的概念(见最后)，还是很有必要弄清楚的。



<!-- more -->

### 生成器 generator

- ```js
  function * name(){
      yield variable
  }
  ```

- 生成器函数返回的是一个生成器对象(这个对象叫做迭代器)，初始化后并没有执行，调用next()才执行到下一次yield运算符位置，当前状态挂起

  - 调用next()**返回一个对象**，包含value和done两个属性
  - yield操作符的返回值为下一次next()调用时next的参数(只能为值或表达式)， 没有参数则为undefined

- yield 只能在生成器函数内部使用，和return一样**不能穿透函数边界**，即不能在生成器包裹的普通函数内部使用

- 生成器对象包含value和done属性，函数运行结束时value为函数的返回值，done为true，未结束时value为当前yield位置后接表达式的值，done为false

- return()方法在当前位置立即结束，后面代码不再执行，value为return的参数

  - 注意try-catch-finally中finally的代码是一定会执行的

  - ```js
    //形如
    function * gen() {
        try {
            yield 1
            yield 2
        } catch(e) {
            yield 3
        } finally {
            yield 4
        }
    }
    var iter = gen()
    iter.next()
    iter.return()
    //得到的对象value是4, done为false
    ```

- throw()方法，在当前yield位置抛出错误

- `yield * foo()`进入生成器foo()，继续执行迭代器next()会进入foo()内执行至其内的yield

  - 如果不加*，则迭代器对象的value就会变成执行foo的结果即生成了foo生成器生成的迭代器

- `for (var value of foo(para))`遍历每次yield位置的生成器的value，中途break相当于调用了生成器的return()方法

- 应用：

  - 常用来用作一个状态机

  - ```js
    let state = function * (){
        while(1){
            yield 'A';
            yield 'B';
            yield 'C';
        }
    }
    ```

#### Symbol()

- es6新加入的原始类型，不是普通对象，可以作为对象的**独一无二**属性(也是它的主要用途)
  - Symbol函数前不能用new，否则会报错，因为生成的是一个原始类型值不是对象
  - Symbol函数接的参数是对这个创建的值的描述，没有任何其他作用
  - Symbol属性不可枚举
  - 注意Symbol值作为对象属性名不能用`.`访问，因为`.`后只能接字符串，但是方括号可以接表达式
    - 此外只能用新增的`Object.getOwnpropertySymbols()`方法来检索Symbol值属性，for-in/for-of等全都不能
- 每个Symbol值都是独一无二的，即用`===`一定返回false
- 不能通过隐式类型转换，可以显式，例如toString()方法
  - 只能隐式转换为布尔值的true，因为是非空值
- 可迭代对象具有Symbol.iterator属性，是一个函数，执行返回一个作用于附属对象的迭代器，在es6中所有的**集合对象**(数组， Set， Map)和**字符串**都是可迭代对象，都有默认的迭代器(数值类型默认没有)(可以利用这个特性检测对象是否为可迭代对象)，同样生成器就是给对象的这个属性赋值，所以生成器创建的迭代器都是可迭代对象
  - for-of循环每执行一次都会调用可迭代对象的迭代器的next()方法，并将迭代器返回的结果对象的value属性存储在一个变量中，循环将持续执行这一过程直到返回对象的done属性的值为true，所以undefined不会使用
    - 如果将for-of语句用于不可迭代对象、null或undefined将会导致程序抛出错误
    - for-of执行前会检测对象是否为可迭代对象，是可迭代对象则先通过Symbol.iterator()方法来获取其迭代器，本身是迭代器则直接迭代
  - 给不可迭代对象或其原型增加这个属性的生成器函数可以添加自定义其迭代器，利用这个方法可以使数值类型和普通对象可迭代
  - `[...foo()]`扩展运算符可以操作所有可迭代对象，得到所有yield后的返回值，即迭代器对象的value值，并按照默认顺序读取
    - 现在扩展运算符也可操作普通对象`{...{a: 1}}`可以得到`{a:1}`，而且只能在普通对象内部使用
  - iterator是Symbol构造函数的一个属性，指向一个Symbol值，而这个Symbol值同时也是集合对象及字符串的构造函数原型属性中的属性，指向生成器函数

#### 内建迭代器

- 集合对象(数组，Set，Map)都有三种内建迭代器
  - entries() 返回一个迭代器，其值为多个键值对
  - values() 返回一个迭代器，其值为集合的值
  - keys() 返回一个迭代器，其值为集合中的所有键名
  - 分别调用以上生成器方法函数能返回对应不同的迭代器
  - 对于数组来说，for-of和`...`迭代以上任何迭代器只会迭代数组的数字索引(for-in可以循环迭代属性名)，而对稀疏数组来说，用迭代器遍历数组也不会跳过空位，对应位置的value为undefined
  - 在for-of循环中，如果没有显式指定则使用默认的迭代器。数组和Set集合的默认迭代器是values()方法，Map集合的默认迭代器是entries()方法
- 字符串迭代器
  - 还记得之前学习数字和字符串编码方式时，由于历史原因，js的字符串编码采用的ucs-2，也即utf-16。而在之后由于字符的增加，对于编码长度超过一个字节的字符会采用双字节编码，但是es5使用方括号访问每个字符的方式是操作的编码单元，即一个字符，无法正确识别双字节字符。
  - es6中字符串成为了可迭代对象，默认的迭代器直接操作字符而不是编码单元，所以现在可以使用for-of或者`...`正确访问双字节字符

### 零碎知识

- 在es6中，关于变量作用域的一些疑问

  - [Variables and scoping in ECMAScript 6](https://2ality.com/2015/02/es6-scoping.html?tdsourcetag=s_pctim_aiomsg- )
  - [Js参数作用域](https://blog.csdn.net/lu1024188315/article/details/73322084)
  - 函数的参数及for循环的head 可以看作`{}`的上级作用域
    - loop head 中变量用let声明的话，`{}`内可以用let重复声明创建该作用域中的变量，但不能用var
    - 且在loop循环中let 声明的变量，每次迭代都会在当前重新绑定这个变量(即每次改变变量的值后再用这个值重新声明并赋值这个变量，这也是为什么传统for循环不能用const，但是for...in可以用const)，而用var声明的变量只绑定一次，就是闭包
    - 参数中的变量相当于用let声明，在函数体内不能再用let重复声明，但是可以用var重复声明作为该作用域中的变量（行为与loop head相反）
  - `if(false){}`内的变量赋值和函数都失效(但是有声明提升)，但是不能出现语法错误

- [关于loop-head和参数作用域的一些问题](https://stackoverflow.com/questions/57373889/confused-about-the-block-scope-in-loop-heads-and-parameter-in-javascript)

- 用Function()构造函数创建函数，前面的参数为创建函数的参数，用逗号分隔，最后一个参数为函数体，参数都是字符串

- JavaScript 采用的是**词法作用域**，函数的作用域在函数定义的时候就决定了

  - ```js
    var value = 1;
    function foo() {
        console.log(value);
    }
    function bar() {
        var value = 2;
        foo();
    }
    bar();
    //1
    ```

- 执行上下文（Execution context stack，ECS)：当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。执行上下文栈底一定有一个全局执行上下文

- in可以检测对象及其原型链中的不可枚举属性

- polyfill 旧版浏览器完全实现功能的实现

  - includes,Promise,bind

- Shiv/Shim旧版历览器无法完全实现功能的实现

- 形如`let a = b = 1`这样的语句只声明了第一个变量

  - 连等赋值是从右到左进行的

  - 考虑以下情况：

    - ```js
      let a = {}
      a.x = a = {1:1}
      //最后a指向的是{1:1}，并没有x属性
      //因为编译器在处理连等赋值时先读取变量指针地址，没有则创建这个指针，再改变指针的指向
      //这时原来a指向的空对象会增加一个x属性指向现在的a指向的对象
      ```

    - [javascript 连等赋值问题](https://segmentfault.com/q/1010000002637728)