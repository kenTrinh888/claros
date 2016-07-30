'use strict';
// $( document ).ready(function() {
//     broadcast();
// });
angular.module('clarosApp')
    .controller('PlanSummaryCtrl', function($http, $scope, socket, $timeout, $window, $uibModal, Auth) {
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

        $scope.printData = function(drugData) {
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
                                var quaterCaseImpact = _.random(-50, 50);
                                aQuarderCase.quaterCaseImpact = quaterCaseImpact;
                                quarterCases.push(aQuarderCase);
                            } else {
                                var Impact = quarterCases[cIndex - 1].quaterCaseImpact;
                                var ImpactUpdate = Impact * (1 + _.random(-.3, .3));
                                aQuarderCase.quaterCaseImpact = ImpactUpdate;
                                quarterCases.push(aQuarderCase);
                            }
                        }

                        if (qIndex < 1) {
                            var quarterSpend = _.random(100, 300);
                            var quaterImpact = _.random(-50, 50);
                            aQuarterEvent.quarterSpend = quarterSpend;
                            aQuarterEvent.quaterImpact = quaterImpact;
                            aQuarterEvent.quarterCases = quarterCases;
                            quarters.push(aQuarterEvent);

                        } else {
                            var quarterSpend = quarters[qIndex - 1].quarterSpend;
                            var quarterSpendUpdate = quarterSpend * (1 + _.random(-.1, .1));
                            var quaterImpact = quarters[qIndex - 1].quaterImpact;
                            var quarterImpactUpdate = quaterImpact * (1 + _.random(-.3, .3));
                            aQuarterEvent.quarterSpend = quarterSpendUpdate;
                            aQuarterEvent.quaterImpact = quarterImpactUpdate;
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
            console.log(json)
            // var seen = [];
            // for(var i in allScenarios){
            //     var aScenario = allScenarios[i];
            //     for(var x in aScenario.quarters){
            //         var Aquarter = aScenario.quarters[x];
            //         for(var y in Aquarter.quarterCases){
            //             var aquarterCase = Aquarter.quarterCases[y];
            //         }
            //     }
            // }
            // var seen = []
            // var json = JSON.stringify(allScenarios, function(key, val) {
            //     if (val != null && typeof val == "object") {
            //         if (seen.indexOf(val) >= 0) {
            //             return;
            //         }
            //         seen.push(val);
            //     }
            //     return val;
            // });

            // console.log(json)
            // $http({
            //     method: 'POST',
            //     url: 'api/bootstrap/newdata',
            //     data: json
            // }).success(function(drugData) {
            //     console.log("success")
            // }).error(function(data) {
            //     console.log("error")
            // });


            $http({
                method: 'POST',
                url: 'api/basicplanners/bootstrap/newdata',
                data: json
            }).success(function() {
                console.log("success")
            })
            
        }
    })
