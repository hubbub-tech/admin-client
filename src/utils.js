import moment from 'moment';

const printMoney = (floatAmount) => {
  const errorMsg = "printMoney can only be used on type float."
  //console.assert(typeof floatAmount === "float", {floatAmount, errorMsg});
  const money = Number.parseFloat(floatAmount).toFixed(2);
  return `$${money}`;
}

const stringToMoment = (stringDate, formatStr = "YYYY-MM-DD") => {
  const momentDate = moment.utc(stringDate, formatStr);
  return momentDate;
}

const printDate = (stringDate, formatStr = "MMMM Do YYYY") => {
  // stringDate is a 'YYYY-MM-DD format'
  const momentDate = stringToMoment(stringDate);
  const printDate = momentDate.format(formatStr);
  return printDate;
}

const expDecay = (retailPrice, timeNow, discount = .50, timeTotal = 28) => {
  // Where discount is issued at timeTotal
  let basePrice = retailPrice / 10;
  if (timeNow > 180) {
    timeTotal = 56;
  }
  let compound = retailPrice / 90;
  let a = compound * Math.pow(10, - (Math.log(1 - discount) / Math.log(10)) / (timeTotal - 1));
  let r = 1 - (compound / a);
  let y = a * Math.pow(1 - r, timeNow);

  //calculate the cost of the rental to the user
  let integTime = y / Math.log(1 - r);
  let integ0 = a * (1 - r) / Math.log(1 - r);
  let costToDate = basePrice + integTime - integ0;
  if (costToDate < basePrice) {
    return basePrice;
  }
  return costToDate;
}

const sortList = (list, key) => {
  let listCopy = [...list]
  listCopy.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
  return listCopy;
}

const toMilitaryTime = (timeRangeStr) => {
  let startTime;
  let endTime;
  let timeRange = timeRangeStr.toLowerCase();
  if (timeRange.includes('am')) {
    timeRange = timeRange.replace('am', '');
    const times = timeRange.split('-');
    startTime = times[0] + ':00';
    endTime = times[1] + ':00';
  } else if (timeRange.includes('pm')) {
    timeRange = timeRange.replace('pm', '');
    const times = timeRange.split('-');
    endTime = parseInt(times[1]);
    if (endTime === 12) {
      startTime = times[0] + ':00';
      endTime = times[1] + ':00';
    } else if (endTime === 1) {
      startTime = times[0] + ':00';
      endTime = (endTime + 12).toString() + ':00';
    } else {
      startTime = (parseInt(times[0]) + 12).toString() + ':00';
      endTime = (endTime + 12).toString() + ':00';
    }
  }
  if (startTime.length === 4) {
    startTime = '0' + startTime;
  }
  if (endTime.length === 4) {
    endTime = '0' + endTime;
  }
  let startTimeMoment = moment(startTime, 'HH:mm').format('h:mm:ss A');
  let endTimeMoment = moment(endTime, 'HH:mm').format('h:mm:ss A');
  return [startTimeMoment, endTimeMoment];
}

function convert(input) {
  return moment(input, 'HH:mm:ss').format('h:mm:ss A');
}

export { sortList, toMilitaryTime };
