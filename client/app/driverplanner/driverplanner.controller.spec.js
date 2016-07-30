'use strict';

describe('Component: DriverplannerComponent', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var DriverplannerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DriverplannerComponent = $componentController('driverplanner', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
