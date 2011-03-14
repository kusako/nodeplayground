var geometry = require('./geometry.js');

var paddle1, paddle2, ball, canvas, timer;

function Paddle(x, y) {
	return {
		boundingBox: geometry.Rectangle(x, y, 64, 16)
	};
}

function Ball(x, y) {
	return {
		velocity: {
			x: 0,
			y: 0
		},
		boundingBox: geometry.Rectangle(x, y, 16, 16)
	};
}

function Canvas() {
	return {
		boundingBox: geometry.Rectangle(0, 0, 480, 320)
	};
}

function update(deltaTime) {	
	if (ball.velocity.y > 0) {
		if (geometry.collide(paddle2.boundingBox, ball.boundingBox)) {
			ball.velocity.y = -ball.velocity.y;
		}
	} else if (ball.velocity.y < 0) {
		if (geometry.collide(paddle1.boundingBox, ball.boundingBox)) {
			ball.velocity.y = -ball.velocity.y;
		}
	}
	
	if (ball.boundingBox.left <= canvas.boundingBox.left) {
		ball.velocity.x = -ball.velocity.x;
	} else if (ball.boundingBox.right >= canvas.boundingBox.right) {
		ball.velocity.x = -ball.velocity.x;
	}
	
	if (ball.boundingBox.bottom <= canvas.boundingBox.bottom) {
		ball.velocity.y = -ball.velocity.y;
	} else if (ball.boundingBox.top >= canvas.boundingBox.top) {
		ball.velocity.y = -ball.velocity.y;
	}	
}

function init() {
	paddle1 = Paddle(208, 16);
	paddle2 = Paddle(208, 288);
	ball = Ball(232, 152);
	canvas = Canvas();
	
	// Start Timer
}