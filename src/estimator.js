
const impact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds, avgDailyIncomePopulation,
  avgDailyIncomeInUSD
}) => {
  let factor;
  let durationInDays;
  if (periodType === 'days') {
    durationInDays = timeToElapse;
    factor = parseInt(durationInDays / 3, 10);
  } else if (periodType === 'weeks') {
    durationInDays = timeToElapse * 7;
    factor = parseInt(durationInDays / 3, 10);
  } else if (periodType === 'months') {
    durationInDays = timeToElapse * 30;
    factor = parseInt(durationInDays / 3, 10);
  }
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = parseInt(infectionsByRequestedTime * 0.15, 10);
  const hospitalBedsByRequestedTime = parseInt((0.35 * totalHospitalBeds)
   - severeCasesByRequestedTime, 10);
  const casesForICUByRequestedTime = parseInt(infectionsByRequestedTime * 0.05, 10);
  const casesForVentilatorsByRequestedTime = parseInt(infectionsByRequestedTime * 0.02, 10);
  const dollarsInFlight = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD
   * durationInDays;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const severeImpact = ({
  reportedCases, periodType, timeToElapse, totalHospitalBeds, avgDailyIncomePopulation,
  avgDailyIncomeInUSD
}) => {
  let factor;
  let durationInDays;
  if (periodType === 'days') {
    durationInDays = timeToElapse;
    factor = parseInt(durationInDays / 3, 10);
  } else if (periodType === 'weeks') {
    durationInDays = timeToElapse * 7;
    factor = parseInt(durationInDays / 3, 10);
  } else if (periodType === 'months') {
    durationInDays = timeToElapse * 30;
    factor = parseInt(durationInDays / 3, 10);
  }
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = parseInt(infectionsByRequestedTime * 0.15, 10);
  const hospitalBedsByRequestedTime = parseInt((0.35 * totalHospitalBeds)
   - severeCasesByRequestedTime, 10);
  const casesForICUByRequestedTime = parseInt(infectionsByRequestedTime * 0.05, 10);
  const casesForVentilatorsByRequestedTime = parseInt(infectionsByRequestedTime * 0.02, 10);
  const dollarsInFlight = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD
   * durationInDays;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
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
