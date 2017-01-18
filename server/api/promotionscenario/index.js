'use strict';

var express = require('express');
var controller = require('./promotionscenario.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:drugID/:masterplanID', controller.findByDrugandPlan);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/bootstrap/newdata', controller.bootstrap);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/removeAll/clean', controller.removeAll);
router.delete('/removePlan/:masterplanID', controller.findByplanAndRemove);

module.exports = router;
