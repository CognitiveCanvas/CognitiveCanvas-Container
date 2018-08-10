class Note {
  constructor (title, url) {
    this.title = title
    this.url = url
//    this.lastEditTime = null
//    this.ownerID = null
    this.edited = false
    this.permission = 'EDIT'
  }
}

export default Note
