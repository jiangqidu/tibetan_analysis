// 判断字符串存在情况
function isInTargetArray(input: string, targetArray: string[]) {
  if (input.length === 1) {
    return targetArray.includes(input);
  } else {
    const chars = input.split("");
    return chars.some((item) => targetArray.includes(item));
  }
}

// 前加字
function isPrefix(char: string) {
  return isInTargetArray(char, ["ག", "ད", "བ", "མ", "འ", "པ"]);
}

// 上加字
function isSuperfix(char: string) {
  return isInTargetArray(char, [
    "ྐ",
    "ྒ",
    "ྔ",
    "ྕ",
    "ྗ",
    "ྙ",
    "ྟ",
    "ྡ",
    "ྣ",
    "ྤ",
    "ྦ",
    "ྨ",
    "ྩ",
    "ྫ",
    "ྷ",
  ]);
}

// 上加字
function isSuperfix2(char: string) {
  return isInTargetArray(char, ["ར", "ལ", "ས"]);
}

// 下加字
function isSubfix(char: string) {
  return isInTargetArray(char, ["ྱ", "ྲ", "ླ", "ྭ"]);
}

// 元音
function isVowel(char: string) {
  return isInTargetArray(char, ["ི", "ུ", "ེ", "ོ"]);
}

// 后加字
function isSuffix(char: string) {
  return isInTargetArray(char, [
    "ག",
    "ང",
    "ད",
    "ན",
    "བ",
    "མ",
    "འ",
    "ར",
    "ལ",
    "ས",
  ]);
}

// 判断是否是 后加字+再后加字
function isSuffixToPostsuffix(input: string) {
  const lastChars = ["ས", "ད"];
  const secondLastChars = ["ག", "ང", "བ", "མ"];

  const secondLastChar = input[input.length - 2];
  const lastChar = input[input.length - 1];
  return (
    secondLastChars.includes(secondLastChar) && lastChars.includes(lastChar)
  );
}

function wylieArry(str: string) {
  //                                前    上    基    下    音标   后   重后
  let result: (string | null)[] = [null, null, null, null, null, null, null];

  const lg = str.length;

  // 一层结构
  if (lg === 1) {
    result[2] = str;
  }

  // 两层结构
  if (lg === 2) {
    result[2] = str[0];
    // 元音符号
    if (isVowel(str)) {
      result[4] = str[1];
    } else if (isSubfix(str)) {
      // 下加字
      result[3] = str[1];
    } else if (isSuperfix(str)) {
      // 上加字
      result[1] = str[1];
    } else if (isSuffix(str)) {
      // 后加字
      result[5] = str[1];
    } else {
      // ཨྃ
      result[1] = str[1];
    }
  }

  // 三层结构
  if (lg === 3) {
    if (isSuffixToPostsuffix(str)) {
      // 后加字+再后加字
      result[2] = str[0];
      result[5] = str[1];
      result[6] = str[2];
    } else if (isVowel(str)) {
      // 元音
      if (isSuffix(str[2])) {
        // 后加字
        result[2] = str[0];
        result[4] = str[1];
        result[5] = str[2];
      } else if (isSubfix(str)) {
        // 下加字
        result[2] = str[0];
        result[3] = str[1];
        result[4] = str[2];
      } else if (isSuperfix(str)) {
        // 上加字
        result[1] = str[0];
        result[2] = str[1];
        result[3] = str[2];
      } else if (isPrefix(str[0])) {
        // 前加字
        result[0] = str[0];
        result[2] = str[1];
        result[4] = str[2];
      }
    } else if (isSubfix(str)) {
      // 下加字
      if (isSuperfix(str)) {
        // 上加字
        result[1] = str[0];
        result[2] = str[1];
        result[3] = str[2];
      } else if (isSuffix(str[2])) {
        // 后加字
        result[2] = str[0];
        result[3] = str[1];
        result[5] = str[2];
      } else if (isPrefix(str[0])) {
        // 前加字
        result[0] = str[0];
        result[2] = str[1];
        result[3] = str[2];
      } else {
        result[0] = str[0];
        result[2] = str[1];
        result[3] = str[2];
      }
    } else if (isSuperfix(str)) {
      // 上加字
      if (isPrefix(str[0])) {
        // 前加字
        result[0] = str[0];
        result[1] = str[1];
        result[2] = str[2];
      } else if (isSuffix(str[2])) {
        // 后加字
        result[1] = str[0];
        result[2] = str[1];
        result[5] = str[2];
      }
    } else if (isPrefix(str[0]) && isSuffix(str[2])) {
      // 前加字+后加字
      result[0] = str[0];
      result[2] = str[1];
      result[5] = str[2];
    }
  }

  // 四层结构
  if (lg === 4) {
    if (isPrefix(str[0]) && !isSubfix(str[1])) {
      // 前加字
      if (isVowel(str)) {
        // 元音
        if (isSubfix(str)) {
          // 下加字
          result[0] = str[0];
          result[2] = str[1];
          result[3] = str[2];
          result[4] = str[3];
        } else if (isSuperfix(str)) {
          // 上加字
          result[0] = str[0];
          result[1] = str[1];
          result[2] = str[2];
          result[5] = str[3];
        } else if (isSuffix(str[3])) {
          // 后加字
          result[0] = str[0];
          result[2] = str[1];
          result[4] = str[2];
          result[5] = str[3];
        }
      } else if (isSuffixToPostsuffix(str)) {
        // 后加字 + 再后加字
        result[0] = str[0];
        result[2] = str[1];
        result[5] = str[2];
        result[6] = str[3];
      } else if (isSuperfix(str)) {
        // 上加字
        if (isSubfix(str)) {
          // 下加字
          result[0] = str[0];
          result[1] = str[1];
          result[2] = str[2];
          result[3] = str[3];
        } else if (isSuffix(str)) {
          // 后加字
          result[0] = str[0];
          result[1] = str[1];
          result[2] = str[2];
          result[5] = str[3];
        }
      } else {
        // 下加字
        result[0] = str[0];
        result[2] = str[1];
        result[3] = str[2];
        result[5] = str[3];
      }
    } else if (isSuffixToPostsuffix(str)) {
      // 后加字 + 再后加字
      if (isSuperfix(str)) {
        // 上加字
        result[1] = str[0];
        result[2] = str[1];
        result[5] = str[2];
        result[6] = str[3];
      } else if (isSubfix(str)) {
        // 下加字
        result[2] = str[0];
        result[3] = str[1];
        result[5] = str[2];
        result[6] = str[3];
      } else if (isVowel(str)) {
        // 元音
        result[2] = str[0];
        result[4] = str[1];
        result[5] = str[2];
        result[6] = str[3];
      }
    } else if (isSuperfix(str)) {
      // 上加字
      if (isVowel(str)) {
        // 元音
        if (isSuffix(str[3])) {
          // 后加字
          result[1] = str[0];
          result[2] = str[1];
          result[4] = str[2];
          result[5] = str[3];
        } else {
          // 下加字
          result[1] = str[0];
          result[2] = str[1];
          result[3] = str[2];
          result[5] = str[3];
        }
      } else {
        // 下加字 + 后加字
        result[1] = str[0];
        result[2] = str[1];
        result[3] = str[2];
        result[5] = str[3];
      }
    } else if (isSubfix(str)) {
      // 下加字 + 元音 + 后加字
      result[2] = str[0];
      result[3] = str[1];
      result[4] = str[2];
      result[5] = str[3];
    }
  }

  // 五层结构
  if (lg === 5) {
    // 前加字
    if (isPrefix(str[0])) {
      // 上加字
      if (isSuperfix(str)) {
        // 下加字
        if (isSubfix(str)) {
          // 元音
          if (isVowel(str)) {
            result[0] = str[0];
            result[1] = str[1];
            result[2] = str[2];
            result[3] = str[4];
            result[4] = str[5];
          }
          // 后加字
          if (isSuffix(str)) {
            result[0] = str[0];
            result[1] = str[1];
            result[2] = str[2];
            result[3] = str[4];
            result[4] = str[5];
          }
        }
        // 后加字 + 再后加字
        if (isSuffixToPostsuffix(str)) {
          result[0] = str[0];
          result[1] = str[1];
          result[2] = str[2];
          result[3] = str[4];
          result[4] = str[5];
        }

        // 下加字
      } else if (isSubfix(str)) {
        if (isSuffixToPostsuffix(str)) {
          // 后加字+再后加字
          result[0] = str[0];
          result[2] = str[1];
          result[3] = str[2];
          result[5] = str[3];
          result[6] = str[4];
        }
      } else if (isVowel(str)) {
        // 元音
        result[0] = str[0];
        result[2] = str[1];
        result[4] = str[2];
        result[5] = str[3];
        result[6] = str[4];
      }
    } else if (isSuperfix2(str[0])) {
      // 上加字
      if (isSuffixToPostsuffix(str)) {
        // 后加字+再后加字
        if (isVowel(str)) {
          // 元音
          result[2] = str[0];
          result[2] = str[1];
          result[4] = str[2];
          result[5] = str[3];
          result[6] = str[4];
        }
        if (isSubfix(str)) {
          // 下加字
          result[1] = str[0];
          result[2] = str[1];
          result[3] = str[2];
          result[5] = str[3];
          result[6] = str[4];
        }
      }
    } else if (isSubfix(str)) {
      // 下加字 + 后加字 + 再后加字
      result[2] = str[0];
      result[3] = str[1];
      result[4] = str[2];
      result[5] = str[3];
      result[6] = str[4];
    }
  }

  // 六层结构
  if (lg === 6) {
    result[0] = str[0];
    result[1] = str[1];
    result[2] = str[2];
    result[3] = str[3];
    result[4] = str[4];
    result[5] = str[5];
  }

  // 七层结构
  if (lg === 7) {
    result[0] = str[0];
    result[1] = str[1];
    result[2] = str[2];
    result[3] = str[3];
    result[4] = str[4];
    result[5] = str[5];
    result[6] = str[6];
  }

  const map: { [key: string]: string } = {
    ཀ: "ྐ",
    ཁ: "ྑ",
    ག: "ྒ",
    ང: "ྔ",
    ཅ: "ྕ",
    ཆ: "ྖ",
    ཇ: "ྗ",
    ཉ: "ྙ",
    ཏ: "ྟ",
    ཐ: "ྠ",
    ད: "ྡ",
    ན: "ྣ",
    པ: "ྤ",
    ཕ: "ྥ",
    བ: "ྦ",
    མ: "ྨ",
    ཙ: "ྩ",
    ཚ: "ྪ",
    ཛ: "ྫ",
    ཝ: "ྭ",
    ཞ: "ྮ",
    ཟ: "ྯ",
    འ: "ྰ",
    ཡ: "ྱ",
    ར: "ྲ",
    ལ: "ླ",
    ཤ: "ྴ",
    ས: "ྶ",
    ཧ: "ྷ",
    ཨ: "ྸ",
  };

  for (let key in map) {
    if (result[2] === map[key]) {
      result[2] = key;
      break;
    }
  }

  return result;
}

// 创建 tibetan 模块
function tibetan(inputStr: string) {
  const array = wylieArry(inputStr);

  return {
    front: function () {
      return array[0];
    },
    top: function () {
      return array[1];
    },
    basic: function () {
      return array[2];
    },
    below: function () {
      return array[3];
    },
    symbol: function () {
      return array[4];
    },
    behind: function () {
      return array[5];
    },
    repeat_behind: function () {
      return array[6];
    },
    get_all: function () {
      return array;
    },
  };
}

export default tibetan;
