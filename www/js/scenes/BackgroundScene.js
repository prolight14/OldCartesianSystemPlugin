export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super({
            key: "background",
        });
    }

    preload ()
    {

    }

    create ()
    {
        this.starGraphics = this.add.graphics();
    }

    update ()
    {
        var mainSceneCam = this.scene.get("main").cameras.main;
        this.cameras.main.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
    }
}