const initGame = require('./resources/engine.js').initGame,
    player = require('./players/player.js'),
    allEnemies = require('./players/enemy.js').allEnemies,
    utils = require('./utils/utils.js'),
    gameProcess = require('./players/gameProcess.js');



var startPlayButton = document.querySelectorAll('.modalStart__button')[0],
    choosePlayerEl = document.querySelectorAll('#modalPlayers')[0],
    restartButton = document.querySelectorAll('.modalGameEnd__restartButton')[0];




// This listner for choosing player body. It sets choosen image 
// for player and set player property playerActive to true.
choosePlayerEl.addEventListener('click', function(e) {
    if (!player.playerBody) {
        utils.toggleClass(e.target, 'active');
    } else {
        utils.toggleClass(player.playerBody, 'active');
        utils.toggleClass(e.target, 'active');
    }
    gameProcess.choosePlayer(e, player);
    player.activePlayer();
});




// On click hide modal start, set gameInProcess to `true`
// Initialize the game and delete CSS class active from modal window with players
startPlayButton.addEventListener('click', function(e) {
    if (player.getPlayerActivity()) {
        gameProcess.modalStartVisibility();
        gameProcess.setGameInProcess(true);
        gameProcess.gameInfoVisibility();
        initGame();
        utils.toggleClass(document.querySelectorAll('#modalPlayers .active')[0], 'active');
    }
});


// Restart button reset all properties for enemies and player to default.
// Close the ModalEnd and open start modal window
restartButton.addEventListener('click', function(e) {
    player.resetAllValues();
    allEnemies.forEach(function(enemy) {
        enemy.resetAllValues(-100);
    });

    gameProcess.gameEndModal();
    gameProcess.modalStartVisibility();
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