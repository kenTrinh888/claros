/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/basicplanners              ->  index
 * POST    /api/basicplanners              ->  create
 * GET     /api/basicplanners/:id          ->  show
 * PUT     /api/basicplanners/:id          ->  update
 * DELETE  /api/basicplanners/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Basicplanner from './basicplanner.model';
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

// Gets a list of Basicplanners
export function index(req, res) {
    return Basicplanner.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Basicplanner from the DB
export function show(req, res) {
    return Basicplanner.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Basicplanner in the DB
export function create(req, res) {
    return Basicplanner.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Basicplanner in the DB
export function update(req, res) {
    // console.log(req.body)
    if (req.body._id) {
        delete req.body._id;
    }
    return Basicplanner.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Basicplanner from the DB
export function destroy(req, res) {
    return Basicplanner.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

// Empty and Insert New Data
exports.bootstrap = function(req, res) {

    Basicplanner.remove(function(err) {
        if (err) {
            handleError(res)
        }
    }).then(() => {
        Basicplanner.create(req.body)
    }).then(() => {
        res.send('finished populating Basic Planner')

    });
}


// Empty New Data
exports.removeAll = function(req, res) {

    Basicplanner.remove(function(err) {
        if (err) {
            handleError(res)
        }
    }).then(() => {
        res.send('finished destroy Basic Planner')

    });
}

//FIND Scenario by Drug and Plan
exports.findByDrugandPlan = function(req, res) {
    console.log(req.params.drugID);
    console.log(req.params.masterplanID);

    Basicplanner.find({ drug: req.params.drugID, masterplan: req.params.masterplanID })
        .populate('Basicplanner drug masterplan')
        .exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

//FIND plan and remove
exports.findByplanAndRemove = function(req, res) {
    Basicplanner.find({ masterplan: req.params.masterplanID })
        .remove(function(err) {
            if (err) {
                handleError(res)
            }
        }).then(() => {

            res.send("Finish find plan and Remove")
        }).then(respondWithResult(res))
}
