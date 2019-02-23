const Resources = require('../resources/resources.js'),
    utils = require('../utils/utils.js');

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = undefined;
    this.level = 1;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!this.speed) {
        this.setSpeed();
    }
    
    this.x = this.x + (dt * this.speed);

    if (this.x > 101 * 6) {
        this.x = -100;
        this.setSpeed();
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Return current enemy position
Enemy.prototype.getPosition = function() {
    return {
        x: this.x,
        y: this.y
    };
};



// Increment difficulty level
Enemy.prototype.incrementLevel = function () {
    this.level += 1;
};



// Increment difficulty level
Enemy.prototype.decrementLevel = function () {
    this.level -= 1;
};



// Get difficulty level
Enemy.prototype.getLevel = function(){
    return this.level;
};

// Reset all values
// @param {Number} x Horizontal start position for all enemies
Enemy.prototype.resetAllValues = function(x){
    this.x = x;
    this.speed = undefined;
    this.level = 1;
};

// Set speed depends on difficulty level
Enemy.prototype.setSpeed = function() {
    let random = Math.random().toFixed(1) * 10;
    if(this.level === 1){
        random = random >= 5 ? random / 2 : random;
    } else if(this.level === 2){
        random = random >= 5 ? random : random * 2;
    } else if (this.level === 3){
        random = random >= 5 ? random * 3 : random * 4;
    } else {
        random = random >= 5 ? random * 5 : random * 6;
    }
    this.speed = Math.round(random * 50);
};


// Defined enemies
var enemy1 = new Enemy(-100, 53);
var enemy2 = new Enemy(-100, 136);
var enemy3 = new Enemy(-100, 219);


var allEnemies = [enemy1, enemy2, enemy3];


module.exports = {
    allEnemies: allEnemies
};