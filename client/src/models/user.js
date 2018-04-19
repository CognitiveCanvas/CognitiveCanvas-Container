class User {
  constructor (email) {
    this.email = null
    this.name = null
  }

  /**
   * Sync user field from mongodb
   */
  sync () {

  }
}

class LocalUser extends User {
  constructor (email) {
    super(email)
    this.maps = []
    this.friends = []
  }
}

export default LocalUser

