/*****************************************************************
 ** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
 ** 创建人:      hc
 ** 创建日期:    2018/3/6
 ** 修改人:
 ** 修改日期:
 ** 描 述:  群组service
 **-----------------------------------------------------------------
 ******************************************************************/

import defaultUrls from '@/assets/js/defaultUrls.js'
import msg from '@/assets/js/msg.js'

//状态码
let code = 200

export default {
  //获取根节点
  getRootGroupService(self, type) {
    var treeData = []
    self.$x.post(defaultUrls.group.getRootUrl).then(res => {
      if (res.success && res.data) {
        var result = res.data
        treeData.push(result)
        if (type == 'left') {
          //根节点
          self.groupID = res.data.id
          self.$refs['groupLeft'].dataSource = []
          self.$refs['groupLeft'].dataSource.push(...treeData)
          self.loadInitTable(treeData[0])
        }
        else if (type == "dialog") {
          var selectedArray = self.$refs['groupDialog'].selectedData || []
          selectedArray.forEach(function (item) {
            treeData.forEach(function (childitem) {
              if (item.id == childitem.id) {
                childitem.selected = true
              }
            })
          })
          self.$refs['groupDialog'].dataSource = []
          self.$refs['groupDialog'].dataSource.push(...treeData)
        }
        else if (type == "confirm") {
          self.$refs['groupConfirm'].dataSource = []
          self.$refs['groupConfirm'].dataSource.push(...treeData)
        }
        else if (type == "export") {
          self.$refs['groupExport'].dataSource = []
          self.$refs['groupExport'].dataSource.push(...treeData)
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //获取下一级节点
  getChildGroupService(self, node, resolve) {
    var params = {
      id: node.key
    }

    self.$x.post(defaultUrls.group.queryGroupUrl, params).then(res => {
      if (res.success) {
        var result = res.data
        var selectedArray = self.$refs['groupDialog'].selectedData || []
        selectedArray.forEach(function (item) {
          result.forEach(function (childitem) {
            if (item.id == childitem.id) {
              childitem.selected = true
            }
            else {
              childitem.selected = false
            }
          })
        })

        resolve(result)
      }
    }).catch(error => {
      console.log(error.msg)
    })
  },
  //查询群组接口
  getSearchGroupService(self, type) {
    var treeData = []
    var params = {
      name: self.searchValue
    }

    var firstItem = {}
    self.$x.post(defaultUrls.group.queryGroupByNameUrl, params).then(res => {
      if (res.success && res.data) {
        //群组列表查询
        if (type == "right") {
          self.$refs['groupLeft'].dataSource = []
          //根节点
          self.groupID = res.data.id
          var result = res.data
          treeData.push(result)
          getSearchItem(result)
          self.$refs['groupLeft'].dataSource.push(...treeData)
          self.loadInitTable(firstItem)
        }
        //选择群组
        else if (type == "dialog") {
          var selectedArray = self.selectedData || []
          selectedArray.forEach(function (item) {
            treeData.forEach(function (childitem) {
              if (item.id == childitem.id) {
                childitem.selected = true
              }
            })
          })

          self.dataSource = treeData
        }
      }
    }).catch(error => {
      console.log(error.msg)
    })

    //查询第一个高亮
    function getSearchItem(items) {
      for (let row of items) {
        if (row.highlight) {
          firstItem = row
          break
        }
        else {
          getSearchItem(row.childNodes)
        }
      }
    }
  },
  //查询联系人接口
  getSearchMemberService(self) {
    //需要入参操作统计
    var params = {
      name: self.searchValue,
      type: self.statisticsType
    }

    self.$x.post(defaultUrls.group.queryMemberByNameOrMobileUrl, params).then(res => {

    }).catch(err => {

    })
  },
  //获取系统属性
  getSystemPropertyService(self) {
    self.$x.post(defaultUrls.property.getSystemPropertyUrl, {}).then(res => {
      if (res.code == code) {
        self.defaultTHeaderOptions = res.data
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
        self.customTHeaderOptions = res.data
      }
      else {
        console.log(msg.DEFAULT_MSG.SERVICEERRORMSG)
      }
    }).catch(error => {

    })
  },
  //查询成员数据列表
  getMemberListService(self) {
    console.log()
    var params = {
      groupIds: [self.groupEntity.id],
      curPage: self.currentPage
    }

    self.tableData = []
    self.$x.post(defaultUrls.group.getMemberListUrl, params).then(res => {
      console.log(res)
    }).catch(error => {

    })

    self.total = self.tableData.length
  },
  //清空群组
  getClearGroupService(self) {
    var msgTip = self.statisticsType == 1 ? msg.DEFAULT_MSG.ONLYDETELEMSG : msg.DEFAULT_MSG.MULTIPLEDETELEMSG
    self.$x.confirm(msgTip, '确认清空联系人', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      console.log('00000')
      console.log(self.currectNode)
      console.log(self.statisticsType)
      var params = {
        id: self.currectNode.key,
        hasSubGroup: self.statisticsType == 1 ? 0 : 1
      }

      self.$x.post(defaultUrls.group.clearGroupUrl, params).then(res => {
        if (res.success) {
          self.$x.toast(msg.DEFAULT_MSG.EMPTYSUCCESSMSG)
        }
        else {
          self.$x.toast(msg.DEFAULT_MSG.EMPTYERRORMSG)
        }
      }).catch(error => {
        console.log(error)
      })
    }).catch(() => {
      console.log('取消清空联系人')
    })
  },
  //删除群组
  getDeleteGroupService(self, type) {
    var params = {
      groupId: self.groupEntity.id,
      hasMember: self.isMember ? 1 : 0,
      hasSubGroup: self.isChildGroup ? 1 : 0,
      newGroupList: self.selectedData,
      isContainSelf: type == 'alldelete' ? 1 : 0
    }

    if (self.isMember) {
      params.memberOp = self.radioValue
    }

    self.$x.post(defaultUrls.group.deleteGroupUrl, params).then(res => {
      if (res.success) {
        self.isVisible = false
        //全部删除
        if (type == 'alldelete') {
          self.groupNode.parent.removeChild(self.groupNode)
        }
        //仅删除子级
        else {
          //如果子级点渲染的
          self.groupNode.isLeaf = true
          self.groupNode.isLeafByUser = true
          self.groupNode.childNodes = []
        }
        self.$x.toast(msg.DEFAULT_MSG.DELETESUCCESSMSG)
      }
      else {
        self.$x.toast(msg.DEFAULT_MSG.DELETEERRORMSG)
      }
    }).catch(err => {
      console.log(err.msg)
    })
  },
  //置顶
  getTopService(self, data) {
    self.$refs['groupForm'].popoverVisible = false
    self.$refs['groupForm'].dialogVisible = false

    var params = {
      id: data.id
    }

    self.$x.post(defaultUrls.topUrl, params).then(res => {

    })
  },
  //群组移动
  getGroupMoveDownService(self, targetNode) {
    var params = {
      groupId: self.currectNode.key,
      targetGroupId: targetNode[0].key
    }
    console.log(targetNode)
    console.log(self.currectNode)
    self.$x.post(defaultUrls.group.getGroupMoveDownUrl, params).then(res => {
      if (res.success) {
        self.currectNode.parent.removeChild(self.currectNode)
        var targetChildData = self.currectNode.data
        targetChildData.parentId = targetNode[0].key
        var targetCurrentNode = self.$refs['groupLeft'].getNode(targetNode[0].key)
        targetCurrentNode.data.childCount++
        targetCurrentNode.isLeaf = false
        targetCurrentNode.isLeafByUser = false
        targetCurrentNode.data.hasChildren = true
        targetCurrentNode.doCreateChildren([targetChildData])
        targetCurrentNode.expand()
      }
    }).catch(error => {

      console.log(error.msg)
    })
  }
}
