 
// Space scenes

import MainScene from "./scenes/space/MainScene.js";
import EffectsScene from "./scenes/space/EffectsScene.js";
import DebugScene from "./scenes/space/DebugScene.js";
import UIDebugScene from "./scenes/space/UIDebugScene.js";
import StarLayerScene from "./scenes/space/StarLayerScene.js";
import PlanetScene from "./scenes/space/PlanetScene.js";
import StarLayer2Scene from "./scenes/space/StarLayer2Scene.js";
import StarLayer3Scene from "./scenes/space/StarLayer3Scene.js";
import StarLayer4Scene from "./scenes/space/StarLayer4Scene.js";

// Planet Scenes:

import PlatformingScene from "./scenes/planet/PlatformingScene.js";

/**
 * This is just a test of the Cartesian System with Phaser 3 it's not an actual plugin yet...
 * Just a prototype
 *
 * Also, I just realized I can't use arcade physics for space related stuff. I have to use MatterJs.
 * Also use vectors for space ships and space ship AI. Well maybe other things as well. I'd also want gravity. etc. etc.
 *
 */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480, // 450 for 16:9 android smartphone ratio
    pixelArt: true, // Vital for any pixelated games
    // fps: {
    //     target: 300,
    //     forceSetTimeOut: true
    // },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        // Space scenes
        MainScene, UIDebugScene, DebugScene, PlanetScene, StarLayerScene, StarLayer2Scene, StarLayer3Scene, StarLayer4Scene, EffectsScene,

        // Planet scenes
        PlatformingScene
    ]
};

var game = new Phaser.Game(config);

// Debug/Dev only
window.game = game;
window.config = config;