'use strict';

var app = require('../..');
import request from 'supertest';

var newBasicplanner;

describe('Basicplanner API:', function() {

    describe('GET /api/basicplanners', function() {
        var basicplanners;

        beforeEach(function(done) {
            request(app)
                .get('/api/basicplanners')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    basicplanners = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            expect(basicplanners).to.be.instanceOf(Array);
        });

    });

    describe('POST /api/basicplanners', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/basicplanners')
                .send({
                    name: 'New Basicplanner',
                    info: 'This is the brand new basicplanner!!!'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newBasicplanner = res.body;
                    done();
                });
        });

        it('should respond with the newly created basicplanner', function() {
            expect(newBasicplanner.name).to.equal('New Basicplanner');
            expect(newBasicplanner.info).to.equal('This is the brand new basicplanner!!!');
        });

    });

    describe('GET /api/basicplanners/:id', function() {
        var basicplanner;

        beforeEach(function(done) {
            request(app)
                .get('/api/basicplanners/' + newBasicplanner._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    basicplanner = res.body;
                    done();
                });
        });

        afterEach(function() {
            basicplanner = {};
        });

        it('should respond with the requested basicplanner', function() {
            expect(basicplanner.name).to.equal('New Basicplanner');
            expect(basicplanner.info).to.equal('This is the brand new basicplanner!!!');
        });

    });

    describe('PUT /api/basicplanners/:id', function() {
        var updatedBasicplanner;

        beforeEach(function(done) {
            request(app)
                .put('/api/basicplanners/' + newBasicplanner._id)
                .send({
                    name: 'Updated Basicplanner',
                    info: 'This is the updated basicplanner!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedBasicplanner = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedBasicplanner = {};
        });

        it('should respond with the updated basicplanner', function() {
            expect(updatedBasicplanner.name).to.equal('Updated Basicplanner');
            expect(updatedBasicplanner.info).to.equal('This is the updated basicplanner!!!');
        });

    });

    describe('DELETE /api/basicplanners/:id', function() {

        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete('/api/basicplanners/' + newBasicplanner._id)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when basicplanner does not exist', function(done) {
            request(app)
                .delete('/api/basicplanners/' + newBasicplanner._id)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

    });
    // describe('GET /api/basicplanners/bootstrap', function() {
    //     var basicplanners;

    //     beforeEach(function(done) {
    //         request(app)
    //             .get('/api/basicplanners/bootstrap')
    //             .expect(200)
    //             .expect('Content-Type', /json/)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 basicplanners = res.body;
    //                 done();
    //             });
    //     });

    //     it('should respond with JSON array', function() {
    //         expect(basicplanners).to.be.instanceOf(Array);
    //     });

    // });

});
