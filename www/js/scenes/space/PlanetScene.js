import BaseBackgroundScene from "./BaseBackgroundScene.js";
import Planet from "../../GameObjects/space/Planet.js";

export default class PlanetScene extends BaseBackgroundScene
{
    constructor ()
    {
        super("planet", "csPlanets");
    }

    preload ()
    {
        this.preloadWorld();
    }

    create ()
    {
        this.createWorld();

        let world = this.csPlanets.world;

        var planets = world.add.gameObjectArray(Planet);

        planets.add(this, 77777, 60000, "icyDwarfPlanet").setScale(10, 10);
        planets.add(this, 74637, 64000, "redDustPlanet").setScale(10, 10);
    }

    update ()
    {
        this.updateWorldCamera();
        this.updateWorld();

        let mainScene = this.scene.get("main");
        let playerShip = mainScene.playerShip;

        let world = this.csPlanets.world;

        let planet = world.get.gameObject("planet", 0);
        let planetRadius = Math.pow((planet.displayWidth + planet.displayHeight) / 4, 2);

        if(Math.pow(playerShip.x - planet.x, 2) + Math.pow(playerShip.y - planet.y, 2) < planetRadius)
        {
            mainScene.switchToPlanet(planet);
        }
    }
}