/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */


const Resources = require('./resources.js'),
    enemyCmp = require('../players/enemy.js'),
    playerCmp = require('../players/player.js'),
    gameProcess = require('../players/gameProcess.js'),
    utils = require('../utils/utils.js');

/* Predefine the variables we'll be using within this scope,
 * create the canvas element, grab the 2D context for that canvas
 * set the canvas element's height/width and add it to the DOM.
 */

var doc = window.document,
    win = window.window,
    canvas = utils.createEl('canvas'),
    ctx = canvas.getContext('2d'),
    mainGameContainer = document.getElementById('mainGameContainer'),
    gameInfoEl = document.getElementById('gameInfo'),
    lastTime, allEnemies;

canvas.width = 505;
canvas.height = 606;
mainGameContainer.insertBefore(canvas, gameInfoEl);

/* This function serves as the kickoff point for the game loop itself
 * and handles properly calling the update and render methods.
 */
function main() {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
    update(dt);
    render();

    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */
    lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    if (gameProcess.getGameInProcess()) {
        win.requestAnimationFrame(main);
    }
}

/* This function does some initial setup that should only occur once,
 * particularly setting the lastTime variable that is required for the
 * game loop.
 */
function init() {
    lastTime = Date.now();
    main();
}

/* This function is called by main (our game loop) and itself calls all
 * of the functions which may need to update entity's data. Based on how
 * you implement your collision detection (when two entities occupy the
 * same space, for instance when your character should die), you may find
 * the need to add an additional function call here. For now, we've left
 * it commented out - you may or may not want to implement this
 * functionality this way (you could just implement collision detection
 * on the entities themselves within your app.js file).
 */
function update(dt) {
    enemyCmp.allEnemies.forEach(function(enemy) {
        comparePositions(enemy, playerCmp);
    });
    updateEntities(dt);
}

/* This is called by the update function and loops through all of the
 * objects within your allEnemies array as defined in app.js and calls
 * their update() methods. It will then call the update function for your
 * player object. These update methods should focus purely on updating
 * the data/properties related to the object. Do your drawing in your
 * render methods.
 */
function updateEntities(dt) {
    enemyCmp.allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });

    playerCmp.update(enemyCmp.allEnemies);

    if (playerCmp.getScore() >= 15) {
        reset('You win!');
    } else if (playerCmp.getLives() <= 0) {
        reset('Sorry, you lose!');
    }
}

/* This function initially draws the "game level", it will then call
 * the renderEntities function. Remember, this function is called every
 * game tick (or loop of the game engine) because that's how games work -
 * they are flipbooks creating the illusion of animation but in reality
 * they are just drawing the entire screen over and over.
 */
function render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
            'images/water-block.png', // Top row is water
            'images/stone-block.png', // Row 1 of 3 of stone
            'images/stone-block.png', // Row 2 of 3 of stone
            'images/stone-block.png', // Row 3 of 3 of stone
            'images/grass-block.png', // Row 1 of 2 of grass
            'images/grass-block.png' // Row 2 of 2 of grass
        ],
        numRows = 6,
        numCols = 5,
        row, col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
    }

    renderEntities();
    gameProcess.update(playerCmp, enemyCmp.allEnemies[0]);
}

/* This function is called by the render function and is called on each game
 * tick. Its purpose is to then call the render functions you have defined
 * on your enemy and player entities within app.js
 */
function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    enemyCmp.allEnemies.forEach(function(enemy) {
        enemy.render();
    });

    playerCmp.render();
}


// Compare positions of enemies and player
// If player meet enemy than will be called player method {#Player.fail}
function comparePositions(enemy, player) {
    let playerPos = player.getPosition(),
        enemyPos = enemy.getPosition(),
        playerLeft, playerRight, playerTop,
        enemyLeft, enemyRight, enemyBottom,
        compareLevelHigh;

    playerLeft = player.x;
    playerRight = player.x + 101;
    playerTop = player.y + 70;

    enemyLeft = enemyPos.x + 40;
    enemyRight = enemyPos.x + 61;
    enemyBottom = enemyPos.y + 171;
    enemyTop = enemyPos.y + 70;

    compareLevelHigh = Math.ceil(playerTop / 10) === Math.ceil(enemyTop / 10);

    if (playerLeft < enemyRight && playerRight > enemyLeft && compareLevelHigh) {
        playerCmp.fail();
    }
}

/* This function does nothing but it could have been a good place to
 * handle game reset states - maybe a new game menu or a game over screen
 * those sorts of things. It's only called once by the init() method.
 */
function reset(result) {
    gameProcess.setGameInProcess(false);
    gameProcess.clearGameBoard(canvas);
    gameProcess.gameInfoVisibility();
    gameProcess.gameEndModal(result);
}

/* Go ahead and load all of the images we know we're going to need to
 * draw our game level. Then set init as the callback method, so that when
 * all of these images are properly loaded our game will start.
 */
Resources.load([
    // Map sources
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    // Enemy source
    'images/enemy-bug.png',
    // Bonuses sources
    'images/Gem_Blue.png',
    'images/Gem_Green.png',
    'images/Gem_Orange.png',
    // Player sources
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]);
// Resources.onReady(init);
Resources.onReady(gameProcess.addPlayersToModalStart);

/* Assign the canvas' context object to the global variable (the window
 * object when run in a browser) so that developers can use it more easily
 * from within their app.js files.
 */
window.ctx = ctx;

module.exports = {
    initGame: init,
    resetGame: reset,
    main: main
};