import MainScene from "./scenes/MainScene.js";
import EffectsScene from "./scenes/EffectsScene.js";
import DebugScene from "./scenes/DebugScene.js";
import UIDebugScene from "./scenes/UIDebugScene.js";
import StarLayerScene from "./scenes/StarLayerScene.js";
import PlanetScene from "./scenes/PlanetScene.js";
import StarLayer2Scene from "./scenes/StarLayer2Scene.js";

/**
 * This is just a test of the Cartesian System with Phaser 3 it's not an actual plugin yet...
 * Just a prototype
 *
 * Also, I just realized I can't use arcade physics for space related stuff. I have to use MatterJs.
 * Also use vectors for space ships and space ship AI. Well maybe other things as well. I'd also want gravity. etc. etc.
 *
 */

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 480,
    pixelArt: true, // Vital for any pixelated games
    fps: {
        target: 30,
        forceSetTimeOut: true,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [MainScene, UIDebugScene, DebugScene, PlanetScene, StarLayerScene, StarLayer2Scene, EffectsScene]
};

var game = new Phaser.Game(config);

// Debug/Dev only
window.game = game;
window.config = config;