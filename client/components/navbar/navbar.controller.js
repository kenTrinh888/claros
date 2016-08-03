'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth,MasterPlan) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
   	Auth.getCurrentUser(function(data){
   		// console.log(data)
   });

    // this.masterplanVisible = MasterPlan.getMasterPlanVisble();

    this.masterplanVisible = MasterPlan.turnVisible();
  }

}

angular.module('clarosApp')
  .controller('NavbarController', NavbarController);
