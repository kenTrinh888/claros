'use strict';

import mongoose from 'mongoose';

var MasterplanSchema = new mongoose.Schema({
  name: String,
  info: String,
  date: Date,
  active: Boolean
});

export default mongoose.model('Masterplan', MasterplanSchema);
