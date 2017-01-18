'use strict';
// $( document ).ready(function() {
//     broadcast();
// });
angular.module('clarosApp')
    .controller('homeCtrl', function($http, $scope, socket, $timeout, $window, $uibModal, Auth, MasterPlan, $location) {
        $scope.turnVisible = function() {
            MasterPlan.turnVisible();
        }
    })
