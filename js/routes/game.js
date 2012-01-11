define([
	'jquery',
	'underscore', 
	'backbone',
	'collections/deck',
	'views/card'
	], function($, _, Backbone, Deck, CardView){
  
		var Game = Backbone.Router.extend({
			_index: null,
			_deck: null,
			_data:null,
			
			routes: {
				"": "index"
			},
			
			initialize: function(options) {
			
				var ws = this;
				
				if (this._index === null){
					$.ajax({
						url: 'js/data/deck.json',
						dataType: 'json',
						data: {},
						success: function(data) {
							ws._data = data;
							ws._deck = new Deck(data);
							ws._index = new CardView({model: ws._deck}); 
							Backbone.history.start();
						}
					});
					return this;
				}
				return this;
			},
			
			/**
			* Handle rendering the initial view for the application
			* @type function
			*/
			index: function() {
				this._index.render();
			}
			
		}); //end: Game
		
		return Game;
		
	}); //end: define