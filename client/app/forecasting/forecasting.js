'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forecasting', {
        url: '/forecasting',
        templateUrl: 'app/forecasting/forecasting.html',
        controller: "forecastingCtrl"
      });
  });
