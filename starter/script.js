
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL(input) {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";
  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;


  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "appid": "d3bcfc2183d74533b538d31a0ada87b6" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = input;

  console.log(queryURL + $.param(queryParams));
  // Logging the URL so we have access to it for troubleshooting
  return queryURL + $.param(queryParams);
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} WeatherData - object containing NYT API data
 */
function updatePage(WeatherData) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves


  // Log the NYTData to console, where it will show up as an object
  console.log(WeatherData);
  console.log("------------------------------------");

  // Create CODE HERE to calculate the temperature (converted from Kelvin)

  var data = WeatherData.list[0].dt_txt;
  console.log(data.split(" ")[0]);
  var city = WeatherData.city.name;
  var icon = WeatherData.list[0].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  $('#wicon').attr('src', iconurl);
  var dat0 = WeatherData.list[0].dt_txt.split(" ")[0];
  var temp = WeatherData.list[0].main.temp;
  var wind = WeatherData.list[0].wind.speed;
  var hum = WeatherData.list[0].main.humidity;
  // Create CODE HERE to transfer content to HTML
  console.log(city)
  $('.city').text(city)
  $('.icon').text(icon)
  $('.dat').text(dat0)
  $('.temp').text((temp - 273.15).toFixed(2)+String.fromCharCode(176)+"C")
  $('.wind').text(wind+"KPH")
  $('.hum').text(hum+"%")
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

  var dayBlockRow = $("<div >");
  console.log(WeatherData.list.length)
  for (var i=0; i< 40; i++){

    var dat = WeatherData.list[i].dt_txt.split(" ")[0];
    
    console.log(dat0 + "  "+ dat) 

    if (dat0 == dat ){
      continue;
    }
    dat0 = dat;
    var dayBlock = $("<div >");
    var dateDiv = $("<div >");
    var iconDiv = $("<div >");
    var dateiconDiv = $("<div >");
    var wiconImg = $("<img >");
    var tempDiv = $("<div >");
    var windDiv = $("<div >");
    var humdDiv = $("<div >");


    var temprowDiv = $("<div >");
    var temptxtDiv = $("<div >");
   
    temptxtDiv.text("Temp:")
    temptxtDiv.attr("width", "75px")
    tempDiv.attr("width", "75px")
    temprowDiv.attr("display", "flex")
    temprowDiv.append(temptxtDiv, tempDiv)
    

    humdDiv.addClass("column")
    var humrowDiv = $("<div >");
    var humtxtDiv = $("<div >");
    humtxtDiv.addClass("column")
    humtxtDiv.text("Wind:")
    humrowDiv.addClass("row")
    humrowDiv.append(humtxtDiv, humdDiv)

    windDiv.addClass("column")
    var windrowDiv = $("<div >");
    var windtxtDiv = $("<div >");
    windtxtDiv.addClass("column")
    windtxtDiv.text("Wind:")
    windrowDiv.addClass("row")
    windrowDiv.append(windtxtDiv, windDiv)
    
    console.log(WeatherData.list[i])
    var dat = WeatherData.list[i].dt_txt.split(" ")[0];
    var icon = WeatherData.list[i].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    wiconImg.attr('src', iconurl);
    var temp = WeatherData.list[i].main.temp;
    var wind = WeatherData.list[i].wind.speed;
    var hum = WeatherData.list[i].main.humidity;

    

    dateDiv.text(dat)
    dateDiv.addClass("h5")
    
    iconDiv.append(wiconImg)
    iconDiv.addClass("ex2")
    dateiconDiv.append(dateDiv, iconDiv )
    dateiconDiv.addClass("d-inline-block")
    tempDiv.text((temp - 273.15).toFixed(2)+String.fromCharCode(176)+"C")
    windDiv.text(wind+"KPH")
    humdDiv.text(hum+"%")

    dayBlock.append(dateiconDiv, temprowDiv, windrowDiv, humrowDiv);
    dayBlock.addClass("col mx-1 bg-info");
    dayBlockRow.append(dayBlock)

  }
  dayBlockRow.addClass("row");
  console.log(dayBlockRow)
  $('#day-content').empty()
  $('#day-content').append(dayBlockRow)

}

// Function to empty out the articles
function clear() {
  $('#day-content').remove();

}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  input = $("#search-input")
    .val()
    .trim();
  // Build the query URL for the Fetch request to the NYT API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
});


$(".btn-secondary").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  console.log("input")


  console.log(this.id)
  input = this.id
  console.log(input)
  // Empty the region associated with the articles
  

  // Build the query URL for the Fetch request to the NYT API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
});

function myFunction(input){
  // Build the query URL for the Fetch request to the NYT API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
}

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
