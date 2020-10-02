import PhysicsSprite from "./PhysicsSprite.js";

const HALF_PI = Math.PI / 2;

export default class PlayerShip extends PhysicsSprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };

        this.setScale(2, 2);

        this.dirSpeed = 0;
        this.dirSpeedAcl = 0.5;
        this.dirSpeedDeacl = 0.2;
        this.dirSpeedAutoDeacl = 0.2;
        this.maxDirSpeed = 20;
        this.minDirSpeed = -3;
        this.rotSpeed = 4;

        this.thrusterEmitter = this.scene.scene.get("effects").add.particles("playerShipParticles").createEmitter({
            frame: ["particle1", "particle2", "particle3", "particle4"],
            x: this.x,
            y: this.y,
            speed: 200,
            lifespan: 700,
        });
           
        /* temp */
        var savedPlayerProperties = JSON.parse(localStorage.getItem("player"));

        this.setX(savedPlayerProperties.x); 
        this.setY(savedPlayerProperties.y); 
        this.setRotation(savedPlayerProperties.rotation);
        this.setData(savedPlayerProperties.data);
        /* (end) temp */

        this.body.updateBoundingBox();
    }

    preUpdate ()
    {
        if(this.keys.a.isDown)
        {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD);
        }
        if(this.keys.d.isDown)
        {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD);
        }

        if(this.keys.w.isDown)
        {
            this.dirSpeed += this.dirSpeedAcl;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }
        else if(this.keys.s.isDown)
        {
            this.dirSpeed -= this.dirSpeedDeacl;
            this.dirSpeed = Math.max(this.dirSpeed, this.minDirSpeed);
        }
        else
        {
            this.dirSpeed -= this.dirSpeedAutoDeacl;
            this.dirSpeed = Math.max(this.dirSpeed, 0);
        }

        var rot = this.rotation - HALF_PI; 
        this.x += this.dirSpeed * Math.cos(rot);
        this.y += this.dirSpeed * Math.sin(rot);

        this.updateThrusterParticles();

        this.body.postUpdate();
    }

    updateThrusterParticles ()
    {
        var rotation = HALF_PI + this.rotation;
        var hyp = (this.displayHeight * 0.2 / this.scene.cameras.main.zoom);
        var range = this.displayWidth * 0.34;
        var thrusterEjectPlace = Phaser.Math.Between(-range, range);

        var _opp = thrusterEjectPlace;
        var _adj = this.displayHeight * 0.2;
        
        var theta = Math.atan2(_adj, _opp);
        var _hyp = Math.sqrt(_opp * _opp + _adj * _adj);

        let cameraRotation = this.scene.scene.get("effects").cameras.main.rotation;

        this.thrusterEmitter.setPosition(
            this.x + Math.cos(rotation) * hyp + Math.cos(this.rotation + theta) * _hyp, 
            this.y + Math.sin(rotation) * hyp + Math.sin(this.rotation + theta ) * _hyp
        );

        // this.thrusterEmitter.startFollow(this);
        this.thrusterEmitter.setEmitterAngle(Phaser.Math.Between(40, 140));
        // this.thrusterEmitter.angle = this.angle + cameraRotation * Phaser.Math.RAD_TO_DEG;
        this.thrusterEmitter.setSpeed(30);
        this.thrusterEmitter.setRadial(true);
    }

    onTouchPlanet (planet)
    {
        console.log("touching planet!");
    }
}