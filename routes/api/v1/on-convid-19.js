const express = require('express');
const xml = require('xml2js');
const fs = require('fs');

const estimator = require('../../../src/covid-19-estimate');

const router = express.Router();
const builder = new xml.Builder({
  xmldec: { standalone: null, version: '1.0', encoding: 'UTF-8' }
});
const keepMyLog = (req, responseStatusCode) => {
  const { keepLog } = req;
  keepLog.ktime = Date.now();
  keepLog.kcode = responseStatusCode;
  const {
    kmethod, kpath, kcode, stime, ktime
  } = keepLog;
  fs.appendFile(
    'logs.txt',
    `${kmethod}\t\t${kpath}\t\t${kcode}\t\t10${ktime - stime}ms\n`,
    (err) => {
      if (err) throw err;
    }
  );
};

router.get('/', (req, res, next) => {
  keepMyLog(req, 200);
  res.send('welcome to SDG');
  next();
});
router.post('/', (req, res, next) => {
  const data = req.body;
  keepMyLog(req, 200);
  // res.send(data);
  res.header('Content-Type', 'application/json; charset=UTF-8').json((estimator.covid19ImpactEstimator(data)));
  next();
});
router.post('/json', (req, res, next) => {
  const data = req.body;
  keepMyLog(req, 200);

  res.header('Content-Type', 'application/json; charset=UTF-8').json((estimator.covid19ImpactEstimator(data)));
  next();
});
router.post('/xml', (req, res, next) => {
  const data = req.body;
  const result = estimator.covid19ImpactEstimator(data);
  keepMyLog(req, 200);


  res.set('Content-Type', 'application/xml; charset=UTF-8').send(builder.buildObject(result));
  next();
});
router.get('/log', (req, res) => {
  keepMyLog(req, 200);
  fs.exists('logs.txt', () => fs.readFile('logs.txt', (err, result) => res.send(result)));
});


module.exports = router;
