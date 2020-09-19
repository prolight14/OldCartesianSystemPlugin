import PlayScene from "./scenes/PlayScene.js";

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 480,
    // pixelArt: true,
    scene: [PlayScene]
};

var game = new Phaser.Game(config);

window.game = game;