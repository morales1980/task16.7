//KOMUNIKACJA
var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id' : '4483',
	'X-Auth-Token' : '64cdd72244268a420da4fe30b127db5a',
	'Content-Type' : 'application/json'
};

fetch(prefix + baseUrl + '/board', {
	headers: myHeaders
})
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		setupColumns(response.columns);
	})
	.catch(function(error) {
		console.log(error);
	});

// OGÓLNE FUNKCJE

function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}

function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function(card) {
		var cardObject = new Card(card.id, card.name);
		col.addCard(cardObject);
	});
}
