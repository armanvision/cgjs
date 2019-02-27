// Vector2 constructor and some vector-math
export function Vector2(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector2.prototype.set = function(vec, y) {
	if(y || y === 0){
		this.x = vec;
		this.y = y;
	}
	else{
		this.x = vec.x;
		this.y = vec.y;
	}
}

Vector2.prototype.zero = function() {
	this.x = 0;
	this.y = 0;
}

Vector2.prototype.add = function(vec) {
	this.x += vec.x;
	this.y += vec.y;
}

Vector2.prototype.multiply = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;
}

Vector2.prototype.equal = function(vec) {
	if(this.x === vec.x && this.y === vec.y) return true;
	else return false;
}

Vector2.prototype.magnitude = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector2.prototype.angle = function () {
	var a = Math.atan2(this.y, this.x) * 180 / Math.PI;
	if (a < 0) a = 360 + a;
	return a;
}

Vector2.prototype.normalize = function() {
  var m = this.magnitude();
  if (m > 0) {
    this.x = this.x / m;
    this.y = this.y / m;
  }
}

Vector2.prototype.setLength = function (length) {
	this.normalize();
	this.multiply(length);
}
