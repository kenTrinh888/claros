/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/driverplanners              ->  index
 * POST    /api/driverplanners              ->  create
 * GET     /api/driverplanners/:id          ->  show
 * PUT     /api/driverplanners/:id          ->  update
 * DELETE  /api/driverplanners/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Driverplanner from './driverplanner.model';

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

// Gets a list of Driverplanners
export function index(req, res) {
  return Driverplanner.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Driverplanner from the DB
export function show(req, res) {
  return Driverplanner.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Driverplanner in the DB
export function create(req, res) {
  return Driverplanner.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Driverplanner in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Driverplanner.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Driverplanner from the DB
export function destroy(req, res) {
  return Driverplanner.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//POST new Data
export function bootstrap(req, res) {
    Driverplanner.remove(function(err) {
        if (err) {
            handleError(res)
        }
    }).then(() => {
      console.log(req.body)
        Driverplanner.create(req.body)
    }).then(() => {
        console.log('finished populating Driverplanner Planner');
    });
}