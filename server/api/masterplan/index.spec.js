'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var masterplanCtrlStub = {
  index: 'masterplanCtrl.index',
  show: 'masterplanCtrl.show',
  create: 'masterplanCtrl.create',
  update: 'masterplanCtrl.update',
  destroy: 'masterplanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var masterplanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './masterplan.controller': masterplanCtrlStub
});

describe('Masterplan API Router:', function() {

  it('should return an express router instance', function() {
    expect(masterplanIndex).to.equal(routerStub);
  });

  describe('GET /api/masterplans', function() {

    it('should route to masterplan.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'masterplanCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/masterplans/:id', function() {

    it('should route to masterplan.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'masterplanCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/masterplans', function() {

    it('should route to masterplan.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'masterplanCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/masterplans/:id', function() {

    it('should route to masterplan.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'masterplanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/masterplans/:id', function() {

    it('should route to masterplan.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'masterplanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/masterplans/:id', function() {

    it('should route to masterplan.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'masterplanCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
