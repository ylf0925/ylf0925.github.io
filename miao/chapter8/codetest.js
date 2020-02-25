/*
chapter 5
高阶函数 
*/

function noisy(f) {
  return function (arg) {
    console.log('calling with', arg)
    var val = f(arg)
    console.log('calling with', arg, '- got', val)
    return val
  }
}


function unless(test, then) {
  if (!test) then()
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) {
    body(i)
  }
}

repeat(3, function (n) {
  unless(n % 2, function () {
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



function addTwo(a, b) { return a + b }

function noisy(f) {
  return function (...arg) {
    let val = f(...arg)
    return val
  }
}

var noisyAdd = noisy(addTwo)
noisyAdd(1, 2)

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
不支持运算 
不可以注释
不能出现tab
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


function filter(ary, test) {
  var passed = []
  for (var i = 0; i < ary.length; i++) {
    if (test(ary[i])) {
      passed.push(ary[i])
    }
  }
  return passed
}

filter(ancestry, function (person) { return person.sex == 'm' })


