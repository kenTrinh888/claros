'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var drugCtrlStub = {
  index: 'drugCtrl.index',
  show: 'drugCtrl.show',
  create: 'drugCtrl.create',
  update: 'drugCtrl.update',
  destroy: 'drugCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var drugIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './drug.controller': drugCtrlStub
});

describe('Drug API Router:', function() {

  it('should return an express router instance', function() {
    expect(drugIndex).to.equal(routerStub);
  });

  describe('GET /api/drugs', function() {

    it('should route to drug.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'drugCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/drugs/:id', function() {

    it('should route to drug.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'drugCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/drugs', function() {

    it('should route to drug.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'drugCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/drugs/:id', function() {

    it('should route to drug.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'drugCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/drugs/:id', function() {

    it('should route to drug.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'drugCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/drugs/:id', function() {

    it('should route to drug.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'drugCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
