/* eslint-disable no-extend-native */
/* eslint-disable func-names */
String.prototype.colorRgb = function () {
  let sColor = this.toLowerCase()
  // 十六进制颜色值的正则表达式
  let reg = /^#[0-9a-fA-f]{6}$/;
  if (sColor && reg.test(sColor)) {
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
    }
    return `(${sColorChange.join(',')})`;
  }
  return sColor
}
module.exports = {}

