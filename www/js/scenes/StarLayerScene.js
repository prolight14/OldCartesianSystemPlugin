// Todo?: Make this a class I can instantiate for multiple star layers
// If I can just purely works with out running into any problems then I can get A LOT done.

export default class StarLayerScene extends Phaser.Scene 
{
    constructor ()
    {
        super("starLayer");
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
        this.starsPerCell = 5;
        this.starSize = 2;

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
        let mainScene = this.scene.get("main");

        var cameraFocus = mainScene.cameraFocus;
        world.cam.setFocus(cameraFocus.x, cameraFocus.y, "cameraFocus");
        world.cam.update();

        this.cameras.main.startFollow(cameraFocus);
        this.cameras.main.setBounds(0, 0, gridConfig.cols * gridConfig.cell.width, gridConfig.rows * gridConfig.cell.height);
        this.lastMscZoom = mainScene.cameras.main.zoom;
    }

    update ()
    {
        let world = this.csStars.world;
        let mainScene = this.scene.get("main");

        var cameraFocus = mainScene.cameraFocus;
        world.cam.updateFocus(cameraFocus.x, cameraFocus.y);
        world.cam.update();

        let mscZoom = mainScene.cameras.main.zoom;

        if(mscZoom !== this.lastMSCZoom)
        {
            this.cameras.main.setZoom(mscZoom);

            var _window = mainScene.csPlugin.world.cam.getWindow();

            world.cam.setWindow(_window.x, _window.y, _window.width, _window.height);
        }

        this.lastMSCZoom = mscZoom;

        this.cameras.main.setRotation(mainScene.cameras.main.rotation);

        //////////////////////////////////////////////

        this.renderStars();
    }

    createStars ()
    {   
        this.starLayer = this.add.graphics();

        let world = this.csStars.world;

        let rng = new Phaser.Math.RandomDataGenerator(["starLayer1"]);

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