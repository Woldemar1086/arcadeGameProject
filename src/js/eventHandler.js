const initGame = require('./resources/engine.js').initGame,
    closeModalStart = require('./startGame.js').closeModalStart,
    choosePlayer = require('./startGame.js').choosePlayer,
    player = require('./players/player.js').player,
    init = require('./resources/engine.js'),
    utils = require('./utils/utils.js');

var startPlayButton = document.querySelectorAll('.modalStart__button')[0];
choosePlayerEl = document.querySelectorAll('#modalPlayers')[0];


// This listner for choosing player body. It sets choosen image 
// for player and set player property playerActive to true.
choosePlayerEl.addEventListener('click', function(e) {
    if (!player.playerBody) {
        utils.toggleClass(e.target, 'active');
    } else {
        utils.toggleClass(player.playerBody, 'active');
        utils.toggleClass(e.target, 'active');
    }
    choosePlayer(e);
    player.activePlayer();
});


// This listens for buton start game
startPlayButton.addEventListener('click', function(e) {
    if (player.getPlayerActivity()) {
        closeModalStart();
        initGame();
    }
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});