/* 手机号码 用于element-ui 表单验证*/
export function validateMdn(rule, value, callback) {
  if (rule.required) {
    if (value === '') {
      callback(new Error('手机号码不能为空'))
    }
    /^1(3|4|5|7|8)\d{9}$/.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

/* 邮箱 用于element-ui 表单验证*/
export function validateEmail(rule, value, callback) {
  if (rule.required) {
    if (value === '') {
      callback(new Error('邮箱不能为空'))
    }
    /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i.test(value) ? callback() : callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

/* 群组校验 */
export function validateOrgs(rule, value, callback) {
  if (rule.required) {
    if (value != null && value.length == 0) {
      callback(new Error('请选择群组'))
    }
    else {
      callback()
    }
  }
};

/* 群组校验 */
export function validatNumber(rule, value, callback) {
  if (rule.required) {
    if (value === '') {
      callback(new Error('群组不能为空'))
    }
    else {
      callback()
    }
  }
};

/* 自定义属性文本校验 */
export function validateText(rule, value, callback) {
  if (rule.required) {
    // debugger
    if (value === '') {
      callback(new Error(`${rule.titleMess}不能为空`))
    } else if (rule.isRequrieNum && !(/^-?\d+$/.test(value))) {
      callback(new Error('请输入数字'))
    } else if (rule.noRequrieChar && /[@#$%^&<>]+/g.test(value)) {
      callback(new Error(`${rule.titleMess}不能含有特殊字符`))
    } else {
      callback()
    }
  }
};
