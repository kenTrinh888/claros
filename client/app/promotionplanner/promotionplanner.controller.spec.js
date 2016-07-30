'use strict';

describe('Component: PromotionplannerComponent', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var PromotionplannerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PromotionplannerComponent = $componentController('promotionplanner', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
