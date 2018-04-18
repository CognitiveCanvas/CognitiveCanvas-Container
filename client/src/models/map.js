class Map {
  constructor (id) {
    this.id = id
    this.lastEditTime = null
    this.ownerID = null
    this.permission = 'EDIT'
  }
}

module.exports.Map = Map
