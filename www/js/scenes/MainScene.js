import Player from "../GameObjects/Player.js";
import Wanderer from "../GameObjects/Wanderer.js";

var worldConfig = {
    camera: {
        window: {
            x: 0,
            y: 0,
            width: 800,
            height: 480 
        }
    },
    grid: {
        cols: 15,
        rows: 30,
        cell: {
            height: 270,
            width: 270
        }
    },
};

export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super("main");
    }

    preload ()
    {
        // This is commented out because I'm make this plugin global so I can debug it and figure 
        // out what is wrong with it then I will come back to here and make it only for this scene
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csPlugin'
        });
    
        this.load.image("player", "./assets/player.png");
        this.load.image("wanderer", "./assets/wanderer.png");
    }

    create ()
    {
        let player, cam;

        this.csPlugin.setupWorld(worldConfig);
        var world = this.csPlugin.world;
    
        cam = this.cameras.main;

        var worldCamBounds = world.cam.getBounds();
        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );
    
        var worldBounds = world.grid.getBounds();
        this.physics.world.setBounds(
            worldBounds.minX, 
            worldBounds.minY, 
            worldBounds.maxX - worldBounds.minX, 
            worldBounds.maxY - worldBounds.minY
        );

        window.aa_players = world.add.gameObjectArray(Player);
    
        player = aa_players.add(this, 200, 200, "player");

        cam.startFollow(player);

        world.cam.setFocus(player.x, player.y, "player");
        world.cam.update();
        //////////////////////////////////////////////////////
    
        var aa_wanderers = world.add.gameObjectArray(Wanderer);
    
        var wanderersGroup = this.add.group({
            active: true,
            classType: Wanderer
        });
    
        for(var i = 0; i < 690; i++)
        {
            var wanderer = aa_wanderers.add(
                this, 
                Math.random() * (worldBounds.maxX - worldBounds.minX), 
                Math.random() * (worldBounds.maxY - worldBounds.minY), 
                "wanderer"
            );
            wanderersGroup.add(wanderer);
        }

        this.player = player;
       
        this.scene.run("debug");
    }

    update ()
    {
        let { player } = this;

        var world = this.csPlugin.world;
        world.cam.updateFocus(player.x, player.y);
    
        this.csPlugin.updateCS();
    }
}