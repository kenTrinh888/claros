'use strict';

describe('Component: PlansummaryComponent', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var PlansummaryComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PlansummaryComponent = $componentController('plansummary', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
