export default class MiniMapScene extends Phaser.Scene 
{
    constructor()
    {
        super("miniMap");

        this.PADDING = 3.6;
    }

    preload ()
    {

    }

    create ()
    {
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0x000000, 0.75);
        this.graphics.lineStyle(3, 0x56BE2A, 0.5);
 
        const { width: GAME_WIDTH, height: GAME_HEIGHT } = this.game.config;
        const miniMapWidth = this.miniMapWidth = GAME_WIDTH * 0.3; 
        const miniMapHeight = this.miniMapHeight = GAME_HEIGHT * 0.3;

        this.miniMapX = this.graphics.x = GAME_WIDTH - miniMapWidth - 1.5;
        this.miniMapY = this.graphics.y = GAME_HEIGHT - miniMapHeight - 1.5;

        this.graphics.fillRect(0, 0, miniMapWidth, miniMapHeight);
        this.graphics.strokeRect(0, 0, miniMapWidth, miniMapHeight);

        this.innerWindowGraphics = this.add.graphics();

        this.updateInnerWindowGraphics();
        this.innerWindowGraphics.x = this.miniMapX;
        this.innerWindowGraphics.y = this.miniMapY;

        this.innerGraphics = this.add.graphics();
        this.innerGraphics.x = this.miniMapX;
        this.innerGraphics.y = this.miniMapY;
    }

    updateInnerWindowGraphics ()
    {
        const padding = this.PADDING;

        let mainScene = this.scene.get("main");
        var csWindow = mainScene.csPlugin.world.cam.getWindow();

        var mainCamera = mainScene.cameras.main;
        this.innerWindowWidth = (csWindow.width * this.miniMapWidth / (csWindow.width * padding)) / mainCamera.zoom;
        this.innerWindowHeight = (csWindow.height * this.miniMapHeight / (csWindow.height * padding)) / mainCamera.zoom;

        this.innerWindowGraphics.clear();

        this.innerWindowGraphics.lineStyle(2, 0x56BE2A, 0.2);

        if(this.innerWindowWidth > this.miniMapWidth || this.innerWindowHeight > this.miniMapHeight)
        {
            this.innerWindowWidth = this.miniMapWidth;
            this.innerWindowHeight = this.miniMapHeight;
        }

        this.innerWindowInnerX = (this.miniMapWidth - this.innerWindowWidth) / 2 + 1.5;
        this.innerWindowInnerY = (this.miniMapHeight - this.innerWindowHeight) / 2 + 1.5;

        this.innerWindowGraphics.strokeRect(
            this.innerWindowInnerX,
            this.innerWindowInnerY,
            this.innerWindowWidth,
            this.innerWindowHeight
        );
    }

    update ()
    {
        this.innerGraphics.clear();

        this.innerGraphics.fillStyle(0x56BE2A);
        this.innerGraphics.fillRect(
            this.innerWindowInnerX + this.input.activePointer.x * this.innerWindowWidth / this.game.config.width,
            this.innerWindowInnerY + this.input.activePointer.y * this.innerWindowHeight / this.game.config.height,
            2,
            2
        );

        this.updateInnerWindowGraphics();

        let csWorld = this.scene.get("main").csPlugin.world;
            
        // csWorld.grid.loopThroughCoordinates((cell) =>
        // {
        //     for(var i in cell)
        //     {
        //         switch(cell[i].arrayName)
        //         {
        //             case "enemyShip":
        //                 var scroll = csWorld.cam.getScroll();
        //                 var enemyShip = csWorld.get.gameObject(cell[i].arrayName, cell[i].id);
        //                 break;
        //         }
        //     }
        // },
        // minCell.col, minCell.row, maxCell.col, maxCell.row);
    }
}