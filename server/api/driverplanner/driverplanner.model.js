'use strict';

import mongoose from 'mongoose';

var DriverplannerSchema = new mongoose.Schema({
    name: String,
    drug: { type: mongoose.Schema.Types.ObjectId, ref: "drug" },
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
    }
});

export default mongoose.model('Driverplanner', DriverplannerSchema);
