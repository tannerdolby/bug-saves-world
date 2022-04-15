let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1080,
    height: 640,
    // backgroundColor: "#000",
    pixelArt: false,
    scene: [
        SceneOne,
        SceneTwo
    ],
    loader: {
        baseUrl: "https://labs.phaser.io",
        crossOrigin: "anonymous"
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 250 }
        }
    },
    audio: {
        disableWebAudio: false
    }
}

const levels = [
    "Bugzor Marsh",
    "Starry Night"
];

let level;

let player;
let stars;
let platforms;
let cursors;
let starCount;
let canMove = true;
let gameOver;
let flames;
let currentLevel;
let allStarsCollected;
let winText;
let timeElapsed;
let t;
let music;
let movementKeys;
let isBugBurned;
let starsCollected;
let burnedText;
let monster;

// var scene = {
//     init: init,
//     preload: preload,
//     create: create,
//     update: update
// };

// Create an instance of a Phaser.Game object 
// with the configuration above passed to it
const game = new Phaser.Game(config);

// game.scene.add("playGame", SceneTwo, true, { level: 1 });

// function init(data) {
//     level = 1;
//     this.sys.settings.data.level = 1;
//     this.sys.settings.data.starsCollected = 0;
//     this.sys.settings.data.isBugBurned = false;
// }


// Timer
let timedEvent, timerText;

// flame platform collision with player
let playerTouchedFlame = false;


function collectStar(player, star) {
    star.disableBody(true, true);
    starsCollected += 1;
    this.sys.settings.data.starsCollected += 1;
    console.log("W:", this.sys.settings.data);
    starCount.setText(`Stars: ${this.sys.settings.data.starsCollected}`);
}

function touchFire(player) {

    this.sys.settings.data.isBugBurned = true;

    player.setTint(0xff0000);
    player.setVelocityY(-50);
    player.setVelocityX(Phaser.Math.Between(-50, 50));

    // this.physics.pause();

    burnedText.setText("Bug has taken burn damage!");

    // setTimeout(() => {
    //     burnedText.setText(`Game Over! ^__^ ty for playing!`);
    //     // player.disableBody(true, true);
    //     gameOver = true;
    // }, 1500);

}

// todo: monster game loop and smash
function smashBug(player) {
    // player.disableBody(true, true);
}
