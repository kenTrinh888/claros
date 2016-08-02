'use strict';

angular.module('clarosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('caseplanner', {
        url: '/caseplanner',
        templateUrl: 'app/caseplanner/caseplanner.html',
        controller: 'caseplannerController'
      });
  });
