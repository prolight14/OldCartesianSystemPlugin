import Player from "./GameObjects/Player.js";
import Wanderer from "./GameObjects/Wanderer.js";

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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};  

var game = new Phaser.Game(config);
window.game = game;

let player, wanderers;

function preload()
{
    this.load.scenePlugin({
        key: "CartesianSystemPlugin",
        url: "./js/libraries/CartesianSystemPlugin.js",
        sceneKey: 'csPlugin'
    });

    this.load.image("player", "./assets/player.png");
    this.load.image("wanderer", "./assets/wanderer.png");
}

function create()
{
    player = new Player(this, 200, 200, "player");
    window.player = player;

    this.cameras.main.startFollow(player);
    
    wanderers = [];
    
    for(var i = 0; i < 330; i++)
    {
        wanderers.push(new Wanderer(this, Math.random() * 1000, Math.random() * 620, "wanderer"));
    }

    console.log(this.sys);

    for(var i = 0; i < wanderers.length; i++)
    {
        this.sys.displayList.remove(wanderers[i]);
    }

    this.extendedView = (offsetLeftX, offsetRightX, offsetTopY, offsetBottomY) => 
    {
        return new Phaser.Geom.Rectangle(
            this.cameras.main.worldView.x - offsetLeftX,
            this.cameras.main.worldView.y - offsetTopY,
            this.cameras.main.worldView.width + offsetRightX + offsetLeftX,
            this.cameras.main.worldView.height + offsetBottomY + offsetTopY
        );
    };
}

function update()
{
    var cam = this.cameras.main;

    if(typeof wanderers[0] !== "undefined")
    {
        var inflatedView = this.extendedView(
            wanderers[0].displayWidth, 
            wanderers[0].displayHeight, 
            wanderers[0].displayWidth, 
            wanderers[0].displayHeight);

        // Cull them (yes I know it's laggy but this is a test)
        for(var i = 0; i < wanderers.length; i++)
        {
            if(inflatedView.contains(wanderers[i].x, wanderers[i].y))
            {
                this.sys.displayList.add(wanderers[i]);
                continue;
            }

            this.sys.displayList.remove(wanderers[i]);
        }
    }
}