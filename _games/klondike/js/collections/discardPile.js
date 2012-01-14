define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var DiscardPile = Backbone.Collection.extend({
			
			model: Card
		
		}); //end: DiscardPile
		
		return DiscardPile;
		
	}); //end: define