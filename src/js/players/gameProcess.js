const Resources = require('../resources/resources.js'),
    utils = require('../utils/utils.js');

var allPlayers = [
        // Player sources
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ],
    allKeysForPlayers = [
        'Boy',
        'Cat',
        'Horn',
        'Pink',
        'Princess'
    ];

// GameProcess class manage some of game process like show and hide modal windows,
// game status to stop and reset the game and other

function GameProcess() {
    this.gemGreen = 'images/Gem_Green.png';
    this.gemBlue = 'images/Gem_Blue.png';
    this.gemOrange = 'images/Gem_Orange.png';

    this.gameInProcess = false;
}


// Check, if this property exist in GameProcess class
GameProcess.prototype.getProperty = function(propertyName) {
    if (this && this[propertyName]) {
        return this[propertyName];
    } else {
        console.warn(`Sorry ${propertyName} or "this" object doesn't exist.`);
    }
};


// Set the game to given process status
// @param {Boolean} inProcess If `false` the game will be stoped
GameProcess.prototype.setGameInProcess = function(inProcess) {
    this.gameInProcess = inProcess;
};

// Return status of game process
GameProcess.prototype.getGameInProcess = function() {
    return this.gameInProcess;
};

// Hide the game end modal window if it visible, and show if not visible
GameProcess.prototype.gameEndModal = function(result) {
    gameEndWindow = document.querySelectorAll('.modalGameEnd')[0];

    if (gameEndWindow.className.indexOf('active') > -1) {
        document.querySelectorAll('.modalGameEnd .resultText')[0].textContent = '';
        utils.toggleClass(gameEndWindow, 'active');
    } else {
        document.querySelectorAll('.modalGameEnd .resultText')[0].textContent = result;
        utils.toggleClass(gameEndWindow, 'active');
    }
};

// Hide the game Info window if it visible, and show if not visible
GameProcess.prototype.gameInfoVisibility = function() {
    let gameInfoEl = document.querySelectorAll('#gameInfo')[0];

    utils.toggleClass(gameInfoEl, 'active');
};

// Hide the game start window if it visible, and show if not visible
GameProcess.prototype.modalStartVisibility = function() {
    let modalWindow = document.querySelectorAll('.modalStart')[0];

    utils.toggleClass(modalWindow, 'active');
};

// Choose player on click call {#Player.setPlayer} method
GameProcess.prototype.choosePlayer = function(e, playerCmp) {
    var playerData = e.target.dataset,
        i, len;

    for (i = 0, len = allPlayers.length; i < len; i++) {
        if (allPlayers[i].indexOf(playerData.bodyType.toLowerCase()) > -1) {
            playerCmp.setPlayer(Resources.get(allPlayers[i]));
        }
    }
};

// Clear the game board
GameProcess.prototype.clearGameBoard = function(canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};


// Create and add all availible player images to the start modal window
GameProcess.prototype.addPlayersToModalStart = function() {
    var modalPlayers = document.getElementById('modalPlayers'),
        playerContainer, playerContainerText, player, i, j, len, lenJ;

    for (i = 0, len = allPlayers.length; i < len; i++) {
        player = Resources.get(allPlayers[i]);
        playerContainer = utils.createEl('div');
        playerContainerText = utils.createEl('span');
        playerContainer.className = 'playerContainer';

        for (j = 0, lenJ = allKeysForPlayers.length; j < lenJ; j++) {
            if (allPlayers[i].indexOf(allKeysForPlayers[j].toLowerCase()) > -1) {
                player.dataset.bodyType = allKeysForPlayers[j];
                playerContainerText.textContent = allKeysForPlayers[j];
                playerContainer.appendChild(player);
                playerContainer.appendChild(playerContainerText);
            }
        }
        modalPlayers.appendChild(playerContainer);
    }
};

// Update current game information like score, player lives and speed level
GameProcess.prototype.update = function(player, enemy) {
    document.querySelectorAll('#gameInfo .scoreFieldValue')[0].textContent = player.getScore();
    document.querySelectorAll('#gameInfo .livesFieldValue')[0].textContent = player.getLives();
    document.querySelectorAll('#gameInfo .enemySpeedValue')[0].textContent = enemy.getLevel();
};

let gameProcess = new GameProcess();

module.exports = gameProcess;