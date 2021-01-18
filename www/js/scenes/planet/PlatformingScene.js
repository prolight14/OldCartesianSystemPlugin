import Player from "../../GameObjects/planet/Player.js";

export default class PlatformingScene extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: "platforming",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 1000 }
                }
            }
        });
    }

    preload ()
    {
        this.load.image("tiles", "./assets/levels/IcyTileset-extruded.png");
        this.load.image("spike", "./assets/levels/spike.png");
        this.load.tilemapTiledJSON("level1", "./assets/levels/level1.json");

        this.load.image("player", "./assets/levels/playerBlank.png");
    }

    create ()
    {
        this.isPlayerDead = false;
        
        const background = this.add.graphics();

        background.fillStyle(0x00E9FF, 1);
        background.fillRect(0, 0, this.game.config.width, this.game.config.height);
        background.setScrollFactor(0);

        const tilemap = this.make.tilemap({ key: "level1" });
        const tileset = tilemap.addTilesetImage("IcyTileset-extruded", "tiles");
        const levelLayer = this.levelLayer = tilemap.createDynamicLayer("Level", tileset, 0, 0);

        this.spikeGroup = this.physics.add.staticGroup();

        levelLayer.forEachTile(tile =>
        {
            if(tile.index === 7)
            {
                const cx = tile.getCenterX();
                const cy = tile.getCenterY();
                const spike = this.spikeGroup.create(cx, cy, "spike");

                spike.body.setSize(16, 6).setOffset(0, 10);

                levelLayer.removeTileAt(tile.x, tile.y);
            }
        });

        this.input.keyboard.addListener("keydown", (event) =>
        {
            if(event.key === " ")
            {
                this.gotoSpace();
            }
        });

        this.player = new Player(this, 0, 0, "player");

        levelLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player, levelLayer);

        const camera = this.cameras.main;

        camera.startFollow(this.player);
        camera.setZoom(2.0, 2.0);
        camera.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    }

    gotoSpace ()
    {
        this.scene.stop("platforming");
        this.scene.run("main");
    }

    update ()
    {
        if(this.isPlayerDead)
        {
            return;
        }

        if(this.player.y > this.levelLayer.height || this.physics.world.overlap(this.player, this.spikeGroup))
        {
            this.isPlayerDead = true;
            this.scene.restart();
        }
    }
}