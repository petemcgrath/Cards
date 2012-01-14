define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var Foundation = Backbone.Collection.extend({
			
			model: Card
		
		}); //end: Foundation
		
		return Foundation;
		
	}); //end: define