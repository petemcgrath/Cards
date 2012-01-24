define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var FoundationView = Backbone.View.extend({

			el: null,
			
			//cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
			  _.bindAll(this, 'render', 'remove');
			  this.model.bind('change', this.render);
			  this.model.view = this;
			},
			
			render: function() {
			
			    
			},
		
		    // Remove this view from the DOM.
		    remove: function() {
		      $(this.el).empty();
		      console.log("empty");
		    }
		
		}); //end: FoundationView
		
		return FoundationView;
		
	}); //end: define