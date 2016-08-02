'use strict';

describe('Component: CaseplannerComponent', function () {

  // load the controller's module
  beforeEach(module('clarosApp'));

  var CaseplannerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    CaseplannerComponent = $componentController('caseplanner', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
