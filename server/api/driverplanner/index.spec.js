'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var driverplannerCtrlStub = {
  index: 'driverplannerCtrl.index',
  show: 'driverplannerCtrl.show',
  create: 'driverplannerCtrl.create',
  update: 'driverplannerCtrl.update',
  destroy: 'driverplannerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var driverplannerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './driverplanner.controller': driverplannerCtrlStub
});

describe('Driverplanner API Router:', function() {

  it('should return an express router instance', function() {
    expect(driverplannerIndex).to.equal(routerStub);
  });

  describe('GET /api/driverplanners', function() {

    it('should route to driverplanner.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'driverplannerCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/driverplanners/:id', function() {

    it('should route to driverplanner.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'driverplannerCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/driverplanners', function() {

    it('should route to driverplanner.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'driverplannerCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/driverplanners/:id', function() {

    it('should route to driverplanner.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'driverplannerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/driverplanners/:id', function() {

    it('should route to driverplanner.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'driverplannerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/driverplanners/:id', function() {

    it('should route to driverplanner.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'driverplannerCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
