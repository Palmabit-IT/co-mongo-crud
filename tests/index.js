'use strict'

const MongoClient = require('mongodb').MongoClient

const chai = require('chai')
const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)

const stringConnection = 'mongodb://localhost:27017/co-mongo-crud-test'
const tableName = 'posts'

const Crud = require('../src/crud')

describe('CRUD', () => {

  beforeEach((done) => {

    MongoClient.connect(stringConnection, (err, db) => {

      let collection = db.collection(tableName)
      collection.remove(() => {
        db.close()
        done()
      })

    })
  })

  after((done) => {
    MongoClient.connect(stringConnection, (err, db) => {

      let collection = db.collection(tableName)
      collection.remove(() => { 
        db.close()
        done()
      })

    })
  })

  const crud = new Crud(stringConnection, tableName)

  it('is an instance of vehicle', () => {
    expect(crud).to.be.an.instanceof(Crud)
  })

  it('should have list method', () => {
    expect(typeof crud.list).to.be.equal('function')
  })

  it('should have get method', () => {
    expect(typeof crud.getOne).to.be.equal('function')
  })

  it('should have create method', () => {
    expect(typeof crud.add).to.be.equal('function')
  })

  it('should have update method', () => {
    expect(typeof crud.update).to.be.equal('function')
  })

  it('should have delete method', () => {
    expect(typeof crud.remove).to.be.equal('function')
  })

})

