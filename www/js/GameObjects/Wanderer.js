import PhysicsSprite from "./PhysicsSprite.js"

export default class Wanderer extends PhysicsSprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

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


        this.setScale(32, 32);
    }

    changeTravelDirection ()
    {
        var angle = Phaser.Math.Angle.RandomDegrees();
        this.setVelocity(Math.sin(angle * Phaser.Math.DEG_TO_RAD) * 25, Math.cos(angle * Phaser.Math.DEG_TO_RAD) * 25);
    }
}