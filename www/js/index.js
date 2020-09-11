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
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};  

var game = new Phaser.Game(config);
window.game = game;

var worldConfig = {
    camera: {
        window: {
            x: 0,
            y: 0,
            width: config.width,
            height: config.height
        }
    },
    grid: {
        rows: 12,
        cols: 12,
        cell: {
            height: 270,
            width: 270
        }
    },
};

let player, cam;

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
    this.csPlugin.setupWorld(worldConfig);
    var world = this.csPlugin.world;

    window.aa_players = world.add.gameObjectArray(Player);

    player = aa_players.add(this, 200, 200, "player");
  
    cam = this.cameras.main;
    cam.setBounds(0, 0, 3990, 3990);
    cam.startFollow(player);
    
    world.cam.setFocus(player.x, player.y, "player");
    world.cam.update();

    var aa_wanderers = world.add.gameObjectArray(Wanderer);

    for(var i = 0; i < 330; i++)
    {
        aa_wanderers.add(this, Math.random() * 1000, Math.random() * 620, "wanderer");
    }
}

function update()
{
    var world = this.csPlugin.world;


    world.cam.updateFocus(player.x, player.y);
    world.cam.update();
}