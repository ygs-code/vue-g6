import React, { Component, createElement } from 'react'
export default (target) => {
  return class extends target {
    findParentNode = (node, nodeDataArray, linkDataArray, callback = (node, childrenNodeIndex, childrenLinksIndex) => true) => {
      let { key, type, from } = node || {}
      if (!node || !key) {
        return false
      }
      let parentNode = null
      let parentNodeIndex = []
      let parentLinksIndex = []

      if (type == 'link') {
        parentNode = nodeDataArray.find((item) => {
          return from == item.key
        })
        key = parentNode.key
        parentNodeIndex = nodeDataArray.findIndex((item) => {
          return from == item.key
        })
        callback(parentNode, [parentNodeIndex], parentLinksIndex)
      }

      const linkDatas = linkDataArray.filter((item, index) => {
        if (key == item.to) {
          parentLinksIndex.push(index)
          return true
        }
      })

      for (let item of linkDatas) {
        const { from } = item

        parentNode = nodeDataArray.find((item) => {
          return from == item.key
        })
        parentNodeIndex = nodeDataArray.findIndex((item) => {
          return from == item.key
        })

        if (parentNode && callback(parentNode, [parentNodeIndex], parentLinksIndex)) {
          this.findParentNode(parentNode, nodeDataArray, linkDataArray, callback)
        }
      }
    }
    findChildrenNode = (node, nodeDataArray, linkDataArray, callback = (node, childrenNodeIndex, childrenLinksIndex) => true) => {
      let { key, type, to } = node || {}
      if (!node || !key) {
        return false
      }
      let childrenNode = null
      let childrenNodeIndex = []
      let childrenLinksIndex = []

      if (type == 'link') {
        childrenNode = nodeDataArray.find((item) => {
          return to == item.key
        })
        key = childrenNode.key
        childrenNodeIndex = nodeDataArray.findIndex((item) => {
          return to == item.key
        })
        callback(childrenNode, [childrenNodeIndex], childrenLinksIndex)
      }

      const linkDatas = linkDataArray.filter((item, index) => {
        if (key == item.from) {
          childrenLinksIndex.push(index)
          return true
        }
      })

      for (let item of linkDatas) {
        const { to } = item

        childrenNode = nodeDataArray.find((item) => {
          return to == item.key
        })
        childrenNodeIndex = nodeDataArray.findIndex((item) => {
          return to == item.key
        })

        if (childrenNode && callback(childrenNode, [childrenNodeIndex], childrenLinksIndex)) {
          this.findChildrenNode(childrenNode, nodeDataArray, linkDataArray, callback)
        }
      }
    }

    // }
    // 过滤去重排序
    filterReorder = (arr) => {
      return arr
      // return [...new Set([...arr])].sort((a, b) => {
      //   return b - a
      // })
    }
    // 删除
    deleteArr = (arr, indexs) => {
      return arr.filter((item, index) => {
        return !indexs.includes(index)
      })

      // for (let index of indexs) {
      //   // if (index == -1) {
      //   //   continue
      //   // }
      //   arr.splice(index, 1)
      // }
      // return arr
    }

    deleteNodeAndLink = (node, nodeDataArray, linkDataArray) => {
      const { nodeType, group } = node
      let childrenNodeIndexs = []
      let childrenLinksIndexs = []

      // 循环子节点 拿到字节点 并且删除掉 子节点
      this.findChildrenNode(node, nodeDataArray, linkDataArray, (node, childrenNodeIndex, childrenLinksIndex) => {
        childrenNodeIndexs = childrenNodeIndexs.concat(childrenNodeIndex)
        childrenLinksIndexs = childrenLinksIndexs.concat(childrenLinksIndex)
        return  true
      })

      if (nodeType == 303) {
        let childrenNodeIndex = nodeDataArray.findIndex((item) => {
          return item.isGroup && item.key === group
        })

        childrenNodeIndexs = childrenNodeIndexs.concat([childrenNodeIndex])
      }

      for (let index = childrenNodeIndexs.length - 1; index >= 0; index--) {
        const { nodeType, group } = nodeDataArray[childrenNodeIndexs[index]]
        if (nodeType == 303) {
          let childrenNodeIndex = nodeDataArray.findIndex((item) => {
            return item.isGroup && item.key === group
          })
          if (childrenNodeIndex >= 0) {
            childrenNodeIndexs.push(childrenNodeIndex)
          }
        }
      }

      return {
        nodeDataArray: this.deleteArr(nodeDataArray, this.filterReorder(childrenNodeIndexs)),
        linkDataArray: this.deleteArr(linkDataArray, this.filterReorder(childrenLinksIndexs)),
      }
    }
  }
}
