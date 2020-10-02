export default class PhysicsSprite extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        // scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);

        let _this = this;

        this.body = {};

        this.body.boundingBox = {};
        this.body.moves = true;
        this.body.updateBoundingBox = function()
        {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };

        this.body.updateBoundingBox();

        this.body.postUpdate = function() {};

        var lastSetScale = this.setScale;
        this.setScale = function()
        {
            let toReturn = lastSetScale.apply(this, arguments);
            this.body.updateBoundingBox();
            return toReturn;
        };
    }
}