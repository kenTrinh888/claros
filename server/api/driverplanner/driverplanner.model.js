'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var DriverplannerSchema = new mongoose.Schema({
    name: String,
    drug: { type: Schema.ObjectId, ref: "Drug" },
    masterplan: { type: Schema.ObjectId, ref: "Masterplan" },
    ExpectedRev: [{
        channel: String,
        revenue: Number
    }],
    KOLActivity: {
        name: String,
        cost: Number,
        expectRevenue: Number,
        activities: [{
            ActivityName: String,
            Impact: Number,
            options : {
            }
        }]
    },
    Innovation: {
        name: String,
        cost: Number,
        expectRevenue: Number,
        activities: [{
            ActivityName: String,
            Impact: Number,
        }]
    },
    Sales: {
        name: String,
        cost: Number,
        expectRevenue: Number,
        activities: [{
            ActivityName: String,
            Impact: Number,
        }]
    },
    monthlyplan : {
        monthlybudget:[{driver:String,month:[]}],
        sizeX: Number,
        sizeY: Number
    }
});

export default mongoose.model('Driverplanner', DriverplannerSchema);
