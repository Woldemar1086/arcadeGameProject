const Resources = require('./resources.js'),
    utils = require('./utils/utils.js'),
    player = require('./app.js').player;

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
    ],
    modalWindow = document.querySelectorAll('.modalStart')[0];

function addPlayersToModalStart() {
    var modalPlayers = document.getElementById('modalPlayers'),
        playerContainer, player, i, j, len, lenJ;

    for (i = 0, len = allPlayers.length; i < len; i++) {
        player = Resources.get(allPlayers[i]);
        playerContainer = document.createElement('div');
        playerContainerText = document.createElement('span');
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
}

function choosePlayer(e) {
    // for (var i = playerBody.length - 1; i >= 0; i--) {
    //     if (playerBody[i].type === player.playerbody) {
    //         activePlayer.setPlayer(playerBody[i].url);
    //     }
    // }
}

function closeModalStart() {
    utils.toggleClass(modalWindow, 'active');
}



// document.addEventListener('click', function(e) {
// });

module.exports = {
    addPlayersToModalStart: addPlayersToModalStart,
    closeModalStart: closeModalStart,
    choosePlayer: choosePlayer
};