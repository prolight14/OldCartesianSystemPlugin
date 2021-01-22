export default class MiniMapScene extends Phaser.Scene 
{
    constructor()
    {
        super("miniMap");

        this.PADDING = 3.6;
    }

    preload ()
    {
        this.load.image("planetSymbol", "./assets/space/miniMap/planetSymbol.png");
    }

    create ()
    {
        const { width: GAME_WIDTH, height: GAME_HEIGHT } = this.game.config;
        const miniMapWidth = this.miniMapWidth = GAME_WIDTH * 0.3; 
        const miniMapHeight = this.miniMapHeight = GAME_HEIGHT * 0.3;
        this.miniMapHalfWidth = this.miniMapWidth / 2;
        this.miniMapHalfHeight = this.miniMapHeight / 2;

        this.cameras.main.setViewport(
            GAME_WIDTH - miniMapWidth - 1.5, 
            GAME_HEIGHT - miniMapHeight - 1.5, 
            miniMapWidth, 
            miniMapWidth
        );

        this.backGraphics = this.add.graphics();
        this.backGraphics.fillStyle(0x000000, 0.75);
        this.backGraphics.fillRect(0, 0, miniMapWidth, miniMapHeight);

        this.innerWindowGraphics = this.add.graphics();
        this.drawInnerWindowGraphics();
        
        this.innerGraphics = this.add.graphics();

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(3, 0x56BE2A, 0.5);
        this.graphics.strokeRect(0, 0, miniMapWidth, miniMapHeight);
    }

    drawInnerWindowGraphics ()
    {
        const padding = this.PADDING;

        let mainScene = this.scene.get("main");
        var csWindow = mainScene.csPlugin.world.cam.getWindow();

        var camera = mainScene.cameras.main;
        this.innerWindowWidth = (csWindow.width * this.miniMapWidth / (csWindow.width * padding)) * camera.zoom;
        this.innerWindowHeight = (csWindow.height * this.miniMapHeight / (csWindow.height * padding)) * camera.zoom;

        this.innerWindowGraphics.clear();

        this.innerWindowGraphics.lineStyle(2, 0x56BE2A, 0.2);

        if(this.innerWindowWidth > this.miniMapWidth || this.innerWindowHeight > this.miniMapHeight)
        {
            this.innerWindowWidth = this.miniMapWidth;
            this.innerWindowHeight = this.miniMapHeight;
        }

        this.halfInnerWindowWidth = this.innerWindowWidth / 2;
        this.halfInnerWindowHeight = this.innerWindowHeight / 2;

        this.innerWindowInnerX = (this.miniMapWidth - this.innerWindowWidth) / 2 + 1.5;
        this.innerWindowInnerY = (this.miniMapHeight - this.innerWindowHeight) / 2 + 1.5;
    }

    drawMiniMapShips ()
    {
        let mainScene = this.scene.get("main");
        let csWorld = mainScene.csPlugin.world;
        
        const padding = this.PADDING;

        var camera = mainScene.cameras.main;

        const PADDED_WIDTH = this.game.config.width * padding / camera.zoom;
        const PADDED_HEIGHT = this.game.config.height * padding / camera.zoom;

        const HALF_PADDED_WIDTH = PADDED_WIDTH / 2;
        const HALF_PADDED_HEIGHT = PADDED_HEIGHT / 2;

        var minX = camera.scrollX - HALF_PADDED_WIDTH;
        var minY = camera.scrollY - HALF_PADDED_HEIGHT;
        var maxX = camera.scrollX + HALF_PADDED_WIDTH + mainScene.worldDimensions.cellWidth;
        var maxY = camera.scrollY + HALF_PADDED_HEIGHT + mainScene.worldDimensions.cellHeight;

        var minCell = csWorld.grid.getCoordinates(minX, minY);
        var maxCell = csWorld.grid.getCoordinates(maxX, maxY);
            
        this.innerGraphics.fillStyle(0x56BE2A);

        csWorld.grid.loopThroughCoordinates((cell) =>
        {
            for(var i in cell)
            {
                switch(cell[i].arrayName)
                {
                    case "enemyShip":
                        var enemyShip = csWorld.get.gameObject(cell[i].arrayName, cell[i].id);

                        var x = (enemyShip.x - minX) * this.miniMapWidth / PADDED_WIDTH - this.halfInnerWindowWidth;
                        var y = (enemyShip.y - minY) * this.miniMapHeight / PADDED_HEIGHT - this.halfInnerWindowHeight;

                        if(x > 0 && x < this.miniMapWidth && y > 0 && y < this.miniMapWidth)
                        {
                            this.innerGraphics.fillRect(x, y, 2, 2);
                        }
                        break;
                }
            }
        },
        minCell.col, minCell.row, maxCell.col, maxCell.row);   
    }

    drawMiniMapPlanets ()
    {
        var planetScene = this.scene.get("planet");
        let csPlanets = planetScene.csPlanets;
        let mainScene = this.scene.get("main");
        var camera = mainScene.cameras.main;

        const padding = this.PADDING;

        const PADDED_WIDTH = this.game.config.width * padding / camera.zoom;
        const PADDED_HEIGHT = this.game.config.height * padding / camera.zoom;

        const HALF_PADDED_WIDTH = PADDED_WIDTH / 2;
        const HALF_PADDED_HEIGHT = PADDED_HEIGHT / 2;

        var minX = camera.scrollX - HALF_PADDED_WIDTH;
        var minY = camera.scrollY - HALF_PADDED_HEIGHT;
        var maxX = camera.scrollX + HALF_PADDED_WIDTH + mainScene.worldDimensions.cellWidth;
        var maxY = camera.scrollY + HALF_PADDED_HEIGHT + mainScene.worldDimensions.cellHeight;
    
        let planetWorld = csPlanets.world;
        
        var minCell = planetWorld.grid.getCoordinates(minX, minY);
        var maxCell = planetWorld.grid.getCoordinates(maxX, maxY);

        this.innerGraphics.fillStyle(0x56BE2A);
   
        planetWorld.grid.loopThroughCoordinates((cell) =>
        {
            for(var i in cell)
            {
                var planet = planetWorld.get.gameObject(cell[i].arrayName, cell[i].id);

                var x = (planet.x - minX) * this.miniMapWidth / PADDED_WIDTH - this.halfInnerWindowWidth;
                var y = (planet.y - minY) * this.miniMapHeight / PADDED_HEIGHT - this.halfInnerWindowHeight;

                if(x > -planet.width / 2 && x < this.miniMapWidth && y > -planet.height / 2 && y < this.miniMapWidth)
                {
                    this.innerGraphics.fillCircle(x, y, (planet.width / 2) * camera.zoom);
                }
            }
        },
        minCell.col, minCell.row, maxCell.col, maxCell.row);
    }

    update ()
    {
        this.innerGraphics.clear();

        this.innerGraphics.fillStyle(0x01C5C5);
        this.innerGraphics.fillRect(
            this.innerWindowInnerX + this.input.activePointer.x * this.innerWindowWidth / this.game.config.width,
            this.innerWindowInnerY + this.input.activePointer.y * this.innerWindowHeight / this.game.config.height,
            2,
            2
        );

        this.drawInnerWindowGraphics();
        this.drawMiniMapShips();
        this.drawMiniMapPlanets();

        this.innerGraphics.fillStyle(0xB50009);

        this.innerGraphics.fillRect(
            this.miniMapHalfWidth + 1.5,
            this.miniMapHalfHeight + 1.5,
            4,
            4
        );
    }
}