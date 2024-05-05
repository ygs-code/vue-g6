class Store {
  constructor(name = 'store') {
    this.name = name
    this[name] = {}
  }
  get(key) {
    /* eslint-disable*/
    if (key in this[this.name] && this[this.name].hasOwnProperty(key) && this[this.name][key]) {
      return this[this.name][key]
    }
    // this.set(key, {})
    return null
    /* eslint-disable*/
  }
  set(key, value) {
    this[this.name] = {
      ...this[this.name],
      [key]: value,
    }
  }
  del(key) {
    delete this[this.name][key]
  }
  delAll() {
    this[this.name] = {}
  }
}
export { Store }
export default new Store()
