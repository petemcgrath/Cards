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
			
			_foundation1:null,
			_foundation2:null,
			_foundation3:null,
			_foundation4:null,
			
			_tableau1:null,
			_tableau2:null,
			_tableau3:null,
			_tableau4:null,
			_tableau5:null,
			_tableau6:null,
			_tableau7:null,
			
			_stockView:null,
			
			_discardPileView:null,
			
			_foundationView1:null,
			_foundationView2:null,
			_foundationView3:null,
			_foundationView4:null,
			
			_tableauView1:null,
			_tableauView2:null,
			_tableauView3:null,
			_tableauView4:null,
			_tableauView5:null,
			_tableauView6:null,
			_tableauView7:null,
			
			
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
			
			buildGame: function() {//add views	that bind to add
				
				//build collections
				this._stock = new Stock();
				
				this._discardPile = new DiscardPile();
				
				this._foundation1 = new Foundation();
				this._foundation2 = new Foundation();
				this._foundation3 = new Foundation();
				this._foundation4 = new Foundation();
				
				this._tableau1 = new Tableau();
				this._tableau2 = new Tableau();
				this._tableau3 = new Tableau();
				this._tableau4 = new Tableau();
				this._tableau5 = new Tableau();
				this._tableau6 = new Tableau();
				this._tableau7 = new Tableau();
				
				//build views
				this._stockView = new StockView({model: this._stock});
				
				this._discardPileView = new DiscardPileView({model: this._discardPile});
				
				this._foundationView1 = new FoundationView({model: this._foundation1, el: $("#foundations1")});
				this._foundationView2 = new FoundationView({model: this._foundation2, el: $("#foundations2")});
				this._foundationView3 = new FoundationView({model: this._foundation3, el: $("#foundations3")});
				this._foundationView4 = new FoundationView({model: this._foundation4, el: $("#foundations4")});
				
				this._tableauView1 = new TableauView({model: this._tableau1, el: $("#tableau1")});
				this._tableauView2 = new TableauView({model: this._tableau2, el: $("#tableau2")});
				this._tableauView3 = new TableauView({model: this._tableau3, el: $("#tableau3")});
				this._tableauView4 = new TableauView({model: this._tableau4, el: $("#tableau4")});
				this._tableauView5 = new TableauView({model: this._tableau5, el: $("#tableau5")});
				this._tableauView6 = new TableauView({model: this._tableau6, el: $("#tableau6")});
				this._tableauView7 = new TableauView({model: this._tableau7, el: $("#tableau7")});
				
			},
			
			newGame: function() {
				
				if(this._gamesPlayed !== 0) this.clearGame();
				
				this.buildGame();
				
				this._newDeal = this._deck.deal();
				
				this._stock.add(
					this._newDeal.stock
				);
						
				//the below array indexes coorespond to the deal structure
				
				// 0 1  2  3  4  5  6
				//   7  8  9  10 11 12
				//      13 14 15 16 17
				//         18 19 20 21
				//            22 23 24
				//               25 26
				//                  27
				
				for(var i = 1, count = 0, currTableau = ""; i <= 7; i++) {
					for(var j = i; j <= 7; j++) {
						currTableau = "_tableau" + j
						this[currTableau].add(this._newDeal.tableau[count]);
						count++;
					}
				}
				
				
				/*
				this._tableau1.add(
					this._newDeal.tableau[0]
				);
			
			
				this._tableau2.add([
					this._newDeal.tableau[1],
					this._newDeal.tableau[7]
				]);
			
			
				this._tableau3.add([
					this._newDeal.tableau[2],
					this._newDeal.tableau[8],
					this._newDeal.tableau[13]
				]);
				
			
				this._tableau4.add([
					this._newDeal.tableau[3],
					this._newDeal.tableau[9],
					this._newDeal.tableau[14],
					this._newDeal.tableau[18]
				]);
				
			
				this._tableau5.add([
					this._newDeal.tableau[4],
					this._newDeal.tableau[10],
					this._newDeal.tableau[15],
					this._newDeal.tableau[19],
					this._newDeal.tableau[22]
				]);
				
			
				this._tableau6.add([
					this._newDeal.tableau[5],
					this._newDeal.tableau[11],
					this._newDeal.tableau[16],
					this._newDeal.tableau[20],
					this._newDeal.tableau[23],
					this._newDeal.tableau[25]
				]);
			
			
				this._tableau7.add([
					this._newDeal.tableau[6],
					this._newDeal.tableau[12],
					this._newDeal.tableau[17],
					this._newDeal.tableau[21],
					this._newDeal.tableau[24],
					this._newDeal.tableau[26],
					this._newDeal.tableau[27]
				]);
				*/
				
				
				this._gamesPlayed++;
				console.log("new game");
				
			},
			
			clearGame: function() {
				this._newDeal =  null;
				
				this._stock = null;
				
				this._discardPile = null;
				
				this._foundation1 = null;
				this._foundation2 = null;
				this._foundation3 = null;
				this._foundation4 = null;
				
				this._tableau1 = null;
				this._tableau2 = null;
				this._tableau3 = null;
				this._tableau4 = null;
				this._tableau5 = null;
				this._tableau6 = null;
				this._tableau7 = null;
				
				this._stockView.el.empty();
				
				this._discardPileView.el.empty();
				
				this._foundationView1.el.empty();
				this._foundationView2.el.empty();
				this._foundationView3.el.empty();
				this._foundationView4.el.empty();
				
				this._tableauView1.el.empty();
				this._tableauView2.el.empty();
				this._tableauView3.el.empty();
				this._tableauView4.el.empty();
				this._tableauView5.el.empty();
				this._tableauView6.el.empty();
				this._tableauView7.el.empty();
				
				console.log("game cleared");
			}
			
		}); //end: Game
		
		return Game;
		
	}); //end: define