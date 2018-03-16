export const RETURN_CODE = {
  EXPIRED: '201',
  SUCCESS: '200',
  ILLEGAL: '202',
  ERROR: '400'
};

/**************** 业务受理 企业管理 *****************/
// 企业状态
export const SP_STATUS = {
  "0": "正常", "1": "销户", "2": "冻结", "3": "预开户", "-1": "删除"
}

// 企业状态map
export const SP_STATUS_MAP = {
  "NORMAL": "0", "CANCELLATION": "1", "FREEZE": "2", "PRE_OPEN": "3", "DELETE": "1"
}

// 企业状态图标集合
export const LABEL_STATUS = {
  "0": "el-icon-success color-success", "1": "el-icon-error color-danger", "2": "el-icon-warning color-warning", "3": "el-icon-tickets color-primary", "-1": "color-info el-icon-remove"
}

// 企业类型
export const SP_TYPE = {
  "3": "测试", "1": "正式", "2": "体验","4":"联通"
}

// 申请类型
export const APPLY_TYPE = {
  "0" : "运营人员","1":"销售","2":"代理商","3":"联通","4":"其他"
}

// 受理类型
export const ACCEPT_TYPE = {
  "00":"开户","01":"销户", "02":"订购", "03":"充值", "04":"赠送" ,"05":"预支"
}

// 受理状态
export const ACCEPT_STATUS = {
  "0000":"草稿","0001":"待开户审核","0002":"审核不通过","0003":"开户失败","0004":"待提交资质","0005":"待资质审核","0006":"资质审核不通过","0007":"等待业务配置","0008":"待账户审核","0009":"账户审核不通过","0010":"开户成功","0011":"废弃"
}



