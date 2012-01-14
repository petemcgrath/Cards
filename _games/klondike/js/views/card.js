define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone'
	], function($, $tmpl, _, Backbone){
  
		var CardView = Backbone.View.extend({

			el: $("#deck"),
			
			cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
			  _.bindAll(this, 'render');
			  this.model.bind('change', this.render);
			  this.model.view = this;
			},
			
			render: function() {
			
			    var t = this;
			    
			    this.el.fadeOut('fast', function() {
			        var deal = t.model.deal();
			        
			        t.el.empty();
			        $.tmpl(t.cardTmpl, t.model.shuffle()).appendTo(t.el);
			        t.el.fadeIn('fast');
			        
			    });
			    return this;
			}
		
		}); //end: CardView
		
		return CardView;
		
	}); //end: define