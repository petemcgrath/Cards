define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var DiscardPileView = Backbone.View.extend({

			el: $("#discard"),
			
			//cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
			  //_.bindAll(this, 'render');
			  //this.model.bind('change', this.render);
			  //this.model.view = this;
			},
			
			render: function() {
			
			    
			}
		
		}); //end: DiscardPileView
		
		return DiscardPileView;
		
	}); //end: define