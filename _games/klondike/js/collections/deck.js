define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var Deck = Backbone.Collection.extend({
			
			_deck: null,
			
			model: Card,
			
			shuffle: function() {
				var deck =  this.toArray(),
					hold = "",
					randomIndex1 = 0
					randomIndex2 = 0;
				
				for(var i = 0; i < 300; i++) {
					randomIndex1 = Math.floor(Math.random() * 52);
					randomIndex2 = Math.floor(Math.random() * 52);
					
					while(randomIndex1 === randomIndex2) {
						randomIndex2 = Math.floor(Math.random() * 52);
					}
					
					hold = deck[randomIndex1];
					deck[randomIndex1] = deck[randomIndex2];
					deck[randomIndex2] = hold;
				}
				
				// store the current shuffle order
				this._deck = deck;
				
		        return deck;
			},
			
			deal: function() {
				var shuffledDeck = this.shuffle();
				
				var deal = {
				
					tableau: shuffledDeck.slice(0, 28),
					stock: shuffledDeck.slice(28)
				
				};
				
				return deal;
			}
		
		}); //end: Deck
		
		return Deck;
		
	}); //end: define