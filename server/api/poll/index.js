'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.poll);
router.post('/create', controller.create);
router.post('/vote', controller.vote);

module.exports = router;