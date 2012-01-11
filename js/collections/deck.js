define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var Deck = Backbone.Collection.extend({
		
			model: Card
		
		}); //end: Deck
		
		return Deck;
		
	}); //end: define