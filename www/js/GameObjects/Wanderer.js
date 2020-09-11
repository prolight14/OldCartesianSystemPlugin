class Wanderer extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.velocity = {
            x: 0,
            y: 0
        };

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
        this.body = {
            moves: true,
            boundingBox: {},
            updateBoundingBox: function()
            {
                this.boundingBox.minX = _this.x - _this.displayWidth;
                this.boundingBox.minY = _this.y - _this.displayHeight;
                this.boundingBox.maxX = _this.x + _this.displayWidth;
                this.boundingBox.maxY = _this.y + _this.displayHeight;
            }
        };

        this.body.updateBoundingBox();
    }

    changeTravelDirection ()
    {
        var angle = Phaser.Math.Angle.RandomDegrees();
        this.velocity.x = Math.sin(angle * Phaser.Math.DEG_TO_RAD) * 5;
        this.velocity.y = Math.cos(angle * Phaser.Math.DEG_TO_RAD) * 5;
    }

    update ()
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Could be added in the cartesian system plugin
        this.body.updateBoundingBox();
    }
}

export default serialize(Wanderer);