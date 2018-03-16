export default {
  namespaced: 'spOpen',
  state: {
    spInfo: {
      channelId: '', //省份
      city: '', // 城市
      spId: '',  //企业id
      spName: '',   // 企业名称
      contactName: '', // 企业联系人姓名
      contactPhone: '', // 企业联系人手机号
      spType: '1', //企业类型
      industrys: [], //行业分类
      customerManagerName: '', //帜讯销售姓名
      customerManagerPhone: '', //帜讯销售手机号
      administratorName: '',//管理员账号
      administratorPassword: '', //管理员密码
      administratorMoblie: '', //管理员手机号
      area: '', //所在地域
      email: '',//电子邮箱
      telephone: '', //固定电话
      mobile: '', //移动电话
      address: '',//通信地址
      zipCode: '', //邮编
      agentName: '', //经办人姓名
      agentCertificateType: '',//经办人证件类型
      agentCertificateNumber: '', //经办人证件号码
      description: '',//备注
      isValidate: true, //更新时不需要验证联系人手机号 管理员手机号等
      fileData: {
        certificateType: '1', //证件类型
        socialCreditCode: '',//统一社会信用代码
        taxRegistrationNumber: '',//税务登记号
        businessLicenseNumber: '',//营业执照注册号
        organizationCode: '', //组织机构代码
        businessLicensePath: ''
      },
    },
    channelInfo: {
      spId: '',//企业id
      name: '', //渠道销售名字
      mdn: '',//渠道销售手机号
      channelId: '', //省份
      city: '', // 城市
    },
    accountInfo: {
      feeMdn: '',
      value: '', //额度
      levelPolicy: '1',//信控策略
      stopAmount: '',//停机后消费金额
      stopTime: '',//停机时间
      isRemind: '',//是否通知:0不通知 1 通知
      resourceAccId: '', //账号ID
      spId: '',//企业ID
      level: '2',//信控等级
      isCostSync: '0',//是否同步成本
      isFeeSync: '0', //是否同步费用
      feeType: '0',//计费类型
      accountType: '1',//账户类型
      levelPolicy_C: '1',
      levelPolicy_A: '1',
      creditVal_A1: '',
      creditVal_A2: '',
      creditVal_A3: '',
      creditIsRemind: false,
    }
  },
  mutations: {
    SET_SPINFO(state, spInfo) {
      state.spInfo = spInfo;
    }
  }
};
