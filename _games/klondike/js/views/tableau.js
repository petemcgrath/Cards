define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var TableauView = Backbone.View.extend({

			el: null,
			
			cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
			  _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
			  this.model.bind('add', this.render);
			  this.model.view = this;
			},
			
			render: function(tableau) {
		        //console.log(this.el);
		        $.tmpl(this.cardTmpl, tableau).appendTo(this.el);
			    this.el.fadeIn('fast');
			}
		
		}); //end: TableauView
		
		return TableauView;
		
	}); //end: define