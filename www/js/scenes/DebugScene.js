export default class DebugScene extends Phaser.Scene 
{
    constructor ()
    {
        super("debug");
    }

    create ()
    {
        var world = (this.csPlugin = this.scene.get("main").csPlugin).world;

        this.cellGraphics = this.add.graphics();

        // Will eventually be moved to `UIDebugScene.js`
        this.addWindow();
    }

    // Will eventually be moved to `UIDebugScene.js`
    addWindow ()
    {
        this.debugGraphics = this.add.graphics().setScrollFactor(0);

        var mainScene = this.scene.get("main");
        var camWindow = mainScene.csPlugin.world.cam.getWindow();
        this.debugGraphics.strokeRect(camWindow.x, camWindow.y, camWindow.width, camWindow.height);
    }
    
    update (time, delta)
    {
        this.updateMainCamera();
        this.showCells();

        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(4, 0x00ff00, 1);

        var mainScene = this.scene.get("main");
        var camWindow = mainScene.csPlugin.world.cam.getWindow();
        this.debugGraphics.strokeRect(camWindow.x, camWindow.y, camWindow.width, camWindow.height);
    }

    updateMainCamera ()
    {
        var mainSceneCam = this.scene.get("main").cameras.main;
        this.cameras.main.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
        this.cameras.main.setZoom(mainSceneCam.zoom);
        this.cameras.main.setRotation(this.scene.get("main").cameras.main.rotation);
    }

    showCells ()
    {
        var world = this.csPlugin.world;
        var dimensions = world.grid.getDimensions();
        var cellWidth = dimensions.cellWidth;
        var cellHeight = dimensions.cellHeight;

        this.cellGraphics.clear();
        this.cellGraphics.lineStyle(4, 0x00ff00, 1);

        world.grid.loopThroughVisibleCells((cell, col, row) =>
        {
            this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    }
}