
var Card = Backbone.Model.extend({

});



var Deck = Backbone.Collection.extend({
		
	model: Card

});


var CardView = Backbone.View.extend({

	el: $("#deck"),
	
	template: $("#indexTmpl").template(),
	
	initialize: function() {
	  _.bindAll(this, 'render');
	  this.model.bind('change', this.render);
	  this.model.view = this;
	},
	
	render: function() {
	
	    var t = this;
	    
	    this.el.fadeOut('fast', function() {
	        t.el.empty();
	        $.tmpl(t.template, t.model.toArray()).appendTo(t.el);
	        t.el.fadeIn('fast');
	    });
	    return this;
	}

});


var Game = Backbone.Router.extend({
    _index: null,
    _deck: null,
	_data:null,

    routes: {
        "": "index"
    },
	
    initialize: function(options) {
    
        var ws = this;
       
        if (this._index === null){
            $.ajax({
                url: 'js/data/deck.json',
                dataType: 'json',
                data: {},
                success: function(data) {
                	ws._data = data;
                    ws._deck = new Deck(data);
                    ws._index = new CardView({model: ws._deck}); 
                    Backbone.history.start();
                }
            });
            return this;
        }
        return this;
    },


    /**
	 * Handle rendering the initial view for the application
	 * @type function
	*/
    index: function() {
        this._index.render();
    }
});

game  = new Game;