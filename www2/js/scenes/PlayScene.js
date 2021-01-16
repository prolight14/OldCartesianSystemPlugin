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
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.nightGraphics = this.add.graphics();

        this.nightGraphics.lineStyle(3, 0xFF00FF, 0xFF);
        this.nightGraphics.fillStyle(0xFFFFFF, 1.0);
        this.nightGraphics.fillRect(0, 0, 800, 480);

        this.nightGraphics.fillStyle(0x00FF9F, 1.0);

        var rng = new Phaser.Math.RandomDataGenerator("seed");

        for(var i = 0; i < 30; i++)
        {
            this.nightGraphics.fillEllipse(rng.frac() * this.width - 12, rng.frac() * this.height - 12, 24, 24);
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
            
                varying vec2 outTexCoord;
                varying vec4 outTint;

                float size = 120.0 / uResolution.x;
                float sizeSq = size * size;

                vec4 night()
                {
                    vec2 pixelPos = gl_FragCoord.xy / uResolution.xx;
                    vec2 light1Pos = uLight1.xy / uResolution.xx;
                    vec2 light2Pos = uLight2.xy / uResolution.xx;

                    float dx = pixelPos.x - light1Pos.x;
                    float dy = pixelPos.y - light1Pos.y;
                    float distSq = dx * dx + dy * dy;

                    float dx2 = pixelPos.x - light2Pos.x;
                    float dy2 = pixelPos.y - light2Pos.y;
                    float dist2Sq = dx2 * dx2 + dy2 * dy2;

                    float n = 0.0;

                    if(distSq < sizeSq && dist2Sq < sizeSq)
                    {
                        n = max(1.0 - sqrt(distSq) / size, 1.0 - sqrt(dist2Sq) / size);
                    }
                    else if(distSq < sizeSq)
                    {
                        n = 1.0 - sqrt(distSq) / size;
                    }
                    else if(dist2Sq < sizeSq)
                    {
                        n = 1.0 - sqrt(dist2Sq) / size;
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
        this.pipelineInstance.setFloat2('uResolution', this.width, this.height);
        
        this.pipelineInstance.setFloat2("uLight2", Math.random() * this.width, this.height - Math.random() * this.height);
        this.cameras.main.setRenderToTexture('nighteffect', true);
    }

    update (time, delta)
    {
        var activePointer = this.input.activePointer;
        this.pipelineInstance.setFloat2("uLight1", activePointer.x, this.height - activePointer.y);
    }
}

/*


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    vec2 disPos1 = vec2(0.5, 0.5);

    float dx1 = (disPos1.x - uv.x) * (iResolution.x / iResolution.y);
    float dy1 = disPos1.y - uv.y;

    vec2 displace = vec2(0.0);

    float sqDist = dx1 * dx1 + dy1 * dy1;

    //if(sqDist < 0.25)
    {
        float theta = atan(dy1, dx1) + sqrt(sqDist) * (15.0 + sin(iTime) * 30.0);
    
        displace.x = cos(theta);    
        displace.y = sin(theta);
    }

   // displace.x *= 0.5;

    // input uv (x, y) into texture to get rgb
    vec3 col = texture(iChannel0, uv + displace).rgb;
    
    // Output to screen
    fragColor = vec4(col, 1.0);
}
*/

/* v2
 void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;

    vec2 disPos1 = vec2(0.5, 0.5);

    float dx1 = (disPos1.x - uv.x) * (iResolution.x / iResolution.y);
    float dy1 = disPos1.y - uv.y;

    vec2 displace = vec2(0.0);

    float sqDist = dx1 * dx1 + dy1 * dy1;

    //if(sqDist < 0.25)
    {
        float theta = atan(dy1, dx1) + sqrt(sqDist) * (6.0 + tan(iTime) * 3.0);
    
        displace.x = cos(theta);    
        displace.y = sin(theta);
    }

   // displace.x *= 0.5;

    // input uv (x, y) into texture to get rgb
    vec3 col = texture(iChannel0, uv + displace).rgb;
    
    // Output to screen
    fragColor = vec4(col, 1.0);
}
 */