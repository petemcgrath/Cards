define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var TableauView = Backbone.View.extend({

			el: null,
			tagName:  "li",
			
			cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
			  _.bindAll(this, 'render', 'dealNext'); // fixes loss of context for 'this' within methods
			  //this.model.bind('add', this.render);
			  this.model.view = this;
			  //console.log(this.model);
			},
			
			render: function(tableau) {
		        $.tmpl(this.cardTmpl, tableau).appendTo(this.el);
			    this.el.fadeIn('fast');
			},
		    
		    dealNext: function(index, faceUp) {
		    	var card = this.model.at(index);
		    	$.tmpl(this.cardTmpl, card).appendTo(this.el);
		    	
		    	//console.log(faceUp);
		    	if(faceUp) {
		    		$(":last-child", this.el).removeClass('face-down');
		    	}
		    	
		    	$(":last-child", this.el).addClass('pos' + (index+1));
		    }
		
		}); //end: TableauView
		
		return TableauView;
		
	}); //end: define