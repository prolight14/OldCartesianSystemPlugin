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

                float size = 60.0 / uResolution.x;

                vec4 night()
                {
                    vec2 pixelPos = gl_FragCoord.xy / uResolution.xx;
                    vec2 light1Pos = uLight1.xy / uResolution.xx;
                    vec2 light2Pos = uLight2.xy / uResolution.xx;

                    float dist1 = distance(pixelPos, light1Pos);
                    float dist2 = distance(pixelPos, light2Pos);

                    float n = 0.0;

                    if(dist1 < size && dist2 < size)
                    {
                        n = max(1.0 - dist1 / size, 1.0 - dist2 / size);
                    }
                    else if(dist1 < size)
                    {
                        n = 1.0 - dist1 / size;
                    }
                    else if(dist2 < size)
                    {
                        n = 1.0 - dist2 / size;
                    }
                    return vec4(n, n, n, 1.0);
                }

                void main()
                {
                    vec4 texture = texture2D(uMainSampler, outTexCoord);

                    texture *= vec4(outTint.rgb * outTint.a, outTint.a);

                    gl_FragColor = texture * night();
                }
            `
        };
        this.pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);
        this.game.renderer.addPipeline('nighteffect', this.pipelineInstance);

        this.pipelineInstance.setFloat2('uResolution', 800, 480);

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