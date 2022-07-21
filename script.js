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
