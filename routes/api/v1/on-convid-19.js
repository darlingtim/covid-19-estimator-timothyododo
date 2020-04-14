const express = require('express');
const xml = require('xml2js');
const fs = require('fs');

const estimator = require('../../../src/covid-19-estimate');

const router = express.Router();
const builder = new xml.Builder({
  xmldec: { standalone: null, version: '1.0', encoding: 'UTF-8' }
});

router.get('/', (req, res, next) => {
  res.send('welcome to SDG');
  next();
});
router.post('/', (req, res, next) => {
  const data = req.body;
  // res.send(data);
  res.header('Content-Type', 'application/json; charset=UTF-8').json((estimator.covid19ImpactEstimator(data)));
  next();
});
router.post('/json', (req, res, next) => {
  const data = req.body;
  res.header('Content-Type', 'application/json; charset=UTF-8').json((estimator.covid19ImpactEstimator(data)));
  next();
});
router.post('/xml', (req, res, next) => {
  const data = req.body;
  const result = estimator.covid19ImpactEstimator(data);

  res.set('Content-Type', 'application/xml; charset=UTF-8').send(builder.buildObject(result));
  next();
});
router.get('/log', (req, res, next) => {
  const getLogDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };
  fs.readFile(`./logs/request-response/${getLogDate()}.txt`, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') throw err;
    res.header('Content-Type', 'text/plain');
    res.send(data);
  });
  next();
});

module.exports = router;
