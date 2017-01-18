'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var PromotionscenarioSchema = new mongoose.Schema({
    name: String,
    drug: { type: Schema.ObjectId, ref: "Drug" },
    masterplan: { type: Schema.ObjectId, ref: "Masterplan" },
    promotionactivity: String,
    interval: Number,
    frequency: Number,
    discount: Number,
    All: Number,
    Government: Number,
    Hospital: Number,
    Pharmacy: Number,
});

export default mongoose.model('Promotionscenario', PromotionscenarioSchema);
