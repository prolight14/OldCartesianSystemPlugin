export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super("background");
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
        this.csStars.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: {
                cols: 24,
                rows: 30,
                cell: {
                    height: 300,
                    width: 300
                }
            },
        });

        this.updateWorldCamera();

        // this.starLayer1 = this.add.graphics();
        this.starLayer2 = this.add.graphics();

        this.prepareStarSeeds();
    }

    updateWorldCamera ()
    {
        var starWorld = this.csStars.world;
        var camFocus = this.scene.get("main").csPlugin.world.cam.getFocus();
        starWorld.cam.setFocus(camFocus.x * 0.7, camFocus.y * 0.7, "otherCamera");
        starWorld.cam.update();
    }

    update ()
    {
        var starWorld = this.csStars.world;
        var mainSceneCam = this.scene.get("main").cameras.main;
        var cam = this.cameras.main;
        // cam.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
        cam.setZoom(mainSceneCam.zoom);

        this.updateWorldCamera();

        var scroll = starWorld.cam.getScroll();
        cam.setScroll(
            scroll.x - (starWorld.cam.getWindowWidth() * 0.5 + starWorld.cam.getWindowX()), 
            scroll.y - (starWorld.cam.getWindowHeight() * 0.5 + starWorld.cam.getWindowY())
        );

        this.drawStars();
    }

    prepareStarSeeds ()
    {
        var rng = new Phaser.Math.RandomDataGenerator(["space1"]);

        // 1

        // var world = this.scene.get("main").csPlugin.world;

        // world.grid.loopThroughAllCells(function(cell)
        // {
        //     Object.defineProperty(cell, "ss",  
        //     {
        //         enumerable: false,
        //         writable: true,
        //         configurable: true,
        //         value: rng.between(0, 9999999)
        //     });
        // });

        // 2

        var starWorld = this.csStars.world;

        starWorld.grid.loopThroughAllCells(function(cell)
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

    drawStars ()
    {
        var world = this.scene.get("main").csPlugin.world;

        // 1

        // var starLayer1 = this.starLayer1;
        // starLayer1.clear();
        // starLayer1.fillStyle(0xFFFFFF, 1);

        // 2

        var starLayer2 = this.starLayer2;
        starLayer2.clear();
        starLayer2.fillStyle(0xFFFFFF, 1);

        var rng, x, y, i;
        var dimensions, cellWidth, cellHeight;
        var RDG = Phaser.Math.RandomDataGenerator;

        // 1

        // dimensions = world.grid.getDimensions();
        // cellWidth = dimensions.cellWidth;
        // cellHeight = dimensions.cellHeight;

        // world.grid.loopThroughVisibleCells((cell, col, row) =>
        // {
        //     rng = new RDG([cell.ss]);

        //     x = col * cellWidth;
        //     y = row * cellHeight;

        //     for(i = 0; i < 8; i++)
        //     {
        //         starLayer1.fillRect(
        //             x + rng.between(0, cellWidth),
        //             y + rng.between(0, cellHeight),
        //             2,
        //             2
        //         );
        //     }
        // });

        // 2

        var starWorld = this.csStars.world;

        dimensions = starWorld.grid.getDimensions();
        cellWidth = dimensions.cellWidth;
        cellHeight = dimensions.cellHeight;

        starWorld.grid.loopThroughVisibleCells((cell, col, row) =>
        {
            rng = new RDG([cell.ss]);

            x = col * cellWidth;
            y = row * cellHeight;

            for(i = 0; i < 8; i++)
            {
                starLayer2.fillRect(
                    x + rng.between(0, cellWidth),
                    y + rng.between(0, cellHeight),
                    3,
                    3
                );
            }
        });
    }
}