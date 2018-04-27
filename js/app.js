var Enemy = function(x, y, velX) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // enemy speed on x-axis
    this.velX = velX;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velX * dt;

    if (this.x >= 600) {

        // invoking reset method for each enemy
        this.reset();
    }
     

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x      = -101;
    this.y      = random(1,3)*83-bugOffset;
    this.velX   = random(20,100);
}

// Implementing collisionDetection 
Enemy.prototype.collisionDetection = function() {
    if( player.x >= this.x -70 && player.x <=this.x + 70 ){
        if( player.y >= this.y -70 && player.y <=  this.y + 70 ){
           console.log('yeah baby!');
        }
    }
}

/**
 * Player constructor function 
 * Player has update(), render(), handleInput() and reset() methods
 */
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';

    // setting initial values for x and y axes 
    this.x = x;
    this.y = y;    
};

// creating update method for Player
Player.prototype.update = function(dt) {

    /**
     * if y is lower than zero then water has reached,
     * so call the player.reset
     */
    if (this.y < 0) {
        player.reset();
    }
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

// defining the reset method of player
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

// instatiating the allEnemies array
let allEnemies = [];

// the value that is going to be subtracted from the y-axis position 
// during instatiation of the enemy in order for the bug to be centred 
const bugOffset = 20;

// creating enemies/bugs until their total number is 4 or smaller
while (allEnemies.length <= 4) {

    // instatiating the enemies with random y-position and velocity
    let enemy = new Enemy(-101, random(1,3)*83-bugOffset, random(20,100));
    allEnemies.push(enemy);
}

// player instatiation
const player = new Player(200,400);

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
    return Math.floor(Math.random() * (max - min +1)) + min;
}
