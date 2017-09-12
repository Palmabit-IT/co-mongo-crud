const logger = require('./logger')
const MongoClient = require('mongodb')

let cachedDb = null

function connectToDatabase(uri) {

  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    logger.info('using cached database instance')
    return Promise.resolve(cachedDb)
  }

  logger.info(`open new database instance ${uri}`)
  return MongoClient.connect(uri)
    .then(db => {
      cachedDb = db
      return cachedDb
    })
}

module.exports = connectToDatabase
