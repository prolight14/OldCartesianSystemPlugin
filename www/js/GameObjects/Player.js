export default class Player extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };
    }

    preUpdate ()
    {
        if(this.keys.a.isDown)
        {
            this.x -= 5;
        }
        if(this.keys.d.isDown)
        {
            this.x += 5;
        }
        if(this.keys.w.isDown)
        {
            this.y -= 5;
        }
        if(this.keys.s.isDown)
        {
            this.y += 5;
        }
    }
}