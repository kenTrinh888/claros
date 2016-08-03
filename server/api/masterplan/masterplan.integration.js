'use strict';

var app = require('../..');
import request from 'supertest';

var newMasterplan;

describe('Masterplan API:', function() {

  describe('GET /api/masterplans', function() {
    var masterplans;

    beforeEach(function(done) {
      request(app)
        .get('/api/masterplans')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masterplans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(masterplans).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/masterplans', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/masterplans')
        .send({
          name: 'New Masterplan',
          info: 'This is the brand new masterplan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMasterplan = res.body;
          done();
        });
    });

    it('should respond with the newly created masterplan', function() {
      expect(newMasterplan.name).to.equal('New Masterplan');
      expect(newMasterplan.info).to.equal('This is the brand new masterplan!!!');
    });

  });

  describe('GET /api/masterplans/:id', function() {
    var masterplan;

    beforeEach(function(done) {
      request(app)
        .get('/api/masterplans/' + newMasterplan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masterplan = res.body;
          done();
        });
    });

    afterEach(function() {
      masterplan = {};
    });

    it('should respond with the requested masterplan', function() {
      expect(masterplan.name).to.equal('New Masterplan');
      expect(masterplan.info).to.equal('This is the brand new masterplan!!!');
    });

  });

  describe('PUT /api/masterplans/:id', function() {
    var updatedMasterplan;

    beforeEach(function(done) {
      request(app)
        .put('/api/masterplans/' + newMasterplan._id)
        .send({
          name: 'Updated Masterplan',
          info: 'This is the updated masterplan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMasterplan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMasterplan = {};
    });

    it('should respond with the updated masterplan', function() {
      expect(updatedMasterplan.name).to.equal('Updated Masterplan');
      expect(updatedMasterplan.info).to.equal('This is the updated masterplan!!!');
    });

  });

  describe('DELETE /api/masterplans/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/masterplans/' + newMasterplan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when masterplan does not exist', function(done) {
      request(app)
        .delete('/api/masterplans/' + newMasterplan._id)
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
