(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CartesianSystemPlugin", [], factory);
	else if(typeof exports === 'object')
		exports["CartesianSystemPlugin"] = factory();
	else
		root["CartesianSystemPlugin"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./CartesianSystemPlugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CartesianSystemPlugin.js":
/*!**********************************!*\
  !*** ./CartesianSystemPlugin.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Todo: Keep as much stuff related to this in here as possible
var CartesianSystemPlugin = function(scene)
{
    this.scene = scene;
    this.systems = scene.sys;
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
            sys.displayList.add(object);
            sys.updateList.add(object);
        });
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

/***/ })

/******/ });
});
//# sourceMappingURL=CartesianSystemPlugin.js.map