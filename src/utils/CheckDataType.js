/*
 * @Author: your name
 * @Date: 2021-12-27 17:58:03
 * @LastEditTime: 2022-02-18 10:29:35
 * @LastEditors: Yao guan shou
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /base-admin/src/utils/CheckDataType.js
 */
// js校验数据类型
export class CheckDataType {
  static init(type) {
    // 校验的数据类型
    this.dataType = {
      string: 'string',
      number: 'number',
      boolean: 'boolean',
      null: 'null',
      undefined: 'undefined',
      symbol: 'symbol',
      object: 'object',
      array: 'array',
      regexp: 'regexp',
      function: 'function',
      promise: 'promise',
    }
    return (type in this.dataType && this.dataType.hasOwnProperty(type) && this.dataType[type]) || false
  }
  static isString(data) {
    return this.init('string') && this.init('string') === this.checkType(data) ? true : false
  }
  static isNumber(data) {
    return this.init('number') && this.init('number') === this.checkType(data) ? true : false
  }
  static isBoolean(data) {
    return this.init('boolean') && this.init('boolean') === this.checkType(data) ? true : false
  }
  static isNull(data) {
    return this.init('null') && this.init('null') === this.checkType(data) ? true : false
  }
  static isUndefined(data) {
    return this.init('undefined') && this.init('undefined') === this.checkType(data) ? true : false
  }
  static isSymbol(data) {
    return this.init('symbol') && this.init('symbol') === this.checkType(data) ? true : false
  }
  static isObject(data) {
    return this.init('object') && this.init('object') === this.checkType(data) ? true : false
  }
  static isArray(data) {
    return this.init('array') && this.init('array') === this.checkType(data) ? true : false
  }
  static isRegexp(data) {
    return this.init('regexp') && this.init('regexp') === this.checkType(data) ? true : false
  }
  static isFunction(data) {
    return this.init('function') && this.init('function') === this.checkType(data) ? true : false
  }
  static isPromise(data) {
    return this.init('promise') && this.init('promise') === this.checkType(data) ? true : false
  }
  static checkType(data) {
    return Object.prototype.toString.call(data).toLowerCase().slice(8, -1)
  }
  static isNaN(data) {
    return isNaN(data)
  }
  static isStringNumber(data) {
    return !isNaN(parseFloat(data))
  }
}
// 数字分割
export const toThousands = (num) => {
  num = (num || 0).toString()
  var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
  return num.replace(re, '$1,')
}

// 数字分割包含判断是否是数字和默认值
export const numToThousands = (num, defaultSymbol = '---') => {
  return CheckDataType.isStringNumber(num) ? toThousands(num) : defaultSymbol
}
