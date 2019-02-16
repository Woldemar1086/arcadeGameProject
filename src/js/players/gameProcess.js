function GameProcess () {
	this.gemGreen = 'images/Gem_Green.png',
	this.gemBlue = 'images/Gem_Blue.png',
	this.gemOrange = 'images/Gem_Orange.png'
}

GameProcess.prototype.getProperty = function (propertyName){
	if(this && this[propertyName]){
	return this[propertyName];
	} else {
		console.warn(`Sorry ${propertyName} or "this" object doesn't exist.`)
	}
}