'use strict';

var app = require('../..');
import request from 'supertest';

var newDrug;

describe('Drug API:', function() {

  describe('GET /api/drugs', function() {
    var drugs;

    beforeEach(function(done) {
      request(app)
        .get('/api/drugs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          drugs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(drugs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/drugs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/drugs')
        .send({
          name: 'New Drug',
          info: 'This is the brand new drug!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDrug = res.body;
          done();
        });
    });

    it('should respond with the newly created drug', function() {
      expect(newDrug.name).to.equal('New Drug');
      expect(newDrug.info).to.equal('This is the brand new drug!!!');
    });

  });

  describe('GET /api/drugs/:id', function() {
    var drug;

    beforeEach(function(done) {
      request(app)
        .get('/api/drugs/' + newDrug._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          drug = res.body;
          done();
        });
    });

    afterEach(function() {
      drug = {};
    });

    it('should respond with the requested drug', function() {
      expect(drug.name).to.equal('New Drug');
      expect(drug.info).to.equal('This is the brand new drug!!!');
    });

  });

  describe('PUT /api/drugs/:id', function() {
    var updatedDrug;

    beforeEach(function(done) {
      request(app)
        .put('/api/drugs/' + newDrug._id)
        .send({
          name: 'Updated Drug',
          info: 'This is the updated drug!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDrug = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDrug = {};
    });

    it('should respond with the updated drug', function() {
      expect(updatedDrug.name).to.equal('Updated Drug');
      expect(updatedDrug.info).to.equal('This is the updated drug!!!');
    });

  });

  describe('DELETE /api/drugs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/drugs/' + newDrug._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when drug does not exist', function(done) {
      request(app)
        .delete('/api/drugs/' + newDrug._id)
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
