'use strict';
// $( document ).ready(function() {
//     broadcast();
// });
angular.module('clarosApp')
    .controller('promotionController', function($http, $scope, socket, $timeout, $window, $uibModal, Auth) {
        Auth.getCurrentUser(function(data) {
            $scope.user = data;
        })

        $scope.totalBudget = {
            value: _.random(500000, 1000000),
            options: {
                floor: 500000,
                ceil: 1000000,
                translate: function(value, sliderId, label) {
                    var budget = value.toLocaleString();
                    switch (label) {
                        default: return '$' + budget
                    }
                }
            }
        }

        // Drug Filter===============================================================
        $scope.drugChosen = {
            "id": 2,
            name: "Actemra, Polyarticular Juvenile Idiopathic Arthritis"
        }
        $scope.drugs = [{
            "id": 2,
            name: "Actemra, Polyarticular Juvenile Idiopathic Arthritis"
        }, {
            "id": 3,
            name: "Adcirca, Pulmonary arterial hypertension"
        }, {
            "id": 4,
            name: "Belsomra, Insomnia"
        }, {
            "id": 5,
            name: "Corlanor, Chronic heart failure"
        }, {
            "id": 6,
            name: "Tekamlo, Hypertension"
        }];

        // Drug Filter===============================================================

        // ------------------------Number of Gridster for Forecasting -------------------------------------

        $scope.DisplayScenario = function() {
            // console.log($scope.Customer)
            $scope.displayScenario = true;
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
            setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);


        }

        $scope.filteritem = [
            { name: "Filter Item", sizeX: 4, sizeY: 1, row: 0, col: 0, api: {} },
        ]

        // Filter Variable
        $scope.CustomerChosen = {};
        $scope.catChosen = {};
        $scope.Category = [{ "name": "Food and Drink", "id": 1 }, { "name": "Home Care", "id": 2 }, { "name": "Personal Care", "id": 3 }];
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
        $scope.Customer = { "name": "Grofers" };

        // this.dataChart = []
        // $scope.api.refreshWithTimeout(5);
        $scope.gridsterOptions = {
            margins: [50, 50],
            columns: 1,
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
                        // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                    }, 400)
                }
            },
            rowHeight: 360
        };
        $scope.gridsterItem = {
            margins: [50, 50],
            columns: 4,
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
                }
            },
            rowHeight: 300
        };


        $scope.gridsterFilterPromotion = {
            margins: [20, 20],
            columns: 1,
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
                stop: function(event, $element, widget) {
                        setTimeout(function() { $('#analyse').trigger('click'); }, 100);

                    } // optional callback fired when item is finished resizing
            },
            rowHeight: 120
        };



        $scope.budgetRange = {
            options: {
                showSelectionBar: true,
                floor: 0,
                ceil: 100,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + "%"
                    }
                }
            }
        };
        $scope.intervalRange = {
            options: {
                showSelectionBar: true,
                floor: 1,
                ceil: 10,
                step: 1,

            }
        };
        $scope.frequencylRange = {

            options: {
                showSelectionBar: true,
                floor: 1,
                ceil: 10,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + " times"
                    }
                }
            }
        };
        $scope.discountRange = {
            options: {
                showSelectionBar: true,
                floor: 1,
                ceil: 100,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + '%'
                    }
                }
            }
        };
        $scope.promotionActivity = [{ name: "Bundle" }, { name: "Freebie" }, { name: "Discount" }];

        //maps the item from customItems in the scope to the gridsterItem options
        $scope.standardItems = [
            { sizeX: 6, sizeY: 1, row: 0, col: 0, api: {} },
        ]

        $scope.clear = function() {
            $scope.allscenarios = [];
        };

        $scope.broadcast = function() {
            $timeout(function() {
                $scope.$broadcast('reCalcViewDimensions');
            });
        }
        angular.element(document).ready(function() {
            // console.log(this.allscenarios)
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
            setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);


        });
        angular.element($window).on('resize', function() {
            console.log("window size Change")
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
        });

        // init dashboard
        $scope.options = {
            chart: {
                type: 'multiBarChart',
                margin: {
                    top: 40,
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
                    // axisLabel: $scope.Customer,
                    axisLabelDistance: -10
                },
                yAxis: {
                    axisLabel: 'Revenue',
                    axisLabelDistance: -5
                }

            }
        };
        // $scope.updateChart = function (){
        //     refresh: function(e, scope) {
        //         $timeout(function() {
        //             scope.api.update()
        //         }, 100)
        //     }
        // }

        // $scope.data = [];
        // console.log(this.allscenarios.length);
        // We want to manually handle `window.resize` event in each directive.
        // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
        // Define event handler
        $scope.events = {
            resize: function(e, scope) {
                $timeout(function() {
                    scope.api.update()
                }, 100)
            }
        };
        angular.element(window).on('resize', function(e) {
            $timeout(function() {
                $scope.$broadcast('resize');
            })
        });
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

        // =============================//Data Chart for CPG==========================================
        $scope.dataChart = [];
        var activity = ["Bundle", "Freebie", "Discount"];
        $scope.addChartData = function(scenarios) {
            $scope.dataChart = [];
            for (var x in activity) {
                var activityName = activity[x]
                var ChartObject = {};
                ChartObject['key'] = activityName;
                ChartObject['values'] = [];
                for (var i in scenarios) {
                    var Scenarioactivity = scenarios[i].activity;

                    for (var y in Scenarioactivity) {
                        var aActivity = Scenarioactivity[y];
                        if (activityName === aActivity.name) {
                            var valueObject = {};
                            valueObject['label'] = scenarios[i].name;
                            valueObject['value'] = _.random(100, 500);
                            ChartObject.values.push(valueObject);
                        }
                    }
                }
                $scope.dataChart.push(ChartObject);
            }
            console.log($scope.dataChart);
        }

        // =============================//Data Chart for CPG==========================================

        // =============================//Data Chart for Pharma==========================================
        $scope.dataChartPharma = [];
        var channels = ["All", "Government", "Pharmacy", "Hospital"];
        $scope.addChartDataPharma = function(scenarios) {
                $scope.dataChartPharma = [];
                for (var x in scenarios) {
                    var scenarioName = scenarios[x].name;
                    var ChartObject = {};
                    ChartObject['key'] = scenarioName;
                    ChartObject['values'] = [];
                    for (var i in channels) {
                        var scenarioChannel = channels[i];
                        var valueObject = {};
                        valueObject['label'] = scenarioChannel;
                        valueObject['value'] = _.random(100, 500);
                        ChartObject.values.push(valueObject);

                        // for (var y in Scenarioactivity) {
                        //     var aActivity = Scenarioactivity[y];
                        //     if (activityName === aActivity.name) {
                        //         var valueObject = {};
                        //         valueObject['label'] = scenarios[i].name;
                        //         valueObject['value'] = _.random(100, 500);
                        //         ChartObject.values.push(valueObject);
                        //     }
                        // }
                    }
                    $scope.dataChartPharma.push(ChartObject);
                }
                console.log($scope.dataChartPharma);
            }
            // =============================//Data Chart for Pharma==========================================


        // ------------------------Get the Scenario event-------------------------------------
        // $scope.allscenarios = [];
        $http({
            method: 'GET',
            url: '/api/promotionscenarios/'
        }).success(function(data) {
            $scope.allscenarios = data;
            socket.syncUpdates('promotionscenario', $scope.allscenarios);
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            // setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);

        }).error(function(data) {
            console.log("Error retrieved scenario event");
        });
        // ------------------------Get the basic planner event-------------------------------------


        $scope.addWidget = function() {
            var All = Math.floor(Math.random() * 1000);
            var Government = Math.floor(Math.random() * 1000);
            var Hospital = Math.floor(Math.random() * 1000);
            var Pharmacy = Math.floor(Math.random() * 1000);
            var Grofers = Math.floor(Math.random() * 50000);
            var Freshdirect = Math.floor(Math.random() * 50000);
            var Localbanya = Math.floor(Math.random() * 50000);
            var Bigbasket = Math.floor(Math.random() * 50000);
            var Naturesbasket = Math.floor(Math.random() * 50000);
            var lengthOfScenario = $scope.allscenarios.length + 1;
            var nameofscenario = "Scenario " + lengthOfScenario;

            $http.post('/api/promotionscenarios', {
                name: nameofscenario,
                promotionactivity: "Bundle",
                sizeX: 1,
                sizeY: 1,
                activity: [{
                    name: "Bundle",
                    budget: Math.floor(Math.random() * 100),
                    interval: Math.floor(Math.random() * 10),
                    frequency: Math.floor(Math.random() * 10),
                    discount: Math.floor(Math.random() * 30)
                }, {
                    name: "Freebie",
                    budget: Math.floor(Math.random() * 100),
                    interval: Math.floor(Math.random() * 10),
                    frequency: Math.floor(Math.random() * 10),
                    discount: Math.floor(Math.random() * 30)
                }, {
                    name: "Discount",
                    budget: Math.floor(Math.random() * 100),
                    interval: Math.floor(Math.random() * 10),
                    frequency: Math.floor(Math.random() * 10),
                    discount: Math.floor(Math.random() * 30)
                }],
                All: All,
                Government: Government,
                Hospital: Hospital,
                Pharmacy: Pharmacy,
                Grofers: Grofers,
                Freshdirect: Freshdirect,
                Localbanya: Localbanya,
                Bigbasket: Bigbasket,
                Naturesbasket: Naturesbasket

            }).success(function() {
                $(".vertical_scroll").animate({ scrollTop: $('.vertical_scroll').prop("scrollHeight") }, 100);
                // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);

                console.log("success")
            });


        }
        $scope.updateModel = function(scenario) {
            console.log(scenario);
            scenario.All = _.random(10000, 50000)
            scenario.Government = _.random(10000, 50000)
            scenario.Hospital = _.random(10000, 50000)
            scenario.Pharmacy = _.random(10000, 50000)
            scenario.Grofers = _.random(10000, 50000)
            scenario.Freshdirect = _.random(10000, 50000);
            scenario.Localbanya = _.random(10000, 50000);
            scenario.Bigbasket = _.random(10000, 50000);
            scenario.Naturesbasket = _.random(10000, 50000);
            $http({
                method: 'PUT',
                url: '/api/promotionscenarios/' + scenario._id,
                data: scenario
            }).success(function() {
                console.log("updated")
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
                setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);

            }).error(function() {
                console.log("Error updated on Remove Promotion Scenario");
            });
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
        }

        $scope.remove = function(scenario) {
            $http({
                method: 'delete',
                url: '/api/promotionscenarios/' + scenario._id
            }).success(function() {
                console.log("Removed")
                setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 50);
                setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);

            }).error(function() {
                console.log("Error Detected on Remove Promotion Scenario");
            });

        };

        $scope.openSettings = function(widget) {
            // console.log(widget)
            var uibModalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'app/promotionplanner/widget_settings.html',
                controller: 'WidgetSettingsCtrl',
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
            // setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);

            // $scope.updateModel($scope.scenario)
            // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
        });

        // angular.element

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('promotionscenario');
        });


    })

.controller('WidgetSettingsCtrl',
    function($scope, $timeout, $rootScope, $uibModalInstance, widget, $http) {
        $scope.widget = widget;
        console.log(widget)

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
            console.log("promotion")
                // // angular.extend(widget, $scope.form);
                // console.log($scope.scenario);
                // console.log($scope.scenario._id);
            $http({
                method: 'PUT',
                url: '/api/promotionscenarios/' + widget._id,
                data: widget
            }).success(function() {
                console.log("updated")
            }).error(function() {
                console.log("Error updated on Remove Promotion Scenario");
            });
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            setTimeout(function() { $('#dataChartAdd').trigger('click'); }, 100);
            setTimeout(function() { $('#PharmadataChartAdd').trigger('click'); }, 100);

            // console.log($scope.allscenarios);
            $uibModalInstance.close(widget);
        };

    })
