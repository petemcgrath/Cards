define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone',
	'../aura/mediator'
	], function($, $tmpl, _, Backbone, mediator){
  
		var StockView = Backbone.View.extend({

			el: $("#stock"),
			tagName:  "li",
			
		    events: {
		      "click": "discard"
		    },
			
			initialize: function() {
			  _.bindAll(this, 'update', 'remove', 'discard'); // fixes loss of context for 'this' within methods
			  this.model.bind('add', this.update);
			  this.model.bind('remove', this.remove);
			  this.model.view = this;
			},
			
			update: function() {
				//console.log(this.model.length);
				if(this.model.length){ this.el.addClass('has-card'); }
				else { this.el.removeClass('has-card'); }
			},
		
		    // Remove this view from the DOM.
		    remove: function() {
				//console.log("remove " + this.model.length);
				if(this.model.length){ this.el.addClass('has-card'); }
				else { this.el.removeClass('has-card'); }
		    },
		    
		    discard: function() {
		    	if(this.model.length) {
			    	var stock = this.model.toArray();
			    	//console.log("stock.discard() " + stock.length);
			    	if(stock.length < 3 ){
			    		if(stock.length == 2) { this.model.nextFlip = [stock[0], stock[1]]; }
			    		else { this.model.nextFlip = [stock[0]]; }
			    	} else {
			    		this.model.nextFlip = [stock[0], stock[1], stock[2]];
			    	}
			    	this.model.remove(this.model.nextFlip);
			    	mediator.publish('newContentAvailable', this);
				} else {
					mediator.publish('emptyStock', this);
				}
		    	return this;
		    }
		
		}); //end: StockView
		
		return StockView;
		
	}); //end: define