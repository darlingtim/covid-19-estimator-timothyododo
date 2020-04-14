const express = require('express');
const onCovid19 = require('./on-convid-19');

const app = express();


app.use('/on-convid-19', onCovid19);

module.exports = app;
