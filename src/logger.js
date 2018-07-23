const pino = require('pino')

const pretty = pino.pretty()
pretty.pipe(process.stdout)

const logger = pino({
  name: process.env.APP_NAME,
  level: process.env.LOG_LEVEL || 'debug',
  safe: true
}, pretty)

module.exports = logger
