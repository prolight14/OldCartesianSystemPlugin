"use strict";
// Title screen scenes
Object.defineProperty(exports, "__esModule", { value: true });
var TitleScreen_js_1 = require("./scenes/titleScreen/TitleScreen.js");
// Space scenes
var MainScene_js_1 = require("./scenes/space/MainScene.js");
var EffectsScene_js_1 = require("./scenes/space/EffectsScene.js");
var DebugScene_js_1 = require("./scenes/space/DebugScene.js");
var UIDebugScene_js_1 = require("./scenes/space/UIDebugScene.js");
var StarLayerScene_js_1 = require("./scenes/space/StarLayerScene.js");
var PlanetScene_js_1 = require("./scenes/space/PlanetScene.js");
var StarLayer2Scene_js_1 = require("./scenes/space/StarLayer2Scene.js");
var StarLayer3Scene_js_1 = require("./scenes/space/StarLayer3Scene.js");
var StarLayer4Scene_js_1 = require("./scenes/space/StarLayer4Scene.js");
var MiniMapScene_js_1 = require("./scenes/space/MiniMapScene.js");
// Planet Scenes:
var PlatformingScene_js_1 = require("./scenes/planet/PlatformingScene.js");
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
    height: 450,
    pixelArt: true,
    // fps: {
    //     target: 300,
    //     forceSetTimeOut: true
    // },
    disableContextMenu: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        // Titlescreen scenes
        TitleScreen_js_1.default,
        // Space scenes
        MainScene_js_1.default, UIDebugScene_js_1.default, DebugScene_js_1.default, PlanetScene_js_1.default, StarLayerScene_js_1.default, StarLayer2Scene_js_1.default, StarLayer3Scene_js_1.default, StarLayer4Scene_js_1.default, EffectsScene_js_1.default, MiniMapScene_js_1.default,
        // Planet scenes
        PlatformingScene_js_1.default
    ]
};
var game = new Phaser.Game(config);
// Debug/Dev only
// window.game = game;
// window.config = config;
//# sourceMappingURL=index.js.map