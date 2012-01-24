define([
	'jquery',
	'underscore', 
	'backbone',
	'models/card'
	], function($, _, Backbone, Card){
  
		var Stock = Backbone.Collection.extend({
			
			model: Card,
			
			initialize: function() {
			  //_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
			  this.bind('add', this.update);
			},
			
			update: function() {
				//console.log(this.length);
			}
			
		
		}); //end: Stock
		
		return Stock;
		
	}); //end: define