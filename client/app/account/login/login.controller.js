'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          if(this.Auth.isAdmin()){
            this.$state.go('basicplanner');
          }else{
            this.$state.go('forecasting');
          }
          
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('clarosApp')
  .controller('LoginController', LoginController);
