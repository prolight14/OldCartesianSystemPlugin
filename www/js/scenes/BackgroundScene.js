export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super("background");
    }

    preload ()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    }

    create ()
    {
        this.csStars.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: {
                cols: 24,
                rows: 30,
                cell: {
                    height: 300,
                    width: 300
                }
            },
        });
    }

    update ()
    {
        
    }
}