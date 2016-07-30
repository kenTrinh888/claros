'use strict';

var app = require('../..');
import request from 'supertest';

var newDriverplanner;

describe('Driverplanner API:', function() {

  describe('GET /api/driverplanners', function() {
    var driverplanners;

    beforeEach(function(done) {
      request(app)
        .get('/api/driverplanners')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          driverplanners = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(driverplanners).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/driverplanners', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/driverplanners')
        .send({
          name: 'New Driverplanner',
          info: 'This is the brand new driverplanner!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDriverplanner = res.body;
          done();
        });
    });

    it('should respond with the newly created driverplanner', function() {
      expect(newDriverplanner.name).to.equal('New Driverplanner');
      expect(newDriverplanner.info).to.equal('This is the brand new driverplanner!!!');
    });

  });

  describe('GET /api/driverplanners/:id', function() {
    var driverplanner;

    beforeEach(function(done) {
      request(app)
        .get('/api/driverplanners/' + newDriverplanner._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          driverplanner = res.body;
          done();
        });
    });

    afterEach(function() {
      driverplanner = {};
    });

    it('should respond with the requested driverplanner', function() {
      expect(driverplanner.name).to.equal('New Driverplanner');
      expect(driverplanner.info).to.equal('This is the brand new driverplanner!!!');
    });

  });

  describe('PUT /api/driverplanners/:id', function() {
    var updatedDriverplanner;

    beforeEach(function(done) {
      request(app)
        .put('/api/driverplanners/' + newDriverplanner._id)
        .send({
          name: 'Updated Driverplanner',
          info: 'This is the updated driverplanner!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDriverplanner = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDriverplanner = {};
    });

    it('should respond with the updated driverplanner', function() {
      expect(updatedDriverplanner.name).to.equal('Updated Driverplanner');
      expect(updatedDriverplanner.info).to.equal('This is the updated driverplanner!!!');
    });

  });

  describe('DELETE /api/driverplanners/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/driverplanners/' + newDriverplanner._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when driverplanner does not exist', function(done) {
      request(app)
        .delete('/api/driverplanners/' + newDriverplanner._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
