/*****************************************************************
 ** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
 ** 创建人:      hc
 ** 创建日期:    2018/2/7
 ** 修改人:
 ** 修改日期:
 ** 描 述:  tree core扩展方法
 **-----------------------------------------------------------------
 ******************************************************************/

export default {
  nodeData: [],
  getNodeData(treeData, key) {
    for (var i = 0; i < treeData.length; i++) {
      var obj = treeData[i]
      if (!obj || !obj.id) {
        continue
      }

      if (obj.id == key) {
        this.nodeData.push(obj)
      }

      if (obj.childNodes && obj.childNodes.length > 0) {
        this.getNodeData(obj.childNodes, key)
      }
      else {
        continue
      }
    }

    return this.nodeData
  }
}
