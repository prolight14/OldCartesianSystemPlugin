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
    boot: function()
    {
        var eventEmitter = this.systems.events;

        eventEmitter.on('start', this.start, this);
        // eventEmitter.on('update', this.update, this);
        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    },

    setupWorld: function(config)
    {
        return this.world = new CartesianSystem.World(config).init();
    },

    // Heck this method might not even need to be called every frame as long as we update everything else in the csp
    integrate: function()
    {
        var world = this.world;
        var sys = this.systems;

        sys.displayList.removeAll();
        sys.updateList.removeAll();

        world.utils.loopProcessList(function(object, arrayName, id)
        {
            // Could be added in the cartesian system plugin
            object.body.updateBoundingBox();
            world.grid.refreshReferences(object);

            sys.displayList.add(object);
            sys.updateList.add(object);
        });

        sys.displayList.queueDepthSort();
        sys.updateList.queueDepthSort();
    },

    start: function()
    {
        var sys = this.systems;

        sys.displayList.removeAll();
        sys.updateList.removeAll();
    },

    updateCS: function()
    {
        if(this.world === undefined)
        {
            console.warn("skipped");
            return;
        }
        
        var world = this.world;
        world.cam.update();
        world.processOnscreen();
        this.integrate();
        world.utils.resetProcessList();

    },

    shutdown: function()
    {

    },

    destroy: function()
    {
        this.shutdown();

        this.scene = undefined;
        this.world = undefined;
    }
};

CartesianSystemPlugin.prototype.constructor = CartesianSystemPlugin;

module.exports = CartesianSystemPlugin;