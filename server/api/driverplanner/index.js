'use strict';

var express = require('express');
var controller = require('./driverplanner.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:drugID/:masterplanID', controller.findByDrugandPlan);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.post('/bootstrap/newdata', controller.bootstrap);
router.delete('/:id', controller.destroy);
router.delete('/removeAll/clean', controller.removeAll);
router.delete('/removePlan/:masterplanID', controller.findByplanAndRemove);

module.exports = router;
