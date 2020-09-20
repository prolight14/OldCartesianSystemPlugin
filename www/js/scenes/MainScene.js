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

        var cam = this.cameras.main;

        this.input.keyboard.on('keyup', (event) =>
        {
            let step = 0.03;

            if(['-', '_'].indexOf(event.key) !== -1)
            {
                this.setCameraZoom(Math.max(cam.zoom - step, 0.25));
            }
            else if(['=', '+'].indexOf(event.key) !== -1)
            {
                this.setCameraZoom(Math.min(cam.zoom + step, 1.75));
            }
            else if(event.key === '0')
            {
                this.setCameraZoom(1.0);
            }
        });

        this.arrowKeys = this.input.keyboard.createCursorKeys();
    }

    cameraRotationControls ()
    {
        var cam = this.cameras.main;

        if(this.arrowKeys.left.isDown)
        {
            cam.setRotation(cam.rotation + Math.PI * 0.02);
        }
        if(this.arrowKeys.right.isDown)
        {
            cam.setRotation(cam.rotation - Math.PI * 0.02);
        }
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
        world.cam.defaultWindow = world.cam.getWindow();

        this.setCameraZoom(1);
    }

    setCameraZoom (zoom)
    {
        var world = this.csPlugin.world;
        var cam = this.cameras.main;

        cam.setZoom(zoom);

        var defaultWindow = world.cam.defaultWindow;
        
        var derivedCamWindowWidth = defaultWindow.width / zoom;
        var derivedCamWindowHeight = defaultWindow.height / zoom;
        this.csPlugin.world.cam.setWindow(
            defaultWindow.x - (derivedCamWindowWidth - defaultWindow.width) / 2, 
            defaultWindow.y - (derivedCamWindowHeight - defaultWindow.height) / 2, 
            derivedCamWindowWidth,
            derivedCamWindowHeight
        );
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

        this.cameraRotationControls();
    }   
}