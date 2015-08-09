'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

router.get('/newpolls', controller.newpolls);
router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.poll);
router.post('/create', controller.create);

module.exports = router;