import PhysicsSprite from "./PhysicsSprite.js"

export default class Player extends PhysicsSprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };

        this.setScale(2, 2);

        this.dirSpeed = 0;
        this.dirSpeedAcl = 0.5;
        this.dirSpeedDeacl = 0.2;
        this.dirSpeedAutoDeacl = 0.2;
        this.maxDirSpeed = 20;
        this.minDirSpeed = -3;
        this.rotSpeed = 4;
    }

    preUpdate ()
    {
        if(this.keys.a.isDown)
        {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD);
        }
        if(this.keys.d.isDown)
        {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD);
        }

        if(this.keys.w.isDown)
        {
            this.dirSpeed += this.dirSpeedAcl;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }
        else if(this.keys.s.isDown)
        {
            this.dirSpeed -= this.dirSpeedDeacl;
            this.dirSpeed = Math.max(this.dirSpeed, this.minDirSpeed);
        }
        else
        {
            this.dirSpeed -= this.dirSpeedAutoDeacl;
            this.dirSpeed = Math.max(this.dirSpeed, 0);
        }

        var rot = this.rotation - Math.PI / 2; 
        this.x += this.dirSpeed * Math.cos(rot);
        this.y += this.dirSpeed * Math.sin(rot);

        this.body.postUpdate();
    }
}