function Column(id, name) {
  	var self = this;

  	this.id = id;
  	this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  	this.element.querySelector('.column').addEventListener('click', function (event) {
	    if (event.target.classList.contains('btn-delete')) {
	      self.removeColumn();
	    }

	    if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card");
        event.preventDefault();
        var data = {name: cardName, bootcamp_kanban_column_id: self.id};

        // var data = new FormData();
        // data.append('name', cardName);
        // data.append('bootcamp_kanban_column_id', self.id);


        fetch(prefix + baseUrl + '/card', {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data)
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            var card = new Card(response.id, cardName);
            self.addCard(card);
          });
	    }
	});
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);
	},
	removeColumn: function() {
	  var self = this;
    fetch(prefix + baseUrl + '/column/' + self.id, {
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
};
