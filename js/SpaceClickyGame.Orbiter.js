// TODO: wtf is the units of period?
var Orbiter = function(gameObject, kineticLayer, orbitCenter, orbitDistance, orbitPeriod) {
	this.orbitDistance = orbitDistance;
	this.orbitPeriod = orbitPeriod;
	Drawable.call(this, gameObject, kineticLayer, orbitCenter);
};
angular.extend(Orbiter.prototype, Drawable.prototype);

Orbiter.prototype.onLoadedImage = function() {
	Drawable.prototype.onLoadedImage.call(this); //TODO: remove?
	this.kImage.offset({x: this.gameObject.cachedImage.width/2 + this.orbitDistance, y: this.gameObject.cachedImage.height/2});
};

Orbiter.prototype.animate = function(frame) {
	this.kImage.rotate(frame.timeDiff * ((360/(this.orbitPeriod/1000))/1000));
};


var Asteroid = function(gameObject, kineticLayer, orbitCenter, orbitSpeed) {
	Orbiter.call(this, gameObject, kineticLayer, orbitCenter, 0, orbitSpeed);
};
angular.extend(Asteroid.prototype, Orbiter.prototype);

Asteroid.prototype.onClick = function() {
	console.log("PLEASE GIVE THE PLAYER MONEY!!!");
};


var Drone = function(gameObject, kineticLayer, orbitCenter, orbitDistance, orbitSpeed) {
	Orbiter.call(this, gameObject, kineticLayer, orbitCenter, orbitDistance, orbitSpeed);
};
angular.extend(Drone.prototype, Orbiter.prototype);