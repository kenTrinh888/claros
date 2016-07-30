'use strict';

angular.module('clarosApp.auth', ['clarosApp.constants', 'clarosApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
