'use strict';

function MasterPlanService($http) {
    // Service logic
    // ...

    var masterplanVisible = false;
    var masterPlan = {};
    var currentMasterPlan = {};

    masterPlan.turnVisible = function() {
        masterplanVisible = true;
        return masterplanVisible;
    }

    masterPlan.getVisibleProperty = function() {
        return masterplanVisible;
    }

    masterPlan.getMasterPlan = function(masterplanID) {
        $http({
            method: 'GET',
            url: '/api/masterplans/' + masterplanID
        }).success(function(data) {
             currentMasterPlan = data;
             return currentMasterPlan;
        }).error(function(data) {
            console.log("Error retrieved drugs");
        });

        
    }

    masterPlan.setCurrentPlan = function (aMasterPlan){
        currentMasterPlan = aMasterPlan;
    }

    masterPlan.getCurrentMasterPlan = function() {
        return currentMasterPlan;
    }

    // Public API here

    return masterPlan;
}


angular.module('clarosApp.MasterPlan', [])
    .factory('MasterPlan', MasterPlanService);
