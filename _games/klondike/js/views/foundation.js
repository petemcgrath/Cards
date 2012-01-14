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
			  //_.bindAll(this, 'render');
			  //this.model.bind('change', this.render);
			  //this.model.view = this;
			},
			
			render: function() {
			
			    
			}
		
		}); //end: FoundationView
		
		return FoundationView;
		
	}); //end: define