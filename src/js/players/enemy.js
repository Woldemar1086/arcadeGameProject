const Resources = require('../resources/resources.js'),
    utils = require('../utils/utils.js');

// Enemies our player must avoid
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = undefined;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(!this.speed){
        this.setSpeed();
    }
    this.x += dt * this.speed;
    if(this.x > 101*6){
        this.x = -100;
        this.setSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getPosition = function() {
    let left, rigth, bottom, top;
    left = this.x;
    top = this.y + 44;
    rigth = this.x + 101;
    bottom = this.y + 171;

    return {
        left: left,
        rigth: rigth,
        top: top,
        bottom: bottom
    };
};

Enemy.prototype.setSpeed = function() {
    let random = Math.random().toFixed(1)*10;
    random = random >= 5 ? random/2 : random;
    this.speed = Math.round(random*50);
};

var enemy1 = new Enemy(-100, 54);
var enemy2 = new Enemy(-100, 134);
var enemy3 = new Enemy(-100, 219);

// function createRandomEnemy(){

// }


var allEnemies = [enemy1,enemy2,enemy3];


module.exports = {
    allEnemies: allEnemies
};