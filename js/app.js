// my js will be in here
"use strict";
// for future use
var   timesArray = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm',
                   '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// var   resultsArray = ['', 0, 0, 0];

var resultsBlank = {
  timeString: '',
  numberOfCustomers: 0,
  cupsSold: 0,
  lbsSold: 0
}

// var   resultsArray = [['6:00am', 0, 0, 0],
//                       ['7:00am', 0, 0, 0],
//                       ['8:00am', 0, 0, 0],
//                       ['9:00am', 0, 0, 0],
//                       ['10:00am', 0, 0, 0],
//                       ['11:00am', 0, 0, 0],
//                       ['12 noon', 0, 0, 0],
//                       ['1:00pm', 0, 0, 0],
//                       ['2:00pm', 0, 0, 0],
//                       ['3:00pm', 0, 0, 0],
//                       ['4:00pm', 0, 0, 0],
//                       ['5:00pm', 0, 0, 0],
//                       ['6:00pm', 0, 0, 0],
//                       ['7:00pm', 0, 0, 0],
//                       ['8:00pm', 0, 0, 0]];


function StoreLocation(storeLoc, minCustPerHour, maxCustPerHour, cupsPerCust, lbsToGoPerCust) {
  this.storeLoc = storeLoc;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.cupsPerCust = cupsPerCust;
  this.lbsToGoPerCust = lbsToGoPerCust;
  this.results = resultsBlank;
  this.generateNumOfCustomers = function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1) + this.minCustPerHour);
  }
  this.genHourlyStatistics = function(i) {
    this.results.timeString = timesArray[i];
    this.results.numberOfCustomers = this.generateNumOfCustomers();
    this.results.cupsSold = this.results.numberOfCustomers * this.cupsPerCust;
    this.results.lbsSold = this.results.numberOfCustomers * this.lbsToGoPerCust;
    return;
  }

}

// var generateNumOfCustomers = function() {
//   return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1) + this.minCustPerHour);
// }
//
// var genHourlyStatistics = function(i) {
//   this.results[0] = timesArray[i];
//   this.results[1] = this.generateNumOfCust();
//   this.results[2] = this.results[1] * this.cupsPerCust;
//   this.results[3] = this.results[1] * this.lbsToGoPerCust;
  //stats[1] is the number of customers for this hour
  // this.results[i][1] = this.generateNumOfCust();
  //stats[2] is the number of cups purchased this hour
  // this.results[i][2] = this.results[i][1] * this.cupsPerCust;
  //stats[3] is the number of lbs purchased this hour
  // this.results[i][3] = this.results[i][1] * this.lbsToGoPerCust;
//   return;
// }

// var pikePlaceMarketLoc = {
//   storeLoc: 'Pike Place Market',
//   minCustPerHour: 14,
//   maxCustPerHour: 55,
//   cupsPerCust: 1.2,
//   lbsToGoPerCust: 3.7
// }
// pikePlaceMarketLoc.results = resultsArray;
// pikePlaceMarketLoc.generateNumOfCust = generateNumOfCustomers;
// pikePlaceMarketLoc.genHourlyStats = genHourlyStatistics;

var pikePlaceMarketLoc = new StoreLocation('Pike Place Market', 14, 55, 1.2, 5.7);

// var capHillLoc = {
//   storeLoc: 'Capitol Hill',
//   minCustPerHour: 32,
//   maxCustPerHour: 48,
//   cupsPerCust: 3.2,
//   lbsToGoPerCust: 0.4
// }
//
// capHillLoc.results = resultsArray;
// capHillLoc.generateNumOfCust = generateNumOfCustomers;
// capHillLoc.genHourlyStats = genHourlyStatistics;

var capHillLoc = new StoreLocation('Capitol Hill', 32, 48, 3.2, 0.4);


var showStatsLine = function(i, loc) {
  loc.genHourlyStatistics(i);
  var lbsForCups = loc.results.numberOfCustomers / 20;
  var totalLbs = lbsForCups + loc.results.lbsSold;
  var currentLine = loc.results.timeString + ': ' + totalLbs.toFixed(1);
  currentLine += ' lbs [' + loc.results.numberOfCustomers + ' customers, ';
  currentLine += loc.results.cupsSold.toFixed(1) + ' cups (';
  currentLine += lbsForCups.toFixed(1) + ' lbs.), ';
  currentLine += loc.results.lbsSold.toFixed(1) + ' lbs to-go]';
  console.log(currentLine);
  var newPar = document.createElement('p');
  var newText = document.createTextNode(currentLine);
  newPar.appendChild(newText);
//  msg = '<p>' + currentLine + '</p>';
  listHeader.parentElement.appendChild(newPar);
//  var msg =

}
var listHeader = document.getElementById('datahead');
listHeader.textContent = pikePlaceMarketLoc.storeLoc;

for(var i = 0;i < timesArray.length; i++) {
  showStatsLine(i, pikePlaceMarketLoc);
}

var newHeader = document.createElement('h2');
var newHeaderText = document.createTextNode(capHillLoc.storeLoc);
newHeader.appendChild(newHeaderText);
listHeader.parentElement.appendChild(newHeader);

for(var i = 0;i < timesArray.length; i++) {
  showStatsLine(i, capHillLoc);
}
