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
        cols: 20,
        rows: 40,
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
        super("main");
    }

    preload ()
    {
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
        this.csPlugin.setupWorld(worldConfig);
        var world = this.csPlugin.world;

        var cam = this.cameras.main;
    
        var worldCamBounds = world.cam.getBounds();
        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );

        this.player = world.add.gameObjectArray(Player).add(this, 200, 200, "player");

        world.cam.setFocus(this.player.x, this.player.y, "player");
        world.cam.update();

        cam.startFollow(this.player);
       
        this.scene.run("debug");
        this.scene.run("background"); 
        this.scene.sendToBack("background");
    }

    update ()
    {
        this.csPlugin.world.cam.updateFocus(this.player.x, this.player.y);

        this.csPlugin.updateCS();
    }   
}