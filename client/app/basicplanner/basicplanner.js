'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('basicplanner', {
        url: '/basicplanner',
        templateUrl: 'app/basicplanner/basicplanner.html',
        controller: 'basicplannerController'
      });
  });
