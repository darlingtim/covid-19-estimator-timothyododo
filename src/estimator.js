
const impact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds
}) => {
  let factor;
  if (periodType === 'days') {
    factor = parseInt(timeToElapse / 3, 10);
  } else if (periodType === 'weeks') {
    factor = parseInt((timeToElapse * 7) / 3, 10);
  } else if (periodType === 'months') {
    factor = parseInt((timeToElapse * 30) / 3, 10);
  }
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBeds)
   - severeCasesByRequestedTime);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const severeImpact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds
}) => {
  let factor;
  if (periodType === 'days') {
    factor = parseInt(timeToElapse / 3, 10);
  } else if (periodType === 'weeks') {
    factor = parseInt((timeToElapse * 7) / 3, 10);
  } else if (periodType === 'months') {
    factor = parseInt((timeToElapse * 30) / 3, 10);
  }
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.floor((0.35 * totalHospitalBeds)
   - severeCasesByRequestedTime);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};
const covid19ImpactEstimator = (data) => {
  const result = {
    data, // the input data you got
    impact: impact(data), // your best case estimation
    severeImpact: severeImpact(data) // your severe case estimation
  };

  return result;
};
export default covid19ImpactEstimator;
