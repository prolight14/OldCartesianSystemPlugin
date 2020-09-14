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
        cols: 5,
        rows: 10,
        cell: {
            height: 270,
            width: 270
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

        world.grid.loopThroughAllCells(function(cell, col, row)
        {
            Object.defineProperty(cell, "starSeed",  
            {
                enumerable: false,
                writable: true,
                configurable: true,
                value: Math.random()
            });
        });
    
        cam = this.cameras.main;

        var worldCamBounds = world.cam.getBounds();
        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );
    
        var worldBounds = world.grid.getBounds();
        this.physics.world.setBounds(
            worldBounds.minX, 
            worldBounds.minY, 
            worldBounds.maxX - worldBounds.minX, 
            worldBounds.maxY - worldBounds.minY
        );

        var aa_players = world.add.gameObjectArray(Player);
    
        player = aa_players.add(this, 200, 200, "player");

        cam.startFollow(player);

        world.cam.setFocus(player.x, player.y, "player");
        world.cam.update();
        //////////////////////////////////////////////////////
    
        var aa_wanderers = world.add.gameObjectArray(Wanderer);
    
        var wanderersGroup = this.add.group({
            active: true,
            classType: Wanderer
        });
    
        for(var i = 0; i < 690 / 6; i++)
        {
            var wanderer = aa_wanderers.add(
                this, 
                Math.random() * (worldBounds.maxX - worldBounds.minX), 
                Math.random() * (worldBounds.maxY - worldBounds.minY), 
                "wanderer"
            );
            wanderersGroup.add(wanderer);
        }

        this.player = player;
       
        this.scene.run("debug");
        // this.scene.run("background");
        
        // this.scene.get("background").sendToBack();
    }

    update ()
    {
        let { player } = this;

        var world = this.csPlugin.world;
        world.cam.updateFocus(player.x, player.y);

        this.csPlugin.updateCS();

        this.starsLayer1();
    }

    starsLayer1 ()
    {
        var world = this.csPlugin.world;

        // var starGraphics = this.scene.get("background").starGraphics;

        // starGraphics.clear();
        // starGraphics.fillStyle(0xFFFFFF, 1);

        // var dimensions = world.grid.getDimensions();
        // var cellWidth = dimensions.cellWidth;
        // var cellHeight = dimensions.cellHeight;

        // world.grid.loopThroughVisibleCells(function(cell, col, row)
        // {
        //     var rng = new Phaser.Math.RandomDataGenerator("seed");

        //     for(let i = 0; i < 120; i++)
        //     {
        //         starGraphics.fillRect(
        //             Math.floor(col * cellWidth + cellWidth * rng.frac()), 
        //             Math.floor(row * cellHeight + cellHeight * rng.frac()),
        //             1, 
        //             1
        //         );
        //     }
        // });
    }   
}