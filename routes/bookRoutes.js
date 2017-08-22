'use strict'

const router = require('express').Router();
const ctrl = require('../controllers/bookControllers');

// route test
// router.get('/', (req, res) => res.send('Book Index'))

// create
router.post('/', ctrl.addBook)

// read
router.get('/', ctrl.findAllBook)
router.get('/:id', ctrl.findBookById)

// update
router.put('/:id', ctrl.updateBook)

// delete
router.delete('/:id', ctrl.deleteBook)

module.exports = router;