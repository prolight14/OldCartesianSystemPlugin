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

        const TILESET = {
            NO_TILE: 0,
            BRICK: 1,
            RIGHT_BRICK: 2,
            LEFT_BRICK: 3,
            TOP_BRICK: 4,
            TOP_LEFT_BRICK: 5,
            TOP_RIGHT_BRICK: 6,
            UNCONNECTED_BRICK: 7,
            UP_BRICK: 8,
            SPIKES: 9
        };

        levelLayer.forEachTile(tile =>
        {
            if(tile.index === TILESET.SPIKES)
            {
                const cx = tile.getCenterX();
                const cy = tile.getCenterY();
                const spike = this.spikeGroup.create(cx, cy, "spike");

                spike.body.setSize(16, 6).setOffset(0, 10);

                levelLayer.removeTileAt(tile.x, tile.y);
            }
        });

        var maxTileX = levelLayer.width / tileset.tileWidth; 
        var maxTileY = levelLayer.height / tileset.tileHeight; 

        var notBrick = function(tile)
        {
            return !tile || tile.index !== TILESET.BRICK && 
                            tile.index !== TILESET.RIGHT_BRICK &&
                            tile.index !== TILESET.LEFT_BRICK && 
                            tile.index !== TILESET.TOP_BRICK &&
                            tile.index !== TILESET.TOP_LEFT_BRICK &&
                            tile.index !== TILESET.TOP_RIGHT_BRICK && 
                            tile.index !== TILESET.UNCONNECTED_BRICK;
        };
 
        for(var x = 0; x < maxTileX; x++)
        {
            for(var y = 0; y < maxTileY; y++)
            {
                var curTile = levelLayer.getTileAt(x, y);

                if(!curTile || curTile.index !== 1)
                {
                    continue;
                }

                var leftTile = levelLayer.getTileAt(x - 1, y);
                var rightTile = levelLayer.getTileAt(x + 1, y);
                var upTile = levelLayer.getTileAt(x, y - 1);
                var downTile = levelLayer.getTileAt(x, y + 1);

                if(notBrick(upTile))
                {
                    levelLayer.putTileAt(TILESET.TOP_BRICK, x, y);
                }

                if(notBrick(leftTile) && !notBrick(rightTile))
                {
                    if(!notBrick(upTile))
                    {
                        levelLayer.putTileAt(TILESET.LEFT_BRICK, x, y);
                    }
                    else
                    {
                        levelLayer.putTileAt(TILESET.TOP_LEFT_BRICK, x, y);
                    }
                }

                if(!notBrick(leftTile) && notBrick(rightTile))
                {
                    if(!notBrick(upTile))
                    {
                        levelLayer.putTileAt(TILESET.RIGHT_BRICK, x, y);
                    }
                    else
                    {
                        levelLayer.putTileAt(TILESET.TOP_RIGHT_BRICK, x, y);
                    }
                }

                if(notBrick(upTile) && notBrick(leftTile) && notBrick(rightTile) && notBrick(downTile))
                {
                    levelLayer.putTileAt(TILESET.UNCONNECTED_BRICK, x, y);
                }

                if(notBrick(leftTile) && notBrick(rightTile))
                {
                    if(notBrick(downTile))
                    {
                        levelLayer.putTileAt(TILESET.UNCONNECTED_BRICK, x, y);
                    }
                    else
                    {
                        levelLayer.putTileAt(TILESET.UP_BRICK, x, y);
                    }
                }
            }
        }

        this.input.keyboard.addListener("keydown", (event) =>
        {
            if(event.key === " ")
            {
                this.gotoSpace();
            }
        });

        var playerSpawnPoint = tilemap.findObject("Objects", obj => obj.properties[0].value === "Player Spawn Point");

        this.player = new Player(this, playerSpawnPoint.x, playerSpawnPoint.y, "player");

        levelLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player, levelLayer);

        const camera = this.cameras.main;

        camera.startFollow(this.player);
        camera.setZoom(2.0, 2.0);
        camera.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);

        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels, true, true, true, false);

    }

    gotoSpace ()
    {
        this.scene.stop();
        this.scene.get("main").playerShip.y += 600;
        this.scene.get("main").playerShip.body.postUpdate();
        this.scene.run("main");
        this.scene.get("main").setupScenes();
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