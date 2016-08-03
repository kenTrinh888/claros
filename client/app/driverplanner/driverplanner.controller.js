'use strict';
angular.module('clarosApp')
    .controller('driverplannerCtrl', function($scope, $http, socket, $timeout, $window, $uibModal, Auth) {
        $('#arrangePosition').trigger('click');
        $scope.displayScenario = true;
        $http({
            method: 'GET',
            url: '/api/drugs/'
        }).success(function(data) {
            // console.log(data)
            $scope.drugs = data;
            console.log($scope.drugs)
            $scope.drugChosen = $scope.drugs[0];
            $timeout(function() {
                $('#getAllDriverScenario').trigger('click');
            })
        }).error(function(data) {
            console.log("Error retrieved drugs");
        });

        $scope.getDriverScenario = function(drugid) {
                $http({
                    method: 'GET',
                    url: '/api/driverplanners/'
                }).success(function(data) {
                    $scope.allscenarios = [];
                    for (var i in data) {
                        var aEvent = data[i];
                        if (aEvent.drug == drugid) {
                            $scope.allscenarios.push(aEvent)
                        }
                    }
                    socket.syncUpdates('driverplanner', $scope.allscenarios);
                    setTimeout(function() {
                        $('#arrangePosition').trigger('click');
                        // $("#generateGraph").trigger('click')
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
                        case 'floor' : 
                            return value + '(Very Low)';
                        case 'ceil':
                            return value + '(Very Hight)';
                        default :
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
        $scope.addChartData = function(scenarios) {
            // for (var i in driversplanner) {
            //     var adrivers = scenarios[i];
            //     var name = aScenario.name;
            // }
            $scope.dataChart = [];

            for (var x in driversplanner) {
                var driverName = driversplanner[x];
                var ChartObject = {};
                ChartObject['key'] = driverName
                ChartObject['values'] = []
                for (var i in scenarios) {
                    var valueObject = {};

                    valueObject['label'] = scenarios[i].name;
                    valueObject['value'] = _.random(-0.5, 0.5);
                    ChartObject.values.push(valueObject);
                }
                $scope.dataChart.push(ChartObject);
            }

        }

        // init dashboard
        $scope.options = {
            chart: {
                type: 'multiBarHorizontalChart',
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
                    axisLabel: 'Correlation',
                    axisLabelDistance: -5
                },
                showControls: false,
                "stacked": true,
                yDomain: [-1, 1],

            }
        };

        // bar Chart for Expect Revenue
        $scope.dataChartRevenue = [];
        $scope.dataChartAddRevenue = function(scenarios) {
            $scope.dataChartRevenue = [];
            for (var i in scenarios) {
                var aScenario = scenarios[i];
                var name = aScenario.name;
                var BaseCase = 800
                var FoodDrink = _.random(400, 1000);
                var HomeCare = _.random(400, 1000);
                var PersonalCare = _.random(400, 1000);
                // var CompetitorPromotion = _.random(400, 1000);


                var ChartObject = {
                    "key": name,
                    "values": [{
                        "label": "All",
                        "value": BaseCase
                    }, {
                        "label": "Government",
                        "value": FoodDrink
                    }, {
                        "label": "Pharmacy",
                        "value": HomeCare
                    }, {
                        "label": "Hospital",
                        "value": PersonalCare
                    }]
                }
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
                    axisLabel: 'Category',
                    axisLabelDistance: -10
                },
                yAxis: {
                    axisLabel: 'Revenue',
                    axisLabelDistance: -5
                }

            }
        };


        ///========================
        // $scope.DisplayMonthlyPlanning = function() {
        //     $scope.displayScenario = false;
        //     $scope.displayMonthlyPlanning = true;
        //     $scope.countmonthlybudget();
        //     // console.log($('.box-driver-linechart').height());
        //     setTimeout(function() { $("#countmonthlybudget").click() }, 200);
        //     setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.2, '#foodanddrink') }, 200);
        //     setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.2, '#personalcare') }, 200);
        //     setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.2, '#homecare') }, 200);
        // }
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



        // ------------------------Get the Scenario event-------------------------------------
        // $scope.allscenarios = [];
        $http({
            method: 'GET',
            url: '/api/driverplanners/'
        }).success(function(data) {
            $scope.allscenarios = data;
            socket.syncUpdates('driverplanner', $scope.allscenarios);
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            // setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);

        }).error(function(data) {
            console.log("Error retrieved scenario event");
        });
        // ------------------------Get the Scenario  event-------------------------------------



        // Gridster for Graph
        $scope.standardItems = [
            { name: "Driver Correlation", sizeX: 1, sizeY: 1, row: 0, col: 0, api: {} },
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
            var lengthOfScenario = $scope.allscenarios.length + 1;
            var nameofscenario = "Scenario " + lengthOfScenario;

            $http.post('/api/driverplanners', {
                name: nameofscenario,
                BrandPromotion: Math.floor(Math.random() * 100),
                InstoreMarketing: Math.floor(Math.random() * 100),
                InstorePromotion: Math.floor(Math.random() * 100),
                CompetitorPromotion: Math.floor(Math.random() * 100),
                KOLActivity: [{
                    ActivityName: "KOL Events",
                    Impact: Math.floor(Math.random() * 100)
                }, {
                    ActivityName: "KOL Sponsorship",
                    Impact: Math.floor(Math.random() * 100)
                }, {
                    ActivityName: "KOL Detailing",
                    Impact: Math.floor(Math.random() * 100)
                }],
                Innovation: [{
                    ActivityName: "Innovation Impact",
                    Impact: Math.floor(Math.random() * 100)
                }, {
                    ActivityName: "Innovation Duration",
                    Impact: Math.floor(Math.random() * 100)
                }],
                SalesandDiscount: [{
                    ActivityName: "Sales Coverage",
                    Impact: Math.floor(Math.random() * 100)
                }, {
                    ActivityName: "Sales Frequency",
                    Impact: Math.floor(Math.random() * 20)
                }, {
                    ActivityName: "Discount",
                    Impact: Math.floor(Math.random() * 100)
                }]

            }).success(function() {
                $(".vertical_scroll").animate({ scrollTop: $('.vertical_scroll').prop("scrollHeight") }, 100);
                $(".vertical_scroll").animate({ scrollTop: $('.vertical_scroll_driverCPG').prop("scrollHeight") }, 100);

                // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
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
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 50);
                setTimeout(function() { $('#dataChartAddRevenue').trigger('click'); }, 100);

            }).error(function() {
                console.log("Error Detected on Remove Promotion Scenario");
            });

        };

        $scope.updateModel = function(scenario) {
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

        $scope.$on("slideEnded", function() {
            // for(
            // console.log($scope.scenario));
            setTimeout(function() { $('#updateModel').trigger('click'); }, 100);

        });

        $scope.monthlyBudget = [];
        $scope.drivers = ["Online Investment", "Share of Media", "Promotional Suppor", "Pricing Medium vs Competition"]
        $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        $scope.countmonthlybudget = function() {
            $scope.monthlyBudget = [];
            for (var i in $scope.allscenarios) {

                var aScenario = $scope.allscenarios[i];

                var aScenarioName = aScenario.name;
                var monthlyObject = {};
                monthlyObject.name = aScenarioName;
                monthlyObject["monthlybudget"] = [];
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

                        // console.log($scope.monthlyBudget);
                    }
                    monthlyObject['monthlybudget'].push(newObject);

                }
                $scope.monthlyBudget.push(monthlyObject);
            }
            // console.log($scope.monthlyBudget);

        }

        setTimeout(function() { $scope.countmonthlybudget() }, 100);

        $scope.gridstermonthlyBudget = {
            margins: [50, 50],
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
            rowHeight: 250
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
            { name: "Food And Drink", sizeX: 1, sizeY: 2, row: 0, col: 0, api: {} },
            { name: "Home Care", sizeX: 1, sizeY: 2, row: 0, col: 1, api: {} },
            { name: "Personal Care", sizeX: 1, sizeY: 2, row: 0, col: 2, api: {} }

        ];
        $scope.gridsterLineChart = {
            margins: [20, 20],
            // columns: 3,
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
        var time = ["x", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // $scope.SellinData = [];
        // $scope.SellinData.unshift(time);
        $scope.drawLineGraph = function(scenariosdata, height, width, id) {
            var dataForSellin = [];
            dataForSellin.unshift(time);
            for (var i in scenariosdata) {
                var anObject = [];
                var aScenario = scenariosdata[i];
                var nameofscenario = aScenario.name;
                anObject.push(nameofscenario);
                // dataForSellin.push(nameofscenario)
                for (var x = 0; x < 12; x++) {
                    var random = _.random(100, 500);
                    anObject.push(random);

                }
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
                            { value: "Jul", text: 'Past/Future Line' }
                        ]
                    }
                }
            });
        };
        // =============================Draw Sell-in==========================================================
        $scope.myUpdateHandler = function(index, newValue) {
                console.log(index)
                console.log(newValue)
                setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.1, '#foodanddrink') }, 100);
                setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.1, '#personalcare') }, 100);
                setTimeout(function() { $scope.drawLineGraph($scope.allscenarios, $('.box-driver-linechart').height() / 1.3, $('.box-driver-linechart').width() / 1.1, '#homecare') }, 100);

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
