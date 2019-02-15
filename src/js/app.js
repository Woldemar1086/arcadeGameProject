const Resources = require('./resources.js'),
    utils = require('./utils/utils.js');

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = null;
    this.y = null;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.render(dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.speed = function() {
    console.log(speed);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
	this.playerBody = undefined;
};

Player.prototype.setPlayer = function (player) {
	this.playerBody = player;
};

Player.prototype.handleInput = function (code) {
	console.log(code);
};

Player.prototype.update = function (code) {
	console.log(code);
};

var player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

module.exports = {
    player: player,
    allEnemies: allEnemies
};