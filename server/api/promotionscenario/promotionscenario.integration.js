'use strict';

var app = require('../..');
import request from 'supertest';

var newPromotionscenario;

describe('Promotionscenario API:', function() {

  describe('GET /api/promotionscenarios', function() {
    var promotionscenarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/promotionscenarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          promotionscenarios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(promotionscenarios).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/promotionscenarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/promotionscenarios')
        .send({
          name: 'New Promotionscenario',
          info: 'This is the brand new promotionscenario!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPromotionscenario = res.body;
          done();
        });
    });

    it('should respond with the newly created promotionscenario', function() {
      expect(newPromotionscenario.name).to.equal('New Promotionscenario');
      expect(newPromotionscenario.info).to.equal('This is the brand new promotionscenario!!!');
    });

  });

  describe('GET /api/promotionscenarios/:id', function() {
    var promotionscenario;

    beforeEach(function(done) {
      request(app)
        .get('/api/promotionscenarios/' + newPromotionscenario._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          promotionscenario = res.body;
          done();
        });
    });

    afterEach(function() {
      promotionscenario = {};
    });

    it('should respond with the requested promotionscenario', function() {
      expect(promotionscenario.name).to.equal('New Promotionscenario');
      expect(promotionscenario.info).to.equal('This is the brand new promotionscenario!!!');
    });

  });

  describe('PUT /api/promotionscenarios/:id', function() {
    var updatedPromotionscenario;

    beforeEach(function(done) {
      request(app)
        .put('/api/promotionscenarios/' + newPromotionscenario._id)
        .send({
          name: 'Updated Promotionscenario',
          info: 'This is the updated promotionscenario!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPromotionscenario = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPromotionscenario = {};
    });

    it('should respond with the updated promotionscenario', function() {
      expect(updatedPromotionscenario.name).to.equal('Updated Promotionscenario');
      expect(updatedPromotionscenario.info).to.equal('This is the updated promotionscenario!!!');
    });

  });

  describe('DELETE /api/promotionscenarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/promotionscenarios/' + newPromotionscenario._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when promotionscenario does not exist', function(done) {
      request(app)
        .delete('/api/promotionscenarios/' + newPromotionscenario._id)
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
