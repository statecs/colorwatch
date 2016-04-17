'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

router.put('/newpolls', controller.newpolls);
router.get('/', controller.list);
router.put('/', controller.update);
router.delete('/', controller.destroy);

module.exports = router;
