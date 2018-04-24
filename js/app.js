
var Enemy = function(x, y, velX) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // enemy speed onx axis
    this.velX = velX;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velX * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // setting initial values for x and y axes 
    this.x = 200;
    this.y = 400;
};

// creating update method for Player
Player.prototype.update = function(dt) {

};

// creating handleInput method for Player
Player.prototype.handleInput = function(input) {
    console.log(`handleInput ${input}`);
    switch (input) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};

/**
 * moved prototype.render outside of the player object declaration
 * in order not to be redifined each time a new instance of the object
 * is created
 */ 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
while (allEnemies.length <= 3) {
    let enemy = new Enemy(-100,random(0,3)*83/2, 100);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// function for creating random numbers used for speed and where the enemy appears
function random(min, max) {
    return num = Math.floor(Math.random() * (max - min +1)) + min;
}
