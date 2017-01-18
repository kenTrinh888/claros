'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor($scope,Auth,MasterPlan, $location) {
    this.masterplanVisible = MasterPlan.getVisibleProperty();
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    // $scope.visibleTurn = function (){
    //   MasterPlan.turnVisiblePlan();
    // }
    // console.log(this.masterplanVis
      $scope.logout = function(){
        console.log("logout")
         $location.path('/');
      }
  }

}

angular.module('clarosApp')
  .controller('NavbarController', NavbarController);
