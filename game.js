let config = {
    // tries to use WebGL renderer if supported and falls back to canvas
    type: Phaser.AUTO,
    // Set the dimensions for canvas element that
    // Phaser creates, this is the resolution
    // game displays in
    width: 800,
    height: 600, 
    // handle physics
    physics: {
        default: 'arcade',
        acade: {
            gravity: {
                y: 200
            }
        }
    },
    // Default scene
    scene: {
        preload: preload,
        create: create
    }

}

// Create an instance of a Phaser.Game object 
// with the configuration above passed to it
var game = new Phaser.Game(config);

// Load Assets 
// Define a Scene function called "preload"
// where assets are loaded
function preload ()
{
    // Load Image Assets
    this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
    this.load.image("lightBackground", "assets/yellow-bg.png");
    this.load.image("cloud", "assets/tacky-cloud.png");
    this.load.image("star", "assets/star.png");
    
    // todo: make ladybug a spritesheet
    this.load.image("ladybug", "assets/ladybug-transparent.png");

    // todo: add special items/keys to be found e.g. stars/special item

    // todo: load platforms

    // load a spritesheet
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
    });
}

// Creating Game Objects
// game objects are displayed in the order
// you create them (in a stack context)
function create ()
{
    // syntax: add.image(xCoord, yCoord, key)
    this.add.image(400, 300, "deepBlueSky");
    this.add.image(400, 300, "lightBackground");
    this.add.image(150, 200, "cloud").setScale(.25);
    this.add.image(300, 100, "cloud").setScale(.3);
    this.add.image(580, 100, "cloud").setScale(.3);
    this.add.image(100, 100, "star").setScale(.9);
    this.add.image(450, 50, "star").setScale(.9);
    this.add.image(650, 180, "star").setScale(.9);
    this.add.image(400, 400, "ladybug").setScale(.2);

    // todo: add physics, create staticGroup()

    // handle jumping interation from platform to platform
}


class BugCharacter {
    constructor(username, color) {
        this.username = username;
        this.color = color;
        this.posX = 0;
        this.posY = 0;
    }
}