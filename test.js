const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./pinyin.json", "utf8"));

// Chuyển Pinyin có số thành Pinyin có dấu
function addToneMarks(text) {
  const toneMap = {
    a: "āáǎà",
    e: "ēéěè",
    i: "īíǐì",
    o: "ōóǒò",
    u: "ūúǔù",
    ü: "ǖǘǚǜ",
  };

  return text.replace(/([a-züÜvV]+)([1-5])/gi, (match, syllable, tone) => {
    syllable = syllable.replace(/v/gi, "ü");

    if (tone === "5") return syllable;

    const s = syllable.toLowerCase();
    let pos = s.indexOf("a");

    if (pos < 0) pos = s.indexOf("e");

    if (pos < 0) {
      const ou = s.indexOf("ou");
      if (ou >= 0) pos = ou;
    }

    if (pos < 0) {
      for (let i = s.length - 1; i >= 0; i--) {
        if ("aeiouü".includes(s[i])) {
          pos = i;
          break;
        }
      }
    }

    if (pos < 0) return syllable;

    const vowel = s[pos];
    const marked = toneMap[vowel][Number(tone) - 1];

    return syllable.substring(0, pos) + marked + syllable.substring(pos + 1);
  });
}

// Tra cứu dữ liệu rồi đổi số thanh thành dấu
function toPinyin(text) {
  const keys = Object.keys(data).sort((a, b) => b.length - a.length);

  for (const hanzi of keys) {
    text = text.split(hanzi).join(" " + data[hanzi] + " ");
  }

  text = text.replace(/\s+/g, " ").trim();
  return addToneMarks(text);
}

console.log("你好 →", toPinyin("你好"));
console.log("中国 →", toPinyin("中国"));
console.log("谢谢 →", toPinyin("谢谢"));
console.log("我 →", toPinyin("我"));
