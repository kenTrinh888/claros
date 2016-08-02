'use strict';

angular.module('clarosApp')
    .controller('basicplannerController', function($scope, $http, $timeout, socket, $uibModal) {
        $('#analyse').trigger('click');

        $scope.KPIChosen = { "id": 1, "name": "Revenue" }
        $scope.KPI = [{ "id": 1, "name": "Revenue" }, { "id": 2, "name": "Volume" }]


        // ------------------------Seting of Gridster  -------------------------------------

        $scope.gridsterBasicPlanner = {
            margins: [20, 20],
            // columns: 3,
            draggable: {
                handle: 'h3'
            },
            mobileModeEnabled: true,
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
            rowHeight: 255
        };
        // ------------------------Seting of Gridster  -------------------------------------

        // ------------------------Get the basic planner event-------------------------------------
        $http({
            method: 'GET',
            url: '/api/drugs/'
        }).success(function(data) {
            // console.log(data)
            $scope.drugs = data;
            $scope.drugChosen = $scope.drugs[0];
            setTimeout(function() {
                $('#getBasicEvent').trigger('click');
            }, 100)

        }).error(function(data) {
            console.log("Error retrieved drugs");
        });
        $scope.getBasicEvent = function(drugid) {
                // console.log(drugid)
                $http({
                    method: 'GET',
                    url: '/api/basicplanners/'
                }).success(function(data) {
                    $scope.events = [];
                    for (var i in data) {
                        var aEvent = data[i];
                        if (aEvent.drug == drugid) {
                            $scope.events.push(aEvent)
                        }
                    }
                    socket.syncUpdates('basicplanner', $scope.events);
                    setTimeout(function() {
                        $('#analyse').trigger('click');
                        $("#generateGraph").trigger('click')
                    }, 100);
                }).error(function(data) {
                    console.log("Error retrieved food order");
                });

            }
            // ------------------------Get the basic planner event-------------------------------------

        // ------------------------angularjs function document ready render-------------------------------------

        // ('#drawImpactButton').trigger('click');
        $scope.generateGraph = function(events) {
            $scope.drawWaterFall(events, $("#eventImpact").height(), $("#eventImpact").width());
            $scope.drawImpact(events)
        }

        angular.element(window).on('resize', function(e) {
            console.log("resize")
            $timeout(function() { $('#analyse').trigger('click'); }, 200);
            $timeout(function() {
                $scope.drawWaterFall($scope.events, $("#eventImpact").height(), $("#eventImpact").width());
            })
        });
        $scope.$on('gridster-mobile-changed', function(gridster) {
             $timeout(function() { $('#analyse').trigger('click'); }, 100);
        })

        // ------------------------angularjs function document ready render-------------------------------------


        // ------------------------SliderRange -------------------------------------


        // Mix in multiple features at once.
        $scope.impactRange = {
            options: {
                showSelectionBar: true,
                // showSelectionBarEnd: true,
                floor: -50,
                ceil: 50,
                step: 1,
                translate: function(value, sliderId, label) {
                    switch (label) {
                        default: return value + '%'
                    }
                }
            }
        };
        // ------------------------SliderRange -------------------------------------

        // ------------------------Recalculate the slider Position -------------------------------------

        $scope.broadcast = function() {
            $scope.$$postDigest(function() {
                $scope.$broadcast('rzSliderForceRender');
                $scope.$broadcast('reCalcViewDimensions');
            });
        };

        // ------------------------Recalculate the slider Position -------------------------------------



        // ------------------------Add new Event-------------------------------------
        $scope.addNewEvent = function() {
                console.log($scope.events[0])
                var drugID = $scope.events[0].drug
                var trackingNumber = $scope.events.length + 1;
                var eventNewName = "Event" + trackingNumber;
                var newEvent = {
                    eventName: eventNewName,
                    drug: drugID,
                    year: true,
                    expectedRevenue: _.random(-20, 50),
                    quarters: [{
                        quaterName: "1",
                        quarterSpend: _.random(100, 500),
                        quarterImpact: _.random(-50, 50),
                        quarterCases: [
                            { quarterCase: "Base Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Best Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Worst Case", quarterCaseImpact: _.random(-50, 50) }
                        ]
                    }, {
                        quaterName: "2",
                        quarterSpend: _.random(100, 500),
                        quarterImpact: _.random(-50, 50),
                        quarterCases: [
                            { quarterCase: "Base Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Best Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Worst Case", quarterCaseImpact: _.random(-50, 50) }
                        ]
                    }, {
                        quaterName: "3",
                        quarterSpend: _.random(100, 500),
                        quarterImpact: _.random(-50, 50),
                        quarterCases: [
                            { quarterCase: "Base Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Best Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Worst Case", quarterCaseImpact: _.random(-50, 50) }
                        ]
                    }, {
                        quaterName: "4",
                        quarterSpend: _.random(100, 500),
                        quarterImpact: _.random(-50, 50),
                        quarterCases: [
                            { quarterCase: "Base Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Best Case", quarterCaseImpact: _.random(-50, 50) },
                            { quarterCase: "Worst Case", quarterCaseImpact: _.random(-50, 50) }
                        ]
                    }]

                };
                $http({
                    method: 'POST',
                    url: 'api/basicplanners',
                    data: newEvent
                }).success(function() {
                    console.log("success")
                    $(".vertical_scroll_basicPlanner").animate({ scrollTop: $('.vertical_scroll_basicPlanner').prop("scrollHeight") }, 100);
                    setTimeout(function() {
                        // console.log(heightofWaterFall)
                        $scope.drawWaterFall($scope.events, $(".panel-body").height() / 1.2, $(".panel-body").width());
                        $scope.drawImpact($scope.events)

                        // console.log(data) 
                    }, 100);
                    setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                }).error(function() {
                    console.log("Error adding basicplanner");
                });

            }
            // ------------------------Add new Event-------------------------------------

        // ------------------------Remove  Event-------------------------------------

        $scope.remove = function(event) {
            $http({
                method: 'delete',
                url: '/api/basicplanners/' + event._id
            }).success(function() {
                console.log("Removed")
                setTimeout(function() {
                    // console.log(heightofWaterFall)
                    $scope.drawWaterFall($scope.events, $(".panel-body").height() / 1.2, $(".panel-body").width());
                    $scope.drawImpact($scope.events)

                    // console.log(data) 
                }, 100)
            }).error(function() {
                console.log("Error Detected on Remove Promotion Scenario");
            });

        };
        // ------------------------Remove  Event-------------------------------------

        $scope.openSettings = function(widget) {
            var uibModalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'app/basicplanner/widget_settings.html',
                controller: 'WidgetSettingsBasicCtrl',
                resolve: {
                    widget: function() {
                        return widget;
                    }
                }
            });
        };
        $scope.master = {};
        $scope.updateModel = function(event) {
            console.log(event)
                // event.expectedRevenue = _.random(10,80)
            $http({
                method: 'PUT',
                url: '/api/basicplanners/' + event._id,
                data: event
            }).success(function(data) {
                // console.log(data)
                setTimeout(function() {
                    // console.log(heightofWaterFall)
                    $('#analyse').trigger('click');
                    $scope.drawWaterFall($scope.events, $(".panel-body").height() / 1.2, $(".panel-body").width());
                    $scope.drawImpact($scope.events)
                        // console.log(data) 
                }, 100);
            }).error(function() {
                console.log("Error updated on Remove Promotion Scenario");
            });
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
        }

        $scope.$on("slideEnded", function() {
            setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            setTimeout(function() { $('#updateModel').trigger('click'); }, 100);

        });

        // $scope.$on("onChange", function() {

        // })

        // Update validate $ spend

        $scope.myValidator = function(index, newValue, event) {
            // return newValue
            console.log(event)
            event.quarters[index].quarterSpend = newValue;
            event.expectedRevenue = _.random(-30, 80)
            $scope.updateModel(event)
        };


        // =============================Draw WaterFall Chart==========================================================


        $scope.drawWaterFall = function(dataChart, height, width) {
            // var numberRandom =_.random(-20, 100);
            var data = [];

            $(".charting-waterfall").empty();
            // console.log(data)
            var water = { 'name': 'Base Case', 'value': _.random(20, 100) };
            data.push(water);
            for (var i in dataChart) {
                // console.log(i)
                var anEvent = dataChart[i];
                var waterfallObject = {};
                waterfallObject['name'] = anEvent.eventName
                    // var firstValue = $scope.dataChart[0].value;
                    // waterfallObject['value'] = _.random(-20, 100);
                waterfallObject['value'] = anEvent.expectedRevenue;

                data.push(waterfallObject);
            }

            // console.log(dataChart)
            // console.log(data)

            var margin = { top: 20, right: 30, bottom: 30, left: 40 },
                width = width - margin.left - margin.right,
                height = height - margin.top - margin.bottom,
                padding = 0.3;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], padding);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")


            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(function(d) {
                    return dollarFormatter(d);
                }).ticks(5);


            var chart = d3.select(".charting-waterfall")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var cumulative = 0;
            for (var i = 0; i < data.length; i++) {
                data[i].start = cumulative;
                cumulative += data[i].value;
                data[i].end = cumulative;

                data[i].class = (data[i].value >= 0) ? 'positive' : 'negative'
            }
            data.push({
                name: 'Total',
                end: cumulative,
                start: 0,
                class: 'total'
            });

            x.domain(data.map(function(d) {
                return d.name;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.end;
            })]);

            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            // .ticks(20, "s");

            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var bar = chart.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", function(d) {
                    return "bar " + d.class
                })
                .attr("transform", function(d) {
                    return "translate(" + x(d.name) + ",0)";
                });

            bar.append("rect")
                .attr("y", function(d) {
                    return y(Math.max(d.start, d.end));
                })
                .attr("height", function(d) {
                    return Math.abs(y(d.start) - y(d.end));
                })
                .attr("width", x.rangeBand());

            bar.append("text")
                .attr("x", x.rangeBand() / 2)
                .attr("y", function(d) {
                    return y(d.end) - 10;
                })
                .attr("dy", function(d) {
                    return ((d.class == 'negative') ? '-' : '') + ".75em"
                })
                .text(function(d) {
                    return dollarFormatter(d.end - d.start);
                });

            bar.filter(function(d) {
                    return d.class != "total"
                }).append("line")
                .attr("class", "connector")
                .attr("x1", x.rangeBand() + 5)
                .attr("y1", function(d) {
                    return y(d.end)
                })
                .attr("x2", x.rangeBand() / (1 - padding) - 5)
                .attr("y2", function(d) {
                    return y(d.end)
                })
                // bar.filter(function(d) {
                //         return d.class == "positive"
                //     }).append("line")
                //     .attr("class", "bestcase")
                //     .attr("x1", x.rangeBand() / 4)
                //     .attr("y1", function(d) {
                //         // console.log(d);
                //         return y(d.end + 3000)
                //     })
                //     .attr("x2", (x.rangeBand() / (1 - padding)) / 2)
                //     .attr("y2", function(d) {
                //         return y(d.end + 3000)
                //     })
                // bar.filter(function(d) {
                //         return d.class == "negative"
                //     }).append("line")
                //     .attr("class", "bestcase")
                //     .attr("x1", x.rangeBand() / 4)
                //     .attr("y1", function(d) {
                //         console.log(d);
                //         return y(d.end - 3000)
                //     })
                //     .attr("x2", (x.rangeBand() / (1 - padding)) / 2)
                //     .attr("y2", function(d) {
                //         return y(d.end - 3000)
                //     })
                // });

            // function type(d) {
            //     d.value = +d.value;
            //     return d;
            // }

            function dollarFormatter(n) {
                n = Math.round(n);
                var result = n;
                if (Math.abs(n) > 1000) {
                    result = Math.round(n / 1000) + 'K';
                }
                return '$' + result;
            }
        }


        // =============================Draw WaterFall Chart==========================================================

        // =============================Draw Multiple Lines Chart==========================================================
        $scope.optionforBasic = {
            chart: {
                type: 'cumulativeLineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 65
                },
                x: function(d) {
                    return d[0];
                },
                y: function(d) {
                    return d[1] / 100;
                },
                average: function(d) {
                    return d.mean / 100;
                },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d) {
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 0
                }
            }
        };



        // =============================Draw Multiple Lines Chart==========================================================

        $scope.switchYear = function(event) {
            event.price = !event.price
            $scope.updateModel(event);
        }

        $scope.gridsterBasicPlannerDetail = {
            margins: [0, 20],
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
            colWidth: 210,
            rowHeight: 790
        }

        $scope.gridsterBasicChart = [
            { name: "Event", sizeX: 6, sizeY: 2, row: 0, col: 0, api: {} },
        ]


        // ============================// Gridster Items for Best Cast, Worst case Chart============================
        $scope.gridsterBasicPlannerCasesOption = {
            margins: [20, 20],
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
            // colWidth: 300
        }

        $scope.gridsterBasicPlannerCases = [
                { name: "Event", sizeX: 3, sizeY: 2, row: 0, col: 0, api: {} },
                { name: "Event1", sizeX: 3, sizeY: 2, row: 0, col: 4, api: {} },
            ]
            // ============================// Gridster Items for Best Cast, Worst case Chart============================


        // WaterFall for Best Cast/WorstCase/Base Case
        var dataWater = [];
        $scope.drawWaterFallCases = function(dataChart, heightGiven, widthGiven) {
            // var numberRandom =_.random(-20, 100);
            dataWater = [];

            $(".bestcase-waterfall").empty();
            // console.log(data)
            var water = { 'name': 'Base Case', 'value': _.random(20, 100) };
            dataWater.push(water);
            for (var i in dataChart) {
                // console.log(i)
                var anEvent = dataChart[i];
                var waterfallObject = {};
                waterfallObject['name'] = anEvent.eventName
                    // var firstValue = $scope.dataChart[0].value;
                waterfallObject['value'] = _.random(-20, 100);
                dataWater.push(waterfallObject);
            }

            var margin = { top: 0, right: 30, bottom: 30, left: 40 },
                width = widthGiven - margin.left - margin.right,
                height = heightGiven + margin.top + margin.bottom,
                padding = 0.3;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], padding);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")


            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(function(d) {
                    return dollarFormatter(d);
                }).ticks(5);


            var chart = d3.select(".bestcase-waterfall")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // d3.json(data, function(data) {
            // console.log(data)

            // Transform data (i.e., finding cumulative values and total) for easier charting
            var cumulative = 0;
            for (var i = 0; i < dataWater.length; i++) {
                dataWater[i].start = cumulative;
                cumulative += dataWater[i].value;
                dataWater[i].end = cumulative;

                dataWater[i].class = (dataWater[i].value >= 0) ? 'positive' : 'negative'
            }
            dataWater.push({
                name: 'Total',
                end: cumulative,
                start: 0,
                class: 'total'
            });

            x.domain(dataWater.map(function(d) {
                return d.name;
            }));
            y.domain([0, d3.max(dataWater, function(d) {
                // console.log(d3.max(dataWater))
                return d.end + 100;
                // console.log(d3.end)
            })]);

            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            // .ticks(20, "s");

            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var bar = chart.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", function(d) {
                    return "bar " + d.class
                })
                .attr("transform", function(d) {
                    return "translate(" + x(d.name) + ",0)";
                });

            bar.append("rect")
                .attr("y", function(d) {
                    return y(Math.max(d.start, d.end));
                })
                .attr("height", function(d) {
                    return Math.abs(y(d.start) - y(d.end));
                })
                .attr("width", x.rangeBand());

            bar.append("text")
                .attr("x", x.rangeBand() / 2)
                .attr("y", function(d) {
                    return y(d.end) - 10;
                })
                .attr("dy", function(d) {
                    return ((d.class == 'negative') ? '-' : '') + ".75em"
                })
                .text(function(d) {
                    return dollarFormatter(d.end - d.start);
                });

            bar.filter(function(d) {
                    return d.class != "total"
                }).append("line")
                .attr("class", "connector")
                .attr("x1", x.rangeBand() + 5)
                .attr("y1", function(d) {
                    return y(d.end)
                })
                .attr("x2", x.rangeBand() / (1 - padding) - 5)
                .attr("y2", function(d) {
                    return y(d.end)
                })

            var randomBestCase = _.random(20, 30);
            bar.append("line")
                .attr("class", "bestcase")
                .attr("x1", x.rangeBand() / 4)
                .attr("y1", function(d) {
                    // console.log(d);
                    return y(d.end + randomBestCase)
                })
                .attr("x2", (x.rangeBand() / (1 - padding)) / 2)
                .attr("y2", function(d) {
                    return y(d.end + randomBestCase)
                })

            var randomWorstCase = _.random(10, 20);
            bar.append("line")
                .attr("class", "worstcase")
                .attr("x1", x.rangeBand() / 4)
                .attr("y1", function(d) {
                    // console.log(d);
                    return y(d.end - randomWorstCase)
                })
                .attr("x2", (x.rangeBand() / (1 - padding)) / 2)
                .attr("y2", function(d) {
                    return y(d.end - randomWorstCase)
                })


            bar.append("line")
                .attr("class", "connectorBestWorst")
                .attr("x1", x.rangeBand() / 2)
                .attr("y1", function(d) {
                    // console.log(d);
                    return y(d.end + randomBestCase)
                })
                .attr("x2", x.rangeBand() / 2)
                .attr("y2", function(d) {
                    return y(d.end - randomWorstCase)
                })
                // bar.filter(function(d) {
                //         return d.class == "negative"
                //     }).append("line")
                //     .attr("class", "bestcase")
                //     .attr("x1", x.rangeBand() / 4)
                //     .attr("y1", function(d) {
                //         console.log(d);
                //         return y(d.end + 30)
                //     })
                //     .attr("x2", (x.rangeBand() / (1 - padding)) / 2)
                //     .attr("y2", function(d) {
                //         return y(d.end + 30)
                //     })

            function dollarFormatter(n) {
                n = Math.round(n);
                var result = n;
                if (Math.abs(n) > 1000) {
                    result = Math.round(n / 1000) + 'K';
                }
                return '$' + result;
            }
        };



        // =============================Draw WaterFall Chart==========================================================

        // =============================Draw Event Impact==========================================================
        $scope.quarters = ["x", "Q1", "Q2", "Q3", "Q4"];
        var randomImpact = _.random(20, 30);
        $scope.baseCase = ["Base Case", randomImpact, randomImpact, randomImpact, randomImpact];
        $scope.AllCase = ["All", _.random(10, 40), _.random(10, 40), _.random(10, 40), _.random(10, 40)];

        $scope.drawImpact = function(data) {
            // console.log(data)
            var ImpactData = [];
            ImpactData.unshift($scope.quarters);
            ImpactData.push($scope.baseCase);
            ImpactData.push($scope.AllCase);
            for (var i in data) {
                var anQuarterArray = [];
                var anEvent = data[i];
                anQuarterArray.unshift(anEvent.eventName);
                for (var x in anEvent.quarters) {
                    var quarterImpact = anEvent.quarters[x].quarterImpact
                    anQuarterArray.push(quarterImpact);
                }
                ImpactData.push(anQuarterArray);
            }
            // console.log(ImpactData);
            $scope.chart = c3.generate({
                bindto: '#eventImpact',
                data: {
                    x: 'x',
                    columns:
                    // time,
                    //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                        ImpactData,
                    type: 'line',
                    regions: {
                        'Base Case': [{ 'start': 0, 'end': 3, 'style': 'dashed' }],
                        'All': [{ 'start': 0, 'end': 3, 'style': 'dashed' }]
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                    }
                },
                point: {
                    show: false
                }
            });
        };

    })
    .controller('WidgetSettingsBasicCtrl',
        function($scope, $timeout, $rootScope, $uibModalInstance, widget, $http) {
            $scope.widget = widget;

            $scope.form = {
                name: widget.name,
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

                $http({
                    method: 'PUT',
                    url: '/api/basicplanners/' + widget._id,
                    data: widget
                }).success(function() {
                    setTimeout(function() { $('#analyse').trigger('click'); }, 100);
                    setTimeout(function() { $scope.drawWaterFall($scope.events, $(".panel-body").height() / 1.2, $(".panel-body").width()) }, 100);
                    setTimeout(function() { $scope.drawImpact($scope.events) }, 100);

                }).error(function() {
                    console.log("Error updated on Remove Promotion Scenario");
                });

                // console.log($scope.allscenarios);
                $uibModalInstance.close(widget);
            };

        })
