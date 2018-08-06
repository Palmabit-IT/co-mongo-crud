const co = require('co')
const logger = require('./logger')
const connectToDatabase = require('./db')

function closeDB(db, closeDB) {
  if (closeDB && db) {
    db.close();
  }
}
class Crud {

  constructor(stringConnection, collectionName, closeDB) {
    this.STRING_CONNECTION = stringConnection
    this.COLLECTION_NAME = collectionName
    this.CLOSE_DB = closeDB
  }

  list({ query = {}, sort = {}, skip = 0, limit = 10 }, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const docs = yield col.find(query).sort(sort).skip(skip).limit(limit).toArray()

      closeDB(db, CLOSE_DB);

      callback(null, docs)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)
    })
  }

  aggregate({ stages = [], sort = { createdAt: -1 }, skip = 0, limit = 10 }, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const docs = yield col.aggregate(stages).sort(sort).skip(skip).limit(limit).toArray()

      closeDB(db, CLOSE_DB);

      callback(null, docs)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)

    })
  }

  add(doc, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      doc.createdAt = new Date()
      const res = yield col.insertOne(doc)

      closeDB(db, CLOSE_DB);

      callback(null, res.ops[0])

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)
    })
  }

  update(id, doc, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
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

      closeDB(db, CLOSE_DB);

      callback(null, res.value)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)

    })
  }

  remove(id, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const res = yield col.deleteOne({
        _id: id
      })

      closeDB(db, CLOSE_DB);

      callback(null, res)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)
    })
  }

  getOne(query, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const res = yield col.findOne(query)

      closeDB(db, CLOSE_DB);

      callback(null, res)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)
    })
  }

  count(query, callback) {

    const STRING_CONNECTION = this.STRING_CONNECTION
    const COLLECTION_NAME = this.COLLECTION_NAME
    const CLOSE_DB = this.CLOSE_DB

    let db;

    co(function* () {

      db = yield connectToDatabase(STRING_CONNECTION)
      const col = db.collection(COLLECTION_NAME)

      logger.info('Successfully connect to: ', STRING_CONNECTION)
      const count = yield col.count(query)

      closeDB(db, CLOSE_DB);

      callback(null, count)

    }).catch((err) => {
      logger.error(err)
      closeDB(db, CLOSE_DB);
      callback(err)

    })
  }
}

module.exports = Crud
