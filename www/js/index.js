import MainScene from "./scenes/MainScene.js";
import DebugScene from "./scenes/DebugScene.js";
import BackgroundScene from "./scenes/BackgroundScene.js";

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
    pixelArt: true,
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
    // p,hysics: {
    //     default: 'arcade',
    //     arcade: {}
    // },
    scene: [MainScene, DebugScene, BackgroundScene]
};

var game = new Phaser.Game(config);
window.game = game;
window.config = config;