'use strict';
// $( document ).ready(function() {
//     broadcast();
// });
angular.module('clarosApp')
    .controller('PlanSummaryCtrl', function($http, $scope, socket, $timeout, $window, $uibModal, Auth,MasterPlan) {
        //Get Master Plan Data==================================================
        $scope.masterplanArray = [];
        $scope.currentMasterPlan = {};
        $http({
            method: 'GET',
            url: 'api/masterplans'
        }).success(function(masterPlanData) {
            $scope.masterplanArray = masterPlanData;
        }).error(function() {
            console.log("error")
        });

        $scope.getCurrentPlan = function(plan){
            MasterPlan.setCurrentPlan(plan);
        }


        $scope.drugData = [];
        $http({
            method: 'GET',
            url: 'api/drugs'
        }).success(function(drugData) {
            $scope.drugData = drugData;
            // var basicPlannerEvent = ["Event 1", "Event 2", "Event 3"];
            // for (var i in drugData)
        }).error(function(data) {
            console.log("error")
        });

        $scope.generateBasicPlannerData = function(drugData) {
            var allScenarios = [];
            for (var i in drugData) {
                var aDrug = drugData[i];
                var drugID = aDrug._id;
                // console.log(drugID);
                var basicPlannerEvent = ["Event 1", "Event 2", "Event 3"];
                var basicPlannerEvents = [];
                for (var index in basicPlannerEvent) {
                    var anEvent = {};
                    anEvent['eventName'] = basicPlannerEvent[index];
                    anEvent.drug = drugID;
                    var PriceorVolume = [true, false]
                    anEvent.price = PriceorVolume[_.random(0, 1)];
                    var quartersArray = ["1", "2", "3", "4"];
                    var quarters = [];
                    for (var qIndex in quartersArray) {
                        var aQuarterEvent = {};
                        aQuarterEvent.quaterName = quartersArray[qIndex];
                        var quarterCasesArray = ["Base Case", "Best Case", "Worst Case"];
                        var quarterCases = [];
                        for (var cIndex in quarterCasesArray) {
                            var aQuarderCase = {};
                            aQuarderCase.quarterCase = quarterCasesArray[cIndex];
                            if (cIndex < 1) {
                                var quarterCaseImpact = _.random(-50, 50);
                                var quarterCaseSpend = _.random(100, 500);
                                aQuarderCase.quarterCaseSpend = quarterCaseSpend;
                                aQuarderCase.quarterCaseImpact = quarterCaseImpact;
                                quarterCases.push(aQuarderCase);
                            } else {
                                var Impact = quarterCases[cIndex - 1].quarterCaseImpact;
                                var ImpactUpdate = Impact * (1 + _.random(-.3, .3));
                                aQuarderCase.quarterCaseImpact = ImpactUpdate;
                                var Spend = quarterCases[cIndex - 1].quarterCaseSpend;
                                var SpendUpdate = Spend * (1 + _.random(-.3, .3));
                                aQuarderCase.quarterCaseSpend = SpendUpdate;
                                quarterCases.push(aQuarderCase);
                            }
                        }

                        if (qIndex < 1) {
                            var quarterSpend = _.random(100, 300);
                            var quarterImpact = _.random(-50, 50);
                            aQuarterEvent.quarterSpend = quarterSpend;
                            aQuarterEvent.quarterImpact = quarterImpact;
                            aQuarterEvent.quarterCases = quarterCases;
                            quarters.push(aQuarterEvent);

                        } else {
                            var quarterSpend = quarters[qIndex - 1].quarterSpend;
                            var quarterSpendUpdate = quarterSpend * (1 + _.random(-.1, .1));
                            var quarterImpact = quarters[qIndex - 1].quarterImpact;
                            var quarterImpactUpdate = quarterImpact * (1 + _.random(-.3, .3));
                            aQuarterEvent.quarterSpend = quarterSpendUpdate;
                            aQuarterEvent.quarterImpact = quarterImpactUpdate;
                            aQuarterEvent.quarterCases = quarterCases;
                            quarters.push(aQuarterEvent);
                        }
                    }
                    anEvent.quarters = quarters;
                    if (index < 1) {
                        var expectedRevenue = _.random(50, 100);
                        anEvent['expectedRevenue'] = expectedRevenue;
                    } else {
                        var expectedRevenue = _.random(-20, 50);
                        anEvent['expectedRevenue'] = expectedRevenue;
                    }

                    basicPlannerEvents.push(anEvent);

                }
                for (var DrugIndex in basicPlannerEvents) {
                    var aDrugEvents = basicPlannerEvents[DrugIndex];
                    allScenarios.push(aDrugEvents);
                }
            }

            var json = JSON.stringify(allScenarios);
            $http({
                method: 'POST',
                url: 'api/basicplanners/bootstrap/newdata',
                data: json
            }).success(function() {
                console.log("success")
            })

        }


        $scope.generatePromotionData = function(drugData) {
            var allScenarios = [];
            for (var i in drugData) {
                var aDrug = drugData[i];
                var drugID = aDrug._id;
                // console.log(drugID);
                var PromotionPlanner = ["Scenario 1", "Scenario 2", "Scenario 3"];
                var PromotionScenarios = [];
                for (var index in PromotionPlanner) {
                    var anScenario = {};
                    anScenario.name = PromotionPlanner[index];
                    anScenario.drug = drugID;
                    var promotionActivities = ["Bundle", "Discount", "Freebie"];
                    // var randomIndex = _.random(0,2);
                    var anPromotionName = promotionActivities[index];
                    anScenario.promotionactivity = anPromotionName;
                    anScenario.interval = _.random(1, 5);
                    anScenario.frequency = _.random(1, 5);
                    anScenario.discount = _.random(0, 100);
                    anScenario.All = _.random(500, 700);
                    anScenario.Hospital = _.random(100, 300);
                    anScenario.Pharmacy = _.random(100, 300);
                    anScenario.Government = _.random(100, 300);
                    allScenarios.push(anScenario);
                }
            }
            var json = JSON.stringify(allScenarios);
            // console.log(json);
            $http({
                method: 'POST',
                url: 'api/promotionscenarios/bootstrap/newdata',
                data: json
            }).success(function() {
                console.log("success")
            })
        }

        $scope.generateOptimisationData = function(drugData) {
            var allScenarios = [];
            var KOLactivitiyObject = {};
            KOLactivitiyObject.cost = _.random(100, 500);
            KOLactivitiyObject.expectRevenue = _.random(100, 500);
            var InnovationObject = {};
            InnovationObject.cost = _.random(100, 500);
            InnovationObject.expectRevenue = _.random(100, 500);
            var SaleObject = {};
            SaleObject.cost = _.random(100, 500);
            SaleObject.expectRevenue = _.random(100, 500);
            var KOLactivitiy = ["KOL Events", "KOL Sponsorship", "Detailing Coverage"];
            var Innovation = ["Innovation Impact", "Innovation Duration"];
            var SalesandDiscount = ["Sales Coverage", "Average Discount", "Sales Frequency"];
            for (var i in drugData) {
                var aDrug = drugData[i];
                var drugID = aDrug._id;

                var DriverPlannerScenarios = ["Scenario 1", "Scenario 2", "Scenario 3"];

                for (var m in DriverPlannerScenarios) {
                    var anOptimisationDriver = {};
                    var driverName = DriverPlannerScenarios[m];
                    anOptimisationDriver.name = driverName;
                    anOptimisationDriver.drug = drugID;
                    anOptimisationDriver.All = _.random(100, 1000);
                    anOptimisationDriver.Government = _.random(100, 1000);
                    anOptimisationDriver.Pharmacy = _.random(100, 1000);
                    anOptimisationDriver.Hospital = _.random(100, 1000);
                    var KOLarray = [];
                    var InnovationArray = [];
                    var SalesArray = [];

                    //Adding KOL Activitiy
                    for (var x in KOLactivitiy) {
                        var KOLevent = {};
                        var KOLactivityName = KOLactivitiy[x];
                        KOLevent.ActivityName = KOLactivityName;
                        if (KOLactivityName == "KOL Events") {
                            KOLevent.Impact = _.random(1, 1000);
                            KOLarray.push(KOLevent);
                        } else if (KOLactivityName == "KOL Sponsorship") {
                            KOLevent.Impact = _.random(100, 1000);
                            KOLarray.push(KOLevent);
                        } else {
                            KOLevent.Impact = _.random(0, 100);
                            KOLarray.push(KOLevent);
                        }
                    }
                    KOLactivitiyObject.name = "KOL Activity"
                    KOLactivitiyObject.activities = KOLarray;
                    anOptimisationDriver.KOLActivity = KOLactivitiyObject;


                    //Adding Innovation 
                    for (var y in Innovation) {
                        var InnovationObj = {};
                        var InnovationName = Innovation[y];
                        InnovationObj.ActivityName = InnovationName;
                        if (InnovationName == "Innovation Impact") {
                            InnovationObj.Impact = _.random(1, 5)
                            InnovationArray.push(InnovationObj);
                        } else {
                            InnovationObj.Impact = _.random(0, 36)
                            InnovationArray.push(InnovationObj);
                        }
                    }

                    InnovationObject.name = "Innovation"
                    InnovationObject.activities = InnovationArray;
                    anOptimisationDriver.Innovation = InnovationObject;

                    //Adding SalesandDiscount
                    for (var z in SalesandDiscount) {
                        var SalesandDiscountObj = {};
                        var SaleName = SalesandDiscount[z];
                        SalesandDiscountObj.ActivityName = SaleName;
                        if (SaleName == "Sales Coverage") {
                            SalesandDiscountObj.Impact = _.random(0, 100)
                            SalesArray.push(SalesandDiscountObj);
                        } else if (SaleName == "Average Discount") {
                            SalesandDiscountObj.Impact = _.random(0, 100)
                            SalesArray.push(SalesandDiscountObj);
                        } else {
                            SalesandDiscountObj.Impact = _.random(0, 10)
                            SalesArray.push(SalesandDiscountObj);
                        }
                    }

                    SaleObject.name = "Sales And Discount"
                    SaleObject.activities = SalesArray;
                    anOptimisationDriver.Sales = SaleObject;

                    allScenarios.push(anOptimisationDriver);

                }


            }
            var json = JSON.stringify(allScenarios);
            console.log(json);
            $http({
                method: 'POST',
                url: 'api/driverplanners/bootstrap/newdata',
                data: json
            }).success(function() {
                console.log("success")
            })
        }
    })
