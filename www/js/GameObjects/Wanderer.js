export default class Player extends Phaser.GameObjects.Sprite
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
    }

    changeTravelDirection ()
    {
        var angle = Phaser.Math.Angle.RandomDegrees();
        this.velocity.x = Math.sin(angle * Phaser.Math.DEG_TO_RAD) * 5;
        this.velocity.y = Math.cos(angle * Phaser.Math.DEG_TO_RAD) * 5;
    }

    preUpdate ()
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}