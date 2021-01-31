import PhysicsSprite from "./PhysicsSprite.js";

export default class EnemyShip extends PhysicsSprite
{
    going: string;
    controls: {
        left;
        right;
        up;
    }

    dirSpeed: number ;
    dirSpeedAcl: number;
    dirSpeedDeacl: number;
    dirSpeedAutoDeacl: number;
    maxDirSpeed: number;
    minDirSpeed: number;
    rotSpeed: number;

    swivelTimer;
    body;
    scene;

    constructor (scene: Phaser.Scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.going = Math.random() <= 0.5 ? "" : (Math.random() <= 0.5 ? "left" : "right"); 

        this.swivelTimer = scene.time.addEvent({
            delay: 200,  
            callback: () =>
            {
                switch(this.going)
                {
                    case "left":
                        this.going = "";
                        this.swivelTimer.delay = Phaser.Math.Between(2000, 6000);
                        break;
                    case "right":
                        this.going = "";
                        this.swivelTimer.delay = Phaser.Math.Between(2000, 6000);
                        break;

                    default:
                        this.going = (Math.random() <= 0.5 ? "left" : "right");

                        this.swivelTimer.delay = Phaser.Math.Between(200, 850);
                    break;
                }
            },
            loop: true
        });
        this.controls = {
            left: () => 
            {
                return this.going === "left";
            },
            right: () => 
            {
                return this.going === "right";
            },
            up: () => 
            {
                return true;
            },
        };

        this.setScale(2, 2);

        this.dirSpeed = 0;
        this.dirSpeedAcl = 0.3;
        this.dirSpeedDeacl = 0.3;
        this.dirSpeedAutoDeacl = 0.3;
        this.maxDirSpeed = 10;
        this.minDirSpeed = 0;
        this.rotSpeed = 3;

        this.setRotation(Math.random() * Math.PI * 2);
    }

    preUpdate ()
    {
        if(this.controls.left())
        {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if(this.controls.right())
        {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }

        if(this.controls.up())
        {
            this.dirSpeed += this.dirSpeedAcl * this.scene.fSpeed;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }

        var rot = this.rotation - Math.PI / 2; 
        this.x += this.dirSpeed * Math.cos(rot) * this.scene.fSpeed;
        this.y += this.dirSpeed * Math.sin(rot) * this.scene.fSpeed;

        this.body.postUpdate();
    }
}