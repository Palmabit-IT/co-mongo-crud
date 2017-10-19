'use strict'

const buildQueryOptions = require('./../src/query')

const chai = require('chai')
const expect = chai.expect

describe('buildQueryOptions', () => {

  it('should build query options', done => {

    const queryString = {
      "keywords": [
        "title"
      ],
      "lang": "it",
      "limit": "10000",
      "page": "1",
      "search": "pippo",
      "sort": "-date"
    }

    const options = buildQueryOptions(queryString)
    const query = options && options.query
    const $or = query && query.$or
    const title = $or && $or[0] && $or[0].title
    if (title) options.query.$or[0].title = title.toString()

    const expected = {
      "query": {
        "$or": [
          {
            "title": "/.*pippo.*/i"
          }
        ]
      },
      "sort": {
        "date": -1
      },
      "limit": 10000
    }

    expect(options).to.deep.equal(expected)

    done()
  })
})