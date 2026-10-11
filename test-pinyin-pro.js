const { pinyin, addDict } = require("pinyin-pro");
const CompleteDict = require("@pinyin-pro/data/complete");

addDict(CompleteDict);

console.log(pinyin("你好"));
console.log(pinyin("中国"));
console.log(pinyin("我喜欢学习汉语"));
console.log(pinyin("银行"));
