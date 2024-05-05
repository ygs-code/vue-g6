/*
 * @Date: 2022-04-11 15:11:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-30 14:03:42
 * @FilePath: /base-admin/src/utils/index.js
 * @Description:
 */
import { throttle, stabilization, statusThrottle, debounce } from './throttlingStabilization'
// import {
//     deepCopy
// } from './deepCopy'
import { SubscribePublished } from './SubscribePublished'
import { CheckDataType, numToThousands } from './CheckDataType'
// import { historyPush, redirectTo, navigateTo, openWindow } from './historyPush'
 
import {
  filterTreeData,
  getPrefixTreeData,
  recursionTreeData,
  deepCopy,
  diffData,
  findTreeData,
  findTreePath,
  transformData,
  mergeData,
  mapTreeData
} from './ergodic'
import { getLocationSearchParams } from './resolveLocationParams'
import { FloatingBall } from './FloatingBall'
import { getStyle } from './getCssAttr'
import modalContentStyle from './modalContentStyle'
import store from './store'
import diff from './diff'
 
export {
  getPrefixTreeData,
  transformData,
  mergeData,
  modalContentStyle,
  FloatingBall, // 浮动球 类
  throttle, // 节流函数
  stabilization, // 防抖函数
  debounce,
  statusThrottle, //  状态拦截器
  deepCopy, // 深度拷贝
  SubscribePublished, // 订阅发布
  CheckDataType, // 检查数据类型

  findTreePath, // 用于 查找 树 形结构数据，形成一个路劲数组
  filterTreeData, //  过滤树数据结构
  recursionTreeData, // 递归循环树数据
  diffData, // 比较新旧两个数据
  findTreeData, //搜索到树数据的某一条数据单条 不包括父层数据的
  getLocationSearchParams, //解析get方式地址栏参数
   

  getStyle,
  store, // 缓存
  diff,
  mapTreeData
}
