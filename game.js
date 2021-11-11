let config = {
    // tries to use WebGL renderer if supported and falls back to canvas
    type: Phaser.AUTO,
    // Set the dimensions for canvas element that
    // Phaser creates, this is the resolution
    // game displays in: 0x0 - 800x600
    width: 800,
    height: 600, 
    // use Arcade Physics system
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300,
                debug: false
            }
        }
    },
    // Default scene
    // the scene itself doesn't have a fixed size,
    // it extends infinitely in all directions
    scene: {
        preload: preload,
        create: create
    }
    // The Camera system controls your view into
    // the Scene and you can move/zoom the active
    // camera as required, we can also create new
    // cameras for multiple views into the Scene
}

// Create an instance of a Phaser.Game object 
// with the configuration above passed to it
var game = new Phaser.Game(config);

// Load Assets 
// define a Scene function called "preload"
// where assets are loaded
function preload ()
{
    // load Image Assets
    this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
    this.load.image("lightBackground", "assets/yellow-bg.png");
    this.load.image("cloud", "assets/tacky-cloud.png");
    this.load.image("star", "assets/star.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("blackStar", "assets/black-stars.png");
    this.load.image("goldStar", "assets/gold-star.png");
    this.load.image("grassPlatform", "assets/grass-platform.png");
    
    // todo: make ladybug a spritesheet 
    // positions: (facing front,left,right,left running, right running)
    this.load.image("ladybug", "assets/ladybug.png");

    // todo: add special items/keys to be found e.g. stars/special item

    // load a spritesheet
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
    });
}

// Creating Game Objects
// game objects are displayed in the order
// you create them (in a stack context)
// the Scenes display list is where all
// game objects live
function create ()
{
    // Create game objects and add them to the
    // current Scenes display list
    // syntax: this.add.image(xCoord, yCoord, key)
    this.add.image(400, 300, "deepBlueSky");
    this.add.image(400, 300, "lightBackground");
    this.add.image(150, 200, "cloud").setScale(.25);
    this.add.image(300, 100, "cloud").setScale(.3);
    this.add.image(580, 100, "cloud").setScale(.3);
    // Ladybug character (home screen position related)
    this.add.image(400, 427, "ladybug").setScale(.265);
    this.add.text(280, 200, "Bug Saves The World", { color: "#000", fontSize: "1.5rem" });
    this.add.image(430, 100, "blackStar").setScale(.3);
    this.add.image(200, 50, "blackStar").setScale(.3);
    this.add.image(200, 50, "goldStar").setScale(.5);
    this.add.image(100, 115, "blackStar").setScale(.3);
    this.add.image(100, 115, "goldStar").setScale(.5);
    this.add.image(430, 100, "goldStar").setScale(.5);

    // stacking a gold star onto a black star looks cool
    // gives it a more retro/game look

    // Platform game objects
    // Create a group of Static Bodies (e.g. they don't move and are unaffected by collisions)
    let platforms = this.physics.add.staticGroup();
    platforms.create(10, 530, "grassPlatform").setScale(1, .7).refreshBody();
    platforms.create(510, 530, "grassPlatform").setScale(1, .7).refreshBody();

    // handle jumping motion from platform to platform
}


class BugCharacter {
    constructor(username, color) {
        this.username = username;
        this.color = color;
        this.posX = 0;
        this.posY = 0;
    }
}
