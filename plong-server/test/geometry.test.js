var geometry = require('geometry'),
	assert   = require('assert');

var r = new geometry.Rectangle(0, 0, 10, 10); 

module.exports = {
	'test Rectangle#new' : function() {
		assert.equal(0, r.x, 'x position must be 0.');
		assert.equal(0, r.y, 'y position must be 0.');
		assert.equal(10, r.w, 'widht must be 10.');
		assert.equal(10, r.h, 'height must be 10.');
	},
	'test Rectangle#top' : function() {
		assert.equal(0, r.top());
	},
	'test Rectangle#bottom' : function() {
		assert.equal(10, r.bottom());
	},
	'test Rectangle#left' : function() {
		assert.equal(0, r.left());
	},
	'test Rectangle#right' : function() {
		assert.equal(10, r.right());
	},
	'test collide#true' : function() {
		assert.ok(geometry.collide(r, r), '2 identical rects must collide.');
	},
	'test collide#false_below' : function() {
		var r2 = new geometry.Rectangle(11, 0, 10, 10);
		assert.ok(!geometry.collide(r, r2), 'Rectangles must not collide');
	},
	'test collide#false_above' : function() {
		var r2 = new geometry.Rectangle(11, 0, 10, 10);
		assert.ok(!geometry.collide(r2, r), 'Rectangles must not collide');
	},
	'test collide#false_left' : function() {
		var r2 = new geometry.Rectangle(0, 11, 10, 10);
		assert.ok(!geometry.collide(r2, r), 'Rectangles must not collide');
	},
	'test collide#false_right' : function() {
		var r2 = new geometry.Rectangle(0, 11, 10, 10);
		assert.ok(!geometry.collide(r, r2), 'Rectangles must not collide');
	},
	'test Rectangle#modifiy' : function() {
		var r2 = new geometry.Rectangle(0, 0, 0, 0);
		r2.y = 10;
		console.log(r2);
		assert.equal(10, r2.top());
	}
}