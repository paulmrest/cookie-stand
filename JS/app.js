'use-strict';

const openingTime24Hr = 600; //6 am in 24 hour time
const closingTime24Hr = 2000; //8 pm in 24 hour time

//array to hold all cookieStore objects
var allCookieStores = new Array();

//constructor
function CookieStore(storeLocation, minCustPerHour, maxCustPerHour, avgCookiesPerSale) {
  this.storeLocation = storeLocation;
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
  this.insertInitialTableSetup();

  //create next tr for store
  var newElementParent = document.getElementById('sales-data-table');
  var storeRowEl = document.createElement('tr');
  storeRowEl.setAttribute('id', `${this.storeLocation.toLowerCase()}-store-row`);
  newElementParent.appendChild(storeRowEl);

  //create th for store
  newElementParent = document.getElementById(`${this.storeLocation.toLowerCase()}-store-row`);
  var storeRowHeader = document.createElement('th');
  storeRowHeader.setAttribute('scope', 'row');
  storeRowHeader.innerText = `${this.storeLocation}`;
  newElementParent.appendChild(storeRowHeader);

  //populate tr row for store with simulated cookie sales
  for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
  {
    var cookieSalesForOneHourEl = document.createElement('td');
    cookieSalesForOneHourEl.innerText = `${this.cookiesPurchPerHour[i]}`;
    newElementParent.appendChild(cookieSalesForOneHourEl);
  }

  //insert a td for the total cookie sales
  var totalCookieSalesEl = document.createElement('td');
  totalCookieSalesEl.innerText = `${this.totalCookieSales}`;
  newElementParent.appendChild(totalCookieSalesEl);
};

/*
Renders the header row.
When render is called on the first CookieStore object, this method creates the table element, the first tr element, the blank th element necessary for tables with column and row headers, and the hours open th elements.

We are assuming that if the id sales-data-table is present, that this setup has been done.
*/
CookieStore.prototype.insertInitialTableSetup = function() {
  if (!document.getElementById('sales-data-table'))
  {
    var newElementParent = document.getElementById('sales-data');
    var tableEl = document.createElement('table');
    tableEl.setAttribute('id', 'sales-data-table');
    newElementParent.appendChild(tableEl);

    //point newElementParent at the table element we just inserted
    newElementParent = document.getElementById('sales-data-table');
    var tableRowEl = document.createElement('tr');
    tableRowEl.setAttribute('id', 'hours-open-tr');
    newElementParent.appendChild(tableRowEl);

    //point newElementParent at the table row we just inserted and add the blank th
    newElementParent = document.getElementById('hours-open-tr');
    var blankTableHeader = document.createElement('th');
    blankTableHeader.setAttribute('id', 'blank-table-header');
    newElementParent.appendChild(blankTableHeader);

    //insert the th elements for the hours open
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var oneOpenHourEl = document.createElement('th');
      oneOpenHourEl.setAttribute('scope', 'col');
      oneOpenHourEl.innerText = convert24To12HrTime(this.hoursOpen[i]);
      newElementParent.appendChild(oneOpenHourEl);
    }

    //insert a final th element for the total sales by location
    var totalCookieSalesEl = document.createElement('th');
    totalCookieSalesEl.setAttribute('id', 'total-sales');
    totalCookieSalesEl.innerText = 'Daily Location Total';
    newElementParent.appendChild(totalCookieSalesEl);
  }
};

//non-instance functions
/*
Renders the footer row.
This function requires that all CookieStore objects that will be rendered are instantiated and added to the allCookieStores global array before rendering the table.
*/
function renderFooterRow() {
  var newElementParent = document.getElementById('sales-data-table');
  var totalsRowEl = document.createElement('tr');
  totalsRowEl.setAttribute('id', 'hour-totals-row');
  newElementParent.appendChild(totalsRowEl);

  newElementParent = document.getElementById('hour-totals-row');
  var totalsHeadEl = document.createElement('th');
  totalsHeadEl.setAttribute('scope', 'row');
  totalsHeadEl.innerText = 'Totals';
  newElementParent.appendChild(totalsHeadEl);

  var everyLocationHoursOpen = (closingTime24Hr - openingTime24Hr) / 100;
  for (var i = 0; i <= everyLocationHoursOpen; i++)
  {
    var hourTotal = 0;
    for (var j = 0; j < allCookieStores.length; j++)
    {
      // var currStoreCurrHourCookiesSold = allCookieStores[j].cookiesPurchPerHour[i];
      var oneCookieStore = allCookieStores[j];
      var currStoreCurrHourCookiesSold = oneCookieStore.cookiesPurchPerHour[i];
      //START-CONSOLE-TESTING
      console.log(`current hourTotal (${hourTotal}) + currStoreCurrHourCookiesSold (${currStoreCurrHourCookiesSold}) = ${hourTotal + currStoreCurrHourCookiesSold}`);
      console.log('');
      //END-CONSOLE-TESTING
      hourTotal += currStoreCurrHourCookiesSold;
    }
    var totalTdEl = document.createElement('td');
    totalTdEl.innerText = `${hourTotal}`;
    newElementParent.appendChild(totalTdEl);
  }

  //empty td element at the end to fill out grid
  newElementParent.appendChild(document.createElement('td'));
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

//executable from constructors
var seattleStore = new CookieStore('Seattle', 25, 65, 6.3);
allCookieStores.push(seattleStore);

var tokyoStore = new CookieStore('Tokyo', 3, 24, 1.2);
allCookieStores.push(tokyoStore);

var dubaiStore = new CookieStore('Dubai', 11, 38, 3.7);
allCookieStores.push(dubaiStore);

var parisStore = new CookieStore('Paris', 20, 38, 2.3);
allCookieStores.push(parisStore);

var limaStore = new CookieStore('Lima', 2, 16, 4.6);
allCookieStores.push(limaStore);

seattleStore.renderAsTable();
tokyoStore.renderAsTable();
dubaiStore.renderAsTable();
parisStore.renderAsTable();
limaStore.renderAsTable();

renderFooterRow();
