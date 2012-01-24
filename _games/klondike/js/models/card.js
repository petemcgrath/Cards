define([
	'jquery',
	'underscore', 
	'backbone'
	], function($, _, Backbone){
  
		var Card = Backbone.Model.extend({
		    
		    clear: function() {
		      this.view.remove();
		      this.destroy();
		    }
		    
		}); //end: Card
		
		return Card;
		
	}); //end: define