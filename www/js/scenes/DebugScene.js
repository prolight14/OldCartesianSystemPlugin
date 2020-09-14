export default class DebugScene extends Phaser.Scene 
{
    constructor ()
    {
        super({
            key: "debug",
        });
    }

    preload ()
    {

    }

    create ()
    {
        var world = (this.csPlugin = this.scene.get("main").csPlugin).world;

        this.cellGraphics = this.add.graphics();

        this.debugGraphics = this.add.graphics();
        this.debugGraphics.setScrollFactor(0);

        this.debugGraphics.lineStyle(4, 0x00ff00, 1);

        var camWindow = world.cam.getWindow();

        this.debugGraphics.strokeRect(camWindow.x, camWindow.y, camWindow.width, camWindow.height);

        this.fpsText = this.add.text(24, 24, "Fps: 60").setScrollFactor(0);
        this.cellText = this.add.text(24, 300, "").setScrollFactor(0);

        this.pointer = {
            x: 0,
            y: 0
        };

        this.input.on("pointermove", (pointer) =>
        {
            this.pointer = pointer;
        });
        this.input.on("pointerdown", (pointer) =>
        {
            this.pointer = pointer;
        });
        this.input.on("pointerup", (pointer) =>
        {
            this.pointer = pointer;
        });
    }

    update (time, delta)
    {
        var mainSceneCam = this.scene.get("main").cameras.main;
        this.cameras.main.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);

        var world = this.csPlugin.world;

        this.fpsText.setText("Fps: " + Math.floor(1000 / delta));

        this.cellGraphics.clear();

        this.cellGraphics.lineStyle(4, 0x00ff00, 1);

        var dimensions = world.grid.getDimensions();
        var cellWidth = dimensions.cellWidth;
        var cellHeight = dimensions.cellHeight;

        world.grid.loopThroughVisibleCells((cell, col, row) =>
        {
            this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });

        // var scroll = world.cam.getScroll();

        // var coordinates = world.grid.getCoordinates(
        //     scroll.x - world.cam.getWindowWidth() / 2 + this.pointer.x, 
        //     scroll.y - world.cam.getWindowHeight() / 2 + this.pointer.y
        // );

        // var cell = world.grid.getCellFromCoordinates(coordinates.col, coordinates.row);
        // this.cellText.setText(coordinates.col + ", " + coordinates.row + "\n" + Object.keys(cell).join("\n"));
    }
}