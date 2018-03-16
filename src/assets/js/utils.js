// 操作sessionStorage  localStorage

export const getStorage = (key, store = 'localStorage') => {

  if (!key) {
    return;
  }

  return JSON.parse(window[store].getItem(key));
};


export const setStorage = (key, data, store = 'localStorage') => {
  if (!key || !data) {
    return;
  }

  window[store].setItem(key, JSON.stringify(data));
};

/* 手机号码 用于element-ui 表单验证*/
export function validateMdn(rule, value, callback) {
  if (value === '') {
    callback(new Error('手机号码不能为空'))
  }
  /^1(3|4|5|7|8)\d{9}$/.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
}

/* 邮箱 用于element-ui 表单验证*/
export function validateEmail(rule, value, callback) {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  }
  /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i.test(value) ? callback() : callback(new Error('请输入正确的邮箱'))
}

/*
获取(中文、字符)长度
 */
export function validateReal(str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }

  return realLength;
}

/*
* 验证是否为中文
 */

export function validateChinese(str) {
  if (str.match(/[\u4e00-\u9fa5]/)) {
    if (str.length < 2) {
      return false
    }
    else {
      return true
    }
  }
  else {
    if (validateReal(str) < 7) {
      return false
    }
    else {
      return true
    }
  }
}

export function convertCurrency(currencyDigits) {
  // Constants:
  const MAXIMUM_NUMBER = 99999999999.99;
  // Predefine the radix characters and currency symbols for output:
  const CN_ZERO = "零";
  const CN_ONE = "壹";
  const CN_TWO = "贰";
  const CN_THREE = "叁";
  const CN_FOUR = "肆";
  const CN_FIVE = "伍";
  const CN_SIX = "陆";
  const CN_SEVEN = "柒";
  const CN_EIGHT = "捌";
  const CN_NINE = "玖";
  const CN_TEN = "拾";
  const CN_HUNDRED = "佰";
  const CN_THOUSAND = "仟";
  const CN_TEN_THOUSAND = "万";
  const CN_HUNDRED_MILLION = "亿";
  const CN_SYMBOL = "";
  const CN_DOLLAR = "元";
  const CN_TEN_CENT = "角";
  const CN_CENT = "分";
  const CN_INTEGER = " 整";
  // Variables:
  let integral; // Represent integral part of digit number.
  let decimal; // Represent decimal part of digit number.
  let outputCharacters; // The output result.
  let parts;
  let digits, radices, bigRadices, decimals;
  let zeroCount;
  let i, p, d;
  let quotient, modulus;
  // Validate input string:
  currencyDigits = currencyDigits.toString();
  if (currencyDigits == "") {
    return "还没有输入数字！";
  }
  if (currencyDigits.match(/[^,.\d]/) != null) {
    return "请输入有效数字!";
  }
  if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
    return "请输入有效格式数字！";
  }
  // Normalize the format of input digits:
  currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
  currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
    return "您输入的数字太大了!";
  }
  // Process the coversion from currency digits to characters:
  // Separate integral and decimal parts before processing coversion:
  parts = currencyDigits.split(".");
  if (parts.length > 1) {
    integral = parts[0];
    decimal = parts[1];
    //Cut down redundant decimal digits that are after the second.
    decimal = decimal.substr(0, 2);
  } else {
    integral = parts[0];
    decimal = "";
  }
  // Prepare the characters corresponding to the digits:
  digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
  radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
  bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
  decimals = new Array(CN_TEN_CENT, CN_CENT);
  // Start processing:
  outputCharacters = "";
  // Process integral part if it is larger than 0:
  if (Number(integral) > 0) {
    zeroCount = 0;
    for (i = 0; i < integral.length; i++) {
      p = integral.length - i - 1;
      d = integral.substr(i, 1);
      quotient = p / 4;
      modulus = p % 4;
      if (d == "0") {
        zeroCount++;
      }
      else {
        if (zeroCount > 0) {
          outputCharacters += digits[0];
        }
        zeroCount = 0;
        outputCharacters += digits[Number(d)] + radices[modulus];
      }
      if (modulus == 0 && zeroCount < 4) {
        outputCharacters += bigRadices[quotient];
      }
    }
    outputCharacters += CN_DOLLAR;
  }
  // Process decimal part if there is:
  if (decimal != "") {
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1);
      if (d != "0") {
        outputCharacters += digits[Number(d)] + decimals[i];
      }
    }
  }
  // Confirm and return the final output string:
  if (outputCharacters == "") {
    outputCharacters = CN_ZERO + CN_DOLLAR;
  }
  if (decimal == "") {
    outputCharacters += CN_INTEGER;
  }
  outputCharacters = CN_SYMBOL + outputCharacters;
  return outputCharacters;
}

let objPlat = {}
let objCity = {}

export const PLATFORM = () => {
  if (JSON.stringify(objPlat) !== '{}') return objPlat
  let list = getStorage('platformInfo') || []
  list.forEach(item => {
    objPlat[item.id] = item.name
  })
  return objPlat
}

export const CITY_MAP = () => {
  if (JSON.stringify(objCity) !== '{}') return objCity
  let list = getStorage('platformInfo') || []
  list.forEach(item => {
    item.cities.forEach(city => {
      objCity[city.id] = city.name
    })
  })
  return objCity
}
