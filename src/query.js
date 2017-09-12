function buildSearchOptions(search, keys) {

  return keys.map((key) => {
    return {
      key: key,
      value: new RegExp(search)
    }
  }).reduce((curr, acc) => {
    curr[acc.key] = acc.value
    return curr
  }, {})
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

function buildQueryOptions(querystring = {}, keys) {
  const options = {}

  if (querystring && querystring.q) {
    options.query = buildSearchOptions(querystring.q, keys)
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