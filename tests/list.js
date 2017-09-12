'use strict'

const MongoClient = require('mongodb').MongoClient

const chai = require('chai')
const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)

const stringConnection = 'mongodb://localhost:27017/co-mongo-crud-test'
const tableName = 'posts'

const Crud = require('../src/crud')

const fakePost = {
  title: 'post',
  author: 'palmabit'
}

describe('LIST', () => {

  beforeEach((done) => {

    MongoClient.connect(stringConnection, (err, db) => {

      let collection = db.collection(tableName)
      collection.remove()
      db.close()
      done()

    })
  })

  after((done) => {
    MongoClient.connect(stringConnection, (err, db) => {

      let collection = db.collection(tableName)
      collection.remove()
      db.close()
      done()

    })
  })

  const crud = new Crud(stringConnection, tableName)

  it('should return an empty array', (done) => {
    crud.list({}, (err, docs) => {
      expect(docs).to.be.deep.equal([])
      done()
    })
  })

  it('should return an array', (done) => {

    crud.add(fakePost, (err, docs) => {

      crud.list({}, (err, docs) => {
        expect(docs.length).to.be.equal(1)
        expect(docs[0].title).to.be.equal('post')
        done()
      })
    })
  })

  it('should filter an array', (done) => {

    crud.add(fakePost, (err, docs) => {

      crud.list({ query: { author: 'palmabit' } }, (err, docs) => {
        expect(docs.length).to.be.equal(1)
        expect(docs[0].title).to.be.equal('post')

        done()
      })
    })
  })

})

