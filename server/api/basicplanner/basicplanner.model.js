'use strict';

import mongoose from 'mongoose';

var BasicplannerSchema = new mongoose.Schema({
    drug: { type: mongoose.Schema.Types.ObjectId, ref: "drug" },
    price: Boolean,
    eventName: String,
    expectedRevenue:Number,
    // col: Number,
    // row: Number,
    // sizeY: Number,
    // sizeX: Number,
    quarters: [{
            quaterName: String,
            quarterSpend: Number,
            quaterImpact: Number,
            quarterCases: [
                { quarterCase: String, quaterCaseImpact: Number }
            ]
        }]
});

export default mongoose.model('Basicplanner', BasicplannerSchema);
