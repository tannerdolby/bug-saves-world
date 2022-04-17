// Game Levels Scene
class SceneTwo extends Phaser.Scene {

    constructor() {
        super("playGame");
    }

    init() {
        this.sys.settings.data.level = this.sys.settings.data.level || 1;
        this.sys.settings.data.starsCollected = 0;
        this.sys.settings.data.isBugBurned = false;
    }

    preload() {

        this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
        this.load.image("lightSky", "assets/yellow-bg.png");
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

        // TODO: get .ogg files for `song.src` to have audio in Firefox
        songs.forEach(song => {
            this.load.audio(song.id, song.src);
        });

    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Play game audio
        // Note: the .mp3 files converted from YouTube play
        // way louder so I restrict the volume to .4
        music = this.sound.add(songs[1].id, { volume: 0.4 });

        // todo: add audio controls
        // In chrome, autoplay is blocked and play() will begin after a user gesture
        // get a button to trigger music to play using click event
        // playBtn.addEventListener("click", () => {
        //     music.play();
        // });

        music.play();

        // Input events
        // Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right, and also Space Bar and shift.
        // An object containing the properties: up, down, left, right, space and shift.
        cursors = this.input.keyboard.createCursorKeys();
        movementKeys = this.input.keyboard.addKeys({
            up: 'W',
            left: 'A',
            down: 'S',
            right: 'D'
        });

        // INPUT EVENTS
        // View the menu of "game items"
        this.input.keyboard.once(
            "keydown-M",
            function() {
                this.scene.start("gameMenu");
            },
            this
        );

        // next level
        this.input.keyboard.once(
            "keydown-N",
            function() {
                this.scene.restart({ level: 1 + this.sys.settings.data.level, isBugBurned: false, starsCollected: 0 });
            },
            this
        );

        // restart level
        this.input.keyboard.once(
            "keydown-R",
            function() {
                this.scene.restart({ 
                    level: this.sys.settings.data.level,
                    isBugBurned: false,
                    starsCollected: 0
                });
            },
            this
        );

        // go back to previous level
        this.input.keyboard.once(
            "keydown-B",
            function() {
                this.scene.restart({ level: this.sys.settings.data.level - 1, isBugBurned: false, starsCollected: 0 });
            },
            this
        ); 

        // quit / reboot
        this.input.keyboard.once(
            "keydown-Q",
            function() {
                this.scene.start("bootGame");
            },
            this
        )

        const LADYBUG_SPRITE_FRAMERATE = 5;
        const MONSTER_SPRITE_FRAMERATE = 5;

        // todo: update backgrounds/platforms/stars for each new level
        if (this.sys.settings.data.level == 1) {
            this.add.image(400, 300, "lightSky");
        } else if (this.sys.settings.data.level == 2) {
            this.add.image(400, 300, "deepBlueSky");
        } else {
            this.add.image(400, 300, "lightSky");
        }

        // Platform game objects
        // Create a "Static Physics Group" e.g. a group of Static Bodies 
        platforms = this.physics.add.staticGroup();

        // ground
        platforms.create(0, 630, "grassPlatform").setScale(.4, .25).refreshBody();
        platforms.create(532, 630, "grassPlatform").setScale(.4, .25).refreshBody();
        platforms.create(830, 630, "grassPlatform").setScale(.4, .25).refreshBody();
        
        // jumpable platforms
        // bottom center left platform
        platforms.create(50, 370, "grassPlatform").setScale(.125, .1).refreshBody();
        platforms.create(425, 450, "grassPlatform").setScale(.125, .1).refreshBody();
        platforms.create(950, 450, "grassPlatform").setScale(.1, .06).refreshBody();

        // square
        platforms.create(900, 220, "grassCube").setScale(.1, .09).refreshBody();
        platforms.create(620, 510, "grassCube").setScale(.1, .09).refreshBody();
        platforms.create(240, 400, "grassCube").setScale(.1, .09).refreshBody();
        platforms.create(275, 280, "grassCube").setScale(.1, .09).refreshBody();
        platforms.create(640, 385, "grassCube").setScale(.1, .09).refreshBody();
        platforms.create(760, 330, "grassCube").setScale(.1, .09).refreshBody();
        
        // top center right
        platforms.create(520, 250, "grassPlatform").setScale(.2, .1).refreshBody();
        platforms.create(900, 250, "grassPlatform").setScale(.2, .1).refreshBody();
        platforms.create(1100, 135, "grassPlatform").setScale(.2, .1).refreshBody();
        platforms.create(0, 200, "grassPlatform").setScale(.2, .1).refreshBody();

        // static group for a deadly flames
        let flamePlatform = this.physics.add.staticGroup();
        flamePlatform.create(200, 563, "flame").setScale(.065).refreshBody();
        flamePlatform.create(780, 563, "flame").setScale(.065).refreshBody();
        flamePlatform.create(525, 216, "flame").setScale(.065).refreshBody();

        // game related text
        const cssGameText = {
            font: "18px Arial, sans-serif",
            color: "#000"
        };

        // Game info text
        currentLevel = this.add.text(6, 6, `Level ${level}: ${levels[this.sys.settings.data.level-1]}`, cssGameText);
        starCount = this.add.text(990, 6, `Stars: 0`, cssGameText);
        winText = this.add.text(300, 50, "", { color: "#000", fontSize: "20px"});
        burnedText = this.add.text(450, 100, "", { color: "red" });
        // timeElapsed = this.add.text(0, 25, this.time.now * 0.01, cssGameText);
        this.add.text(6, 40, "[M] - Menu", {
            font: "16px Arial, sans-serif",
            color: "#000"
        });

        // Bug Smasher Game Object
        monster = this.physics.add.sprite(900, 500, "monster");

        monster.body.setGravityY(400);
        monster.setBounce(0.15);
        monster.setScale(.95);
        monster.setCollideWorldBounds(true);

        // todo: hash out a path for monsters to follow
        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('monster', { start: 1, end: 2 }),
        //     frameRate: MONSTER_SPRITE_FRAMERATE,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'monster', frame: 0 } ],
        //     frameRate: MONSTER_SPRITE_FRAMERATE * 4
        // });

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('monster', { start: 3, end: 4 }),
        //     frameRate: MONSTER_SPRITE_FRAMERATE,
        //     repeat: -1
        // });

        // Player "Bug" Game Object
        player = this.physics.add.sprite(0, 400, "bug");

        player.body.setGravityY(425);
        player.setBounce(0.15);
        player.setScale(1.3);
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
            frameRate: LADYBUG_SPRITE_FRAMERATE
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('bug', { start: 3, end: 4 }),
            frameRate: LADYBUG_SPRITE_FRAMERATE,
            repeat: -1
        });

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 0, y: 0, stepX: 200 }
        });

        // Randomly displace stars across the map
        // todo: preset position and number of stars for each level
        stars.children.iterate(function (child) {
            child.setX(Phaser.Math.Between(0, 950));
            child.setY(Phaser.Math.Between(0, 550));
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Handle Collisions
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(monster, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars, flamePlatform);
        this.physics.add.collider(player, monster);

        // this.physics.add.collider(player, stars); this is fun for hockey / pushing object game

        // bug collects a star
        this.physics.add.overlap(player, stars, collectStar, null, this);
        // bug walks into flames
        this.physics.add.overlap(player, flamePlatform, touchFire, null, this);
        // todo: bug smash
        this.physics.add.overlap(player, monster, smashBug, null, this);

    }

    update() {
        if (gameOver) {
            return;
        }

        // Hotkey movements
        if (cursors.left.isDown || movementKeys.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown || movementKeys.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else if ((cursors.space.isDown || cursors.up.isDown || movementKeys.up.isDown) && player.body.touching.down) {
            player.setVelocityY(-350);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        currentLevel.setText(`Level ${this.sys.settings.data.level}: ${levels[this.sys.settings.data.level-1]}`);
    }
}