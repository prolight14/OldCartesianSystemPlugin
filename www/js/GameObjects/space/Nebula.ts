import PhysicsSprite from "./PhysicsSprite.js";

export default class Nebula extends PhysicsSprite
{
    going: Phaser.Math.Vector2;
    timer: number;
    body;

    constructor (scene: Phaser.Scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.setScale(11, 11);

        this.going = new Phaser.Math.Vector2(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));

        this.timer = Date.now() + Phaser.Math.Between(-3000, 3000);

        this.alpha = 0.5;
    }   

    preUpdate ()
    {
        this.x += this.going.x;
        this.y += this.going.y;

        if(Date.now() - this.timer > 3000)
        {
            this.going.setAngle(Math.random() * 360 * Phaser.Math.DEG_TO_RAD);
            this.timer = Date.now();
        }

        this.body.postUpdate();
    }
}