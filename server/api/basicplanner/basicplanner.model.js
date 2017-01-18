'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var BasicplannerSchema = new mongoose.Schema({
    drug: { type: Schema.ObjectId, ref: "Drug" },
    masterplan: { type: Schema.ObjectId, ref: "Masterplan" },
    price: Boolean,
    eventName: String,
    expectedRevenue:Number,
    quarters: [{
            quaterName: String,
            quarterSpend: Number,
            quarterImpact: Number,
            quarterCases: [
                { quarterCase: String, 
                  quarterCaseImpact: Number,
                  quarterCaseSpend: Number
              }
            ]
        }]
});

export default mongoose.model('Basicplanner', BasicplannerSchema);
