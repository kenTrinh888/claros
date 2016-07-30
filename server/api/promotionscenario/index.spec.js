'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var promotionscenarioCtrlStub = {
  index: 'promotionscenarioCtrl.index',
  show: 'promotionscenarioCtrl.show',
  create: 'promotionscenarioCtrl.create',
  update: 'promotionscenarioCtrl.update',
  destroy: 'promotionscenarioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var promotionscenarioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './promotionscenario.controller': promotionscenarioCtrlStub
});

describe('Promotionscenario API Router:', function() {

  it('should return an express router instance', function() {
    expect(promotionscenarioIndex).to.equal(routerStub);
  });

  describe('GET /api/promotionscenarios', function() {

    it('should route to promotionscenario.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'promotionscenarioCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/promotionscenarios/:id', function() {

    it('should route to promotionscenario.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'promotionscenarioCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/promotionscenarios', function() {

    it('should route to promotionscenario.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'promotionscenarioCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/promotionscenarios/:id', function() {

    it('should route to promotionscenario.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'promotionscenarioCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/promotionscenarios/:id', function() {

    it('should route to promotionscenario.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'promotionscenarioCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/promotionscenarios/:id', function() {

    it('should route to promotionscenario.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'promotionscenarioCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
