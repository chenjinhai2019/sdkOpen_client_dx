/* eslint-disable no-extend-native */
String.prototype.colorRgb = function () {
  let sColor = this.toLowerCase()
  // 十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '';
      for (let i = 0; i < 4; i++) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew.slice(1);
    }
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
    }
    return `(${sColorChange.join(',')})`;
  }
  return sColor
}
module.exports = {
  clearCookie() { 
    // eslint-disable-next-line no-useless-escape
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    console.log(document.cookie);
    console.log(keys);
    if (keys) { 
      for (let i = keys.length; i--;) { document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}` } 
    } 
  } 
}

