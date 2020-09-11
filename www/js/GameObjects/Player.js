class Player extends Phaser.GameObjects.Sprite
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

    update ()
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

        // Could be added in the cartesian system plugin
        this.body.updateBoundingBox();
    }
}

export default serialize(Player);