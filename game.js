let config = {
    // tries to use WebGL renderer if supported and falls back to canvas
    type: Phaser.AUTO,
    // Set the dimensions for canvas element that
    // Phaser creates, this is the resolution
    // game displays in: 0x0 - 800x600
    width: 1080,
    height: 640,
    loader: {
        baseUrl: "https://labs.phaser.io"
    },
    // use Arcade Physics system
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 250 }
        }
    },
    // Default scene
    // the scene itself doesn't have a fixed size,
    // it extends infinitely in all directions
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    // The Camera system controls your view into
    // the Scene and you can move/zoom the active
    // camera as required, we can also create new
    // cameras for multiple views into the Scene
}

var player;
var stars;
var platforms;
var cursors;
var starCount;
var canMove = true;
var gameOver;
var flames;
var currentLevel;

// Create an instance of a Phaser.Game object 
// with the configuration above passed to it
var game = new Phaser.Game(config);

// Timer
var timedEvent, timerText;

// flame platform collision with player
var playerTouchedFlame = false;

// Load Assets 
// define a Scene function called "preload"
// where assets are loaded
function preload ()
{
    // load image assets
    this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
    this.load.image("lightBackground", "assets/yellow-bg.png");
    this.load.image("cloud", "assets/tacky-cloud.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("blackStar", "assets/black-stars.png");
    this.load.image("goldStar", "assets/gold-star.png");;
    this.load.image("grassPlatform", "assets/platform-grass-min.png");
    this.load.image("grassCube", "assets/grass-cube.png");
    this.load.image("ladybug", "assets/ladybug-min.png");
    // Fire Pixel asset created by Joker I: https://www.pinterest.com/pin/704039354236421814/
    this.load.image("flame", "assets/fire-pixel-art.png");
    this.load.image("star", "assets/star.png");
    // load ladybug spritesheet (frames created in vectornator)
    this.load.spritesheet("bug", "assets/spritesheet-three.png", {
        frameWidth: 52,
        frameHeight: 31
    });
}

// Creating Game Objects
// game objects are displayed in the order
// you create them (in a stack context)
// the Scenes display list is where all
// game objects live
function create()
{
    const LADYBUG_SPRITE_FRAMERATE = 5;
    // Create game objects and add them to the
    // current Scenes display list
    // syntax: this.add.image(xCoord, yCoord, key)
    this.add.image(400, 300, "deepBlueSky");
    this.add.image(400, 300, "lightBackground");

    // Loading Screen #1 - Light background with clouds and stars
    // this.add.image(150, 200, "cloud").setScale(.25);
    // this.add.image(300, 100, "cloud").setScale(.3);
    // this.add.image(580, 100, "cloud").setScale(.3);
    // this.add.text(280, 200, "bug Saves The World", { color: "#000", fontSize: "1.5rem" });
    // this.add.image(430, 100, "blackStar").setScale(.3);
    // this.add.image(200, 50, "blackStar").setScale(.3);
    // this.add.image(200, 50, "goldStar").setScale(.5);
    // this.add.image(100, 115, "blackStar").setScale(.3);
    // this.add.image(100, 115, "goldStar").setScale(.5);
    // this.add.image(430, 100, "goldStar").setScale(.5);

    // Ladybug character (home screen position related)
    // this.add.image(400, 473, "ladybug").setScale(.265);
    // this.add.image(400, 491, "ladybug").setScale(.25);

    // Platform game objects
    // Create a "Static Physics Group" e.g. a group of Static Bodies 
    platforms = this.physics.add.staticGroup();

    // ground
    platforms.create(0, 630, "grassPlatform").setScale(.4, .25).refreshBody();
    platforms.create(532, 630, "grassPlatform").setScale(.4, .25).refreshBody();
    platforms.create(830, 630, "grassPlatform").setScale(.4, .25).refreshBody();
    
    // jumpable platforms
    // bottom center left platform
    platforms.create(50, 350, "grassPlatform").setScale(.125, .1).refreshBody();
    platforms.create(400, 450, "grassPlatform").setScale(.125, .1).refreshBody();

    // bottom left small platform
    platforms.create(750, 400, "grassPlatform").setScale(.1, .06).refreshBody();

    // square
    platforms.create(580, 510, "grassCube").setScale(.1, .09).refreshBody();
    platforms.create(200, 410, "grassCube").setScale(.1, .09).refreshBody();
    platforms.create(200, 280, "grassCube").setScale(.1, .09).refreshBody();

    // top center right
    platforms.create(500, 250, "grassPlatform").setScale(.2, .1).refreshBody();
    platforms.create(900, 250, "grassPlatform").setScale(.2, .1).refreshBody();
    platforms.create(1100, 150, "grassPlatform").setScale(.2, .1).refreshBody();

    // static group for a deadly flames
    var flamePlatform = this.physics.add.staticGroup();
    flamePlatform.create(200, 562, "flame").setScale(.07).refreshBody();
    flamePlatform.create(700, 562, "flame").setScale(.07).refreshBody();

    // game related text
    const cssGameText = {
        color: "#000",
        fontFamily: "-apple-system, Arial, sans-serif"
    };

    let currentLevel = 1;

    // Current level text
    currentLevel = this.add.text(2, 2, `Level ${currentLevel}: Bugzor Marsh`, cssGameText);
    starCount = this.add.text(1015, 2, `Stars: 0`, cssGameText);
    
    // todo: GameOver Screen

    // Timer
    let gameTimer = "1:30:10 MM::SS::MS";
    // timedEvent = this.time.delayedCall(5000, hi, [], this);
    // timerText = this.add.text(450, 100, `Timer: ${gameTimer}`, cssGameText);

    // Player Game Object
    player = this.physics.add.sprite(0, 400, "bug");
    player.data = {
        lives: 3,
        stars: 0,
        isBurned: false
    };
    player.body.setGravityY(400);
    player.setBounce(0.15);
    player.setScale(1.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('bug', { start: 1, end: 2 }),
        frameRate: LADYBUG_SPRITE_FRAMERATE,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'bug', frame: 0 } ],
        frameRate: LADYBUG_SPRITE_FRAMERATE * 4
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('bug', { start: 3, end: 4 }),
        frameRate: LADYBUG_SPRITE_FRAMERATE,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 0, y: 0, stepX: 200 }
    });    

    stars.children.iterate(function (child) {
        // child.setVelocity(Phaser.Math.Between(200, 400), 20);
        child.setX(Phaser.Math.Between(0, 950));
        child.setY(Phaser.Math.Between(100, 500));
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Handle Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(player, flamePlatform);
    // this.physics.add.collider(player, stars); this is fun for hockey / pushing object game

    // overlaps
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, flamePlatform, touchFire, null, this);

}

function update() {
    // Timer
    // timerText.setText(`Timer: ${timedEvent.getProgress().toString().slice(0, 4)}, ${player.data.stars} STARS`);

    // Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right, and also Space Bar and shift.
    // An object containing the properties: up, down, left, right, space and shift.
    cursors = this.input.keyboard.createCursorKeys();
    const { up, right, bottom, left, space, shift } = cursors;
    const isPlayerTouching = player.body.touching.down;

    // Hotkey movements
    if (left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else if ((space.isDown || up.isDown) && isPlayerTouching) {
        player.setVelocityY(-350);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (player.data.isBurned) {
        setTimeout(() => {
            player.disableBody(true, true);
            gameOver = true;
        }, 1500);
    }
}

function hi() {
    // this.add.text(400, 400, "HELLLO", {color: "#000"});
}

function collectStar(player, star) {
    // Remove the star from scene
    star.disableBody(true, true);
    // increment player star count
    player.data.stars += 1;
    starCount.setText(`Stars: ${player.data.stars}`);
}

function isPlayerAlive(player) {
    return player.data.lives === 0 ? false : true;
}

function touchFire(player) {
    player.data.isBurned = true;
    // set red tint
    player.setTint(0xff0000);
    gameOver = true;
}