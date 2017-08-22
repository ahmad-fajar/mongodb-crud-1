'use strict'

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


// connect mongo
// const url = 'mongodb://hacktiv8:hacktiv8Super@cluster0-shard-00-00-remkh.mongodb.net:27017,cluster0-shard-00-01-remkh.mongodb.net:27017,cluster0-shard-00-02-remkh.mongodb.net:27017/mongodb-crud?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'   // atlas
const url = 'mongodb://localhost:27017/library'   // local 
const connect = MongoClient.connect(url);


// create
exports.addBook = (req, res) => {
  let data = {
    isbn     : req.body.isbn,
    title    : req.body.title,
    author   : req.body.author,
    category : req.body.category,
    stock    : req.body.stock 
  }

  connect
  .then(db => {
    db.collection('Books').insertOne(data)
    .then(inserted => res.send(inserted))
    .catch(e => res.send(e))
  })
  .catch(e => res.send(e))
}


// read
exports.findAllBook = (req, res) => {
  connect
  .then(db => {
      console.log('aaa')
    db.collection('Books').find().toArray()
    .then(books => {
      res.send(books)
    })
    .catch(e => res.send(e))
  })
  .catch(e => res.send(e))
}


exports.findBookById = (req, res) => {
  connect
  .then(db => {
    db.collection('Books').findOne({ _id : ObjectID(req.params.id) })
    .then(books => (res.send(books)))
    .catch(e => res.send(e))
  })
  .catch(e => res.send(e))
}


// update
exports.updateBook = (req, res) => {
  connect
  .then(db => {
    db.collection('Books').findOne({ _id : ObjectID(req.params.id) })
    .then(books => {
      let updater = {
        isbn     : req.body.isbn     || books.isbn,
        title    : req.body.title    || books.isbn,
        author   : req.body.author   || books.author,
        category : req.body.category || books.category,
        stock    : req.body.stock    || books.stock
      }
      db.collection('Books').updateOne({ _id : ObjectID(req.params.id) }, { $set : updater })
      .then(info => res.send(info))
      .catch(e => res.send(e))
    })
    .catch(e => res.send(e))
  })
}


// delete
exports.deleteBook = (req, res) => {
  connect
  .then(db => {
    db.collection('Books').deleteOne({ _id : ObjectID(req.params.id) })
    .then(deleted => res.send(deleted))
    .catch(e => res.send(deleted))
  })
}
