function Rectangle(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
}

Rectangle.prototype.left = function () {
	return this.x;
}

Rectangle.prototype.right = function () {
	return this.x + this.w;
}

Rectangle.prototype.top = function () {
	return this.y;
}

Rectangle.prototype.bottom = function () {
	return this.y + this.h;
}

function collide(rect1, rect2) {
	if (rect1.top() > rect2.bottom()) {
		return false;
	}

	if (rect1.bottom() < rect2.top()) {
		return false;
	}
	
	if (rect1.left() > rect2.right()) {
		return false;
	}
	
	if (rect1.right() < rect2.left()) {
		return false;
	}
		
	return true;
}

exports.Rectangle = Rectangle;
exports.collide = collide;

