'use strict';

angular.module('clarosApp')
    .controller('forecastingCtrl', function($scope, $http, $timeout, socket, Auth, $window) {
        // $scope.displayDashboard = false;
        $scope.user = Auth.getCurrentUser(function(data) {
            $scope.user = data;

            // //console.log(data);
            // //console.log($scope.user.role)


            // ------------------------Seting of Gridster for Forecasting  -------------------------------------
            $scope.resetButton = false;
            $scope.gridsterForecasting = {
                margins: [20, 20],
                columns: 2,
                draggable: {
                    enabled: false
                },
                mobileModeEnabled: true,
                resizable: {
                    enabled: true,
                    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
                    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                    handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                    start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                    resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                    stop: function(event, $element, widget) {
                            $("#drawDashboard").click();
                        } // optional callback fired when item is finished resizing
                },
                rowHeight: 285
            };
            // ------------------------Seting of Gridster for Forecasting -------------------------------------

            // ------------------------Seting of Gridster for Forecasting  -------------------------------------

            // $scope.gridsterFilter = {
            //     margins: [20, 20],
            //     columns: 2,
            //     draggable: {
            //         handle: 'h3'
            //     },
            //     mobileModeEnabled: true,
            //     resizable: {
            //         enabled: true,
            //         handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
            //         start: function(event, $element, widget) {}, // optional callback fired when resize is started,
            //         resize: function(event, $element, widget) {

            //         }, // optional callback fired when item is resized,
            //         stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            //     },
            //     // rowHeight: 120
            // };
            // ------------------------Seting of Gridster for Forecasting -------------------------------------
            // ------------------------Number of Gridster for Forecasting -------------------------------------
            $scope.ForecastingGridsterItems = [
                { name: "Growth/Size Quadrant", sizeX: 1, sizeY: 1, row: 0, col: 0, api: {} },
                { name: "Driver Correlation", sizeX: 1, sizeY: 1, row: 0, col: 1, api: {} },
                { name: "Sell-in Forecasting", sizeX: 1, sizeY: 1, row: 1, col: 0, api: {} },
                { name: "Sell-out Forecasting", sizeX: 1, sizeY: 1, row: 1, col: 1, api: {} },
            ]


            // ------------------------Number of Gridster for Forecasting -------------------------------------


            $scope.filteritem = [
                { name: "Priority Quadrant", sizeX: 4, sizeY: 1, row: 0, col: 0, api: {} },
            ]

            // =================================Filter Variable for FMCG=============================

            // =================================Filter Variable for Pharma=============================
            $scope.drugChosen = { "id": 1, "name": "All" }
            $scope.drugs = [{ "id": 1, "name": "All" }, {
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

            $scope.channelChosen = { "id": 1, "name": "All" };
            $scope.channels = [{
                "id": 1,
                "name": "All"
            }, {
                "id": 2,
                "name": "Pharmacy"
            }, {
                "id": 3,
                "name": "Hospital"
            }, {
                "id": 4,
                "name": "Government"
            }]

            $scope.historicalChosen = { "id": 2, "name": "6 months" };
            $scope.historical = [{
                "id": 1,
                "name": "3 months",
                "value": 3
            }, {
                "id": 2,
                "name": "6 months",
                "value": 6
            }, {
                "id": 3,
                "name": "12 months",
                "value": 12
            }];

            $scope.futureChosen = { "id": 2, "name": "6 months" };
            $scope.future = [{
                "id": 1,
                "name": "3 months",
                "value": 3
            }, {
                "id": 2,
                "name": "6 months",
                "value": 6
            }, {
                "id": 3,
                "name": "12 months",
                "value": 12
            }];

            // =================================Filter Variable for Pharma=============================

            $scope.CustomerChosen = {};
            $scope.catChosen = { "name": "All", "id": 0 };
            $scope.Category = [{ "name": "All", "id": 0 }, { "name": "Food and Drink", "id": 1 }, { "name": "Home Care", "id": 2 }, { "name": "Personal Care", "id": 3 }]
            $scope.brandChosen = {};
            $scope.Brand = [
                { "name": "All", "did": 0 },
                { "name": "Annapurna salt and atta", "did": 1 },
                { "name": "Bru coffee", "did": 1 },
                { "name": "Active Wheel detergent", "did": 2 },
                { "name": "Cif Cream Cleaner", "did": 2 },
                { "name": "Aviance Beauty Solutions", "did": 3 },
                { "name": "Axe deodorant and aftershaving lotion and soap", "did": 3 }
            ];
            $scope.CatList = $scope.Category;
            $scope.filterCategory = function(brandChosen) {
                    //console.log(brandChosen);

                    if (brandChosen === "All") {
                        $scope.CatList = $scope.Category;
                    } else {
                        $scope.CatList = [];
                        var brandname = brandChosen.name;
                        var anAllObject = { "name": "All", "id": 0 }
                        $scope.CatList.push(anAllObject);
                        for (var i in $scope.Category) {
                            var aCat = $scope.Category[i];
                            if (aCat.id === brandChosen.did) {

                                // $scope.CatList.push(anAllObject);
                                // $scope.catChosen.name = aCat.name;
                                $scope.CatList.push(aCat);
                            }
                        }
                    }

                }
                // //console.log($scope.catChosen);
            $scope.BrandList = $scope.Brand;
            $scope.filterExpression = function(catChosen) {

                //console.log(catChosen);
                // //console.log($scope.catChosen);

                if (catChosen.name === "All") {
                    $scope.BrandList = $scope.Brand;
                } else {
                    $scope.BrandList = [];
                    var anAllObject = { "name": "All", "id": 0 };
                    $scope.BrandList.push(anAllObject)
                    for (var i in $scope.Brand) {
                        var anObject = $scope.Brand[i];
                        if (anObject.did == catChosen.id) {

                            $scope.BrandList.push(anObject)
                        }
                    }
                }
            };

            $scope.Channel = { "name": "E-commerce" };
            $scope.Customer = { "name": "All" };

            // =================================Filter Variable for FMCG=============================

            var scatterdataPlot = [];
            // =================================ScatterPlot Data for FMCG and Pharma=============================

            var quadrants = [{
                "size": _.random(200, 500),
                "quadrantName": "Growing and Significance",
                // "quadrantValue": _.random(70, 100)
            }, {
                "size": _.random(100, 200),
                "quadrantName": "Growing and InSignificance",
                // "quadrantValue": _.random(50, 100)
            }, {
                "size": _.random(400, 600),
                "quadrantName": "Not Growing and Significance",
                // "quadrantValue": _.random(50, 100)
            }, {
                "size": _.random(50, 150),
                "quadrantName": "Not Growing and InSignificance",
                // "quadrantValue": _.random(50, 100)
            }]
            if ($scope.user.role === "CPG") {
                scatterdataPlot = [
                    // { name: 'Grofers', upload: 200, download: 200 },
                    { name: 'Freshdirect', "size": _.random(200, 500), "Growing and Significance": _.random(70, 100) },
                    { name: 'Localbanya', "size": _.random(100, 200), "Growing and InSignificance": _.random(50, 100) },
                    { name: 'Bigbasket', "size": _.random(200, 400), "Growing and Significance": _.random(50, 100) },
                    { name: 'Naturesbasket', "size": _.random(50, 150), "Not Growing and InSignificance": _.random(-50, 3) },
                    { name: 'Grofers', "size": _.random(400, 600), "Not Growing and Significance": _.random(-20, 5) },
                ]
            } else {
                for (var i in $scope.drugs) {
                    var drug = $scope.drugs[i];
                    var drugName = drug.name;
                    var quadrantRandomIndex = _.random(0, 3);
                    // //console.log(quadrantRandomIndex)
                    // //console.log(quadrantName)

                    if (drug.name !== "All") {
                        var quadrantName = quadrants[quadrantRandomIndex].quadrantName;
                        if (quadrantName === "Growing and Significance") {
                            var quadrantName = quadrants[quadrantRandomIndex].quadrantName;
                            // var quadrantValue = _.random(70, 100)
                            drug[drugName] = _.random(70, 100);
                            drug['size'] = _.random(200, 450);
                        } else if (quadrantName === "Growing and InSignificance") {
                            var quadrantName = quadrants[quadrantRandomIndex].quadrantName;
                            // var quadrantValue = _.random(50, 100)
                            drug[drugName] = _.random(50, 100);
                            drug['size'] = _.random(100, 200);
                        } else if (quadrantName === "Not Growing and InSignificance") {
                            var quadrantName = quadrants[quadrantRandomIndex].quadrantName;
                            // var quadrantValue = _.random(-50, 3)
                            drug[drugName] = _.random(-50, 3);
                            drug['size'] = _.random(50, 150);
                        } else {
                            var quadrantName = quadrants[quadrantRandomIndex].quadrantName;
                            // var quadrantValue = _.random(-20, 5)
                            drug[drugName] = _.random(-20, 5);
                            drug['size'] = _.random(350, 450);
                        }
                        // drug['size'] = quadrants[quadrantRandomIndex].size;
                        scatterdataPlot.push(drug)
                    }
                }
            }

            var drugNames = [];
            for (var i in $scope.drugs) {
                var aDrug = $scope.drugs[i];
                if (aDrug.name != "All") {
                    drugNames.push(aDrug.name);
                }
            };
            $scope.drawGraph = function(channelChosenName, drugChosenName) {

                $scope.chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        // iris data from R
                        json: scatterdataPlot,
                        keys: {
                            x: "size",
                            value: drugNames
                                // value: ['Growing and Significance', 'Growing and InSignificance', 'Not Growing and InSignificance', 'Not Growing and Significance']

                        },
                        type: 'scatter',
                        onclick: function(d, index) {
                            // $scope.resetButton = true;
                            // $scope.resetButton = true;
                            $scope.setButtonVisible();
                            this.focus(d.name)
                            for (var i in $scope.drugs) {
                                var aDrug = $scope.drugs[i];
                                if (aDrug.name == d.name) {
                                    $scope.showDrugChosen = true;
                                    $scope.drugChosen = aDrug;
                                }
                            }
                            // console.log($scope.drugChosen)

                            $('#drugChosenName').empty();
                            $('#drugChosenName').append(d.name);
                            var nameOfcustomer = scatterdataPlot[d.index].name
                            $scope.drawSellin(channelChosenName, $scope.SellinData, $('.box-forecasting').height() / 1.2, $('.box-forecasting').width() / 1.1);
                            $scope.drawSellout(channelChosenName, $scope.SelloutData, $('.box-forecasting').height() / 1.2, $('.box-forecasting').width() / 1.1);
                            $scope.drawWaterFall(nameOfcustomer, channelChosenName, $scope.waterFallData, $('.box-forecasting').height() / 1.7, $('.box-forecasting').width() / 1.1);
                        }

                    },
                    axis: {
                        x: {
                            label: 'Revenue',
                            max: 500,
                            min: 0,
                            tick: {
                                fit: false
                            }
                        },
                        y: {
                            label: 'Growth %',
                            max: 100,
                            min: -50,

                        }
                    },
                    tooltip: {
                        format: {
                            name: function(name, ratio, id, index) {
                                return name
                                    //console.log(id)
                                    // return scatterdataPlot[index].name
                            }
                        }
                    },
                    point: {
                        r: 7,
                        focus: {
                            expand: {
                                r: 15
                            }
                        },
                        select: {
                            r: 15
                        }
                    },
                    grid: {
                        x: {
                            lines: [
                                { value: 250 },
                            ]
                        },
                        y: {
                            lines: [
                                { value: 50 },
                            ]
                        }
                    },
                    legend: {
                        show: false
                    }
                });
                if (drugChosenName != "All") {
                    $scope.chart.focus(drugChosenName);
                }

                // var width = $(".c3-event-rect").width()
                var svgAttr = d3.select("rect");
                var heightSVG = svgAttr[0][0].height;
                var widthSVG = svgAttr[0][0].width;
                // var height = heightSVG.value;
                var SVGheight = heightSVG.baseVal.value;
                var SVGwidth = widthSVG.baseVal.value;
                // console.log(SVGwidth)
                // console.log(SVGheight)
                d3.select("svg").append("text")
                    .attr("x", 150)
                    .attr("y", 25)
                    .attr("class", "quadrant-text") // add class to show the event in front
                    .style("text-anchor", "middle")
                    .text("Growing-Not Significance")
                    .style('fill', 'grey')
                d3.select("svg").append("text")
                    .attr("x", 150)
                    .attr("y", 90)
                    .attr("class", "quadrant-text") // add class to 
                    .style("text-anchor", "middle")
                    .text("Not Growing-Not Significance")
                    .style('fill', 'grey')
                d3.select("svg").append("text")
                    .attr("x", 350)
                    .attr("y", 90)
                    .attr("class", "quadrant-text") // add class
                    .style("text-anchor", "middle")
                    .text("Not Growing-Significance")
                    .style('fill', 'grey')
                d3.select("svg").append("text")
                    .attr("x", 350)
                    .attr("y", 25)
                    .attr("class", "quadrant-text") // add class
                    .style("text-anchor", "middle")
                    .text("Growing-Significance")
                    .style('fill', 'grey')

            }


            $scope.setButtonVisible = function() {
                // console.log($scope.resetButton)
                $timeout(function() {
                    $scope.resetButton = true;
                }, 100);
                // console.log($scope.resetButton)
            }

            $scope.resetDefault = function() {
                $scope.drugChosen = $scope.drugs[0];
                $scope.channelChosen = $scope.channels[0];
                $scope.DisplayDashboard($scope.channels[0], $scope.drugs[0])
            }

            // =============================Draw WaterFall Chart==========================================================

            var driversplanner = ["Online Investment", "Offline Investment", "Promotional Support", "Competitor Promotion"]
            $scope.waterFallData = [];

            if ($scope.user.role === "CPG") {
                var allObject = {};
                allObject['customer'] = "All"
                allObject['drivers'] = [
                    { 'category': 'Base Case', 'value': _.random(10, 50) },
                    { 'category': 'Online Investment', 'value': _.random(-5, 20) },
                    { 'category': 'Offline Investment', 'value': _.random(-5, 20) },
                    { 'category': 'Promotional Support', 'value': _.random(-1, 20) },
                    { 'category': 'Competitor Promotion', 'value': _.random(-5, 20) },
                    // { 'category': 'Staff', 'value': _.random(-20, 20) },
                    { 'category': 'Total', 'value': 'e' }
                ];

                // allObject.drivers.push(dataRandomAll)
                $scope.waterFallData.push(allObject)
                for (var i in scatterdataPlot) {
                    var aCustomer = scatterdataPlot[i];
                    var anObject = {};
                    anObject['customer'] = aCustomer.name;
                    anObject['drivers'] = [
                        { 'category': 'Base Case', 'value': _.random(10, 50) },
                        { 'category': 'Online Investment', 'value': _.random(-5, 20) },
                        { 'category': 'Offline Investment', 'value': _.random(-5, 20) },
                        { 'category': 'Promotional Support', 'value': _.random(-1, 20) },
                        { 'category': 'Competitor Promotion', 'value': _.random(-5, 20) },
                        // { 'category': 'Staff', 'value': _.random(-20, 20) },
                        { 'category': 'Total', 'value': 'e' }
                    ];

                    // anObject.drivers = dataRandom 
                    $scope.waterFallData.push(anObject)

                }
            } else {

                for (var i in $scope.drugs) {
                    var drugName = $scope.drugs[i]
                    for (x in $scope.channels) {
                        var anObject = {};
                        anObject['customer'] = drugName;
                        anObject['channel'] = {};
                        anObject['channel'] = {
                            "name": $scope.channels[x].name,
                            "drivers": [
                                { 'category': 'Base Case', 'value': _.random(10, 50) },
                                { 'category': 'KOL Activity', 'value': _.random(-5, 20) },
                                { 'category': 'Innovation', 'value': _.random(-5, 20) },
                                { 'category': 'Sales and Discount', 'value': _.random(-5, 20) },
                                // { 'category': 'Staff', 'value': _.random(-20, 20) },
                                { 'category': 'Total', 'value': 'e' }
                            ]
                        }
                        $scope.waterFallData.push(anObject)

                    }

                }
            }

            $scope.drawWaterFall = function(customer, channelNameChosen, data) {
                // //console.log(customer)
                $('#waterfall').empty()
                var dataWater = [];
                if ($scope.user.role === "CPG") {
                    for (var i in data) {
                        var customerName = data[i].customer;
                        if (customerName == customer) {
                            // //console.log(customer)
                            dataWater = data[i].drivers
                        }
                    }
                } else {
                    for (var i in data) {
                        var customerName = data[i].customer.name;
                        var channelName = data[i].channel.name;
                        if (customerName == customer && channelNameChosen == channelName) {
                            //console.log("match")
                            dataWater = data[i].channel.drivers
                        }
                    }
                }

                // //console.log(data)
                // //console.log(dataWater)
                var parsedData = d4.parsers.waterfall()
                    .x(function() {
                        return 'category';
                    })
                    .y(function() {
                        return 'value';
                    })
                    .nestKey(function() {
                        return 'category';
                    })(dataWater);

                var chart = d4.charts.waterfall()
                    .width($(".panel-body").width() / 1.2)
                    .height(135)
                    .x(function(x) {
                        x.key('category');
                    })
                    .y(function(y) {
                        y.key('value');
                    });

                d3.select('#example')
                    .datum(parsedData.data)
                    .call(chart);
            }

            // =============================Draw WaterFall Chart==========================================================
            $scope.randomizedataforLineChart = function(data) {
                    for (i = 1; i < data.length; i++) {
                        for (x = 1; x < data[i].length; x++) {
                            if (x == 1) {
                                data[i][x] = _.random(100, 500);
                            } else {
                                var previousAmount = data[i][x - 1];
                                data[i][x] = previousAmount * (1 + _.random(-.3, .3))
                            }

                        }
                    }
                    return
                }
                // =============================Draw Sell-in==========================================================
            var time = ["x", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            var channelsName = [{ "name": "All" }, { "name": "Government" }, { "name": "Pharmacy" }, { "name": "Hospital" }]
            $scope.SellinData = [];
            if ($scope.user.role === "CPG") {
                for (var i in scatterdataPlot) {
                    var dataArray = [];
                    var name = scatterdataPlot[i].name;
                    dataArray.push(name);

                    // $scope.SellinData.push(name);
                    for (var x = 0; x < 12; x++) {
                        if (x == 0) {
                            var random = _.random(100, 500);
                            dataArray.push(random);
                        } else {
                            var randomNumber = parseInt(dataArray[dataArray.length - 1]);
                            var numToadd = randomNumber * (1 + (_.random(-0.2, .2)))
                            dataArray.push(numToadd);

                        }

                    }
                    $scope.SellinData.push(dataArray)
                }
            } else {
                for (var i in channelsName) {
                    var dataArray = [];
                    var channelname = channelsName[i].name;
                    dataArray.push(channelname);
                    // $scope.SellinData.push(name);
                    // //console.log(channelname);
                    for (var x = 0; x < 12; x++) {
                        if (x == 0) {
                            var random = _.random(100, 500);
                            dataArray.push(random);
                        } else {
                            var randomNumber = parseInt(dataArray[dataArray.length - 1]);
                            var numToadd = randomNumber * (1 + (_.random(-0.2, .2)))
                            dataArray.push(numToadd);
                        }
                    }
                    //console.log(dataArray);
                    $scope.SellinData.push(dataArray)
                }
            }
            $scope.SellinData.unshift(time);
            $scope.drawSellin = function(nameOfcustomer, data, height, width) {
                var dataForSellin = [];
                if (nameOfcustomer === "All") {
                    var dataForSellin = data;
                } else {
                    for (var i in data) {
                        var name = data[i][0];
                        if (name === nameOfcustomer || name == "x") {
                            dataForSellin.push(data[i])
                        }
                    }
                }
                //console.log(data)
                // console.log(dataForSellin)
                // $scope.randomizedataforLineChart(dataForSellin);
                var regionObject = {};
                var dashstyle = [{ 'start': 6, 'end': 12, 'style': 'dashed' }];
                for (var i = 1; i < data.length; i++) {
                    var name = data[i][0];
                    // //console.log(name)
                    regionObject[name] = dashstyle;
                }

                $scope.chart = c3.generate({
                    bindto: '#sell-in',
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
                            label: "Month",
                            type: 'category',
                            // tick: {
                            //     rotate: 75,
                            //     multiline: false
                            // },
                            // height: 130
                        },
                        y: {
                            label: "Sell-in"
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
                    }
                });
            };
            // =============================Draw Sell-in==========================================================
            // =============================Draw Sell-out==========================================================
            $scope.SelloutData = [];
            if ($scope.user.role === "CPG") {
                for (var i in scatterdataPlot) {
                    var dataArray = [];
                    var name = scatterdataPlot[i].name;
                    dataArray.push(name);
                    // $scope.SellinData.push(name);
                    for (var x = 0; x < 12; x++) {
                        var random = _.random(100, 500);
                        dataArray.push(random);
                    }
                    $scope.SelloutData.push(dataArray)
                }
            } else {
                for (var i in channelsName) {
                    var dataArray = [];
                    var name = channelsName[i].name;
                    dataArray.push(name);
                    // $scope.SellinData.push(name);
                    for (var x = 0; x < 12; x++) {
                        if (x == 0) {
                            var random = _.random(100, 500);
                            dataArray.push(random);
                        } else {
                            var randomNumber = parseInt(dataArray[dataArray.length - 1]);
                            var numToadd = randomNumber * (1 + (_.random(-0.2, .2)))
                            dataArray.push(numToadd);

                        }
                    }
                    $scope.SelloutData.push(dataArray)
                }
            }
            $scope.SelloutData.unshift(time);
            $scope.drawSellout = function(nameOfcustomer, data, height, width) {
                // //console.log(data)
                var regionObject = {};
                var dataForSellout = [];
                if (nameOfcustomer === "All") {
                    var dataForSellout = data;
                } else {
                    for (var i in data) {
                        var name = data[i][0];
                        if (name == nameOfcustomer || name == "x") {
                            dataForSellout.push(data[i])
                        }
                    }
                }
                // $scope.randomizedataforLineChart(dataForSellout);
                var dashstyle = [{ 'start': 6, 'end': 12, 'style': 'dashed' }];
                for (var i = 1; i < data.length; i++) {
                    var name = data[i][0];
                    // //console.log(name)
                    regionObject[name] = dashstyle;
                }
                // //console.log(regionObject)
                $scope.chart = c3.generate({
                    bindto: '#sell-out',
                    data: {
                        x: 'x',
                        columns:
                        // time,
                        //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                            dataForSellout,
                        type: 'line',
                        regions: regionObject
                    },
                    axis: {
                        x: {
                            label: "Month",
                            type: 'category',
                            // tick: {
                            //     rotate: 75,
                            //     multiline: false
                            // },
                            // height: 130
                        },
                        y: {
                            label: "Sell-in"
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
                    }
                });
            };
            // =============================Draw Sell-out==========================================================

            // =============================Draw WaterFall Chart==========================================================


            $scope.DisplayDashboard = function(channelChosen, drugChosen) {
                // setTimeout(function() {
                if (drugChosen.name !== "All") {
                    $scope.resetButton = true;
                } else {
                    $scope.resetButton = false;
                }
                $scope.drawWaterFall(drugChosen.name, channelChosen.name, $scope.waterFallData);
                $scope.drawGraph(channelChosen.name, drugChosen.name);
                $scope.drawSellin(channelChosen.name, $scope.SellinData, $('.box-forecasting').height() / 1.2, $('.box-forecasting').width() / 1.1);
                $scope.drawSellout(channelChosen.name, $scope.SelloutData, $('.box-forecasting').height() / 1.2, $('.box-forecasting').width() / 1.1);

                // }, 100)
            }
            angular.element(document).ready(function() {
                    $("#drawDashboard").click();
                    // setTimeout(function() {
                    //     $("#drawDashboard").click();
                    // }, 100)
                })
                // $("#drawDashboard").click();
            if (!$scope.$$phase) {

                $scope.$on('gridster-mobile-changed', function(gridster) {
                    //console.log("mobile Changed");
                    $("#drawDashboard").click();
                })
                scope.$on('gridster-resizable-changed', function(gridster) {
                    $("#drawDashboard").click();
                })
            }
            angular.element(window).on('resize', function(e) {
                $timeout(function() {
                    $("#drawDashboard").click();
                })
            });


        })
    });
