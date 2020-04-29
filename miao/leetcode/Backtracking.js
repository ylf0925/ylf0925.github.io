/**
 * @param {string} s
 * @return {string[]}
 */

var parts = [];
var result = [];
var restoreIpAddresses = function (s) {
  if (parts.length == 3) {
    if (isIPPart(s)) {
      parts.push(s);
      result.push(parts.join(','));
      parts.pop();
    }
    return;
  }

  for (let l = 1; l <= 3; l++) {
    let part = s.slice(0, l);
    restoreIpAddresses(s.slice(l));
    parts.pop();
  }

  function isIPPart(s) {
    if (s[0] == "0") {
      return s.length == 1;
    }
    return s.lenght && s < 256;
  }
}
