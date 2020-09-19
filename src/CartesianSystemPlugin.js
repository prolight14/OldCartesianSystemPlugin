// Todo: Keep as much stuff related to this in here as possible
var CartesianSystemPlugin = function(scene)
{
    this.scene = scene;
    this.systems = scene.sys;
    this.cameras = scene.cameras;
};

CartesianSystemPlugin.register = function(PluginManager)
{
    PluginManager.register('CartesianSystemPlugin', CartesianSystemPlugin, 'base');
};

CartesianSystemPlugin.prototype = {
    boot: function()
    {
        var eventEmitter = this.systems.events;

        eventEmitter.on('destroy', this.destroy, this);
    },

    setupWorld: function(config)
    {
        this.world = new CartesianSystem.World(config);
        this.world.init();

        return this.world;
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
            sys.displayList.add(object);
            sys.updateList.add(object);
        });

        sys.displayList.queueDepthSort();
    },

    initGameObjects: function()
    {
        var sys = this.systems;
        var world = this.world;

        sys.updateList.getActive().forEach((gameObject) =>
        {
            if(gameObject.body === undefined)
            {
                return;
            }

            var lastPostUpdate = gameObject.body.postUpdate;
            gameObject.body.postUpdate = function()
            {
                var toReturn = lastPostUpdate.apply(this, arguments);

                gameObject.body.updateBoundingBox();
                world.grid.refreshReferences(gameObject);
    
                return toReturn;
            };
        });

        // Remove all thing to be processed so that we don't run into errors 
        // that would happen if we processed everything in the world at once
        sys.displayList.removeAll();
        sys.updateList.removeAll();
    },

    updateCS: function()
    {
        if(!this.initializedGameObjects)
        {
            this.initGameObjects();

            this.initializedGameObjects = true;
        }
 
        var world = this.world;
        world.cam.update();
        world.processOnscreen();
        this.integrate();

        world.utils.resetProcessList();
    },

    destroy: function()
    {
        this.shutdown();

        this.scene = undefined;
        this.world = undefined;
        this.systems = undefined;
    }
};

CartesianSystemPlugin.prototype.constructor = CartesianSystemPlugin;

module.exports = CartesianSystemPlugin;