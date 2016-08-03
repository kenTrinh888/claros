/**
 * Masterplan model events
 */

'use strict';

import {EventEmitter} from 'events';
import Masterplan from './masterplan.model';
var MasterplanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MasterplanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Masterplan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MasterplanEvents.emit(event + ':' + doc._id, doc);
    MasterplanEvents.emit(event, doc);
  }
}

export default MasterplanEvents;
