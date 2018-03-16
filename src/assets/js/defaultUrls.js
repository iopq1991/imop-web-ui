/*****************************************************************
 ** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
 ** 创建人:      hc
 ** 创建日期:    2018/2/7
 ** 修改人:
 ** 修改日期:
 ** 描 述:  公共Url
 **-----------------------------------------------------------------
 ******************************************************************/

export default {
  group: {
    getRootUrl: '/group/queryRootGroup',//查询根群组
    addGroupUrl: '/group/addLowerGroup',//新增下级群组
    editGroupUrl: '/group/modifyGroupName',//群组重命名
    queryGroupUrl: '/group/queryGroup',//查询群组
    queryGroupByNameUrl: '/group/queryGroupByName',//根据群组名称查询群组
    clearGroupUrl: '/group/clearGroup',//清空群组
    deleteGroupUrl: '/group/deleteGroup',//删除群组
    getMemberListUrl: '/member/listContactByGroupId',//获取联系人列表
    queryMemberByNameOrMobileUrl: '/member/searchByNameOrMobile',//查询联系人
    getGroupMoveDownUrl: '/group/moveGroup',//群组移动
    topUrl: ''//置顶
  },
  property: {
    getSystemPropertyUrl: '/attribute/listSystemAttributes',//获取系统属性
    getCustomPropertyUrl: '/attribute/listAttributes',//获取自定义属性
    addCustomPropertyUrl: '/attribute/addAttribute',//新增自定义属性
    editCustomPropertyUrl: '/attribute/modifyAttribute', //修改自定义属性
    deleteCustomPropertyUrl: '/attribute/deleteAttribute',//删除自定义属性
    getPropertyDetailUrl: '/attribute/detail'//获取属性详细
  }
}
