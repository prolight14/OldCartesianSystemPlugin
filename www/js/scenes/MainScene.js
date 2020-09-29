"use strict";

import Player from "../GameObjects/Player.js";

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
        this.load.image("playerShip", "./assets/playerShip.png");
        this.load.image("wanderer", "./assets/wanderer.png");
    }

    create ()
    {
        this.worldDimensions = {
            width: 138000,
            height: 138000,
            cellWidth: 260,
            cellHeight: 260
        };

        this.csPlugin.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: {
                cols: Math.floor(this.worldDimensions.width / this.worldDimensions.cellWidth),
                rows: Math.floor(this.worldDimensions.height / this.worldDimensions.cellHeight),
                cell: {
                    width: this.worldDimensions.cellWidth,
                    height: this.worldDimensions.cellHeight
                }
            },
        });

        this.setupWorldCameraFocus();
        this.setupCamera();
        this.setupScenes();

        this.cameraKeys = {
            '-': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
            '_': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UNDERSCORE),
            '=': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EQUALS),
            '+': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
            '0': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
            'left': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            'right': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };

        // Mainly used for when the player presses both the keys at once to "reset" the camera 
        // so that when they let go they don't accidentally move the camera
        this.canRotateCamera = true;
        // Same goes for this one
        this.canZoomUsingUpOrDown = true;
    }

    runCameraControls ()
    {
        var cam = this.cameras.main;

        if(this.canZoomUsingUpOrDown && this.cameraKeys['down'].isDown || this.cameraKeys['-'].isDown || this.cameraKeys['_'].isDown)
        {
            this.setCameraZoom(Math.max(cam.zoom - 0.01, 0.25));
        }

        if(this.canZoomUsingUpOrDown && this.cameraKeys['up'].isDown || this.cameraKeys['='].isDown || this.cameraKeys['+'].isDown)
        {
            this.setCameraZoom(Math.min(cam.zoom + 0.01, 1.75));     
        }

        if(this.cameraKeys['down'].isDown && this.cameraKeys['up'].isDown)
        {
            this.setCameraZoom(1);   

            this.canZoomUsingUpOrDown = false;

            this.time.delayedCall(500, () =>
            {
                this.canZoomUsingUpOrDown = true;
            });
        }

        if(this.cameraKeys['0'].isDown)
        {
            this.setCameraZoom(1);
        }

        if(this.canRotateCamera)
        {
            if(this.cameraKeys['left'].isDown)
            {
                this.cameras.main.setRotation(this.cameras.main.rotation - Math.PI * 0.01);
            }
            if(this.cameraKeys['right'].isDown)
            {
                this.cameras.main.setRotation(this.cameras.main.rotation + Math.PI * 0.01);
            }
        }

        if(this.cameraKeys['left'].isDown && this.cameraKeys['right'].isDown)
        {
            this.cameras.main.setRotation(0);

            this.canRotateCamera = false;

            this.time.delayedCall(500, () =>
            {
                this.canRotateCamera = true;
            }); 
        }
    }

    setupWorldCameraFocus ()
    {
        var world = this.csPlugin.world;

        this.player = world.add.gameObjectArray(Player).add(this, this.worldDimensions.width * 0.5, this.worldDimensions.height * 0.5, "playerShip");

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

        // Scene that follow the camera:
        this.scene.run("debug");
        this.scene.run("starLayer");
        this.scene.sendToBack("starLayer");
        this.scene.run("starLayer2");
        this.scene.sendToBack("starLayer2");
    }

    update ()
    {
        this.csPlugin.world.cam.updateFocus(this.player.x, this.player.y);

        this.csPlugin.updateCS();

        this.runCameraControls();
    }   
}