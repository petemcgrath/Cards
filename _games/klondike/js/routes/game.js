define([
	'jquery',
	'underscore', 
	'backbone',
	'collections/deck',
	'collections/discardPile',
	'collections/foundation',
	'collections/stock',
	'collections/tableau',
	'views/game',
	'views/card',
	'views/discardPile',
	'views/foundation',
	'views/stock',
	'views/tableau'
	], function($, _, Backbone, Deck, DiscardPile, Foundation, Stock, Tableau, GameView, CardView, DiscardPileView, FoundationView, StockView, TableauView){
  
		var Game = Backbone.Router.extend({
			_gamesPlayed:0,
			_deck: null,
			_newDeal: null,
			
			_stock:null,
			_discardPile:null,
			foundations:new Array(4),
			tableaus:new Array(7),
			
			_stockView:null,
			_discardPileView:null,
			foundationViews:new Array(4),
			tableauViews:new Array(7),
			
			routes: {
			},
			
			initialize: function(options) {
			
				var ws = this;
				
				$.ajax({
					url: 'js/data/deck.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						var dataArray = [],
							count = 0;
						
						//traverse the data by suit creating key/value pairs of all the values
						for(var i = 0, sl = data[0].suits.length; i < sl; i++) {
							for(var j = 0, vl = data[0].values.length; j < vl; j++) {
								dataArray[count] = {
									suit: data[0].suits[i],
									value: data[0].values[j]
								}
								count++;
							}	
						}
						
						ws._deck = new Deck(dataArray);
						
						//Backbone.history.start();	
					}
				});
				
				return this;
			},
			
			newGame: function() {
				
				if(this._gamesPlayed !== 0) this.clearGame();
				
				this.buildGame();
				
				this._newDeal = this._deck.deal();
				
				//the below array indexes coorespond to the deal structure
				
				// 0 1  2  3  4  5  6
				//   7  8  9  10 11 12
				//      13 14 15 16 17
				//         18 19 20 21
				//            22 23 24
				//               25 26
				//                  27
				
				for(var i = 0, count = 0; i < 7; i++) {
					for(var j = i; j < 7; j++) {
						this.tableaus[j].add(this._newDeal.tableau[count]);
						count++;
					}
				}
				
				this.animateDeal(this, 0, 0);
				
				this._gamesPlayed++;
				
			},
			
			buildGame: function() {
				
				this._stock = new Stock();
				this._stockView = new StockView({model: this._stock});
				
				this._discardPile = new DiscardPile();
				this._discardPileView = new DiscardPileView({model: this._discardPile});
				
				for(var i = 0, l = this.foundations.length; i < l; i++) {
					this.foundations[i] = new Foundation();
					this.foundationViews[i] = new FoundationView({model: this.foundations[i], el: $("#foundations" + (i+1))});
				}
				
				for(var i = 0, l = this.tableaus.length; i < l; i++) {
					this.tableaus[i] = new Tableau();
					this.tableauViews[i] = new TableauView({model: this.tableaus[i], el: $("#tableau" + (i+1))});
				}
				
			},
			
			clearGame: function() {
				this._newDeal =  null;
				
				this._stock = null;
				this._stockView.el.empty();
				
				this._discardPile = null;
				this._discardPileView.el.empty();
				
				for(var i = 0, l = this.foundations.length; i < l; i++) {
					this.foundations[i] = null;
					this.foundationViews[i].el.empty();
				}
				
				for(var i = 0, l = this.tableaus.length; i < l; i++) {
					this.tableaus[i] = null;
					this.tableauViews[i].el.empty();
				}
				
				//console.log(this._stockView);
			},
			
			animateDeal: function(t, i, j) {
				if(i == 7) {
					clearTimeout(timer);
					timer = setTimeout(t.populateStock, 200, t);
					return;
				}
				var faceUp = (j == i) ? true : false;

				t.tableauViews[j].dealNext(i, faceUp)
				
				j++;
				
				if(j == 7) {
					i++;
					j = i;
				}
				
				var timer = setTimeout(t.animateDeal, 30, t, i, j);
			},
			
			populateStock: function(t) {
				// 'this' is not available because populateStock() is being called from a setTimeout
				// which is lame, so we best clean this up, yes?
				t._stock.add(t._newDeal.stock);
			}
			
		}); //end: Games
		
		return Game;
		
	}); //end: define