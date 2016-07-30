'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
   	Auth.getCurrentUser(function(data){
   		// console.log(data)
   });
    
  }

}

angular.module('clarosApp')
  .controller('NavbarController', NavbarController);
