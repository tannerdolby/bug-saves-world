class MenuScene extends Phaser.Scene {
    constructor() {
        super("gameMenu");
    }

    preload() {
        this.load.image("deepBlueSky", "assets/sky-deep-blue.png");
        this.load.image("darkScreen", "assets/dark-screen.png");
        this.load.image("lightSky", "assets/yellow-bg.png");
        this.load.image("cloud", "assets/tacky-cloud.png");
        this.load.image("blackStar", "assets/black-stars.png");
        this.load.image("goldStar", "assets/gold-star.png");
        this.load.image("grassPlatform", "assets/platform-grass-min.png");
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        const cssGameText = {
            font: "18px Arial, sans-serif",
            color: "#fff"
        };

        this.add.image(400, 300, "lightSky");

        this.add.image(150, 200, "cloud").setScale(.25);
        this.add.image(300, 100, "cloud").setScale(.3);
        this.add.image(580, 70, "cloud").setScale(.3);
        this.add.image(880, 120, "cloud").setScale(.3);

        this.add.image(430, 100, "blackStar").setScale(.3);
        this.add.image(430, 100, "goldStar").setScale(.5);
        this.add.image(200, 50, "blackStar").setScale(.3);
        this.add.image(200, 50, "goldStar").setScale(.5);
        this.add.image(100, 115, "blackStar").setScale(.3);
        this.add.image(100, 115, "goldStar").setScale(.5);
        this.add.image(825, 115, "blackStar").setScale(.3);
        this.add.image(825, 115, "goldStar").setScale(.5);

        let container = this.add.rectangle(screenCenterX, screenCenterY, 400, 400, 0x000000);
        container.setStrokeStyle(4, 0xffffff);

        this.add.text(400, 220, "[R] Restart ", cssGameText);
        this.add.text(390, 250, "[B] Back", cssGameText);
        this.add.text(390, 280, "[N] Next", cssGameText);
        this.add.text(390, 310, "[Q] Quit", cssGameText);

        const hypenLine = "------------------------------------------";
        this.add.text(390, 150, `Game Menu - Bug Saves World\n${hypenLine}`, {
            font: "21px Arial, sans-serif",
            color: "#fff"
        });

        let platforms = this.physics.add.staticGroup();
        platforms.create(0, 630, "grassPlatform").setScale(.4, .25).refreshBody();
        platforms.create(532, 630, "grassPlatform").setScale(.4, .25).refreshBody();
        platforms.create(830, 630, "grassPlatform").setScale(.4, .25).refreshBody();

    }
}