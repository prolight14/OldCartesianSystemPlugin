var CartesianSystemPlugin = function(scene)
{
    this.scene = scene;

    this.systems = scene.sys;

    // if(!scene.sys.settings.isBooted)
    // {
    //     scene.sys.event.once('boot', this.boot, this);
    // }
};

CartesianSystemPlugin.register = function(PluginManager)
{
    PluginManager.register('CartesianSystemPlugin', CartesianSystemPlugin, 'base');
};

CartesianSystemPlugin.prototype = {
    boot: function ()
    {
        var eventEmitter = this.systems.events;

        eventEmitter.on('start', this.start, this);

        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);

    },

    setupWorld: function(config)
    {
        this.world = new CartesianSystem.World(config).init();


    },

    start: function()
    {

    },

    shutdown: function()
    {

    },

    destroy: function()
    {
        this.shutdown();

        this.scene = undefined;
    }
};

CartesianSystemPlugin.prototype.constructor = CartesianSystemPlugin;

module.exports = CartesianSystemPlugin;