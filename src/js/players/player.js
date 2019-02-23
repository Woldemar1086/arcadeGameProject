const Resources = require('../resources/resources.js'),
    utils = require('../utils/utils.js'),
    gameProcess = require('./gameProcess.js');

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.playerBody = undefined;
    this.playerIsActive = false;
    this.lives = 5;
    this.score = 0;
    this.maxScore = 15;
};


// Add to Playerbody(image) and set coordinates for player start
Player.prototype.setPlayer = function(player) {
    this.playerBody = player;
    this.x = 101 * 2;
    this.y = 83 * 5 - 32;
};

// Reduce player live and return player to start
Player.prototype.fail = function() {
    this.lives -= 1;
    if (this.lives > 0) {
        this.returnToStart();
    }
};

// Add points to score and return player to start
Player.prototype.win = function() {
    if(this.score < this.maxScore){
        this.returnToStart();
    }
};

// return player to start
Player.prototype.returnToStart = function() {
        this.x = 101 * 2;
        this.y = 83 * 5 - 32;
};

// Add one point to score
Player.prototype.incrementScore = function() {
    this.score += 1;
};

// Set player active
// This property blocks the start button till player body(image) will be set
Player.prototype.activePlayer = function() {
    this.playerIsActive = true;
};

// Return true if player body exist and 
Player.prototype.getPlayerActivity = function() {
    return this.playerIsActive;
};


// Return player's lives
Player.prototype.getLives = function() {
    return this.lives;
};

// Return player's score
Player.prototype.getScore = function() {
    return this.score;
};

// Return current player position
Player.prototype.getPosition = function() {
    return {
        x: this.x,
        y: this.y
    };
};

// Set default values for all properties in class
Player.prototype.resetAllValues = function() {
   this.playerBody = undefined;
    this.playerIsActive = false;
    this.lives = 5;
    this.score = 0;
    this.maxScore = 15;
};


// Manage player moves
Player.prototype.handleInput = function(code) {
    switch (code) {
        case 'up': // if (x === 'value1')
            if (this.y > -84 && (this.y - 83) > -84) {
                this.y = this.y - 83;
            }
            break;
        case 'down':
            if (this.y < 83 * 5 && (this.y + 83) < 83 * 5) {
                this.y = this.y + 83;
            }
            break;
        case 'right':
            if (this.x > -1 && (this.x + 101) < 101 * 5) {
                this.x = this.x + 101;
            }
            break;
        case 'left':
            if (this.x < 101 * 5 && (this.x - 101) > -1) {
                this.x = this.x - 101;
            }
            break;
    }

};

// Update player info and if player is on the finish water line, add to score 1 point
// return the player on start and increase the speed of enemies
Player.prototype.update = function(enemies) {
    if (this.y < 0) {
        this.returnToStart();
        this.incrementScore();
        enemies.forEach(function(enemy) {
            enemy.incrementLevel();
        });
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function(code) {
    ctx.drawImage(this.playerBody, this.x, this.y);
};

var player = new Player();


module.exports = player;