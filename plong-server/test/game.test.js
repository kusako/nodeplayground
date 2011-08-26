var game = require('game'),
	assert   = require('assert'),
	log = require('console').log;

module.exports = {
	'test Game#start' : function() {
		var start = new Date().getTime();
		game.start(function (paddle1, paddle2, ball, lastTick) {
			log('ball');
			log(ball);
			log(ball.boundingBox.left());
		});
		setTimeout(function () {
			game.stop();
		}, 10000);
	}
}