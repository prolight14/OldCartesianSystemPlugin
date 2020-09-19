import PhysicsSprite from "./PhysicsSprite.js"

export default class Wanderer extends PhysicsSprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        // this.setCollideWorldBounds(true);
        // this.setBounce(1, 1);

        this.changeTravelDirection();

        this.timer = scene.time.addEvent({
            delay: 1500,
            callback: this.changeTravelDirection,
            callbackScope: this,
            startAt: Math.random() * 500,
            repeat: Infinity
        });


        this.setScale(32, 32);

        this.vel = { x: 0, y: 0 };

        // var lastPreUpdate = this.preUpdate;
        // this.preUpdate = function()
        // {
        //     lastPreUpdate.apply(this, arguments);
        //     lastPreUpdate.apply(this, arguments);
        // };

        this.speed = 2;
    }

    changeTravelDirection ()
    {
        var angle = Phaser.Math.Angle.RandomDegrees();
        this.setVelocity(Math.sin(angle * Phaser.Math.DEG_TO_RAD) * this.speed, Math.cos(angle * Phaser.Math.DEG_TO_RAD) * this.speed);
    }

    setVelocity (x, y)
    {
        this.vel = { x: x, y: y };
    }

    preUpdate ()
    {
        this.x += this.vel.x;
        this.y += this.vel.y;

        if(this.x > this.worldBounds.maxX || this.x < this.worldBounds.minX)
        {
            this.vel.x = -this.vel.x;
        }
        if(this.y > this.worldBounds.maxY || this.y < this.worldBounds.minY)
        {
            this.vel.xy = -this.vel.y;
        }

        this.body.postUpdate();
    }
}