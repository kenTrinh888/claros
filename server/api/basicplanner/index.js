'use strict';

var express = require('express');
var controller = require('./basicplanner.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/bootstrap/newdata', controller.bootstrap);

// router.delete('/removeAll', controller.destroy);

module.exports = router;
