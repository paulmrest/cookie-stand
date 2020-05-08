'use-strict';

//CookieStore constructor and methods
function CookieStore(
  storeLocation, locationHoursOpen, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
  this.storeLocation = storeLocation;
  this.locationHoursOpen = locationHoursOpen;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.totalCookieSales = 0;
  this.hoursOpen = new Array();
  this.customersPerHour = new Array();
  this.cookiesPurchPerHour = new Array();
  //set up object
  this.populateHoursOpen();
  this.simulateCustPerHour();
  this.simulateCookiesPerHour();

  CookieStore.addToAllCookieStores(this);
}

//class method
//checks if another store with the same name already exists
//if so, replaces that object, if not, pushes it onto the end of the array
CookieStore.addToAllCookieStores = function(newCookieStore) {
  var pushNewStore = true;
  for (var i = 0; i < allCookieStores.length; i++)
  {
    if (allCookieStores[i].storeLocation === newCookieStore.storeLocation)
    {
      pushNewStore = false;
      allCookieStores.splice(i, 1, newCookieStore);
      break;
    }
  }
  if (pushNewStore)
  {
    allCookieStores.push(newCookieStore);
  }
};

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
    var cookiesInOneHour = Math.round(this.customersPerHour[i] * this.avgCookiesPerSale);
    this.cookiesPurchPerHour.push(cookiesInOneHour);
    this.totalCookieSales += cookiesInOneHour;
  }
};

CookieStore.prototype.renderAsList = function() {
  //select "sales-data" id, then create and add p element for the store name at the top of the list
  var salesListsDiv = document.getElementById('sales-data');
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
    var oneHourCookieSalesListItem = document.createElement('li');
    var currHour12HourTime = convert24To12HrTime(this.hoursOpen[i]);

    oneHourCookieSalesListItem.appendChild(
      document.createTextNode(
        `${currHour12HourTime}: ${cookiesPurchInOneHour} cookies`));
    storeListUlEl.appendChild(oneHourCookieSalesListItem);
  }

  //add a final li element to report on the total cookie sales
  var totalCookieSalesListItem = document.createElement('li');
  totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${this.totalCookieSales} cookies`));
  storeListUlEl.appendChild(totalCookieSalesListItem);
};

CookieStore.prototype.renderAsTable = function() {
  //get pointer at table element
  var tableEl = document.getElementById('sales-data-table');

  //if necessary, create tbody element and append
  var tableBodyEl;
  if (!document.getElementById('sales-data-table-body'))
  {
    tableBodyEl = document.createElement('tbody');
    tableBodyEl.setAttribute('id', 'sales-data-table-body');
    tableEl.appendChild(tableBodyEl);
  }
  //else if it already exists, assign tableBodyEl pionter to it
  else
  {
    tableBodyEl = document.getElementById('sales-data-table-body');
  }

  //create tr for this CookieStore and append
  var storeRowEl = document.createElement('tr');
  storeRowEl.setAttribute('id', `${this.storeLocation.toLowerCase()}-store-row`);
  tableBodyEl.appendChild(storeRowEl);

  //create th for this CookieStore and append
  var storeRowHeaderEl = document.createElement('th');
  storeRowHeaderEl.setAttribute('scope', 'row');
  storeRowHeaderEl.innerText = `${this.storeLocation}`;
  storeRowEl.appendChild(storeRowHeaderEl);

  //populate tr row for store with simulated cookie sales
  for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
  {
    var cookieSalesForOneHourEl = document.createElement('td');
    cookieSalesForOneHourEl.innerText = `${this.cookiesPurchPerHour[i]}`;
    storeRowEl.appendChild(cookieSalesForOneHourEl);
  }

  //insert a td for the total cookie sales
  var totalCookieSalesEl = document.createElement('td');
  totalCookieSalesEl.innerText = `${this.totalCookieSales}`;
  storeRowEl.appendChild(totalCookieSalesEl);
};

//HoursOpen constructor and methods
function HoursOpen(openingTime24Hr, closingTime24Hr) {
  this.openingTime24Hr = openingTime24Hr;
  this.closingTime24Hr = closingTime24Hr;
  this.hoursOpenArray = new Array();
  this.populateHoursOpen();
}

HoursOpen.prototype.populateHoursOpen = function() {
  const totalHoursOpen = Math.abs(closingTime24Hr - openingTime24Hr) / 100;
  for (var i = 0; i <= totalHoursOpen; i++)
  {
    var hourTime = openingTime24Hr + (i * 100);
    this.hoursOpenArray.push(hourTime);
  }
};

//class method
HoursOpen.convert24To12HrTime = function(hourTime24Hour) {
  if (hourTime24Hour < 0 || hourTime24Hour > 2400)
  {
    return `${hourTime24Hour} is an invalid time`;
  }
  if (hourTime24Hour < 1200)
  {
    return `${hourTime24Hour / 100}:00am`;
  }
  else if (hourTime24Hour === 1200)
  {
    return `${hourTime24Hour / 100}:00pm`;
  }
  else
  {
    return `${(hourTime24Hour / 100) - 12}:00pm`;
  }
};


//non-class functions
/*
Renders the header row using a HoursOpen object.
*/
function renderTableHeaderRow(allLocationsHoursOpen) {
  //create a pointer at sales-data element
  var salesDataEl = document.getElementById('sales-data');

  //create the table element and append it to sales-data element
  var tableEl = document.createElement('table');
  tableEl.setAttribute('id', 'sales-data-table');
  salesDataEl.appendChild(tableEl);

  //create the thead element and append it to the table
  var tableHeadEl = document.createElement('thead');
  tableEl.appendChild(tableHeadEl);

  //create the table row element and append it to the table element
  var tableRowEl = document.createElement('tr');
  tableRowEl.setAttribute('id', 'hours-open-tr');
  tableHeadEl.appendChild(tableRowEl);

  //create a blank table header element and append it to the table row
  var blankTableHeader = document.createElement('th');
  blankTableHeader.setAttribute('id', 'blank-table-header');
  tableRowEl.appendChild(blankTableHeader);

  //create the th elements for each element in allLocationsHoursOpen.hoursOpenArray and append it to the table row
  for (var i = 0; i < allLocationsHoursOpen.hoursOpenArray.length; i++)
  {
    var oneOpenHourEl = document.createElement('th');
    oneOpenHourEl.setAttribute('scope', 'col');
    oneOpenHourEl.innerText = convert24To12HrTime(allLocationsHoursOpen.hoursOpenArray[i]);
    tableRowEl.appendChild(oneOpenHourEl);
  }

  //create a final th element for the Daily Location Totals column and append it the table row
  var totalCookieSalesEl = document.createElement('th');
  totalCookieSalesEl.setAttribute('id', 'total-sales');
  totalCookieSalesEl.innerText = 'Daily Location Total';
  tableRowEl.appendChild(totalCookieSalesEl);
}

/*
Renders the footer row.
This function requires that all CookieStore objects that will be rendered are instantiated and added to the allCookieStores global array before rendering the table.
*/
function renderTableFooterRow(allLocationsHoursOpen) {
  var newElementParent = document.getElementById('sales-data-table');
  var totalsRowEl = document.createElement('tr');
  totalsRowEl.setAttribute('id', 'hour-totals-row');
  newElementParent.appendChild(totalsRowEl);

  newElementParent = document.getElementById('hour-totals-row');
  var totalsHeadEl = document.createElement('th');
  totalsHeadEl.setAttribute('scope', 'row');
  totalsHeadEl.innerText = 'Totals';
  newElementParent.appendChild(totalsHeadEl);

  for (var i = 0; i < allLocationsHoursOpen.hoursOpenArray.length; i++)
  {
    var hourTotal = 0;
    for (var j = 0; j < allCookieStores.length; j++)
    {
      var currStoreCurrHourCookiesSold = allCookieStores[j].cookiesPurchPerHour[i];
      hourTotal += currStoreCurrHourCookiesSold;
    }
    var totalTdEl = document.createElement('td');
    totalTdEl.innerText = `${hourTotal}`;
    newElementParent.appendChild(totalTdEl);
  }

  //empty td element at the end to fill out grid
  newElementParent.appendChild(document.createElement('td'));
}

function setupEventListeners() {
  var newLocationForm = document.getElementById('new-location-form');
  newLocationForm.addEventListener('submit', handleCookieStoreFormData);
}

function handleCookieStoreFormData(event) {
  event.preventDefault();

  var newLocationName = event.target[1].value;
  var newLocationCustMin = parseInt(event.target[2].value, 10);
  var newLocationCustMax = parseInt(event.target[3].value, 10);
  var newLocationCookiesPerCust = parseInt(event.target[4].value, 10);

  if (newLocationCustMin < 0 || newLocationCustMin < 0)
  {
    alert('Minimum and maximum customers per hour need to both be zero or greater.');
  }
  else if (newLocationCustMin > newLocationCustMax)
  {
    alert('Maximum number of customers must be greater or equal to minimum.');
  }
  else
  {
    new CookieStore(
      newLocationName, allLocationsHoursOpen, newLocationCustMin, newLocationCustMax, newLocationCookiesPerCust);
    refreshTable();
    document.getElementById('new-location-form').reset();
  }
}

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
    return `${hourTime24Hour / 100}:00am`;
  }
  else if (hourTime24Hour === 1200)
  {
    return `${hourTime24Hour / 100}:00pm`;
  }
  else
  {
    return `${(hourTime24Hour / 100) - 12}:00pm`;
  }
}

function refreshTable() {
  //remove all child nodes under our root sales-data node
  var salesDataEl = document.getElementById('sales-data');
  while (salesDataEl.firstChild) {
    salesDataEl.removeChild(salesDataEl.firstChild);
  }
  //render table
  renderTableHeaderRow(allLocationsHoursOpen);
  for (var i = 0; i < allCookieStores.length; i++) {
    allCookieStores[i].renderAsTable();
  }
  renderTableFooterRow(allLocationsHoursOpen);
}

//executables

//since all the locations have the same opening and closing time, setting these as constants
const openingTime24Hr = 600; //6 am in 24 hour time
const closingTime24Hr = 2000; //8 pm in 24 hour time

//array to hold all CookieStore objects
var allCookieStores = new Array();

//since all the branches have the same hours open, we can use the same HoursOpen object for every location
var allLocationsHoursOpen = new HoursOpen(openingTime24Hr, closingTime24Hr);

new CookieStore('Seattle', allLocationsHoursOpen, 25, 65, 6.3);
new CookieStore('Tokyo', allLocationsHoursOpen, 3, 24, 1.2);
new CookieStore('Dubai', allLocationsHoursOpen, 11, 38, 3.7);
new CookieStore('Paris', allLocationsHoursOpen, 20, 38, 2.3);
new CookieStore('Lima', allLocationsHoursOpen, 2, 16, 4.6);

refreshTable();

setupEventListeners();
