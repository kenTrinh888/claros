/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Drug from '../api/drug/drug.model';
import PromotionScenario from '../api/promotionscenario/promotionscenario.model';
import BasicPlanner from '../api/basicplanner/basicplanner.model';
import DriverPlanner from '../api/driverplanner/driverplanner.model';
import MasterPlan from '../api/masterplan/masterplan.model';


User.find({}).remove()
    .then(() => {
        User.create({
                provider: 'local',
                name: 'Swapnil',
                role: 'CPG',
                email: 'Swap@graphenesvc.com',
                password: 'swap'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@graphenesvc.com',
                password: 'admin'
            }, {
                provider: 'local',
                name: 'Admin',
                role: 'Pharma',
                email: 'demo@graphenesvc.com',
                password: '123456'
            })
            .then(() => {
                console.log('finished populating users');
            });
    });


Drug.find({}).remove()
    .then(() => {
        Drug.create({
            name: "Actemra, Polyarticular Juvenile Idiopathic Arthritis"
        }, {
            name: "Adcirca, Pulmonary arterial hypertension"
        }, {
            name: "Belsomra, Insomnia"
        }, {
            name: "Corlanor, Chronic heart failure"
        }, {
            name: "Tekamlo, Hypertension"
        });
    });
// Grofers
// Freshdirect
// Localbanya
// Bigbasket
// Naturesbasket
// PromotionScenario.find({}).remove()
//     .then(() => {
//         PromotionScenario.create({
//             name: "Scenario 3",
//             promotionactivity: "Bundle",
//             drug: "57870ff625974a7e076efa83",
//             activity: [{
//                 name: "Bundle",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Freebie",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Discount",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }],
//             col: 0,
//             row: 0,
//             sizeY: 1,
//             sizeX: 1,
//             All: Math.floor(Math.random() * 50000),
//             Government: Math.floor(Math.random() * 50000),
//             Hospital: Math.floor(Math.random() * 50000),
//             Pharmacy: Math.floor(Math.random() * 50000),
//             Grofers: Math.floor(Math.random() * 50000),
//             Freshdirect: Math.floor(Math.random() * 50000),
//             Localbanya: Math.floor(Math.random() * 50000),
//             Bigbasket: Math.floor(Math.random() * 50000),
//             Naturesbasket: Math.floor(Math.random() * 50000)

//         }, {
//             name: "Scenario 2",
//             promotionactivity: "Bundle",
//             drug: "57870ff625974a7e076efa83",
//             activity: [{
//                 name: "Bundle",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Freebie",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Discount",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }],
//             col: 0,
//             row: 0,
//             sizeY: 1,
//             sizeX: 1,
//             All: Math.floor(Math.random() * 50000),
//             Government: Math.floor(Math.random() * 50000),
//             Hospital: Math.floor(Math.random() * 50000),
//             Pharmacy: Math.floor(Math.random() * 50000),
//             Grofers: Math.floor(Math.random() * 50000),
//             Freshdirect: Math.floor(Math.random() * 50000),
//             Localbanya: Math.floor(Math.random() * 50000),
//             Bigbasket: Math.floor(Math.random() * 50000),
//             Naturesbasket: Math.floor(Math.random() * 50000)

//         }, {
//             name: "Scenario 1",
//             promotionactivity: "Bundle",
//             drug: "57870ff625974a7e076efa83",
//             activity: [{
//                 name: "Bundle",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Freebie",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }, {
//                 name: "Discount",
//                 budget: Math.floor(Math.random() * 100),
//                 interval: Math.floor(Math.random() * 10),
//                 frequency: Math.floor(Math.random() * 10),
//                 discount: Math.floor(Math.random() * 30)
//             }],
//             col: 0,
//             row: 0,
//             sizeY: 1,
//             sizeX: 1,
//             All: Math.floor(Math.random() * 50000),
//             Government: Math.floor(Math.random() * 50000),
//             Hospital: Math.floor(Math.random() * 50000),
//             Pharmacy: Math.floor(Math.random() * 50000),
//             Grofers: Math.floor(Math.random() * 50000),
//             Freshdirect: Math.floor(Math.random() * 50000),
//             Localbanya: Math.floor(Math.random() * 50000),
//             Bigbasket: Math.floor(Math.random() * 50000),
//             Naturesbasket: Math.floor(Math.random() * 50000)


//         }).then(() => {
//             console.log('finished populating Scenario');
//         });
//     });

// DriverPlanner.find({}).remove()
//     .then(() => {
//         DriverPlanner.create({
//             name: "Scenario 1",
//             BrandPromotion: Math.floor(Math.random() * 100),
//             InstoreMarketing: Math.floor(Math.random() * 100),
//             InstorePromotion: Math.floor(Math.random() * 100),
//             CompetitorPromotion: Math.floor(Math.random() * 100),
//             KOLActivity: [{
//                 ActivityName: "KOL Events",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Sponsorship",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Detailing",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             Innovation: [{
//                 ActivityName: "Innovation Impact",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Innovation Duration",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             SalesandDiscount: [{
//                 ActivityName: "Sales Coverage",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Sales Frequency",
//                 Impact: Math.floor(Math.random() * 20)
//             }, {
//                 ActivityName: "Discount",
//                 Impact: Math.floor(Math.random() * 100)
//             }]

//         }, {
//             name: "Scenario 2",
//             BrandPromotion: Math.floor(Math.random() * 100),
//             InstoreMarketing: Math.floor(Math.random() * 100),
//             InstorePromotion: Math.floor(Math.random() * 100),
//             CompetitorPromotion: Math.floor(Math.random() * 100),
//             KOLActivity: [{
//                 ActivityName: "KOL Events",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Sponsorship",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Detailing",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             Innovation: [{
//                 ActivityName: "Innovation Impact",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Innovation Duration",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             SalesandDiscount: [{
//                 ActivityName: "Sales Coverage",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Sales Frequency",
//                 Impact: Math.floor(Math.random() * 20)
//             }, {
//                 ActivityName: "Discount",
//                 Impact: Math.floor(Math.random() * 100)
//             }]
//         }, {
//             name: "Scenario 3",
//             BrandPromotion: Math.floor(Math.random() * 100),
//             InstoreMarketing: Math.floor(Math.random() * 100),
//             InstorePromotion: Math.floor(Math.random() * 100),
//             CompetitorPromotion: Math.floor(Math.random() * 100),
//             KOLActivity: [{
//                 ActivityName: "KOL Events",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Sponsorship",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "KOL Detailing",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             Innovation: [{
//                 ActivityName: "Innovation Impact",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Innovation Duration",
//                 Impact: Math.floor(Math.random() * 100)
//             }],
//             SalesandDiscount: [{
//                 ActivityName: "Sales Coverage",
//                 Impact: Math.floor(Math.random() * 100)
//             }, {
//                 ActivityName: "Sales Frequency",
//                 Impact: Math.floor(Math.random() * 20)
//             }, {
//                 ActivityName: "Discount",
//                 Impact: Math.floor(Math.random() * 100)
//             }]
//         }).then(() => {
//             console.log('finished populating Scenario');
//         });
//     });


// BasicPlanner.find({}).remove()
//     .then(() => {
//         BasicPlanner.create({
//             eventName: "Event 1",
//             year: true,
//             quarters: [{
//                 quaterName: "1",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "2",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "3",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "4",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }]
//         }, {
//             eventName: "Event 2",
//             year: false,
//             quarters: [{
//                 quaterName: "1",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "2",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "3",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "4",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }]
//         }, {
//             eventName: "Event 3",
//             year: true,
//             quarters: [{
//                 quaterName: "1",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "2",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "3",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }, {
//                 quaterName: "4",
//                 quarterSpend: Math.floor(Math.random() * 50000),
//                 quaterImpact: Math.floor(Math.random() * 50),
//                 quarterCases: [
//                     { quarterCase: "Base Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Best Case", quaterCaseImpact: Math.floor(Math.random() * 50) },
//                     { quarterCase: "Worst Case", quaterCaseImpact: Math.floor(Math.random() * 50) }
//                 ]
//             }]
//         }).then(() => {
//             console.log('finished populating Basic Planner');
//         });
//     })
