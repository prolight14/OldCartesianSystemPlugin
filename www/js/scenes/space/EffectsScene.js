export default class EffectsScene extends Phaser.Scene 
{
    constructor ()
    {
        super("effects");
    }

    create ()
    {
        this.updateCamera();
    }

    update ()
    {
        this.updateCamera();
    }

    updateCamera ()
    {
        var mainSceneCam = this.scene.get("main").cameras.main;
        var cam = this.cameras.main;

        cam.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
        cam.setZoom(mainSceneCam.zoom);
        cam.setRotation(mainSceneCam.rotation);
    }
}