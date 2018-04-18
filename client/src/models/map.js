var arr = [];

class Map {
  constructor (id) {
    this.id = id
    this.lastEditTime = null
    this.ownerID = null
    this.permission = 'EDIT'
  }

  getAll () {
    return arr;
  }

  append () {
    arr.push(new Map(1))
  }
}

module.exports.Map = Map
