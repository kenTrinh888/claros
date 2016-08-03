'use strict';

import mongoose from 'mongoose';

var MasterplanSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Masterplan', MasterplanSchema);
