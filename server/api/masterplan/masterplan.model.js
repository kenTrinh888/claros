'use strict';

import mongoose from 'mongoose';
var MasterplanSchema = new mongoose.Schema({
  name: String,
  userName : String,
  info: String,
  date: Date,
  basicPlannerBaseCase: Number,
  promotionNumberofMonth: Number,
  active: Boolean
});

export default mongoose.model('Masterplan', MasterplanSchema);
