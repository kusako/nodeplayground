function Rectangle(x, y, w, h) {
	return {
		x: x,
		y: y,
		w: w,
		h: h,
		left: function left() {
			return x;
		},
		right: function right() {
			return x + w;
		},
		top: function top() {
			return y;
		},
		bottom: function bottom() {
			return y + h;
		}
	};
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

