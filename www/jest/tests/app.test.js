const request = require('supertest');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = require('../app');
const database = require('../database');
const Item = require('../models/itemModel');
// const Vue = require('../public/javascripts/vue.min');
// const frontend = require('../public/javascripts/list');

describe('Test Mongoose database connection', () => {
  test('Test connection', (done) => {
    mongoose.connect(database.URL).then(() => {
      expect(mongoose.connection.readyState).toBe(1);
    });
    mongoose.disconnect();
    done();
  });
});

describe('Test routers', () => {
  test('GET request for list of all items', (done) => {
    request(app).get('/item/list').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      done();
    });
  });
});

/* describe('Test frontend', () => {
	test('Test validInput() for valid input', () => {
		expect(frontend.vm.validInput('Miikka')).toBe(true);
	});
	
	test('Test validInput() for invalid input', () => {
		expect(frontend.vm.validInput('Test!')).toBe(true);
	});
}); */
