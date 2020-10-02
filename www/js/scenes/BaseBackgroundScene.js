export default class BaseBackgroundScene extends Phaser.Scene
{
    constructor (sceneName, csKeyName)
    {
        super(sceneName);

        this.csKeyName = csKeyName;
    }

    preloadWorld ()
    {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: this.csKeyName
        });
    }

    createWorld ()
    {
        var dimensions = this.scene.get("main").worldDimensions;

        var gridConfig = {
            cols: Math.floor(dimensions.width / dimensions.cellWidth),
            rows: Math.floor(dimensions.height / dimensions.cellHeight),
            cell: {
                width: dimensions.cellWidth,
                height: dimensions.cellHeight
            }
        };

        this[this.csKeyName].setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: gridConfig
        });

        //////////////////////////////////////////////

        let world = this[this.csKeyName].world;
        let mainScene = this.scene.get("main");

        var cameraFocus = mainScene.cameraFocus;
        world.cam.setFocus(cameraFocus.x, cameraFocus.y, "cameraFocus");
        world.cam.update();

        this.cameras.main.startFollow(cameraFocus);
        this.cameras.main.setBounds(0, 0, gridConfig.cols * gridConfig.cell.width, gridConfig.rows * gridConfig.cell.height);
        this.lastMscZoom = mainScene.cameras.main.zoom;
    }

    updateWorldCamera ()
    {
        let world = this[this.csKeyName].world;
        let mainScene = this.scene.get("main");

        var cameraFocus = mainScene.cameraFocus;
        world.cam.updateFocus(cameraFocus.x, cameraFocus.y);
        world.cam.update();

        let mscZoom = mainScene.cameras.main.zoom;

        if(mscZoom !== this.lastMSCZoom)
        {
            this.cameras.main.setZoom(mscZoom);

            var _window = mainScene.csPlugin.world.cam.getWindow();

            world.cam.setWindow(_window.x, _window.y, _window.width, _window.height);
        }

        this.lastMSCZoom = mscZoom;

        this.cameras.main.setRotation(mainScene.cameras.main.rotation);
    }

    updateWorld ()
    {
        this[this.csKeyName].updateCS();
    }
}
