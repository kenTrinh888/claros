'use strict';

angular.module('clarosApp', ['clarosApp.auth', 'clarosApp.admin', 'clarosApp.constants',
        'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
        'validation.match', 'gridster', 'ngMaterial', 'rzModule', 'nvd3', 'xeditable','angularInlineEdit','uiSwitch'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })
