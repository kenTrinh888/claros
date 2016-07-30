'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var basicplannerCtrlStub = {
    bootstrap: 'basicplannerCtrl.bootstrap',
    index: 'basicplannerCtrl.index',
    show: 'basicplannerCtrl.show',
    create: 'basicplannerCtrl.create',
    update: 'basicplannerCtrl.update',
    destroy: 'basicplannerCtrl.destroy'
    
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var basicplannerIndex = proxyquire('./index.js', {
    'express': {
        Router: function() {
            return routerStub;
        }
    },
    './basicplanner.controller': basicplannerCtrlStub
});

describe('Basicplanner API Router:', function() {

    it('should return an express router instance', function() {
        expect(basicplannerIndex).to.equal(routerStub);
    });

    describe('GET /api/basicplanners', function() {

        it('should route to basicplanner.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'basicplannerCtrl.index')
            ).to.have.been.calledOnce;
        });

    });

    describe('GET /api/basicplanners/:id', function() {

        it('should route to basicplanner.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'basicplannerCtrl.show')
            ).to.have.been.calledOnce;
        });

    });

    describe('POST /api/basicplanners', function() {

        it('should route to basicplanner.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'basicplannerCtrl.create')
            ).to.have.been.calledOnce;
        });

    });

    describe('PUT /api/basicplanners/:id', function() {

        it('should route to basicplanner.controller.update', function() {
            expect(routerStub.put
                .withArgs('/:id', 'basicplannerCtrl.update')
            ).to.have.been.calledOnce;
        });

    });

    describe('PATCH /api/basicplanners/:id', function() {

        it('should route to basicplanner.controller.update', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'basicplannerCtrl.update')
            ).to.have.been.calledOnce;
        });

    });

    describe('DELETE /api/basicplanners/:id', function() {

        it('should route to basicplanner.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'basicplannerCtrl.destroy')
            ).to.have.been.calledOnce;
        });

    });

    // describe('GET /api/basicplanners/bootstrap', function() {

    //     it('should route to basicplanner.controller.bootstrap', function() {
    //         expect(routerStub.get
    //             .withArgs('/bootstrap', 'basicplannerCtrl.bootstrap')
    //         ).to.have.been.calledOnce;
    //     });
    // });

});
