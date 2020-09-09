/**
 * This is just a test of the Cartesian System with Phaser 3 it's not an actual plugin yet...
 * Just a prototype
 *
 * Also, I just realized I can't use arcade physics for space related stuff. I have to use MatterJs.
 * 
 * Also I either have to use `setActive(bool)` or modify the `updateList` and `displayList`
 */

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};  

var game = new Phaser.Game(config);

var player, keys;

function preload()
{
    this.load.image("player", "./assets/player.png");
}

function create()
{
    player = this.physics.add.sprite(50, 50, "player");
    player.setCollideWorldBounds(true);

    keys = {};
    keys.a = this.input.keyboard.addKey('a');
    keys.d = this.input.keyboard.addKey('d');
    keys.w = this.input.keyboard.addKey('w');
    keys.s = this.input.keyboard.addKey('s');
}

function update()
{
    if(keys.a.isDown)
    {
        player.x -= 5;
    }
    if(keys.d.isDown)
    {
        player.x += 5;
    }
    if(keys.w.isDown)
    {
        player.y -= 5;
    }
    if(keys.s.isDown)
    {
        player.y += 5;
    }
}