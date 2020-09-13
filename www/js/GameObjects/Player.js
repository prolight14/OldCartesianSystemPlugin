export default class Player extends Phaser.Physics.Arcade.Sprite
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
    }

    preUpdate ()
    {
        if(this.keys.a.isDown)
        {
            this.setVelocityX(-300);
        }
        if(this.keys.d.isDown)
        {
            this.setVelocityX(300);
        }

        if(!this.keys.a.isDown && !this.keys.d.isDown)
        {
            this.setVelocityX(0);
        }

        if(this.keys.w.isDown)
        {
            this.setVelocityY(-300);
        }
        if(this.keys.s.isDown)
        {
            this.setVelocityY(300);
        }

        if(!this.keys.w.isDown && !this.keys.s.isDown)
        {
            this.setVelocityY(0);
        }
    }
}