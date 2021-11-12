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
                y: 100,
                debug: false
            }
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
    this.load.image("grassPlatform", "assets/grass-platforms.png");
    
    // todo: make ladybug a spritesheet 
    // positions: (facing front,left,right,left running,right running)
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
function create()
{
    // Create game objects and add them to the
    // current Scenes display list
    // syntax: this.add.image(xCoord, yCoord, key)
    this.add.image(400, 300, "deepBlueSky");
    this.add.image(400, 300, "lightBackground");

    // Loading Screen #1 - Light background with clouds and stars
    // this.add.image(150, 200, "cloud").setScale(.25);
    // this.add.image(300, 100, "cloud").setScale(.3);
    // this.add.image(580, 100, "cloud").setScale(.3);
    // this.add.text(280, 200, "Bug Saves The World", { color: "#000", fontSize: "1.5rem" });
    // this.add.image(430, 100, "blackStar").setScale(.3);
    // this.add.image(200, 50, "blackStar").setScale(.3);
    // this.add.image(200, 50, "goldStar").setScale(.5);
    // this.add.image(100, 115, "blackStar").setScale(.3);
    // this.add.image(100, 115, "goldStar").setScale(.5);
    // this.add.image(430, 100, "goldStar").setScale(.5);

    // Ladybug character (home screen position related)
    // this.add.image(400, 473, "ladybug").setScale(.265);
    this.add.image(400, 491, "ladybug").setScale(.25);

    // Platform game objects
    // Create a "Static Physics Group" e.g. a group of Static Bodies 
    let platforms = this.physics.add.staticGroup();

    // ground
    platforms.create(10, 605, "grassPlatform").setScale(1, .7).refreshBody();
    platforms.create(510, 605, "grassPlatform").setScale(1, .7).refreshBody();
    
    // jumpable platforms
    platforms.create(0, 380, "grassPlatform").setScale(.5, .25).refreshBody();
    platforms.create(400, 200, "grassPlatform").setScale(.5, .2).refreshBody();
    platforms.create(650, 200, "grassPlatform").setScale(.5, .2).refreshBody();

    // Player Game Object
    player = this.physics.add.sprite(170, 20, "dude");
    player.body.setGravityY(300);
    player.setBounce(0.2);
    // player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // magic :)
    this.physics.add.collider(player, platforms);
}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
