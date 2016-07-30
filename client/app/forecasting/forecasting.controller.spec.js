'use strict';

describe('Component: ForecastingComponent', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var ForecastingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ForecastingComponent = $componentController('forecasting', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
