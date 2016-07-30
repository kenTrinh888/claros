'use strict';

import mongoose from 'mongoose';

var DrugSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Drug', DrugSchema);
