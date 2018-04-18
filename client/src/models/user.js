class User {
  constructor (id) {
    this.id = id
    this.email = null
    
  }
}

class LocalUser extends User {
  constructor (id) {
    super(id)
    this.maps = []
  }
}

module.exports = {
  User: User,
  LocalUser: LocalUser
}
