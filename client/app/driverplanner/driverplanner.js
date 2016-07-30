'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('driverplanner', {
        url: '/driverplanner',
        templateUrl: 'app/driverplanner/driverplanner.html',
        controller: 'driverplannerCtrl'
      });
  });
