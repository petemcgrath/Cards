define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var StockView = Backbone.View.extend({

			el: $("#stock"),
			
			initialize: function() {
			  _.bindAll(this, 'update'); // fixes loss of context for 'this' within methods
			  this.model.bind('add', this.update);
			},
			
			update: function() {
				this.el.addClass('has-card');
			}
		
		}); //end: StockView
		
		return StockView;
		
	}); //end: define