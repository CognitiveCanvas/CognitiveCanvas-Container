class User {
  constructor (email) {
    this.email = email
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
  }
}

export default LocalUser
