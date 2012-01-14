define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var Tableau = Backbone.Collection.extend({
			
			_position: null,
			
			model: Card
			
		}); //end: Tableau
		
		return Tableau;
		
	}); //end: define