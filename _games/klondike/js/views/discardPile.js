define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone',
	'../aura/facade'
	], function($, $tmpl, _, Backbone, facade){
  
		var DiscardPileView = Backbone.View.extend({

			el: $("#discard"),
			
			cardTmpl: $("#cardTmpl").template(),
			
			initialize: function() {
				_.bindAll(this, 'render');
				//this.model.bind('add', this.render);
				this.model.view = this;
			    
			    var dp = this;
				facade.subscribe('contentUpdater', 'newContentAvailable', function (context) {
				    //dp.addFlipped(context.model.nextFlip);
				    dp.model.add(context.model.nextFlip[0]);
					dp.model.add(context.model.nextFlip[1]);
					dp.model.add(context.model.nextFlip[2]);
					dp.render();
				});
				facade.subscribe('todoSaver', 'emptyStock', function (context) {
				    dp.el.empty();
				    var discards = dp.model.toArray();
				    dp.model.remove(discards);
				    context.model.add(discards);
				});
			},
			
			render: function() {
				this.el.empty();
				for(var i = 0, l = this.model.length; i < l; i++) {
					$.tmpl(this.cardTmpl, this.model.at(i)).appendTo(this.el);
					if (i == (l - 1)) {
						$(":last-child", this.el).addClass('pos1');
					}
					if (i == (l - 2)) {
						$(":last-child", this.el).addClass('pos2');
					}
				}
				$("li", this.el).removeClass('face-down');
			}
		
		}); //end: DiscardPileView
		
		return DiscardPileView;
		
	}); //end: define