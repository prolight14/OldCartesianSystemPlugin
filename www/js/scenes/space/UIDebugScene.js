export default class UIDebugScene extends Phaser.Scene
{
    constructor ()
    {
        super("UIDebug");
    }


    create ()
    {
        this.fpsText = this.add.text(24, 24, "Fps: 60").setScrollFactor(0);
        this.posText = this.add.text(600, 24, "(???, ???)").setScrollFactor(0);
        this.cellText = this.add.text(24, 300, "").setScrollFactor(0);
    }

    update (time, delta)
    {
        this.showFps(delta);
        this.showCellInfo();
        this.setPosText();
    }

    setPosText ()
    {
        var mainScene = this.scene.get("main");
        this.posText.setText("(" + mainScene.playerShip.x.toFixed(0) + "," + mainScene.playerShip.y.toFixed(0) + ")"); 
    }

    showFps (delta)
    {
        this.fpsText.setText("Fps: " + Math.floor(1000 / delta));
    }

    showCellInfo ()
    {
        var mainScene = this.scene.get("main");
        var world = mainScene.csPlugin.world;
        var scroll = world.cam.getScroll();
        var mainSceneCam = this.scene.get("main").cameras.main;

        var coordinates = world.grid.getCoordinates(
            scroll.x - world.cam.getWindowWidth() / 2 + this.input.activePointer.x / mainSceneCam.zoom, 
            scroll.y - world.cam.getWindowHeight() / 2 + this.input.activePointer.y / mainSceneCam.zoom
        );

        var cell = world.grid.getCellFromCoordinates(coordinates.col, coordinates.row);
        this.cellText.setText(coordinates.col + ", " + coordinates.row + "\n" + Object.keys(cell).join("\n"));
    }
}