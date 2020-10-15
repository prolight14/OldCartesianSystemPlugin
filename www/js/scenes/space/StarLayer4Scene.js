import BaseBackgroundScene from "./BaseBackgroundScene.js";

export default class StarLayer4Scene extends BaseBackgroundScene
{
    constructor ()
    {
        super("starLayer4", "csStars4");
    }

    preload ()
    {
        this.preloadWorld();
    }

    create ()
    {
        this.starsPerCell = 25;
        this.starSize = 1;
        this.starScroll = 0.25;

        this.createWorld();
        this.createStars();
    }

    update ()
    {
        this.updateWorldCamera();
        this.renderStars();
    }

    createStars ()
    {   
        this.starLayer = this.add.graphics();

        let world = this.csStars4.world;

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

        let world = this.csStars4.world;

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