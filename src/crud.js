const co = require('co')
const logger = require('./logger')
const connectToDatabase = require('./db')

class Crud {

  constructor(stringConnection, collectionName) {
    this.STRING_CONNECTION = stringConnection
    this.COLLECTION_NAME = collectionName
  }

  list({ query = {}, sort = [], skip = 0, limit = 10 }, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const docs = yield col.find(query).sort(sort).skip(skip).limit(limit).toArray()

      callback(null, docs)

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }

  aggregate({ stages = [], sort = { createdAt: -1 }, skip = 0, limit = 10 }, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const docs = yield col.aggregate(stages).sort(sort).skip(skip).limit(limit).toArray()

      callback(null, docs)

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }

  add(doc, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      doc.createdAt = new Date()
      const res = yield col.insertOne(doc)

      callback(null, res.ops[0])

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }

  update(id, doc, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)

      doc.updatedAt = new Date()
      const res = yield col.findOneAndUpdate({
        _id: id
      }, {
        $set: doc
      }, {
        returnOriginal: false
      })
      callback(null, res.value)

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }

  remove(id, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const res = yield col.deleteOne({
        _id: id
      })

      callback(null, res)

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }

  getOne(query, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME

    co(function*() {

      const db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const res = yield col.findOne(query)
      callback(null, res)

    }).catch((err) => {
      logger.error(err)
      callback(err)

    })
  }
}

module.exports = Crud
