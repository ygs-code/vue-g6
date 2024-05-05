//解析地址栏参数
export const getLocationSearchParams = (searchStr) => {
  let search = searchStr || window.location.search
  if (search) {
    search = search.substr(1)
    let searchArr = search.split('&')
    let objParameter = {}
    searchArr.forEach((target) => {
      let parameter = target.split('=')
      objParameter[parameter[0]] = parameter[1]
    })
    return objParameter
  }
  return null
}
