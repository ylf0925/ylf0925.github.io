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

function forEach(array, action, idx = array.length) {
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


function reduce(ary, initialVal, reducer) {
  for (let i = 0; i < ary.length; i++) {
    initialVal = reducer(initialVal, ary[i])
  }
  return initialVal
}
reduce(ary, 0, (a, b) => a + b)
reduce(ary, 1, (a, b) => a * b)

reduce(ancestry, { born: Infinity }, (dp, p) => { return p.born < dp.born ? p : dp })

let w = [1, 2, 3, 4, 5]
array.forEach1 = function (action, idx = array.length) {
  for (var i = 0; i < idx; i++) {
    action(array[i])
  }
}
debugger;[1, 2, 3, 4, 5].forEach1(console.log)


let ans = [
  { "name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel" },
  { "name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme" },
  { "name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen" },
  { "name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten" },
  { "name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano" },
  { "name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother": null },
  { "name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother": null },
  { "name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene" },
  { "name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm" },
  { "name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes" },
  { "name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother": null },
  { "name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape" },
  { "name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters" },
  { "name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans" },
  { "name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother": null },
  { "name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker" },
  { "name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker" },
  { "name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze" },
  { "name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke" },
  { "name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father": null, "mother": null },
  { "name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke" },
  { "name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze" },
  { "name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene" },
  { "name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters" },
  { "name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke" },
  { "name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters" },
  { "name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze" },
  { "name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano" },
  { "name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke" },
  { "name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes" },
  { "name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke" },
  { "name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens" },
  { "name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander" },
  { "name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert" },
  { "name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier" },
  { "name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke" }
]


function reduce1(ary, reducer, initialVal = ary[0]) {
  let i = 0
  if (arguments.length == 2) {
    i = 1
  }
  for (; i < ary.length; i++) {
    var initialVal = reducer(initialVal, ary[i])
  }
  return initialVal
}

function keyBy(ary, key) {
  return reduce1(ary, function r(result, item) {
    result[item[key]] = item
    return result
  }, {})
}

debugger; let byName = keyBy(ans, 'name')




function forEach1(ary, action, idx = ary.length) {
  for (let i = 0; i < idx; i++) { action(ary[i]) }
}

function keyBy1(ary, key) {
  let result = {}
  forEach1(ary, item => {
    result[item[key]] = item
  })
  return result
}

function keyBy2(ary, key) {
  let result = {}
  ary.forEach(item => {
    result[item[key]] = item
  })
  return result
}

function keyBy(ary, key) {
  ary.reduce((result, item) => {
    result[item[key]] = item
  })
  return result
}

byName = keyBy(ancestry, 'name')

//计算person与PvH共享基因数量
function sharedDNAWithPvH(name) {
  let person = byName[name]
  if (!person) { return 0 }
  if (name == target) { return 1 }
  return (
    (sharedDNAWithPvH(person.father) + sharedDNAWithPvH(person.mother)) / 2
  )
}

function reduceAncestor(startName, combine, default1, default0, target) {
  return shared(startName)
  function shared(name) {
    let person = byName[name]
    if (!person) { return default0 }
    if (name == target) { return default1 }
    return combine(
      shared(person.father), shared(person.mother)
    )
  }
}

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    //给定一人，计算其在某方面的值
    if (person == null) { return defaultValue }
    else
      return f(
        //给定一个人，及其父母在某方面的值，计算该人这个方面的值
        person,
        valueFor(byName[person.mother]),
        valueFor(byName[person.father]))
  }
  return valueFor(person)
}

reduceAncestors(byName['Philibert Haverbeke'], (p, fromFather, fromMother) => {
  if (p.name == 'Pauwels van Haverbeke') { return 1 }
  else { return (fromFather + fromMother) / 2 }
}, 0)