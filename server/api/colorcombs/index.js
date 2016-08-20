'use strict';

var express = require('express');
var controller = require('./colorcombs.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/:id', controller.show);
router.post('/create', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/', controller.destroyAll);
router.delete('/:id', controller.destroy);

module.exports = router;
