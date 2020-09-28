import MainScene from "./scenes/MainScene.js";
import DebugScene from "./scenes/DebugScene.js";
import UIDebugScene from "./scenes/UIDebugScene.js";
import StarLayerScene from "./scenes/StarLayerScene.js";
import StarLayer2Scene from "./scenes/StarLayer2Scene.js";

/**
 * This is just a test of the Cartesian System with Phaser 3 it's not an actual plugin yet...
 * Just a prototype
 *
 * Also, I just realized I can't use arcade physics for space related stuff. I have to use MatterJs.
 *
 */

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 480,
    pixelArt: true,
    fps: {
        target: 30,
        forceSetTimeOut: true,
    },
    scene: [MainScene, UIDebugScene, DebugScene, StarLayerScene, StarLayer2Scene]
};

var game = new Phaser.Game(config);

// Debug/Dev only
window.game = game;
window.config = config;