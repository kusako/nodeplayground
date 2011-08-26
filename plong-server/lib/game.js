var geometry = require('./geometry'),
	log = require('console').log;

function Paddle(x, y) {
	return {
		boundingBox: new geometry.Rectangle(x, y, 64, 16)
	};
}

function Ball(x, y) {
	return {
		velocity: {
			x: 60,
			y: 120
		},
		boundingBox: new geometry.Rectangle(x, y, 16, 16)
	};
}

function Canvas() {
	return {
		boundingBox: new geometry.Rectangle(0, 0, 480, 320)
	};
}

var paddle1, paddle2, canvas, ball, timer, lastTick;

function update(deltaTime) {
	if (ball.velocity.y < 0) {
		if (geometry.collide(paddle2.boundingBox, ball.boundingBox)) {
			ball.velocity.y *= -1;
		}
	} else if (ball.velocity.y > 0) {
		if (geometry.collide(paddle1.boundingBox, ball.boundingBox)) {
			ball.velocity.y *= -1;
		}
	}

	if (ball.boundingBox.left() <= canvas.boundingBox.left()) {
		ball.velocity.x *= -1;
	} else if (ball.boundingBox.right() >= canvas.boundingBox.right()) {
		ball.velocity.x *= -1;
	}

	if (ball.boundingBox.bottom() >= canvas.boundingBox.bottom()) {
		ball.velocity.y *= -1;
	} else if (ball.boundingBox.top() <= canvas.boundingBox.top()) {
		ball.velocity.y *= -1;
	}

	ball.boundingBox.x += ball.velocity.x * deltaTime;
	ball.boundingBox.y += ball.velocity.y * deltaTime;
}

exports.start = function (onUpdate) {
	paddle1 = Paddle(208, 16);
	paddle2 = Paddle(208, 288);
	ball = Ball(232, 152);
	canvas = Canvas();
	lastTick = new Date().getTime();
	// Start Timer
	timer = setInterval(function() {
		var thisTick = new Date().getTime();	
		var deltaTime = (thisTick - lastTick) / 1000;
		lastTick = thisTick;
		update(deltaTime);
		onUpdate(paddle1, paddle2, ball, lastTick);
	}, 500);
}

exports.stop = function () {
	clearInterval(timer);
}

exports.onPaddle1Move = function(x, y) {
	paddle1.boundingBox.x = x;
	paddle1.boundingBox.y = y;
}

exports.onPaddle2Move = function(x, y) {
	paddle2.boundingBox.x = x;
	paddle2.boundingBox.y = y;
}
