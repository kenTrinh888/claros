'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plansummary', {
        url: '/plansummary',
        templateUrl: 'app/plansummary/plansummary.html',
        controller: "PlanSummaryCtrl"
      });
  });
