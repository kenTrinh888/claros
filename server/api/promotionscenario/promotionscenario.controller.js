/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/promotionscenarios              ->  index
 * POST    /api/promotionscenarios              ->  create
 * GET     /api/promotionscenarios/:id          ->  show
 * PUT     /api/promotionscenarios/:id          ->  update
 * DELETE  /api/promotionscenarios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Promotionscenario from './promotionscenario.model';
var Drug = require('../drug/drug.model');
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Promotionscenarios
export function index(req, res) {
    return Promotionscenario.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Promotionscenario from the DB
export function show(req, res) {
    return Promotionscenario.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Promotionscenario in the DB
export function create(req, res) {
    return Promotionscenario.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Promotionscenario in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Promotionscenario.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Promotionscenario from the DB
export function destroy(req, res) {
    return Promotionscenario.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

// Empty New Data
exports.removeAll = function(req, res) {

    Promotionscenario.remove(function(err) {
        if (err) {
            handleError(res)
        }
    }).then(() => {
         res.send("finished destroy Promotion Planner")
    });
}


//POST new Data
export function bootstrap(req, res) {
    Promotionscenario.remove(function(err) {
        if (err) {
            handleError(res)
        }
    }).then(() => {
        Promotionscenario.create(req.body)
    }).then(() => {
        res.send("Finish Populate Promotionscenario Planner")
    });
}

//FIND Scenario by Drug and Plan
exports.findByDrugandPlan = function(req, res) {

    Promotionscenario.find({ drug: req.params.drugID, masterplan: req.params.masterplanID })
        .populate('Promotionscenario drug masterplan')
        .exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

//FIND plan and remove
exports.findByplanAndRemove = function(req, res) {
    Promotionscenario.find({ masterplan: req.params.masterplanID })
        .remove(function(err) {
            if (err) {
                handleError(res)
            }
        }).then(() => {
            res.send("destroy Promotionscenario Planner")
        }).then(respondWithResult(res))
}