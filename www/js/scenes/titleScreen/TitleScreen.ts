"use strict";

export default class TitleScreenScene extends Phaser.Scene 
{
    constructor()
    {
        super("titleScreen");
    }

    preload ()
    {
        this.load.image("PlanetSearch3", "./assets/titlescreen/PlanetSearch3.png");
    }

    create ()
    {
        this.add.sprite(this.game.config.width * 0.5, this.game.config.height * 0.1667, "PlanetSearch3").setScale(5).setOrigin(0.5, 0);

        this.input.on("pointerdown", () => 
        {
            this.scene.start("main");
        });
    }
}