'use strict';

angular.module('clarosApp')
    .controller('caseplannerController', function($scope, $http, $timeout, socket, $uibModal, $window) {
        // ------------------------Seting of Gridster  -------------------------------------
        $('#arrangePosition').trigger('click');
        $scope.gridsterOptionsCasePlanner = {
            margins: [20, 20],
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
            rowHeight: 250,
            // minSizeY: 2,
        };

        $scope.resizeIpad = function() {
            if ($window.innerWidth < 785 && $window.innerWidth > 700) {
                // console.log("Change window Size 785");
                $scope.gridsterOptionsCasePlanner = {
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
                    rowHeight: 650,
                    // minSizeY: 2,
                };
            } else {
                // console.log("Screen less than Size 770");
                $scope.gridsterOptionsCasePlanner = {
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
                    rowHeight: 250,
                    // minSizeY: 2,
                };
            }
        }
        $scope.resizeIpad();
        // ------------------------Seting of Gridster  -------------------------------------
        // ------------------------Get the basic planner event-------------------------------------
        $scope.KPIChosen = { "id": 1, "name": "Revenue" }
        $scope.KPI = [{ "id": 1, "name": "Revenue" }, { "id": 2, "name": "Volume" }]
            // $scope.drugChosen = { "name": "Actemra, Polyarticular Juvenile Idiopathic Arthritis", "_id": "5799635dd33025fb02278423" }
        $http({
            method: 'GET',
            url: '/api/drugs/'
        }).success(function(data) {
            // console.log(data)
            $scope.drugs = data;
            $scope.drugChosen = $scope.drugs[0]
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
                    $scope.eventsNames = [];
                    for (var i in $scope.events) {
                        var anEvent = $scope.events[i];
                        anEvent.row = parseInt(i);
                        // anEvent.col = parseInt(i);
                        var aneventName = anEvent.eventName;
                        $scope.eventsNames.push(aneventName);

                    }
                    $scope.eventChosen = $scope.eventsNames[0];
                    socket.syncUpdates('basicplanner', $scope.events);
                    setTimeout(function() {
                        $('#arrangePosition').trigger('click');
                        $('#drawEventCaseImpact').trigger('click');
                        $('#generateWaterFallCases').trigger('click');

                    }, 100);

                }).error(function(data) {
                    console.log("Error retrieved food order");
                });
            }
            // ------------------------Get the basic planner event-------------------------------------

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

        $scope.generateWaterFallChart = function(events) {
                $scope.drawWaterFallCases(events, $("#eventCaseImpact").height() - 30, $("#eventCaseImpact").width());
            }
            // =============================Draw WaterFall Chart==========================================================

        $scope.drawWaterFallCases = function(dataChart, heightGiven, widthGiven) {
            // var numberRandom =_.random(-20, 100);
            var dataWater = [];

            $(".cases-waterfall").empty();
            // console.log(data)
            var water = { 'name': 'Base Case', 'value': _.random(20, 100) };
            dataWater.push(water);
            for (var i in dataChart) {
                // console.log(i)
                var anEvent = dataChart[i];
                var waterfallObject = {};
                waterfallObject['name'] = anEvent.eventName;
                // var firstValue = $scope.dataChart[0].value;
                waterfallObject['value'] = anEvent.expectedRevenue;
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


            var chart = d3.select(".cases-waterfall")
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
            // console.log(dataWater)
            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            // .ticks(20, "s");

            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var bar = chart.selectAll(".bar")
                .data(dataWater)
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


        // =============================Draw IMPACT Chart==========================================================
        $scope.quarters = ["x", "Q1", "Q2", "Q3", "Q4"];
        var randomImpact = _.random(20, 30);
        // $scope.baseCase = ["Base Case", randomImpact, randomImpact, randomImpact, randomImpact];
        $scope.AllCase = ["All", _.random(30, 40), _.random(30, 40), _.random(30, 40), _.random(30, 40)];
        $scope.eventChosen = { "name": "Event 1" }
        $scope.drawEventCaseImpact = function(eventName, data) {
            // console.log(eventName)
            console.log(data)
            var ImpactData = [];
            ImpactData.unshift($scope.quarters);
            // ImpactData.push($scope.baseCase);
            ImpactData.push($scope.AllCase);
            for (var i in data) {
                var anQuarterArray = [];
                var baseCaseArray = ["Base Case"];
                var bestCaseArray = ["Best Case"];
                var worstCaseArray = ["Worst Case"];
                var anEvent = data[i];
                var anEventName = anEvent.eventName;
                var quarters = anEvent.quarters;
                if (anEventName == eventName) {
                    for (var x in quarters) {
                        var anQuarter = quarters[x];
                        var quarterCases = anQuarter.quarterCases;
                        for (var y in quarterCases) {
                            var aquarterCase = quarterCases[y];
                            var aquarterCaseName = aquarterCase.quarterCase;
                            var quarterCaseImpact = aquarterCase.quarterCaseImpact;
                            if (baseCaseArray[0] == aquarterCaseName) {
                                baseCaseArray.push(quarterCaseImpact);
                            } else if (bestCaseArray[0] == aquarterCaseName) {
                                bestCaseArray.push(quarterCaseImpact);
                            } else {
                                worstCaseArray.push(quarterCaseImpact);
                            }
                        }
                    }
                }
                ImpactData.push(baseCaseArray);
                ImpactData.push(bestCaseArray);
                ImpactData.push(worstCaseArray);
            }
            // console.log(ImpactData);
            $scope.chart = c3.generate({
                bindto: '#eventCaseImpact',
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
        // =============================Draw IMPACT Chart==========================================================

        $scope.myValidator = function(index, newValue, event, quarter) {
            // return newValue
            console.log(index)
            console.log(quarter)
            quarter.quarterCases[index].quarterCaseSpend = newValue;
            for (var i in event.quarter) {
                var aQuarter = event.quarter[i];
                if (aQuarter.name = quarter.name) {
                    event.quarter[i] = quarter;
                }
            }
            // event.quarters[index].quarterSpend = newValue;
            event.expectedRevenue = _.random(-30, 80)
            $scope.updateModel(event)
        };

        // ============================================Model Update============================================
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
                        $scope.resizeIpad();
                        $('#drawEventCaseImpact').trigger('click');
                        $('#generateWaterFallCases').trigger('click');
                    }, 100);
                }).error(function() {
                    console.log("Error updated on Remove Promotion Scenario");
                });
                // setTimeout(function() { $('#analyse').trigger('click'); }, 100);
            }
            // ============================================Model Update============================================
        $scope.priceVolumeChange = function(event) {
                console.log(event.price);
            }
            // ------------------------Recalculate the slider Position -------------------------------------
        $scope.$on("slideEnded", function() {
            setTimeout(function() { $('#updateModel').trigger('click'); }, 100);

        });

        angular.element(window).on('resize', function(e) {
            $timeout(function() { $scope.resizeIpad(); }, 100)
            $timeout(function() { $('#arrangePosition').trigger('click'); }, 200);
            $('#generateWaterFallCases').trigger('click');
            // $window.location.reload();
        })
        $scope.$on('gridster-mobile-changed', function(gridster) {
            $scope.resizeIpad();
        })


    })
