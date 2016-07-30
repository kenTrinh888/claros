'use strict';

angular.module('clarosApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });
  });
