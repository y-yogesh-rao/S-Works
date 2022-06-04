const express = require('express');
const app = express()

const testController = require('../controllers/testController');

app.get('/test', testController.primeDate);

module.exports = app;