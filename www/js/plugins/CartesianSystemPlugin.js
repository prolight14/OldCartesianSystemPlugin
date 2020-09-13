export default class RandomNamePlugin extends Phaser.Plugins.BasePlugin 
{
    constructor (pluginManager)
    {
        super('CartesianSystemPlugin', pluginManager);
    }

    init ()
    {
        console.log('Plugin is alive');
    }

    boot ()
    {
        this.init();
    }
}