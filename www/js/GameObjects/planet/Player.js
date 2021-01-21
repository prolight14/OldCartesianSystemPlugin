/**
 * @this {Phaser.Physics.Arcade.Image}
 */
export default class Player extends Phaser.Physics.Arcade.Image 
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setMaxVelocity(200, 400).setDrag(1000, 0);

        const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;

        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        });

        this.setCollideWorldBounds(true, 0, 0);
    }

    preUpdate ()
    {
        const keys = this.keys;
        const onGround = this.body.blocked.down;
        const acceleration = 700;

        if(keys.left.isDown || keys.a.isDown)
        {
            this.setAccelerationX(-acceleration);
        } 
        else if(keys.right.isDown || keys.d.isDown) 
        {
            this.setAccelerationX(acceleration);
        }
        else
        {
            this.setAccelerationX(0);
        }

        if(onGround && (keys.up.isDown || keys.w.isDown))
        {
            this.setVelocityY(-380);
        }
    }
}