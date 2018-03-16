/*****************************************************************
 ** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
 ** 创建人:      hc
 ** 创建日期:    2018/3/15
 ** 修改人:
 ** 修改日期:
 ** 描 述:
 **-----------------------------------------------------------------
 ******************************************************************/
import defaultUrls from '@/assets/js/defaultUrls.js'
import msg from '@/assets/js/msg.js'

let code = 200

export default {
  //获取系统属性
  getSystemPropertyService(self) {
    self.$x.post(defaultUrls.property.getSystemPropertyUrl, {}).then(res => {
      if (res.code == code) {
        self.systemDataSource = res.data
      }
      else {
        console.log(msg.DEFAULT_MSG.SERVICEERRORMSG)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //查询自定义属性
  getCustomPropertyService(self) {
    self.$x.post(defaultUrls.property.getCustomPropertyUrl, {}).then(res => {
      if (res.code == code) {
        self.customDataSource = res.data
      }
      else {
        console.log(msg.DEFAULT_MSG.SERVICEERRORMSG)
      }

    }).catch(error => {

    })
  },
  //新增自定义属性
  addCustomPropertyService(self) {
    var params = {
      name: self.propertyEntity.name
    }

    self.$x.post(defaultUrls.property.addCustomPropertyUrl, params).then(res => {
      if (res.code == code) {
        self.isVisible = false
        self.$x.toast(msg.DEFAULT_MSG.ADDMSG)
      }
      else {
        self.$x.toast(msg.DEFAULT_MSG.ERRORMSG)
      }
    }).catch(error => {

    })
  },
  //获取属性详细
  getPropertyDetail(self) {
    var params = {
      id: self.propertyId
    }

    self.$x.post(defaultUrls.property.getPropertyDetailUrl, params).then(res => {
      if (res.code == code) {
        self.propertyEntity = res.data
      }
      else {

      }
    }).catch(error => {

    })
  },
  //修改自定义属性
  eidtCustomPropertyService(self) {
    var params = {}

    self.$x.post(defaultUrls.property.addCustomPropertyUrl, params).then(res => {
      if (res.code == code) {
        self.isVisible = false
        self.$x.toast(msg.DEFAULT_MSG.ADDMSG)
      }
      else {
        self.$x.toast(msg.DEFAULT_MSG.ERRORMSG)
      }
    }).catch(error => {

    })
  }
}
