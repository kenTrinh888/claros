'use strict';

import mongoose from 'mongoose';

var PromotionscenarioSchema = new mongoose.Schema({
    name: String,
    drug: { type: mongoose.Schema.Types.ObjectId, ref: "drug" },
    promotionactivity: String,
    activity :[
    {
    name: String,
    budget: Number,
    interval: Number,
    frequency: Number,
    discount: Number,
    }
    ],
    col: Number,
    row: Number,
    sizeY: Number,
    sizeX: Number,
    All: Number,
    Government: Number,
    Hospital: Number,
    Pharmacy: Number,
    Grofers: Number,
    Freshdirect: Number,
    Localbanya: Number,
    Bigbasket: Number,
    Naturesbasket: Number
});

export default mongoose.model('Promotionscenario', PromotionscenarioSchema);
