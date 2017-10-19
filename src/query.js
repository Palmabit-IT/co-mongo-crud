function buildSearchOptions(search, keys) {

  return keys.map(key => ({ [key]: new RegExp(`.*${search}.*`, 'i') }))
}

function buildSortOptions(sort) {
  return getSortObj(sort).map((item) => {
    return buildSortObj(item)
  }).reduce((o, key) => {
    return Object.assign(o, key)
  }, {})
}

function buildLimitOptions(limit) {
  return parseInt(limit, 10)
}

function buildSkipOptions(skip) {
  return parseInt(skip, 10)
}

function getSortObj(sort) {
  return sort.split(',', 2)
}

function buildSortObj(item) {
  const sortObj = {}
  let order = item.slice(0, 1)
  const field = item.slice(1)
  order = order === '-' ? -1 : 1
  sortObj[field] = order
  return sortObj
}

function buildQueryOptions(querystring = {}) {
  const options = {}

  if (querystring && querystring.search && querystring.keywords) {
    const keywords = Array.isArray(querystring.keywords) ? querystring.keywords : [querystring.keywords]
    options.query = { $or: buildSearchOptions(querystring.search, keywords) }
  }

  if (querystring && querystring.sort) {
    options.sort = buildSortOptions(querystring.sort)
  }

  if (querystring && querystring.skip) {
    options.skip = buildSkipOptions(querystring.skip)
  }
  if (querystring && querystring.limit) {
    options.limit = buildLimitOptions(querystring.limit)
  }
  return options
}

module.exports = buildQueryOptions