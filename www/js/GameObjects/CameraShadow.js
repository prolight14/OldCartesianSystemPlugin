export default class PhysicsSprite extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);

        this.setVisible(false);

        this.guide = 0.7;

        var bounds = scene.csStars.world.cam.getBounds();

        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;

        this.toSubX = (width - width / this.guide) * 0.5;
        this.toSubY = (height - height / this.guide) * 0.5;
    }

    preUpdate ()
    {
        this.x = this.target.x * this.guide - this.toSubX;
        this.y = this.target.y * this.guide - this.toSubY;
    }

    setTarget(target)
    {
        this.target = target;
    }
}