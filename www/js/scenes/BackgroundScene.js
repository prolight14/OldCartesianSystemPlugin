export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super("background");
    }

    preload ()
    {

    }

    create ()
    {
        this.starGraphics = this.add.graphics();

        this.prepareStarSeeds();
    }

    update ()
    {
        var mainSceneCam = this.scene.get("main").cameras.main;
        this.cameras.main.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);

        this.drawStars();
    }

    prepareStarSeeds ()
    {
        var world = this.scene.get("main").csPlugin.world;
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

    drawStars ()
    {
        var world = this.scene.get("main").csPlugin.world;

        var starGraphics = this.starGraphics;

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
            y = row * cellHeight;

            for(i = 0; i < 13; i++)
            {
                starGraphics.fillRect(
                    x + rng.between(0, cellWidth),
                    y + rng.between(0, cellHeight),
                    2,
                    2
                );
            }
        });
    }
}