'use strict';

import mongoose from 'mongoose';

var PromotionscenarioSchema = new mongoose.Schema({
    name: String,
    drug: { type: mongoose.Schema.Types.ObjectId, ref: "drug" },
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
