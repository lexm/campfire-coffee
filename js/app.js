"use strict";

var   timesArray = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm',
                   '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var   timesLength = timesArray.length;

// var resultsBlank = {
//   timeString: '',
//   numberOfCustomers: 0,
//   cupsSold: 0,
//   lbsSold: 0
// }

function StoreLocation(locName, minCustPerHour, maxCustPerHour, cupsPerCust, lbsToGoPerCust) {
  this.locName = locName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.cupsPerCust = cupsPerCust;
  this.lbsToGoPerCust = lbsToGoPerCust;
  // this.results = resultsBlank;
  this.numberOfCustomers = [];
  this.cupsSold = [];
  this.lbsSold = [];
  this.dailyLbsSold = 0;
  this.generateNumOfCustomers = function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1) + this.minCustPerHour);
  }
  this.genHourlyStatistics = function() {
//    this.results.timeString = timesArray[i];
    this.numberOfCustomers.push(this.generateNumOfCustomers());
    var arrPosition = this.numberOfCustomers.length - 1;
    this.cupsSold.push(this.numberOfCustomers[arrPosition] * this.cupsPerCust);
    this.lbsSold.push((this.numberOfCustomers[arrPosition] * this.lbsToGoPerCust) + (this.cupsSold[this.cupsSold.length - 1] / 20));
    return;
  }
}


// storeArray contains a set of objects, each representing a store location

var storeArray = [];

storeArray.push(new StoreLocation('Pike Place Market', 14, 55, 1.2, 5.7));
storeArray.push(new StoreLocation('Capitol Hill', 32, 48, 3.2, 0.4));
storeArray.push(new StoreLocation('Seattle Public Library', 49, 75, 2.6, 0.2));
storeArray.push(new StoreLocation('South Lake Union', 35, 88, 1.3, 3.7));
storeArray.push(new StoreLocation('Sea-Tac Airport', 68, 124, 1.1, 2.7));
storeArray.push(new StoreLocation('Website Sales', 3, 6, 0, 6.7));

// sectHead is the top of the section that holds the tables

var sectHead = document.getElementById('main');

// set up more variables for form

var newLoc = document.getElementById('new-loc');
// var addNewLoc = document.getElementById('add-new-loc');

// renderRow returns HTML for each row of each table, given input of the text
// for each element. 'header' is a boolean indicating in the row is at the
// head of the table.

function renderStoreRow(rowHdrText, rowContentArray, rowTotal, isHeader) {
  var newRow = document.createElement('tr');
  var rowElementArray = [];
  rowElementArray[0] = document.createElement('th');
  rowElementArray[0].textContent = rowHdrText;
  if(isHeader) {
    for(var i = 0; i <= timesLength; i++) {
      rowElementArray[i + 1] = document.createElement('th');
      rowElementArray[i + 1].textContent = rowContentArray[i];
    }
    rowElementArray[timesLength + 1]  = document.createElement('th');
    rowElementArray[i].textContent = "Totals";
  } else {
    for(var i = 0; i <= timesLength; i++) {
      rowElementArray[i + 1] = document.createElement('td');
      rowElementArray[i + 1].textContent = parseFloat(rowContentArray[i]).toFixed(1);
    }
    rowElementArray[timesLength + 1]  = document.createElement('td');
    rowElementArray[i].textContent = rowTotal;
  }
    for(var i = 0; i <= timesLength + 1; i++) {
      newRow.appendChild(rowElementArray[i]);
    }
    return newRow;
}

function renderTable() {
  var newTable = document.createElement('table');
  var newTableHead =document.createElement('thead');
  // create a header for the table
  newTableHead.appendChild(renderStoreRow("", timesArray, "Totals", true));
  for(var i = 0; i < storeArray.length; i++) {
    newTableHead.appendChild(renderStoreRow(storeArray[i].locName, storeArray[i].lbsSold, storeArray[i].dailyLbsSold.toFixed(1), false));
  }
  newTable.appendChild(newTableHead);
  sectHead.appendChild(newTable);
}


function generateStoreData(storeLoc) {
  for(var i = 0; i < timesLength; i++) {
    storeLoc.genHourlyStatistics();
    storeLoc.dailyLbsSold += storeLoc.lbsSold[i];
  }
}

function generateFullStoreData() {
  for(var i = 0; i < storeArray.length; i++) {
    generateStoreData(storeArray[i]);
    // for(var j = 0; j < timesLength; j++) {
    //   storeArray[i].genHourlyStatistics();
    //   storeArray[i].dailyLbsSold += storeArray[i].lbsSold[j];
    // }
  }
}

function addNewLocation(event) {
  console.log(event);
  event.preventDefault();

  if (!event.target.locName.value || !event.target.minCustPerHour.value || !event.target.maxCustPerHour.value || !event.target.cupsPerCust.value || !event.target.poundsToGoPerCust.value) {
    return alert('Please fill all form values');
  }
  console.log(event.target.locName.value);
  var newStore = new StoreLocation(event.target.locName.value, event.target.minCustPerHour.value, event.target.maxCustPerHour.value, event.target.cupsPerCust.value, event.target.poundsToGoPerCust.value);
  storeArray.push(newStore);

}

generateFullStoreData();
renderTable();

newLoc.addEventListener('submit', addNewLocation);
