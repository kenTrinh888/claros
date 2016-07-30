'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('promotionplanner', {
        url: '/promotionplanner',
        templateUrl: 'app/promotionplanner/promotionplanner.html',
        controller: "promotionController"
      });
  });
