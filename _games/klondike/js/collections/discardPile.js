define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var DiscardPile = Backbone.Collection.extend({
			
			model: Card,
			
			nextFlip: []
		
		}); //end: DiscardPile
		
		return DiscardPile;
		
	}); //end: define