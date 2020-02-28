/*
chapter 5
高阶函数 
*/
debugger; function hello() {
  while (true) {
    for (var i = 0; i < 10; i++) {
      if (i = 5) { return 10 }
    }
  }
}



function logEach(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i])
  };
}

function forEach(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i])
  }
}

forEach([1, 2, 3], console.log)
//console.log是一个函数，在forEach这个函数中传入了这个函数



function noisy(f) {
  return function (arg) {
    console.log('calling with', arg)
    var val = f(arg)
    console.log('calling with', arg, '- got', val)
    return val
  }
}
noisy(Boolean)(0)


//注意函数在其中的传递
function unless(test, then) {
  if (!test) then()
}

function repeat(times, body) {
  for (var i = 0; i < times; i++)
    body(i)
}

repeat(3, n => {
  unless(n % 2, () => {
    console.log(n, 'is even')
  })
})



//var 的 hoist
for (var i = 0; i < 3; i++) {
  console.log(x)
  if (true) {
    var x = 8
  }
}


for (var i = 0; i < 3; i++) {
  console.log(x)
  if (true) {
    let x = 8
  }
}


let noisyAdd = noisy(addTwo)
noisyAdd(1, 2)

function addTwo(a, b) { return a + b }

function noisy(j) {
  return function (...args) {
    let val = j(...args)
    return val
  }
}


//函数方法
fun = function () { }

ary = [1, 2, 3, 4, 5]
fun.apply(null, ary)//以特殊形式运行原函数
//大约相当于
fun(...[1, 2, 3])

fun.toString()//函数源代码
fun.length//形参个数
fun.name//函数名字

//JSON

//meaning : javascript object Notation
//example belowed:


/*
双引号
不支持运算 
不可以注释
不能出现tab
没有undefined，只有null
不能出现多余的符号比如（，）
 */
{
  "policy": null,
    "log": {
    "access": "",
      "error": "",
        "loglevel": "warning"
  },
  "inbounds": [
    {
      "tag": null,
      "port": 37699,
      "listen": null,
      "protocol": "vmess",
      "sniffing": null,
      "settings": {
        "auth": null,
        "udp": false,
        "ip": null,
        "address": null,
        "clients": [
          {
            "id": "03ed6455-954c-4cef-99f0-a9158a21b061",
            "alterId": 64,
            "email": "t@t.tt",
            "security": null
          }
        ]
      },
      "streamSettings": {
        "network": "tcp",
        "security": null,
        "tlsSettings": null,
        "tcpSettings": null,
        "kcpSettings": null,
        "wsSettings": null,
        "httpSettings": null,
        "quicSettings": null
      }
    }
  ],
    "outbounds": null,
      "stats": null,
        "api": null,
          "dns": null,
            "routing": {
    "domainStrategy": "IPIfNonMatch",
      "rules": []
  }
}

let w = JSON.stringify({
  squirrel: false,
  events: ["weekend"]
})
console.log(w)


let a = JSON.parse(w)
console.log(a)


var ancestry = JSON.parse(ANCESTRY_FILE)

function filter(ary, test) {
  var passed = []
  for (var i = 0; i < ary.length; i++) {
    if (test(ary[i], i, ary)) {
      passed.push(ary[i])
    }
  }
  return passed
}

filter(ancestry, function (person, idx
) { return idx % 5 == 0 })


function map(ary, mapper) {
  let result = []
  for (let i = 0; i < ary.length; i++) {
    result.push(mapper(ary[i], i, ary))
  }
  return result
}

function transWrapping(f) {
  return function () {
    return f.apply(null, arguments)
  }
}

function is19c(p) {
  return p.born > 1800 && p.born < 1900
}

function age(it) {
  return it.died - it.born
}

function sum(ary) {

}

ancestry.filter(is19c).map(age)








function filter(ary, test) {
  var passed = []
  for (var i = 0; i < ary.length; i++) {
    if (test(ary[i], i, ary)) {
      passed.push(ary[i])
    }
  }
  return passed
}

filter(ancestry, function (person, idx
) { return idx % 5 == 0 })


function map(ary, mapper) {
  let result = []
  for (let i = 0; i < ary.length; i++) {
    result.push(mapper(ary[i], i, ary))
  }
  return result
}

function is19c(p) {
  return p.born > 1800 && p.born < 1900
}

function age(key) {
  return key.died - key.born
}


let w = ancestry.filter(is19c)
ancestry.filter(is19c).map(age)

function max() {
  var max = -Infinity
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] > max) {
      max = arguments[i]
    }
  return max
} 