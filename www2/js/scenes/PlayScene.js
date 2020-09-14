// import CustomPipeline from "../CustomPipeline.js";

export default class PlayScene extends Phaser.Scene
{
    constructor ()
    {
        super('play');
    }

    preload ()
    {
        this.load.image("player", "../www/assets/player.png");
    }

    create ()
    {
        this.nightGraphics = this.add.graphics();

        this.nightGraphics.lineStyle(3, 0xFF00FF, 0xFF);
        this.nightGraphics.fillStyle(0xFFFFFF, 1.0);
        this.nightGraphics.fillRect(0, 0, 800, 480);

        this.nightGraphics.fillStyle(0x00FF9F, 1.0);

        for(var i = 0; i < 30; i++)
        {
            this.nightGraphics.fillRect(Phaser.Math.Between(0, 800) - 12, Phaser.Math.Between(0, 480) - 12, 24, 24);
        }

        var config = {
            game: this.game,
            renderer: this.game.renderer,
            fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                uniform vec2 uResolution;
                uniform vec2 uLight1;
                uniform vec2 uLight2;
                uniform float uTime;

                varying vec2 outTexCoord;
                varying vec4 outTint;

                vec4 night()
                {
                    vec2 pixelPos = gl_FragCoord.xy / uResolution.xx;
                    vec2 light1Pos = uLight1.xy / uResolution.xx;
                    vec2 light2Pos = uLight2.xy / uResolution.xx;

                    float dx = light1Pos.x - pixelPos.x;
                    float dy = light1Pos.y - pixelPos.y;

                    float dx2 = light2Pos.x - pixelPos.x;
                    float dy2 = light2Pos.y - pixelPos.y;

                    float n = 1.0 - sqrt(dx * dx + dy * dy) * 5.0;
                    float n2 = 1.0 - sqrt(dx2 * dx2 + dy2 * dy2) * 5.0;

                    return vec4(-1.0, -1.0, -1.0, 1.0) * vec4(n, n, n, 1.0) * vec4(n2, n2, n2, 1.0);
                }

                void main()
                {
                    vec4 texture = texture2D(uMainSampler, outTexCoord);

                    texture *= vec4(outTint.rgb * outTint.a, outTint.a);

                    gl_FragColor = texture * night();
                }
            `
        };

        //colorOverlay(outTint, );
        /*
        
        */
        this.pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);
        this.game.renderer.addPipeline('nighteffect', this.pipelineInstance);

        this.pipelineInstance.setFloat2('uResolution', 800, 480);

        // this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        this.pipelineInstance.setFloat2("uLight2", Math.random() * 800, 480 - Math.random() * 480);


        this.cameras.main.setRenderToTexture('nighteffect', true);

        this.pointer = {
            x: 800 * 0.5,
            y: 480 * 0.5
        };

        let updatePointer = (pointer) =>
        {
            this.pointer.x = Math.floor(pointer.x);
            this.pointer.y = Math.floor(pointer.y);
        };

        this.input.on("pointerdown", updatePointer);
        this.input.on("pointerup", updatePointer);
        this.input.on("pointermove", updatePointer);
    }

    update (time, delta)
    {
        this.pipelineInstance.setFloat1('uTime', time * 0.001);

        this.pipelineInstance.setFloat2("uLight1", this.pointer.x, 480 - this.pointer.y);
    }
}