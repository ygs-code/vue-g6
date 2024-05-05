/*
 * @Date: 2022-01-11 11:43:11
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-01-11 14:38:08
 * @FilePath: /base-admin/src/utils/modalContentStyle.js
 * @Description:
 */

export default (rows = 2, rowHeight = 50) => {
  let height = document.body.clientHeight - (300 + rows * rowHeight)
  height = height <= 200 ? 200 : height
  height = `${height}px`
  return {
    height,
    overflow: 'auto',
  }
}
