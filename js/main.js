// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
  	less: 'libs/less-min',
    jquery: 'libs/jquery-min',
    jqueryTmpl: 'libs/jquery.tmpl-min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min'
  }

});

require(['less', 'routes/game'], function(less, Game){
  var game = new Game;
});
