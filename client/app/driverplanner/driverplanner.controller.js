'use strict';
angular.module('clarosApp')
    .controller('driverplannerCtrl', function($scope, $http, socket, $timeout, $window, $uibModal, Auth, MasterPlan) {
        $('#arrangePosition').trigger('click');
        // current plan
        $scope.currentMasterPlan = MasterPlan.getCurrentMasterPlan();
        $scope.displayScenario = true;
        $scope.displayMonthlyPlanning = false;
        $http({
            method: 'GET',
            url: '/api/drugs/'
        }).success(function(data) {
            // console.log(data)
            $scope.drugs = data;
            $scope.drugChosen = $scope.drugs[0];
            $timeout(function() {
                $('#getAllDriverScenario').trigger('click');
            })
        }).error(function(data) {
            console.log("Error retrieved drugs");
        });
        //Get All Master Plan
        $http({
            method: 'GET',
            url: '/api/masterplans/'
        }).success(function(data) {
            // console.log(data)
            $scope.masterplans = data;
        }).error(function(data) {
            console.log("Error retrieved drugs");
        });
        $scope.getDriverScenario = function(masterplanID, drugid) {
                var URLGet = '/api/driverplanners/' + drugid + "/" + masterplanID

                $http({
                    method: 'GET',
                    url: URLGet
                }).success(function(data) {
                    $scope.allscenarios = data
                    $scope.scenarioChosen = $scope.allscenarios[0];
                    socket.syncUpdates('driverplanner', $scope.allscenarios);
                    setTimeout(function() {
                        $('#arrangePosition').trigger('click');
                        $("#addChartData").trigger('click')
                        $("#dataChartAddRevenue").trigger('click')
                        $('#generateChannelLineGraph').trigger('click');
                    }, 100);
                }).error(function(data) {
                    console.log("Error retrieved driver planner ");
                });
            }
            // =================// Slider option Setting==================================================
        $scope.KOLevent = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 1000,
                step: 1
            }
        };
        $scope.KOLSponsoship = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 1000,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return '$' + value
                    }
                }
            }
        };
        $scope.DetailingCoverage = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 100,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + '%'
                    }
                }
            }
        };
        $scope.InnovationImpact = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 1,
                ceil: 5,
                step: 1,
                translate: function(value, sliderId, label) {
                    // console.log(label);
                    // if (label == 'floor') {
                    //     return value + ' ( Very Low)'
                    // }

                    // if (label == 'ceil') {
                    //     return value + ' (Very High)'
                    // }
                    switch (label) {
                        case 'floor':
                            return value + '(Very Low)';
                        case 'ceil':
                            return value + '(Very Hight)';
                        default:
                            return value;
                    }
                    // return value + 'lw'
                }
            }
        };
        $scope.InnovationDuration = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 36,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + 'month(s)'
                    }
                }
            }
        };
        $scope.InnovationDuration = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 36,
                step: 1
            }
        };
        $scope.SalesCoverage = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 100,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + '%'
                    }
                }
            }
        };
        $scope.SalesFrequency = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: 0,
                ceil: 10,
                step: 1
            }
        };

        //=========================================================================

        $scope.gridsterOption = {
            margins: [20, 20],
            // columns: 1,
            draggable: {
                handle: 'h3'
            },
            pushing: true,
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },

            // colWidth: 400,
            rowHeight: 200
        };
        //=====Resize for Ipad=================================================

        $scope.resizeIpad = function() {
                if ($window.innerWidth < 785 && $window.innerWidth > 700) {
                    console.log("Change Screen Ipad Mini");
                    $scope.gridsterOption = {
                        margins: [20, 20],
                        // columns: 1,
                        // pushing: true,
                        draggable: {
                            handle: 'h3'
                        },
                        mobileModeEnabled: true,
                        resizable: {
                            enabled: true,
                            handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],


                            // optional callback fired when resize is started
                            start: function(event, $element, item) {},

                            // optional callback fired when item is resized,
                            resize: function(event, $element, item) {
                                if (item.api) item.api.update();
                                // console.log(event)
                            },

                            // optional callback fired when item is finished resizing 
                            stop: function(event, $element, item) {
                                $timeout(function() {
                                    if (item.api) item.api.update();
                                    // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                                }, 400)
                            }
                        },
                        // colWidth: 'auto',
                        rowHeight: 400,
                        // minSizeY: 2,
                    };
                } else {
                    $scope.gridsterOption = {
                        margins: [20, 20],
                        // columns: 1,
                        draggable: {
                            handle: 'h3'
                        },
                        pushing: true,
                        mobileModeEnabled: true,
                        resizable: {
                            enabled: true,
                            handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                            start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                            resize: function(event, $element, widget) {

                            }, // optional callback fired when item is resized,
                            stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
                        },

                        // colWidth: 400,
                        rowHeight: 200
                    };
                }
            }
            // ===================Resize Ipad====================
        $scope.resizeIpad();

        //=====Resize for Ipad=================================================

        // Draw Bar Chart for Correlation
        $scope.dataChart = [];
        var driversplanner = ["KOL Activity", "Innovation", "Sales and Discount"];
        $scope.addChartData = function(scenarios, ScenEnter) {
            $scope.dataChart = [];
            var CostandRevenue = ["Cost", "Revenue"];
            var KOL = 0;
            var Innovation = 0;
            var Sales = 0;
            var ChartObject = {};
            for (var i in CostandRevenue) {
                var aName = CostandRevenue[i];
                if (aName == "Cost") {
                    KOL = ScenEnter.KOLActivity.cost;
                    Innovation = ScenEnter.Innovation.cost;
                    Sales = ScenEnter.Sales.cost;
                    ChartObject = {
                        "key": aName,
                        "values": [{
                            "label": "KOL Activity",
                            "value": KOL
                        }, {
                            "label": "Innovation",
                            "value": Innovation
                        }, {
                            "label": "Sales and Discount",
                            "value": Sales
                        }]
                    }
                    $scope.dataChart.push(ChartObject)
                } else {
                    KOL = ScenEnter.KOLActivity.expectRevenue;
                    Innovation = ScenEnter.Innovation.expectRevenue;
                    Sales = ScenEnter.Sales.expectRevenue;
                    ChartObject = {
                        "key": aName,
                        "values": [{
                            "label": "KOL Activity",
                            "value": KOL
                        }, {
                            "label": "Innovation",
                            "value": Innovation
                        }, {
                            "label": "Sales and Discount",
                            "value": Sales
                        }]
                    }
                    $scope.dataChart.push(ChartObject)
                }

            }
            $scope.scrollToScenario(ScenEnter);
        }
        $scope.scrollToScenario = function(scenario) {
                var portion = $scope.allscenarios.length;
                for (var i in $scope.allscenarios) {
                    if (scenario._id == $scope.allscenarios[i]._id) {
                        // var height = 4*i;

                        var heightofVertical = $('.vertical_scroll_driver').prop("scrollHeight") / portion;
                        var heigthtoScroll = i * heightofVertical;
                        $(".vertical_scroll_driver").animate({ scrollTop: heigthtoScroll }, 100);
                    }
                }
            }
            // init dashboard
        var colors = ["#008061", "#b41f1f"];
        $scope.options = {
            chart: {
                type: 'multiBarChart',
                "height": 150,
                margin: {
                    top: 0,
                    right: 20,
                    bottom: 60,
                    left: 62
                },
                x: function(d) {
                    return d.label;
                },
                y: function(d) {
                    return d.value;
                },
                showValues: true,
                valueFormat: function(d) {
                    return d3.format(',.0f')(d);
                },
                duration: 500,
                xAxis: {
                    // tickSize: 5,
                    // axisLabel: 'Scenario',
                    // axisLabelDistance: 5
                },
                yAxis: {
                    axisLabel: 'Cost vs Revenue',
                    axisLabelDistance: -5
                },
                showControls: false,
                color: function(d, i) {
                    return (d.data && d.data.color) || colors[i % colors.length]
                }

            }
        };

        // bar Chart for Expect Revenue
        $scope.dataChartRevenue = [];
        $scope.dataChartAddRevenue = function(scenarios) {
            $scope.dataChartRevenue = [];
            for (var i in scenarios) {
                var aScenario = scenarios[i];
                var name = aScenario.name;
                // var All = aScenario.All;
                // var Government = aScenario.Government;
                // var Pharmacy = aScenario.Pharmacy;
                // var Hospital = aScenario.Hospital;
                // var CompetitorPromotion = _.random(400, 1000);
                var ChartObject = {};
                ChartObject.key = name;
                var values = [];
                for (var x in aScenario.ExpectedRev) {
                    var aChannelRevenue = aScenario.ExpectedRev[x];
                    var aValueObject = {};
                    if (aChannelRevenue.channel == "All") {
                        aValueObject.label = "All";
                        aValueObject.value = aChannelRevenue.revenue;
                    }

                    if (aChannelRevenue.channel == "Government") {
                        aValueObject.label = "Government";
                        aValueObject.value = aChannelRevenue.revenue;
                    }

                    if (aChannelRevenue.channel == "Pharmacy") {
                        aValueObject.label = "Pharmacy";
                        aValueObject.value = aChannelRevenue.revenue;
                    }
                    if (aChannelRevenue.channel == "Hospital") {
                        aValueObject.label = "Hospital";
                        aValueObject.value = aChannelRevenue.revenue;
                    }
                    values.push(aValueObject);
                }
                ChartObject.values = values;

                // var ChartObject = {
                //     "key": name,
                //     "values": [{
                //         "label": "All",
                //         "value": All
                //     }, {
                //         "label": "Government",
                //         "value": Government
                //     }, {
                //         "label": "Pharmacy",
                //         "value": Pharmacy
                //     }, {
                //         "label": "Hospital",
                //         "value": Hospital
                //     }]
                // }
                $scope.dataChartRevenue.push(ChartObject)
            }
        }

        // init dashboard
        $scope.optionsCat = {
            chart: {
                type: 'multiBarChart',
                "height": 120,
                margin: {
                    top: 0,
                    right: 20,
                    bottom: 30,
                    left: 55
                },
                x: function(d) {
                    return d.label;
                },
                y: function(d) {
                    return d.value;
                },
                showValues: true,
                valueFormat: function(d) {
                    return d3.format(',.0f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabelDistance: -10
                },
                yAxis: {
                    axisLabel: "Revenue ('000)",
                    axisLabelDistance: -5
                },
                showControls: false

            }
        };


        ///========================
        $scope.filteritem = [
            { name: "Gridster Item", sizeX: 16, sizeY: 1, row: 0, col: 0, api: {} },
        ]
        $scope.gridsterFilterForDriverPlanner = {
            margins: [10, 10],
            // columns: 1,
            draggable: {
                handle: 'h3'
            },
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
            // colWidth: 300,
            rowHeight: 100
        };
        // gridsterFilter for Driver Planner


        // Dropdown Value 
        $scope.kpi = { "name": "Revenue" };
        $scope.period = { "time": "12" };
        $scope.CustomerChosen = {};
        $scope.catChosen = {};
        $scope.Category = [{ "name": "Food and Drink", "id": 1 }, { "name": "Home Care", "id": 2 }, { "name": "Personal Care", "id": 3 }]
        $scope.brandChosen = {};
        $scope.Brand = [
            { "name": "Annapurna salt and atta", "did": 1 },
            { "name": "Bru coffee", "did": 1 },
            { "name": "Active Wheel detergent", "did": 2 },
            { "name": "Cif Cream Cleaner", "did": 2 },
            { "name": "Aviance Beauty Solutions", "did": 3 },
            { "name": "Axe deodorant and aftershaving lotion and soap", "did": 3 }
        ];
        // console.log($scope.catChosen);
        $scope.filterExpression = function(acat) {
            console.log(acat);
            // console.log($scope.catChosen);
            $scope.BrandList = []
            for (var i in $scope.Brand) {
                var anObject = $scope.Brand[i];
                if (anObject.did == acat.id) {
                    $scope.BrandList.push(anObject)
                }
            }
            // return (abrand.did === $scope.catChosen.id);
        };

        $scope.Channel = { "name": "E-commerce" };
        $scope.Customer = { "name": "All" };
        // Dropdown Value



        // Gridster for Graph
        $scope.standardItems = [
            { name: "Cost and Revenue Comparison", sizeX: 1, sizeY: 1, row: 0, col: 0, api: {} },
            { name: "Expected Revenue", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} },
        ];

        $scope.gridsterItem = {
            margins: [20, 20],
            columns: 2,
            draggable: {
                handle: 'h3'
            },
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function(event, $element, item) {},

                // optional callback fired when item is resized,
                resize: function(event, $element, item) {
                    if (item.api) item.api.update();
                },

                // optional callback fired when item is finished resizing 
                stop: function(event, $element, item) {
                    $timeout(function() {
                        if (item.api) item.api.update();
                    }, 400)
                    console.log($('.box').height);
                    // setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                    // setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);

                }
            },
            // colWidth:,
            rowHeight: 220
        };

        // Document Ready

        $scope.broadcast = function() {

            $timeout(function() {
                $scope.$broadcast('reCalcViewDimensions');
            });
        }

        // Adding new Scenario 
        $scope.addWidget = function() {
            var anOptimisationDriver = {};
            var trackingNumber = $scope.allscenarios.length + 1;
            var KOLactivitiy = ["KOL Events", "KOL Sponsorship", "Detailing Coverage"];
            var Innovation = ["Innovation Impact", "Innovation Duration"];
            var SalesandDiscount = ["Sales Coverage", "Average Discount", "Sales Frequency"];
            var Channels = ["All", "Government", "Hospital", "Pharmacy"];

            var drugID = $scope.allscenarios[0].drug
            var planID = $scope.currentMasterPlan._id;
            var lengthOfScenario = $scope.allscenarios.length + 1;
            var nameofscenario = "Scenario " + lengthOfScenario;
            // Create new Optimisational 
            anOptimisationDriver.masterplan = planID;
            anOptimisationDriver.name = "Scenario " + trackingNumber;
            anOptimisationDriver.drug = drugID;
            anOptimisationDriver.All = _.random(100, 1000);
            anOptimisationDriver.Government = _.random(100, 1000);
            anOptimisationDriver.Pharmacy = _.random(100, 1000);
            anOptimisationDriver.Hospital = _.random(100, 1000);
            var KOLactivitiyObject = {};
            KOLactivitiyObject.cost = _.random(100, 500);
            KOLactivitiyObject.expectRevenue = _.random(100, 500);
            var InnovationObject = {};
            InnovationObject.cost = _.random(100, 500);
            InnovationObject.expectRevenue = _.random(100, 500);
            var SaleObject = {};
            SaleObject.cost = _.random(100, 500);
            SaleObject.expectRevenue = _.random(100, 500);
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
            var expectedRevenueArray = [];
            for (var k in Channels) {

                var expectRevenueObject = {}
                var aChanel = Channels[k];
                expectRevenueObject.channel = aChanel;
                if (k == 0) {
                    expectRevenueObject.revenue = _.random(900, 1000)
                } else {
                    expectRevenueObject.revenue = _.random(200, 300)
                }
                expectedRevenueArray.push(expectRevenueObject)

            }
            anOptimisationDriver.ExpectedRev = expectedRevenueArray;
            $http({
                method: "POST",
                url: 'api/driverplanners/',
                data: anOptimisationDriver
            }).success(function() {
                $(".vertical_scroll_driver").animate({ scrollTop: $('.vertical_scroll_driver').prop("scrollHeight") }, 100);
                // $(".vertical_scroll").animate({ scrollTop: $('.vertical_scroll_driverCPG').prop("scrollHeight") }, 100);
                // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                $scope.scenarioChosen = $scope.allscenarios[$scope.allscenarios.length - 1]
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);

                console.log("success")
            });


        }

        // Remove A Scenario
        $scope.remove = function(scenario) {
            $http({
                method: 'delete',
                url: '/api/driverplanners/' + scenario._id
            }).success(function() {
                console.log("Removed")
                $scope.scenarioChosen = $scope.allscenarios[0];
                console.log($scope.allscenarios);
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 50);
                setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);

            }).error(function() {
                console.log("Error Detected on Remove Promotion Scenario");
            });

        };

        $scope.updateModel = function(scenario) {
            console.log(scenario);
            var channelArray = scenario.ExpectedRev;
            for (var i in channelArray) {
                var aChanel = channelArray[i]
                aChanel.revenue = aChanel.revenue * (1 + _.random(-.3, .4));
            }
            var KOLActivity = scenario.KOLActivity.cost;
            // console.log(KOLActivity);
            scenario.KOLActivity.cost = scenario.KOLActivity.cost * (1 + _.random(-.3, .4));
            scenario.KOLActivity.expectRevenue = scenario.KOLActivity.expectRevenue * (1 + _.random(-.3, .4));

            scenario.Innovation.cost = scenario.Innovation.cost * (1 + _.random(-.3, .4));
            scenario.Innovation.expectRevenue = scenario.Innovation.expectRevenue * (1 + _.random(-.3, .4));

            scenario.Sales.cost = scenario.Sales.cost * (1 + _.random(-.3, .4));
            scenario.Sales.expectRevenue = scenario.Sales.expectRevenue * (1 + _.random(-.3, .4));
            $scope.addChartData($scope.allscenarios, scenario)
            $http({
                method: 'PUT',
                url: '/api/driverplanners/' + scenario._id,
                data: scenario
            }).success(function() {
                console.log("updated")
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);

            }).error(function() {
                console.log("Error updated on Remove Promotion Scenario");
            });
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
        }

        $scope.openSettings = function(widget) {
            // console.log(widget)
            var uibModalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'app/driverplanner/widget_settings.html',
                controller: 'WidgetSettingsDriverCtrl',
                resolve: {
                    widget: function() {
                        return widget;
                    }
                }
            });

        };

        // $scope.$on("slideEnded", function() {
        //     // for(
        //     // console.log($scope.scenario));
        //     setTimeout(function() { $('#addChartData').trigger('click'); }, 100);

        // });
        //Display Monthly DisplayMonthlyPlanning
        $scope.DisplayMonthlyPlanning = function() {
            $scope.displayScenario = false;
            $scope.displayMonthlyPlanning = true;
        }

        $scope.DisplayScenario = function() {
            $scope.displayScenario = true;
            $scope.displayMonthlyPlanning = false;
        }


        //DisplayMonthlyPlanning
        $scope.monthlyBudget = [];
        $scope.drivers = ["Online Investment", "Share of Media", "Promotional Suppor", "Pricing Medium vs Competition"];
        $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $scope.countmonthlybudget = function() {
            $scope.displayScenario = false;
            $scope.displayMonthlyPlanning = true;
            $scope.monthlyBudget = [];
            for (var i in $scope.allscenarios) {
                var aScenario = $scope.allscenarios[i];
                var aScenarioName = aScenario.name;
                var monthlyObject = {};
                monthlyObject.name = aScenarioName;
                monthlyObject["monthlybudget"] = [];
                console.log(monthlyObject);
                for (var x in $scope.drivers) {
                    var aDriver = $scope.drivers[x];
                    var newObject = {};
                    newObject['driver'] = aDriver;
                    monthlyObject['sizeX'] = 4;
                    monthlyObject['sizeY'] = 4;
                    newObject['month'] = [];
                    for (var y in $scope.months) {
                        var aMonth = $scope.months[y];
                        newObject.month.push(_.random(100, 500));
                    }
                    monthlyObject['monthlybudget'].push(newObject);
                }
                $scope.monthlyBudget.push(monthlyObject);
            }

        }

        // setTimeout(function() { $scope.countmonthlybudget() }, 100);

        $scope.gridstermonthlyBudget = {
            margins: [10, 10],
            // columns: 1,
            draggable: {
                handle: 'h3'
            },
            pushing: true,
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },

            // colWidth: 400,
            rowHeight: 300
        };

        //Gridster Items for Line Chart
        // Gridster for Graph
        $scope.GridsterItemforLineChart = [
            // { "name": "All", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} },
            // { "name": "Annapurna salt and atta", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} },
            // { "name": "Bru coffee",sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} },
            // { "name": "Active Wheel detergent",sizeX: 1, sizeY: 1, row: 0, col: 1, api: {}},
            // { "name": "Cif Cream Cleaner", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {}},
            // { "name": "Aviance Beauty Solutions", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {}},
            // { "name": "Axe deodorant and aftershaving lotion and soap",sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} } 
            { name: "All", sizeX: 2, sizeY: 2, row: 0, col: 0, api: {} },
            { name: "Factory 1", sizeX: 2, sizeY: 2, row: 0, col: 1, api: {} },
            { name: "Factory 2", sizeX: 2, sizeY: 2, row: 1, col: 1, api: {} },
            { name: "Factory 3", sizeX: 2, sizeY: 2, row: 1, col: 2, api: {} }

        ];
        $scope.gridsterLineChart = {
            margins: [20, 20],
            columns: 2,
            draggable: {
                handle: 'h3'
            },
            pushing: true,
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {

                }, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },

            // colWidth: 400,
            rowHeight: 310
        };

        // =============================Draw Sell-in==========================================================
        var time = ["x", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        // $scope.SellinData = [];
        // $scope.SellinData.unshift(time);
        $scope.drawLineGraph = function(scenariosdata, height, width, id) {
            var dataForSellin = [];
            // console.log(scenariosdata);
            dataForSellin.unshift(time);
            for (var i in scenariosdata) {
                var anObject = [];
                var aScenario = scenariosdata[i];
                var nameofscenario = aScenario.name;
                anObject.push(nameofscenario);
                // dataForSellin.push(nameofscenario)
                for (var x = 0; x < 12; x++) {
                    if (x < 1) {
                        var random = _.random(100, 500);
                        anObject.push(random);
                    } else {
                        var randomNumber = parseInt(anObject[anObject.length - 1]);
                        var numToadd = randomNumber * (1 + (_.random(-0.2, .2)))
                        anObject.push(numToadd);
                    }


                }
                console.log(anObject);
                dataForSellin.push(anObject)
            }


            var regionObject = {};
            var dashstyle = [{ 'start': 6, 'end': 12, 'style': 'dashed' }];
            for (var i = 1; i < dataForSellin.length; i++) {
                var name = dataForSellin[i][0];
                // console.log(name)
                regionObject[name] = dashstyle;
            }

            $scope.chart = c3.generate({
                bindto: id,
                data: {
                    x: 'x',
                    columns:
                    // time,
                    //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                        dataForSellin,
                    type: 'line',
                    regions: regionObject
                },
                axis: {
                    x: {
                        type: 'category',

                    }
                },
                size: {
                    width: width,
                    height: height
                },
                point: {
                    show: false
                },
                grid: {
                    x: {
                        lines: [
                            { value: "7", text: 'Past/Future Line' }
                        ]
                    }
                },
                regions: [
                    { axis: 'x', end: 6, class: 'regionX' },
                ]
            });
        };
        // =============================Draw Sell-in==========================================================
        $scope.monthbudgetRetrieve = null;
        $scope.indexRetrieve = null;
        $scope.updateMonthly = function(eventChosen, monthbudget, index, newValue) {


            $scope.monthbudgetRetrieve = monthbudget;
            $scope.indexRetrieve = index;


        }

        $scope.myValidator = function(index, newValue, eventChosen) {
            // console.log(event)
            console.log($scope.monthbudgetRetrieve)
            var allMonthly = eventChosen.monthlyplan.monthlybudget;
            console.log(allMonthly);
            for (var m in allMonthly) {
                var aMonthlyDriver = allMonthly[m];
                if (aMonthlyDriver.driver == $scope.monthbudgetRetrieve.driver) {
                    // console.log(aMonthlyDriver);
                    aMonthlyDriver.month[$scope.indexRetrieve] = newValue;
                    eventChosen.monthlyplan.monthlybudget[m] = aMonthlyDriver
                    $scope.updateModel(eventChosen);

                }
            }
            $scope.generateChannelLineGraph($scope.allscenarios);
        }

        $scope.generateChannelLineGraph = function(allscenarios) {

            $scope.drawLineGraph(allscenarios, 230, 1000, '#all')
            $scope.drawLineGraph(allscenarios, 230, 1000, '#pharmacy')
            $scope.drawLineGraph(allscenarios, 230, 1000, '#hospital')
            $scope.drawLineGraph(allscenarios, 230, 1000, '#government')
        }



        // Define event handler
        $scope.events = {
            resize: function(e, scope) {
                $timeout(function() {
                    scope.api.update()
                }, 200)
            }
        };

        $scope.config = {
            visible: false,
            refreshDataOnly: true, // default: true
            deepWatchOptions: true, // default: true
            deepWatchData: true, // default: true
            deepWatchDataDepth: 2, // default: 2
            debounce: 10 // default: 10
        };
        // $scope.item.api.updateWithData($scope.dataChart);
        $timeout(function() {
            $scope.config.visible = true;
        }, 200);

        angular.element(window).on('resize', function(e) {
            // $window.location.reload();
            $timeout(function() { $scope.resizeIpad(); }, 100)
            $timeout(function() { $('#arrangePosition').trigger('click'); }, 200);

        })
        $scope.$on('gridster-mobile-changed', function(gridster) {
            $scope.resizeIpad();
        })


    })
    .controller('WidgetSettingsDriverCtrl',
        function($scope, $timeout, $rootScope, $uibModalInstance, widget, $http) {
            $scope.widget = widget;
            // console.log(widget)

            $scope.form = {
                name: widget.name,
                // sizeX: widget.sizeX,
                // sizeY: widget.sizeY,
                // col: widget.col,
                // row: widget.row
            };

            $scope.sizeOptions = [{
                id: '1',
                name: '1'
            }, {
                id: '2',
                name: '2'
            }, {
                id: '3',
                name: '3'
            }, {
                id: '4',
                name: '4'
            }];

            $scope.dismiss = function() {
                $uibModalInstance.dismiss();
            };

            $scope.submit = function() {
                console.log("driver planner here")
                    // // angular.extend(widget, $scope.form);
                    // console.log($scope.scenario);
                    // console.log("driver " + widget);
                $http({
                    method: 'PUT',
                    url: '/api/driverplanners/' + widget._id,
                    data: widget
                }).success(function() {
                    console.log("updated")
                    setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                    setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                    setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);
                }).error(function() {
                    console.log("Error updated on Remove Promotion Scenario");
                });


                // console.log($scope.allscenarios);
                $uibModalInstance.close(widget);
            };

        })
