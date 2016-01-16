'use strict';

var   timesArray = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm',
                   '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var   timesLength = timesArray.length;

function StoreLocation(locName, minCustPerHour, maxCustPerHour, cupsPerCust, lbsToGoPerCust) {
  this.locName = locName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.cupsPerCust = cupsPerCust;
  this.lbsToGoPerCust = lbsToGoPerCust;
  this.numberOfCustomers = [];
  this.cupsSold = [];
  this.lbsSold = [];
  this.dailyLbsSold = 0;
}

StoreLocation.prototype.generateNumOfCustomers = function() {
  var minCPH = this.minCustPerHour;
  var maxCPH = this.maxCustPerHour;
  var nCust = Math.floor((Math.random() * (maxCPH - minCPH + 1)) + minCPH);
  // console.log(maxCPH + " " + minCPH + " " + nCust);
  return nCust;
}

StoreLocation.prototype.genHourlyStatistics = function() {
  this.numberOfCustomers.push(this.generateNumOfCustomers());
  var arrPosition = this.numberOfCustomers.length - 1;
  this.cupsSold.push(this.numberOfCustomers[arrPosition] * this.cupsPerCust);
  this.lbsSold.push((this.numberOfCustomers[arrPosition] * this.lbsToGoPerCust) + (this.cupsSold[this.cupsSold.length - 1] / 20));
  return;
}

function generateStoreData(storeLoc) {
  for(var i = 0; i < timesLength; i++) {
    storeLoc.genHourlyStatistics();
//    console.log(storeLoc);
    storeLoc.dailyLbsSold += storeLoc.lbsSold[i];
  }
}

function generateFullStoreData() {
  for(var i = 0; i < storeArray.length; i++) {
    generateStoreData(storeArray[i]);
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

  var nodeTag = 'td'
  if(isHeader) {
    nodeTag = 'th';
  }
  for(var i = 0; i <= timesLength; i++) {
    rowElementArray[i + 1] = document.createElement(nodeTag);
    if(isHeader) {
      rowElementArray[i + 1].textContent = rowContentArray[i];
    } else {
      rowElementArray[i + 1].textContent = parseFloat(rowContentArray[i]).toFixed(1);
    }
  }
  rowElementArray[timesLength + 1] = document.createElement(nodeTag);
  rowElementArray[timesLength + 1].textContent = rowTotal;


  // if(isHeader) {
  //   for(var i = 0; i <= timesLength; i++) {
  //     rowElementArray[i + 1] = document.createElement('th');
  //     rowElementArray[i + 1].textContent = rowContentArray[i];
  //   }
  //   rowElementArray[timesLength + 1]  = document.createElement('th');
  //   rowElementArray[timesLength + 1].textContent = 'Totals';
  // } else {
  //   for(var i = 0; i <= timesLength; i++) {
  //     rowElementArray[i + 1] = document.createElement('td');
  //     rowElementArray[i + 1].textContent = parseFloat(rowContentArray[i]).toFixed(1);
  //   }
  //   rowElementArray[timesLength + 1]  = document.createElement('td');
  //   rowElementArray[timesLength + 1].textContent = rowTotal;
  // }

    for(var i = 0; i <= timesLength + 1; i++) {
      newRow.appendChild(rowElementArray[i]);
    }
    console.log(newRow);
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
  return newTableHead;
}


function addNewLocation(event) {
  event.preventDefault();
  if (!event.target.locName.value || !event.target.minCustPerHour.value || !event.target.maxCustPerHour.value || !event.target.cupsPerCust.value || !event.target.poundsToGoPerCust.value) {
    return alert('Please fill all form values');
  }
  var newLocName = event.target.locName.value;
  var newMinCustPerHour = parseFloat(event.target.minCustPerHour.value);
  var newMaxCustPerHour = parseFloat(event.target.maxCustPerHour.value);
  var newCupsPerCust = parseFloat(event.target.cupsPerCust.value);
  var newPoundsToGoPerCust = parseFloat(event.target.poundsToGoPerCust.value)
  var newStore = new StoreLocation(newLocName, newMinCustPerHour, newMaxCustPerHour, newCupsPerCust, newPoundsToGoPerCust);
  generateStoreData(newStore);
  storeArray.push(newStore);
  firstTableHead.appendChild(renderStoreRow(newStore.locName, newStore.lbsSold, newStore.dailyLbsSold.toFixed(1), false));
}

generateFullStoreData();
var firstTableHead = renderTable();

newLoc.addEventListener('submit', addNewLocation);
