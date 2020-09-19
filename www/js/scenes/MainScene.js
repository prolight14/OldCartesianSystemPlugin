// Note to self: Do not use Arcade Physics, either use MatterJs physics or no physics at all.

import Player from "../GameObjects/Player.js";
import Wanderer from "../GameObjects/Wanderer.js";

var worldConfig = {
    camera: {
        window: {
            x: 0,
            y: 0,
            width: 800,
            height: 480 
        }
    },
    grid: {
        cols: 50,
        rows: 100,
        cell: {
            height: 260,
            width: 260
        }
    },
};

export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super({
            key: "main",
        });
    }

    preload ()
    {
        // This is commented out because I'm make this plugin global so I can debug it and figure 
        // out what is wrong with it then I will come back to here and make it only for this scene
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csPlugin'
        });
    
        this.load.image("player", "./assets/player.png");
        this.load.image("wanderer", "./assets/wanderer.png");
    }

    create ()
    {
        let player, cam;

        this.csPlugin.setupWorld(worldConfig);
        var world = this.csPlugin.world;

        this.prepareStarsLayer1();

        cam = this.cameras.main;

        var worldCamBounds = world.cam.getBounds();
        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );
    
        var worldBounds = world.grid.getBounds();
        // this.physics.world.setBounds(
        //     worldBounds.minX, 
        //     worldBounds.minY, 
        //     worldBounds.maxX - worldBounds.minX, 
        //     worldBounds.maxY - worldBounds.minY
        // );

        var aa_players = world.add.gameObjectArray(Player);
    
        player = aa_players.add(this, 200, 200, "player");

        cam.startFollow(player);

        world.cam.setFocus(player.x, player.y, "player");
        world.cam.update();
        //////////////////////////////////////////////////////
    
        // var aa_wanderers = world.add.gameObjectArray(Wanderer);
    
        // var wanderersGroup = this.add.group({
        //     active: true,
        //     classType: Wanderer
        // });
    
        // for(var i = 0; i < 23000; i++)
        // {
        //     var wanderer = aa_wanderers.add(
        //         this, 
        //         Math.random() * (worldBounds.maxX - worldBounds.minX), 
        //         Math.random() * (worldBounds.maxY - worldBounds.minY), 
        //         "wanderer"
        //     );
        //     wanderer.worldBounds = worldBounds;
        //     wanderersGroup.add(wanderer);
        // }

        this.player = player;
       
        this.scene.run("debug");

        this.scene.run("background");
        this.scene.get("background").scene.sendToBack();
    }

    update ()
    {
        let { player } = this;

        var world = this.csPlugin.world;
        world.cam.updateFocus(player.x, player.y);

        this.csPlugin.updateCS();

        this.starsLayer1();
    }

    prepareStarsLayer1 ()
    {
        var world = this.csPlugin.world;
        var rng = new Phaser.Math.RandomDataGenerator(["space1"]);

        world.grid.loopThroughAllCells(function(cell, col, row)
        {
            Object.defineProperty(cell, "ss",  
            {
                enumerable: false,
                writable: true,
                configurable: true,
                value: rng.between(0, 9999999)
            });
        });
    }

    starsLayer1 ()
    {
        var world = this.csPlugin.world;

        var starGraphics = this.scene.get("background").starGraphics;

        starGraphics.clear();
        starGraphics.fillStyle(0xFFFFFF, 1);

        var dimensions = world.grid.getDimensions();
        var cellWidth = dimensions.cellWidth;
        var cellHeight = dimensions.cellHeight;

        var x, y, i;
        var RDG = Phaser.Math.RandomDataGenerator;

        world.grid.loopThroughVisibleCells((cell, col, row) =>
        {
            var rng = new RDG([cell.ss]);

            x = col * cellWidth;
            y = row * cellWidth;

            for(i = 0; i < 120; i++)
            {
                starGraphics.fillRect(
                    x + rng.between(0, cellWidth),
                    y + rng.between(0, cellHeight),
                    1,
                    1
                );
            }
        });
    }   
}