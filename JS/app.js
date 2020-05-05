'use-strict';

// const totalHoursOpen = 14;
const openingTime24Hr = 600; //6 am in 24 hour time
const closingTime24Hr = 2000; //8 pm in 24 hour time

//object literals
var seattleStore = {
  storeLocation: 'Seattle',
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerSale: 6.3,
  hoursOpen: new Array (), //stores the hours open in 24 hour format as integer values
  customersPerHour: new Array(),
  cookiesPurchPerHour: new Array(),

  populateHoursOpen: function() {
    const totalHoursOpen = Math.abs(closingTime24Hr - openingTime24Hr) / 100;
    for (var i = 0; i <= totalHoursOpen; i++)
    {
      var hourTime = openingTime24Hr + (i * 100);
      this.hoursOpen.push(hourTime);
    }
  },

  //takes a time in 24 hour format as an integer, like 1400, and returns an AM/PM 12 hour time, like 2 PM, as a string
  convert24To12HrTime: function(hourTime24Hour) {
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
  },

  // populateHoursOpenOld: function() {
  //   for (var i = 0; i <= totalHoursOpen; i++)
  //   {
  //     var hourTime = 6 + i;
  //     if (hourTime < 12)
  //     {
  //       this.hoursOpen.push(`${hourTime}am`);
  //     }
  //     else if (hourTime === 12)
  //     {
  //       this.hoursOpen.push(`${hourTime}pm`);
  //     }
  //     else
  //     {
  //       this.hoursOpen.push(`${hourTime - 12}pm`);
  //     }
  //   }
  // },

  simulateCustPerHour: function() {
    //populate hours open
    this.populateHoursOpen();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersPerHour.push(customersInOneHour);
    }
  },

  simulateCookiesPerHour: function() {
    //populate customersPerHour
    this.simulateCustPerHour();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
    }
  },

  renderAsList: function() {
    var totalCookieSales = 0;
    var salesListsDiv = document.getElementById('sales-lists');
    //create and add p element for the store name at the top of the list
    var storeNameEl = document.createElement('p');
    storeNameEl.appendChild(document.createTextNode(this.storeLocation));
    salesListsDiv.appendChild(storeNameEl);
    //create and add the ul element for the unlisted item list
    var unlistedEl = document.createElement('ul');
    var idAttributeName = `${this.storeLocation}-list`;
    unlistedEl.setAttribute('id', idAttributeName);
    unlistedEl.setAttribute('class', 'ulist');
    salesListsDiv.appendChild(unlistedEl);
    //create a pointer at the newly added ul element
    var storeListUlEl = document.getElementById(idAttributeName);
    for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
    {
      var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
      totalCookieSales += cookiesPurchInOneHour;
      var oneHourCookieSalesListItem = document.createElement('li');
      var currHour12HourTime = this.convert24To12HrTime(this.hoursOpen[i]);
      oneHourCookieSalesListItem.appendChild(
        document.createTextNode(`${currHour12HourTime}: ${cookiesPurchInOneHour.toFixed()} cookies`));
      storeListUlEl.appendChild(oneHourCookieSalesListItem);
    }
    var totalCookieSalesListItem = document.createElement('li');
    totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
    storeListUlEl.appendChild(totalCookieSalesListItem);
  }
};

var tokyoStore = {
  storeLocation: 'Tokyo',
  minCustPerHour: 3,
  maxCustPerHour: 24,
  avgCookiesPerSale: 1.2,
  hoursOpen: new Array (),
  customersPerHour: new Array(),
  cookiesPurchPerHour: new Array(),

  populateHoursOpen: function() {
    for (var i = 0; i <= totalHoursOpen; i++)
    {
      var hourTime = 6 + i;
      if (hourTime < 12)
      {
        this.hoursOpen.push(`${hourTime}am`);
      }
      else if (hourTime === 12)
      {
        this.hoursOpen.push(`${hourTime}pm`);
      }
      else
      {
        this.hoursOpen.push(`${hourTime - 12}pm`);
      }
    }
  },

  simulateCustPerHour: function() {
    //populate hours open
    this.populateHoursOpen();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersPerHour.push(customersInOneHour);
    }
  },

  simulateCookiesPerHour: function() {
    //populate customersPerHour
    this.simulateCustPerHour();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
    }
  },

  renderAsList: function() {
    var totalCookieSales = 0;
    var salesListsDiv = document.getElementById('sales-lists');
    //create and add p element for the store name at the top of the list
    var storeNameEl = document.createElement('p');
    storeNameEl.appendChild(document.createTextNode(this.storeLocation));
    salesListsDiv.appendChild(storeNameEl);
    //create and add the ul element for the unlisted item list
    var unlistedEl = document.createElement('ul');
    var idAttributeName = `${this.storeLocation}-list`;
    unlistedEl.setAttribute('id', idAttributeName);
    unlistedEl.setAttribute('class', 'ulist');
    salesListsDiv.appendChild(unlistedEl);
    //create a pointer at the newly added ul element
    var storeListUlEl = document.getElementById(idAttributeName);
    for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
    {
      var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
      totalCookieSales += cookiesPurchInOneHour;
      var oneHourCookieSalesListItem = document.createElement('li');
      oneHourCookieSalesListItem.appendChild(
        document.createTextNode(`${this.hoursOpen[i]}: ${cookiesPurchInOneHour.toFixed()} cookies`));
      storeListUlEl.appendChild(oneHourCookieSalesListItem);
    }
    var totalCookieSalesListItem = document.createElement('li');
    totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
    storeListUlEl.appendChild(totalCookieSalesListItem);
  }
};

var dubaiStore = {
  storeLocation: 'Dubai',
  minCustPerHour: 11,
  maxCustPerHour: 38,
  avgCookiesPerSale: 3.7,
  hoursOpen: new Array (),
  customersPerHour: new Array(),
  cookiesPurchPerHour: new Array(),

  populateHoursOpen: function() {
    for (var i = 0; i <= totalHoursOpen; i++)
    {
      var hourTime = 6 + i;
      if (hourTime < 12)
      {
        this.hoursOpen.push(`${hourTime}am`);
      }
      else if (hourTime === 12)
      {
        this.hoursOpen.push(`${hourTime}pm`);
      }
      else
      {
        this.hoursOpen.push(`${hourTime - 12}pm`);
      }
    }
  },

  simulateCustPerHour: function() {
    //populate hours open
    this.populateHoursOpen();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersPerHour.push(customersInOneHour);
    }
  },

  simulateCookiesPerHour: function() {
    //populate customersPerHour
    this.simulateCustPerHour();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
    }
  },

  renderAsList: function() {
    var totalCookieSales = 0;
    var salesListsDiv = document.getElementById('sales-lists');
    //create and add p element for the store name at the top of the list
    var storeNameEl = document.createElement('p');
    storeNameEl.appendChild(document.createTextNode(this.storeLocation));
    salesListsDiv.appendChild(storeNameEl);
    //create and add the ul element for the unlisted item list
    var unlistedEl = document.createElement('ul');
    var idAttributeName = `${this.storeLocation}-list`;
    unlistedEl.setAttribute('id', idAttributeName);
    unlistedEl.setAttribute('class', 'ulist');
    salesListsDiv.appendChild(unlistedEl);
    //create a pointer at the newly added ul element
    var storeListUlEl = document.getElementById(idAttributeName);
    for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
    {
      var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
      totalCookieSales += cookiesPurchInOneHour;
      var oneHourCookieSalesListItem = document.createElement('li');
      oneHourCookieSalesListItem.appendChild(
        document.createTextNode(`${this.hoursOpen[i]}: ${cookiesPurchInOneHour.toFixed()} cookies`));
      storeListUlEl.appendChild(oneHourCookieSalesListItem);
    }
    var totalCookieSalesListItem = document.createElement('li');
    totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
    storeListUlEl.appendChild(totalCookieSalesListItem);
  }
};

var parisStore = {
  storeLocation: 'Paris',
  minCustPerHour: 20,
  maxCustPerHour: 38,
  avgCookiesPerSale: 2.3,
  hoursOpen: new Array (),
  customersPerHour: new Array(),
  cookiesPurchPerHour: new Array(),

  populateHoursOpen: function() {
    for (var i = 0; i <= totalHoursOpen; i++)
    {
      var hourTime = 6 + i;
      if (hourTime < 12)
      {
        this.hoursOpen.push(`${hourTime}am`);
      }
      else if (hourTime === 12)
      {
        this.hoursOpen.push(`${hourTime}pm`);
      }
      else
      {
        this.hoursOpen.push(`${hourTime - 12}pm`);
      }
    }
  },

  simulateCustPerHour: function() {
    //populate hours open
    this.populateHoursOpen();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersPerHour.push(customersInOneHour);
    }
  },

  simulateCookiesPerHour: function() {
    //populate customersPerHour
    this.simulateCustPerHour();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
    }
  },

  renderAsList: function() {
    var totalCookieSales = 0;
    var salesListsDiv = document.getElementById('sales-lists');
    //create and add p element for the store name at the top of the list
    var storeNameEl = document.createElement('p');
    storeNameEl.appendChild(document.createTextNode(this.storeLocation));
    salesListsDiv.appendChild(storeNameEl);
    //create and add the ul element for the unlisted item list
    var unlistedEl = document.createElement('ul');
    var idAttributeName = `${this.storeLocation}-list`;
    unlistedEl.setAttribute('id', idAttributeName);
    unlistedEl.setAttribute('class', 'ulist');
    salesListsDiv.appendChild(unlistedEl);
    //create a pointer at the newly added ul element
    var storeListUlEl = document.getElementById(idAttributeName);
    for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
    {
      var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
      totalCookieSales += cookiesPurchInOneHour;
      var oneHourCookieSalesListItem = document.createElement('li');
      oneHourCookieSalesListItem.appendChild(
        document.createTextNode(`${this.hoursOpen[i]}: ${cookiesPurchInOneHour.toFixed()} cookies`));
      storeListUlEl.appendChild(oneHourCookieSalesListItem);
    }
    var totalCookieSalesListItem = document.createElement('li');
    totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
    storeListUlEl.appendChild(totalCookieSalesListItem);
  }
};

var limaStore = {
  storeLocation: 'Lima',
  minCustPerHour: 2,
  maxCustPerHour: 16,
  avgCookiesPerSale: 4.6,
  hoursOpen: new Array (),
  customersPerHour: new Array(),
  cookiesPurchPerHour: new Array(),

  populateHoursOpen: function() {
    for (var i = 0; i <= totalHoursOpen; i++)
    {
      var hourTime = 6 + i;
      if (hourTime < 12)
      {
        this.hoursOpen.push(`${hourTime}am`);
      }
      else if (hourTime === 12)
      {
        this.hoursOpen.push(`${hourTime}pm`);
      }
      else
      {
        this.hoursOpen.push(`${hourTime - 12}pm`);
      }
    }
  },

  simulateCustPerHour: function() {
    //populate hours open
    this.populateHoursOpen();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      var customersInOneHour = Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
      this.customersPerHour.push(customersInOneHour);
    }
  },

  simulateCookiesPerHour: function() {
    //populate customersPerHour
    this.simulateCustPerHour();
    for (var i = 0; i < this.hoursOpen.length; i++)
    {
      this.cookiesPurchPerHour.push(this.customersPerHour[i] * this.avgCookiesPerSale);
    }
  },

  renderAsList: function() {
    var totalCookieSales = 0;
    var salesListsDiv = document.getElementById('sales-lists');
    //create and add p element for the store name at the top of the list
    var storeNameEl = document.createElement('p');
    storeNameEl.appendChild(document.createTextNode(this.storeLocation));
    salesListsDiv.appendChild(storeNameEl);
    //create and add the ul element for the unlisted item list
    var unlistedEl = document.createElement('ul');
    var idAttributeName = `${this.storeLocation}-list`;
    unlistedEl.setAttribute('id', idAttributeName);
    unlistedEl.setAttribute('class', 'ulist');
    salesListsDiv.appendChild(unlistedEl);
    //create a pointer at the newly added ul element
    var storeListUlEl = document.getElementById(idAttributeName);
    for (var i = 0; i < this.cookiesPurchPerHour.length; i++)
    {
      var cookiesPurchInOneHour = this.cookiesPurchPerHour[i];
      totalCookieSales += cookiesPurchInOneHour;
      var oneHourCookieSalesListItem = document.createElement('li');
      oneHourCookieSalesListItem.appendChild(
        document.createTextNode(`${this.hoursOpen[i]}: ${cookiesPurchInOneHour.toFixed()} cookies`));
      storeListUlEl.appendChild(oneHourCookieSalesListItem);
    }
    var totalCookieSalesListItem = document.createElement('li');
    totalCookieSalesListItem.appendChild(document.createTextNode(`Total: ${totalCookieSales.toFixed()} cookies`));
    storeListUlEl.appendChild(totalCookieSalesListItem);
  }
};


//exectuable
seattleStore.simulateCookiesPerHour();
seattleStore.renderAsList();

tokyoStore.simulateCookiesPerHour();
tokyoStore.renderAsList();

dubaiStore.simulateCookiesPerHour();
dubaiStore.renderAsList();

parisStore.simulateCookiesPerHour();
parisStore.renderAsList();

limaStore.simulateCookiesPerHour();
limaStore.renderAsList();
