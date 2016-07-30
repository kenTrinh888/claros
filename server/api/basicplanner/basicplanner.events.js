/**
 * Basicplanner model events
 */

'use strict';

import {EventEmitter} from 'events';
import Basicplanner from './basicplanner.model';
var BasicplannerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BasicplannerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Basicplanner.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BasicplannerEvents.emit(event + ':' + doc._id, doc);
    BasicplannerEvents.emit(event, doc);
  }
}

export default BasicplannerEvents;
