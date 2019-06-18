// KLASA KANBAN CARD
function Card(id, name) {
  	var self = this;

  	this.id = id;
  	this.name = name;
  	this.element = generateTemplate('card-template', { description: this.name }, 'li');

  	this.element.querySelector('.card').addEventListener('click', function (event) {
    	event.stopPropagation();

    	if (event.target.classList.contains('btn-delete')) {
      	self.removeCard();
    	}
  	});
}
Card.prototype = {
	removeCard: function() {
    var self = this;

    fetch(prefix + baseUrl + '/card/' + self.id, {
      method: 'DELETE',
      headers: myHeaders
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        self.element.parentNode.removeChild(self.element);
      });
    }
}
