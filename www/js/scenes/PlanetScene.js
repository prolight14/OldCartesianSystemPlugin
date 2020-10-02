import BaseBackgroundScene from "./BaseBackgroundScene.js";
import Planet from "../GameObjects/Planet.js";

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
    }

    update ()
    {
        this.updateWorldCamera();
        this.updateWorld();
        this.runPhysics();
    }

    runPhysics ()
    {
        let playerShip = this.scene.get("main").playerShip;

        this.children.getChildren().forEach(element =>
        {
            if(element._name === "planet" && element.canInteract(playerShip))
            {
                playerShip.onTouchPlanet(element);
            }
        });
    }
}