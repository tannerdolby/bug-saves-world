// Loading screen Scene
class SceneOne extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        // load image assets
        this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
        this.load.image("lightBackground", "assets/yellow-bg.png");
        this.load.image("cloud", "assets/tacky-cloud.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("blackStar", "assets/black-stars.png");
        this.load.image("goldStar", "assets/gold-star.png");
        this.load.image("grassPlatform", "assets/platform-grass-min.png");
        this.load.image("grassCube", "assets/grass-cube.png");
        this.load.image("ladybug", "assets/ladybug-min.png");
        // Fire Pixel asset created by Joker I: https://www.pinterest.com/pin/704039354236421814/
        this.load.image("flame", "assets/fire-pixel-art.png");
        this.load.image("star", "assets/star.png");
        this.load.image("darkScreen", "assets/dark-screen.png");

        // load ladybug spritesheet (frames created in vectornator)
        this.load.spritesheet("bug", "assets/spritesheet-three.png", {
            frameWidth: 52,
            frameHeight: 31
        });

        // Bug Smasher hostile monsters
        this.load.spritesheet("monster", "assets/monster-spritesheet.png", {
            frameWidth: 102,
            frameHeight: 100
        });
    }

    create() {

        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        // Loading Screen
        this.add.text(sceneWidth / 2.4, sceneHeight / 2.1, "Loading...", {
            color: "#fff",
            fontSize: "2rem",
            fontFamily: "fantasy",
        });

        // Render loading screen after 2s
        setTimeout(() => {

            this.add.image(400, 300, "lightBackground");

            this.add.image(150, 200, "cloud").setScale(.25);
            this.add.image(300, 100, "cloud").setScale(.3);
            this.add.image(580, 100, "cloud").setScale(.3);
            this.add.image(880, 120, "cloud").setScale(.3);

            this.add.text(340, 210, "Bug Saves The World", { 
                color: "#222",
                fontSize: "2.1rem",
            });

            this.add.image(430, 100, "blackStar").setScale(.3);
            this.add.image(430, 100, "goldStar").setScale(.5);
            this.add.image(200, 50, "blackStar").setScale(.3);
            this.add.image(200, 50, "goldStar").setScale(.5);
            this.add.image(100, 115, "blackStar").setScale(.3);
            this.add.image(100, 115, "goldStar").setScale(.5);
            this.add.image(725, 115, "blackStar").setScale(.3);
            this.add.image(725, 115, "goldStar").setScale(.5);
            
            this.add.image(490, 495, "ladybug").setScale(.21);

            // Platform game objects
            // Create a "Static Physics Group" e.g. a group of Static Bodies 
            platforms = this.physics.add.staticGroup();

            platforms.create(0, 605, "grassPlatform").setScale(.4, .25).refreshBody();
            platforms.create(532, 605, "grassPlatform").setScale(.4, .25).refreshBody();
            platforms.create(830, 605, "grassPlatform").setScale(.4, .25).refreshBody();

            this.add.text(sceneWidth / 2.4, 305, "Hit Enter to play!", {
                color: "#000",
                fontSize: "1.2rem",
                fontFamily: "fantasy",
            });

            this.input.keyboard.once(
                "keydown-ENTER",
                function() {
                    // go to "playGame" scene and begin level 1
                    this.scene.start("playGame");
                },
                this
            );

        }, 2000);
        
    }
}