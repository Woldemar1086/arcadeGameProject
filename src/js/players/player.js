const Resources = require('../resources/resources.js'),
    utils = require('../utils/utils.js');

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.playerBody = undefined;
    this.playerIsActive = false;

};

Player.prototype.setPlayer = function(player) {
    this.playerBody = player;
    this.x = 101 * 2;
    this.y = 83 * 5 - 30;
};

Player.prototype.activePlayer = function() {
    this.playerIsActive = true;
};

Player.prototype.inactivePlayer = function() {
    this.playerIsActive = false;
};

Player.prototype.getPlayerActivity = function() {
    return this.playerIsActive;
};

Player.prototype.getPosition = function() {
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

Player.prototype.update = function(code) {

};

Player.prototype.render = function(code) {
    ctx.drawImage(this.playerBody, this.x, this.y);
};

var player = new Player();


module.exports = {
    player: player
};