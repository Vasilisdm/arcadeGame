let Enemy = function(x, y, velX) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
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
     
    this.collisionDetection();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// the value that is going to be subtracted from the y-axis position 
// during instatiation of the enemy in order for the bug to be centred 
const bugOffset = 20;

Enemy.prototype.reset = function() {
    this.x      = -101;
    this.y      = random(1,3)*83-bugOffset;
    this.velX   = random(20,100);
}

let gameScore = document.querySelector('.score');
const modalScore = document.querySelector('.modal-score');

// Implementing collisionDetection 
Enemy.prototype.collisionDetection = function() {
    if( player.x >= this.x - 80 && player.x <=this.x + 80 && player.y >= this.y - 77 && player.y <=  this.y + 80) { 

        /**
         * If one of the enemies touched the player, then reset the position of all enemies.
         * That's why I am using foreach on allEnenmies instead of this
         */
        allEnemies.forEach(function(enemy){
            enemy.reset();
        });

        // also reset the position of the player
        player.reset();

        // if player collided with an enemy remove 30 points from his score
        player.score -= 30;

        // if a collision is detected remove one heart from the player's lives
        const playerLivesUl = document.querySelector('.playerLives ul');
        playerLivesUl.removeChild(playerLivesUl.lastElementChild);
        player.lives -= 1;
        
        if (player.lives == 0) {
            $(".modal").modal()
            modalScore.innerHTML = `Your score was:${player.score}`;
            allEnemies.forEach(function(enemy){
                enemy.reset();
            });

            player.reset();
            player.score = 0;
            gameScore.innerHTML = `Game Score:${player.score}`;
            player.lives = 3;
            player.addLives();

        }
    }
}

// instatiating the allEnemies array
const allEnemies = [];

// creating enemies/bugs until their total number is 4 or smaller
while (allEnemies.length <= 4) {

    // instatiating the enemies with random y-position and velocity
    allEnemies.push(new Enemy());
}

// Creating the array of all the available avatars
const playerAvatars = [
    'images/char-boy.png', 
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

// Loading the avatars in order for drawImage to work properly
Resources.load(playerAvatars);

/**
 * Player constructor function 
 * Player has update(), render(), handleInput() and reset() methods
 */
let Player = function(index, x, y) {
    this.sprite = playerAvatars[index];

    this.lives = 3;
    // setting initial values for x and y axes 
    this.x = x;
    this.y = y; 
    this.score = 0;   
};

// creating update method for Player
Player.prototype.update = function(dt) {

    /**
     * if y is lower than zero then water has reached,
     * so call the player.reset
     */
    if (this.y < 0) {
        player.reset();
        player.score += 100;
        gameScore.innerHTML = `Game Score:${player.score}`;
    }
};

/**
 * added the appropriate keycodes in order to check which arrow key was pressed.
 */
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // with keyCode I am getting the unicode value of the pressed keyboard key
    player.handleInput(allowedKeys[e.keyCode]);
});

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

// addLives method appends lives/hearts to playerLives ul
Player.prototype.addLives = function() {
    // create as many lives as the player's
    for (i = 0; i < this.lives; i++) {
        let heart = document.createElement('li');
        heart.innerHTML = '<img src="images/heart.png" alt="heart">';
        document.querySelector('.playerLives ul').appendChild(heart);
    }
}

// player instatiation
let player = new Player(0,200,400);

// calling addLives on player in order for the hearts to be inserted to the DOM
player.addLives();


// function for creating random numbers used for speed and where the enemy appears
function random(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}


const avatarSelection = document.querySelector('.avatarSelection');

// creating the avatar li element in which I am going to append the img element with the corresponding avatar path
let avatarLiElement = document.createElement('li');

const rigthNavigationArrow = document.querySelector('.right-nav-arrow');
const leftNavigationArrow = document.querySelector('.left-nav-arrow');

const avatarSelectionButton = document.querySelector('.avatar-selected');

// when the avatarSelectionButton is clicked hide the avatar selection window
avatarSelectionButton.addEventListener('click',function(){
    avatarSelection.style.display = "none";
});

// retrieve the index of the selected sprite from the playerAvatars array
let playerAvatarsIndex = playerAvatars.indexOf(player.sprite);

// invoced addAvatarImg function here in order for the initial avatar selected, 
// to be appeared in the avatars unordered list
addAvatarImg();

// If the leftNavigationArrow is clicked load the show the previous avatar from the array
leftNavigationArrow.addEventListener('click',function(){
   
    if (playerAvatarsIndex > 0) {
        playerAvatarsIndex -= 1;
        addAvatarImg();
        player.sprite = playerAvatars[playerAvatarsIndex];
    }
    
});


// If the rigthNavigationArrow is clicked load the show the next avatar from the array
rigthNavigationArrow.addEventListener('click',function(){

    if (playerAvatarsIndex < playerAvatars.length-1) {
        playerAvatarsIndex += 1;
        addAvatarImg();
        player.sprite = playerAvatars[playerAvatarsIndex];
    }
    
});

// created addAvatarImg function to keep my code DRY
function addAvatarImg() {
    avatarLiElement.innerHTML = `<img src=${playerAvatars[playerAvatarsIndex]} alt="avatar">`;
    document.querySelector('.avatarUl').appendChild(avatarLiElement);
}