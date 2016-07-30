'use strict';

describe('Controller: basicplannerController', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var basicplannerController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    basicplannerController = $controller('basicplannerController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
