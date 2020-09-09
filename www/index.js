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
        rows: 40,
        cols: 40,
        cell: {
            height: 700,
            width: 700
        }
    },
};

var game = new Phaser.Game(config);

var solidGraphics, graphics, keys = {}, player, enemies, cam;

function preload()
{
    this.load.scenePlugin({
        key: "CartesianSystemPlugin",
        url: "./libraries/CartesianSystemPlugin.js",
        sceneKey: 'csPlugin'
    });

    this.load.image("player", "./assets/player.png");
    this.load.image("enemy", "./assets/enemy.png");
}

function create()
{
    graphics = this.add.graphics({});
  
    player = this.physics.add.sprite(50, 50, "player");
    player.setCollideWorldBounds(true);

    keys.a = this.input.keyboard.addKey('a');
    keys.d = this.input.keyboard.addKey('d');
    keys.w = this.input.keyboard.addKey('w');
    keys.s = this.input.keyboard.addKey('s');

    this.csPlugin.setupWorld(worldConfig);

    Math.seedrandom("world1");

    this.csPlugin.world.grid.loopThroughAllCells(function(cell, col, row)
    {
        Object.defineProperty(cell, "starSeed",  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: Math.random()
        });
    });
    
    this.csPlugin.world.cam.setFocus(player.x, player.y, "player");
    this.csPlugin.world.cam.update();

    var bounds = this.csPlugin.world.cam.getBounds();
    this.physics.world.setBounds(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);

    cam = this.cameras.main;
    
    var worldCamScroll = this.csPlugin.world.cam.getScroll();
    cam.centerOn(worldCamScroll.x, worldCamScroll.y);

    console.log(this.csPlugin);
}

function update()
{
    graphics.clear();
    graphics.fillStyle(0xFFFFFF, 1.0);

    var world = this.csPlugin.world;

    world.cam.updateFocus(player.x, player.y);
    world.cam.update();

    var worldCamScroll = world.cam.getScroll();
    cam.centerOn(worldCamScroll.x, worldCamScroll.y);

    var cellWidth = worldConfig.grid.cell.width;
    var cellHeight = worldConfig.grid.cell.height;

    world.grid.loopThroughVisibleCells(function(cell, col, row)
    {
        var rng = new Math.seedrandom(cell.starSeed);

        for(var i = 0; i < 390; i++)
        {
            graphics.fillRect(
                Math.floor(col * cellWidth + cellWidth * rng()), 
                Math.floor(row * cellHeight + cellHeight * rng()), 
                1, 
                1
            );
        }
    });
    
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