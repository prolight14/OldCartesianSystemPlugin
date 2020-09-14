import PhysicsSprite from "./PhysicsSprite.js"

export default class Player extends PhysicsSprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };

        this.setScale(32, 32);
    }

    preUpdate ()
    {
        if(this.keys.a.isDown)
        {
            this.setVelocityX(-500);
        }
        if(this.keys.d.isDown)
        {
            this.setVelocityX(500);
        }

        if(!this.keys.a.isDown && !this.keys.d.isDown)
        {
            this.setVelocityX(0);
        }

        if(this.keys.w.isDown)
        {
            this.setVelocityY(-500);
        }
        if(this.keys.s.isDown)
        {
            this.setVelocityY(500);
        }

        if(!this.keys.w.isDown && !this.keys.s.isDown)
        {
            this.setVelocityY(0);
        }
    }
}