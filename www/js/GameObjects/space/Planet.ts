import PhysicsSprite from "./PhysicsSprite.js";

export default class Planet extends PhysicsSprite
{
    constructor (scene: Phaser.Scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
    }

    canInteract (sprite)
    {
        var dx = this.x - sprite.x;
        var dy = this.y - sprite.y;

        return dx * dx + dy * dy < Math.pow((this.displayWidth + this.displayHeight) / 4, 2);
    }
}