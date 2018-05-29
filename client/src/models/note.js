class Note {
  constructor (title, url) {
    this.title = title
    this.url = url
    this.lastEditTime = null
    this.ownerID = null
    this.permission = 'EDIT'
  }
}

export default Note
