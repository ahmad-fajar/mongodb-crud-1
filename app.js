'use strict'

// requires
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const app = express();

// connect mongo
// const url = 'mongodb://hacktiv8:hacktiv8Super@cluster0-shard-00-00-remkh.mongodb.net:27017,cluster0-shard-00-01-remkh.mongodb.net:27017,cluster0-shard-00-02-remkh.mongodb.net:27017/mongodb-crud?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'   // atlas
const url = 'mongodb://localhost:27017/library'   // local 
MongoClient.connect(url, (err) => {
  if (err) console.log(err)
  console.log(' --- Database Connected --- ')
})

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/*+json'}));
app.use(bodyParser.json({ type : 'application/x-www-form-urlencoded'}));


// routes
const books = require('./routes/bookRoutes')

app.get('/', (req, res) => res.send('Index Page'))
app.use('/books', books)


app.listen(3000, () => console.log('--- Listening on port 3000 ---'))