/**
 * Driverplanner model events
 */

'use strict';

import {EventEmitter} from 'events';
import Driverplanner from './driverplanner.model';
var DriverplannerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DriverplannerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Driverplanner.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DriverplannerEvents.emit(event + ':' + doc._id, doc);
    DriverplannerEvents.emit(event, doc);
  }
}

export default DriverplannerEvents;
