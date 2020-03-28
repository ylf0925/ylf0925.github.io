function reduce(ary, initialVal, reducer) {
  for (let i = 0; i < ary.length; i++) {
    initialVal = reducer(initialVal, ary[i])
  }
  return initialVal
}

reduce(ary, 0, (a, b) => a + b)
reduce(ary, 1, (a, b) => a * b)



reduce(ancestry, { born: Infinity }, (dp, p) => { return p.born < dp.born ? p : dp })