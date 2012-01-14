define([
	'jquery',
	'jqueryTmpl',
	'underscore', 
	'backbone',
	'routes/game'
	], function($, $tmpl, _, Backbone, Game){
  
		var GameView = Backbone.View.extend({
			
			game:null,
			
			el: $("#cardapp"),
			
			controlsTmpl: "",
			
			events: {
				"click #game-controls #new-game": "startNew"
			},
			
			initialize: function() {
		   		if(this.game === null) {
		   			this.game = new Game;
		   		}
		    },
			
			render: function() {
				
			},
			
			startNew: function() {
				this.game.newGame(); 
			}
		
		}); //end: GameView
		
		return GameView;
		
	}); //end: define