'use-strict';

// const totalHoursOpen = 14;
const openingTime24Hr = 600; //6 am in 24 hour time
const closingTime24Hr = 2000; //8 pm in 24 hour time

//constructor
function CookieStore(storeLocation, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
  this.storeLocation = storeLocation;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.hoursOpen = new Array();
  this.customersPerHour = new Array();
  this.cookiesPurchPerHour = new Array();
}

CookieStore.prototype.populateHoursOpen = function() {
  const totalHoursOpen = Math.abs(closingTime24Hr - openingTime24Hr) / 100;
  for (var i = 0; i <= totalHoursOpen; i++)
  {
    var hourTime = openingTime24Hr + (i * 100);
    this.hoursOpen.push(hourTime);
  }
};

CookieStore.prototype.simulateCustPerHour = function() {
  for (var i = 0; i < this.hoursOpen.length; i++)
  {
    var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
    this.customersPerHour.push(customersInOneHour);
  }
};

CookieStore.prototype.simulateCookiesPerHour = function() {
  for (var i = 0; i < this.hoursOpen.length; i++)
  {
    this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
  }
};

CookieStore.prototype.renderAsList = function() {
  var totalCookieSales = 0;
  //set up object
  this.populateHoursOpen();
  this.simulateCustPerHour();
  this.simulateCookiesPerHour();

  //select "sales-list" id, then create and add p element for the store name at the top of the list
  var salesListsDiv = document.getElementById('sales-lists');
  var storeNameEl = document.createElement('p');
  storeNameEl.appendChild(document.createTextNode(this.storeLocation));
  salesListsDiv.appendChild(storeNameEl);

  //create and add the ul element for the unlisted item list
  var unlistedEl = document.createElement('ul');
  var idAttributeName = `${this.storeLocation}-list`;
  unlistedEl.setAttribute('id', idAttributeName);
  unlistedEl.setAttribute('class', 'ulist');
  salesListsDiv.appendChild(unlistedEl);

  //create a pointer at the newly added ul element and create list
  var storeListUlEl = document.getElementById(idAttributeName);
  for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
  {
    var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
    totalCookieSales += cookiesPurchInOneHour;
    var oneHourCookieSalesListItem = document.createElement('li');
    var currHour12HourTime = convert24To12HrTime(this.hoursOpen[i]);

    oneHourCookieSalesListItem.appendChild(
      document.createTextNode(`${currHour12HourTime}: ${cookiesPurchInOneHour.toFixed()} cookies`));
    storeListUlEl.appendChild(oneHourCookieSalesListItem);
  }

  //add a final li element to report on the total cookie sales
  var totalCookieSalesListItem = document.createElement('li');
  totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
  storeListUlEl.appendChild(totalCookieSalesListItem);
};

//utility functions
/*
takes a time in 24 hour format as an integer, like 1400, and returns an AM/PM 12 hour time,
like 2 PM, as a string
*/
function convert24To12HrTime(hourTime24Hour) {
  if (hourTime24Hour < 0 || hourTime24Hour > 2400)
  {
    return `${hourTime24Hour} is an invalid time`;
  }
  if (hourTime24Hour < 1200)
  {
    return `${hourTime24Hour / 100}am`;
  }
  else if (hourTime24Hour === 1200)
  {
    return `${hourTime24Hour / 100}pm`;
  }
  else
  {
    return `${(hourTime24Hour / 100) - 12}pm`;
  }
}

//executable from constructors
var seattleStore = new CookieStore('Seattle', 25, 65, 6.3);
seattleStore.renderAsList();

var tokyoStore = new CookieStore('Tokyo', 3, 24, 1.2);
tokyoStore.renderAsList();

var dubaiStore = new CookieStore('Dubai', 11, 38, 3.7);
dubaiStore.renderAsList();

var parisStore = new CookieStore('Paris', 20, 38, 2.3);
parisStore.renderAsList();

var limaStore = new CookieStore('Lima', 2, 16, 4.6);
limaStore.renderAsList();
