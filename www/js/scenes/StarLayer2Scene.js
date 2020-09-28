import CameraShadow from "../GameObjects/CameraShadow.js";

export default class StarLayer2Scene extends Phaser.Scene
{
    constructor ()
    {
        super("starLayer2");
    }

    preload ()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    }

    create ()
    {
        this.starsPerCell = 7;
        this.starSize = 1;
        this.starScroll = 0.7;

        var dimensions = this.scene.get("main").worldDimensions;

        var gridConfig = {
            cols: Math.floor(dimensions.width / dimensions.cellWidth),
            rows: Math.floor(dimensions.height / dimensions.cellHeight),
            cell: {
                width: dimensions.cellWidth,
                height: dimensions.cellHeight
            }
        };

        this.csStars.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: gridConfig
        });

        this.createStars();

        //////////////////////////////////////////////

        let world = this.csStars.world;

        var player = this.scene.get("main").player;
        this.cameraShadow = new CameraShadow(this, 0, 0, this.starScroll);
        this.cameraShadow.setTarget(player);

        world.cam.setFocus(this.cameraShadow.x, this.cameraShadow.y, "cameraShadow");
        world.cam.update();

        this.cameras.main.startFollow(this.cameraShadow);
        this.cameras.main.setBounds(0, 0, gridConfig.cols * gridConfig.cell.width, gridConfig.rows * gridConfig.cell.height);
        this.lastMscZoom = this.scene.get("main").cameras.main.zoom;
    }

    update ()
    {
        let world = this.csStars.world;

        world.cam.updateFocus(this.cameraShadow.x, this.cameraShadow.y);
        world.cam.update();

        let mscZoom = this.scene.get("main").cameras.main.zoom;

        if(mscZoom !== this.lastMSCZoom)
        {
            this.cameras.main.setZoom(mscZoom);

            var _window = this.scene.get("main").csPlugin.world.cam.getWindow();

            world.cam.setWindow(_window.x, _window.y, _window.width, _window.height);
        }

        this.lastMSCZoom = mscZoom;

        //////////////////////////////////////////////

        this.renderStars();
    }

    createStars ()
    {   
        this.starLayer = this.add.graphics();

        let world = this.csStars.world;

        let rng = new Phaser.Math.RandomDataGenerator(["starLayer2"]);

        world.grid.loopThroughAllCells((cell, col, row) =>
        {
            Object.defineProperty(cell, "ss", 
            {
                configurable: true,
                enumerable: false,
                writable: true,
                value: rng.integer()
            });
        });
    }

    renderStars ()
    {
        this.starLayer.clear();
        this.starLayer.fillStyle(0xFFFFFF);

        let world = this.csStars.world;

        let rng, i, x, y;

        let { cellWidth, cellHeight } = world.grid.getDimensions();

        world.grid.loopThroughVisibleCells((cell, col, row) =>
        {
            rng = new Phaser.Math.RandomDataGenerator([cell.ss]);

            x = col * cellWidth;
            y = row * cellHeight;

            for(i = 0; i < this.starsPerCell; i++)
            {
                this.starLayer.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), this.starSize, this.starSize);
            }
        });
    }
}