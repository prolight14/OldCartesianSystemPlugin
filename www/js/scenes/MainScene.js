"use strict";

import Player from "../GameObjects/Player.js";

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
        cols: 24,
        rows: 30,
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

        this.setupWorldCameraFocus();
        this.setupCamera();
        this.setupScenes();

        // this.input.keyboard.on('keydown', (event) =>
        // {
        //     if(['-', '_'].indexOf(event.key) !== -1)
        //     {
        //         this.setCameraZoom(0.3);
        //     }
        //     else if(['=', '+'].indexOf(event.key) !== -1)
        //     {
        //         this.setCameraZoom(1.7);
        //     }
        //     else if(event.key === '0')
        //     {
        //         this.setCameraZoom(1.0);
        //     }
        // });
    }

    setupWorldCameraFocus ()
    {
        var world = this.csPlugin.world;

        this.player = world.add.gameObjectArray(Player).add(this, 200, 200, "player");

        world.cam.setFocus(this.player.x, this.player.y, "player");
        world.cam.update();
    }

    setupCamera ()
    {
        var cam = this.cameras.main;
        cam.startFollow(this.player);

        var world = this.csPlugin.world;

        var worldCamBounds = world.cam.getBounds();

        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );

        world.cam.defaultBounds = worldCamBounds;

        world.cam.defaultWindow = world.cam.getWindow();

        this.setCameraZoom(1);
    }

    setCameraZoom (zoom)
    {
        var world = this.csPlugin.world;
        var cam = this.cameras.main;

        // var worldCamBounds = this.csPlugin.world.cam.getBounds();

        // var boundsMinX = worldCamBounds.minX * zoom;
        // var boundsMinY = worldCamBounds.minY * zoom;
        // var boundsWidth = (worldCamBounds.maxX - worldCamBounds.minX) * zoom;
        // var boundsHeight = (worldCamBounds.maxY - worldCamBounds.minY) * zoom;

        // cam.setBounds(
        //     boundsMinX, 
        //     boundsMinY, 
        //     boundsWidth, 
        //     boundsHeight
        // );
        // this.csPlugin.world.cam.setBounds(  
        //     boundsMinX, 
        //     boundsMinY, 
        //     boundsMinX + boundsWidth,
        //     boundsMinY + boundsHeight
        // );

        cam.setZoom(zoom);

        var invertedZoom = 1 / zoom;
      
        var defaultWindow = world.cam.defaultWindow;
        
        var derivedCamWindowWidth = defaultWindow.width * invertedZoom;
        var derivedCamWindowHeight = defaultWindow.height * invertedZoom;
        this.csPlugin.world.cam.setWindow(
            defaultWindow.x - (derivedCamWindowWidth - defaultWindow.width) / 2, 
            defaultWindow.y - (derivedCamWindowHeight - defaultWindow.height) / 2, 
            derivedCamWindowWidth,
            derivedCamWindowHeight
        );

        this.csPlugin.world.cam.updateBoundingBox();
    }

    setupScenes ()
    {
        this.scene.run("UIDebug");
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