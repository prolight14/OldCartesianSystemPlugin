export default class PhysicsSprite extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        var _this = this;

        this.body.boundingBox = {};
        this.body.updateBoundingBox = function()
        {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };

        this.body.updateBoundingBox();
    }
}