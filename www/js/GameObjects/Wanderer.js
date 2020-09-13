export default class Wanderer extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(1, 1);

        this.changeTravelDirection();

        this.timer = scene.time.addEvent({
            delay: 1500,
            callback: this.changeTravelDirection,
            callbackScope: this,
            startAt: Math.random() * 500,
            repeat: Infinity
        });

        var _this = this;

        // Could be added in the cartesian system plugin
        this.body.boundingBox = {};
        this.body.updateBoundingBox = function()
        {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };

        this.body.updateBoundingBox();

        var lastPostUpdate = this.body.postUpdate;
        this.body.postUpdate = function()
        {
            var toReturn = lastPostUpdate.apply(this, arguments);

            _this.body.updateBoundingBox();
            _this.onBodyPreUpdate();

            return toReturn;
        };
    }

    changeTravelDirection ()
    {
        var angle = Phaser.Math.Angle.RandomDegrees();
        this.setVelocity(Math.sin(angle * Phaser.Math.DEG_TO_RAD) * 25, Math.cos(angle * Phaser.Math.DEG_TO_RAD) * 25);
    }
}