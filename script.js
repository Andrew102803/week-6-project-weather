var authorizationthingy = '64f2ee2a8261daa4d9f780f5b365f275';
var maincity = "Nashville"
//namshvillme
//checks current date and time and also formats it and yes this is superior formatting cope and seethe americans
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
var date = moment().format('dddd, MMMM Do YYYY');
//im american its fine
var cityHist = [];
//saves your text that you put in the search bar and puts it in local storage
$('.search').on("click", function (event) {
	event.preventDefault();
	maincity = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (maincity === "") {
		return;
	};
	cityHist.push(maincity);
//yall ever just
	localStorage.setItem('maincity', JSON.stringify(cityHist));
	fivedays.empty();
	getHistory();
	getWeatherToday();
});
//
//uses saved terms from search to create a search history and puts it on the dide
var contHistEl = $('.cityHist');
function getHistory() {
	contHistEl.empty();
//https://youtu.be/QUjYy4Ksy1E yall should listen its good
	for (let i = 0; i < cityHist.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${cityHist[i]}`)

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!maincity) {
		return;
	}
	//does that part of the acceptance criteria that says when you press a button it shows that city or smth
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		maincity = $(this).text();
		fivedays.empty();
		getWeatherToday();
	});
};
//Today weather list thng selctoert 
var cardTodayBody = $('.cardBodyToday')
//launches the 5 day planner weather thing
function getWeatherToday() {
	var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${maincity}&units=imperial&appid=${authorizationthingy}`;

	$(cardTodayBody).empty();

	$.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then(function (response) {
		$('.cardTodayCityName').text(response.name);
		$('.cardTodayDate').text(date);
		//Icons
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// what iyt offically is
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardTodayBody.append(pEl);
		//Humidity self explanitory
		var humidityfunny = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardTodayBody.append(humidityfunny);
		//what it de facto be aka catuallt is
		var tempfunny = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
		cardTodayBody.append(tempfunny);
		//Wind Speed
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardTodayBody.append(pElWind);
		//latitude and longitude
		var cityLat = response.coord.lat;
		// same as below but latitude
		var cityLon = response.coord.lon;
		// logs the longitude of city
// nose blkeeds
		var getuithing = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${authorizationthingy}`;

		$.ajax({
			url: getuithing,
			method: 'GET',
		}).then(function (response) {
			var uvindexthingy = $('<p>').text(`UV Index: `);
			var seconduvthingy = $('<span>').text(response.current.uvi);
			var uvi = response.current.uvi;
			uvindexthingy.append(seconduvthingy);
			cardTodayBody.append(uvindexthingy);
			//uv index now has color to make you scared of the unfathomable power of the sun as your skin is burned by UV lights as we destroy our ozozne layer
			if (uvi >= 0 && uvi <= 2) {
				seconduvthingy.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				seconduvthingy.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				seconduvthingy.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				seconduvthingy.attr("class", "red")
			} else {
				seconduvthingy.attr("class", "purple")
			}
		});
	});
	getFiveDayForecast();
};
