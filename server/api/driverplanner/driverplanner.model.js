'use strict';

import mongoose from 'mongoose';

var DriverplannerSchema = new mongoose.Schema({
    name: String,
    BrandPromotion: Number,
    InstoreMarketing: Number,
    InstorePromotion: Number,
    CompetitorPromotion: Number,
    KOLActivity: [{
        ActivityName: String,
        Impact: Number
    }],
    Innovation: [{
        ActivityName: String,
        Impact: Number
    }],
    SalesandDiscount: [{
        ActivityName: String,
        Impact: Number
    }]
});

export default mongoose.model('Driverplanner', DriverplannerSchema);
