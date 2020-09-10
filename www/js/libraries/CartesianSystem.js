(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CartesianSystem", [], factory);
	else if(typeof exports === 'object')
		exports["CartesianSystem"] = factory();
	else
		root["CartesianSystem"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./CartesianSystem.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./Camera.js":
/*!*******************!*\
  !*** ./Camera.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function Camera(windowX, windowY, windowWidth, windowHeight)
{
    // Window stuff
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = windowWidth / 2;
    this.halfWindowHeight = windowHeight / 2;

    // Needed for moving the camera
    this.scrollX = this.halfWindowWidth;
    this.scrollY = this.halfWindowHeight;
    this.scrollSpeed = 0.5;

    // The bounds the camera will stay with in
    // These will need to be set externally
    this.bounds = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
    };

    this.boundingBox = {
        minX: this.scrollX - this.halfWindowWidth,
        minY: this.scrollY - this.halfWindowHeight,
        maxX: this.scrollX + this.halfWindowWidth,
        maxY: this.scrollY + this.halfWindowHeight
    };
    
    var focusObject;

    this.update = function()
    {
        if(focusObject)
        {
            this.scroll(focusObject.x, focusObject.y, focusObject.name);
        }
    };

    this.setFocus = function(x, y, name)
    {
        focusObject = {
            x: x,
            y: y,
            name: name
        };
    };
    this.updateFocus = function(x, y)
    {
        if(focusObject)
        {
            focusObject.x = x;
            focusObject.y = y;
        }
    };
    this.getFocus = function()
    {
        return focusObject;
    };
    this.removeFocus = function()
    {
        delete this.scrolls[name];
        focusObject = undefined;
    };
    this.getScroll = function()
    {
        return {
            x: this.scrollX,
            y: this.scrollY
        };
    };

    this.scrolls = {};

    this.getTranslateValues = function()
    {
        return {
            x: this.windowX + this.halfWindowWidth - this.scrollX,
            y: this.windowY + this.halfWindowHeight - this.scrollY, 
        };
    };
}
Camera.prototype.scroll = function(x, y, name)
{
    if(!this.scrolls[name])
    {
        this.scrolls[name] = {
            x: this.scrollX,
            y: this.scrollY
        };
    }

    var scroll = this.scrolls[name];

    // Move direction and move magnitude
    // These will be used to move the scroll of the camera 
    var moveDir = Math.atan2(y - scroll.y, x - scroll.x);
    var moveMag = Math.sqrt(Math.pow(x - scroll.x, 2) + Math.pow(y - scroll.y, 2)) * this.scrollSpeed;

    // Move camera in both x and y components
    scroll.x += moveMag * Math.cos(moveDir);
    scroll.y += moveMag * Math.sin(moveDir);

    this.scrollX = scroll.x;
    this.scrollY = scroll.y;

    // Keep it within bounds
    this.scrollX = Math.min(Math.max(this.scrollX, this.bounds.minX + this.halfWindowWidth), this.bounds.maxX - this.halfWindowWidth);
    this.scrollY = Math.min(Math.max(this.scrollY, this.bounds.minY + this.halfWindowHeight), this.bounds.maxY - this.halfWindowHeight);

    // Update the bounding box
    this.boundingBox.minX = this.scrollX - this.halfWindowWidth;
    this.boundingBox.minY = this.scrollY - this.halfWindowHeight;
    this.boundingBox.maxX = this.scrollX + this.halfWindowWidth;
    this.boundingBox.maxY = this.scrollY + this.halfWindowHeight;
};
Camera.prototype.resize = function(windowX, windowY, windowWidth, windowHeight)
{
    this.windowX = windowX;
    this.windowY = windowY;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.halfWindowWidth = windowWidth / 2;
    this.halfWindowHeight = windowHeight / 2;
};

module.exports = Camera;

/***/ }),

/***/ "./CameraGrid.js":
/*!***********************!*\
  !*** ./CameraGrid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function CameraGrid(cols, rows, cellWidth, cellHeight)
{
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.halfCellWidth = cellWidth / 2;
    this.halfCellHeight = cellHeight / 2;

    this.grid = [];

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    this.reset = function()
    {
        this.grid.length = 0;
    
        var cols = this.cols;
        var rows = this.rows;
        var i, j;
    
        for(i = 0; i < cols; i++)
        {
            this.grid.push([]);
            // Create a cell with no __proto__ object
            for(j = 0; j < rows; j++)
            {
                this.grid[i][j] = Object.create(null);
            }
        }
        
        this.minCol = 0;
        this.minRow = 0;
        this.maxCol = this.grid.length - 1;
        this.maxRow = this.grid[0].length - 1;
    };

    /**
     * Only use if you understand the implications, in other 
     * words only use if you don't need a bounds check first
     * 
     * @method CameraGrid#getCoorssFast
     * @returns {object} col and row
     */
    this.getCoorsFast = function(x, y)
    {
        return {
            col: round((x - this.halfCellWidth) / this.cellWidth),
            row: round((y - this.halfCellHeight) / this.cellHeight)
        };
    };

    /**
     * Converts x and y to col and row
     * 
     * @method CameraGrid#getCoors
     * @returns {object} col and row
     */
    this.getCoors = function(x, y)
    {
        return {
            col: max(min(round((x - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            row: max(min(round((y - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow)
        };
    };

    this.addRef = function(object)
    {   
        var key = object._arrayName + object._id;
        var toSet = {
            arrayName: object._arrayName,
            id: object._id
        };

        var box = object.body.boundingBox;

        var minCol = max(min(round((box.minX - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            minRow = max(min(round((box.minY - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow),
            maxCol = max(min(round((box.maxX - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
            maxRow = max(min(round((box.maxY - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow);

        var col, row;

        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                this.grid[col][row][key] = toSet;
            }
        }

        object._minCol = minCol;
        object._minRow = minRow;
        object._maxCol = maxCol;
        object._maxRow = maxRow;
    };

    this.removeRef = function(object)
    {
        var key = object._arrayName + object._id;

        var minCol = object._minCol,
            minRow = object._minRow,
            maxCol = object._maxCol,
            maxRow = object._maxRow;

        var col, row;

        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                delete this.grid[col][row][key];
            }
        }
    };

    this.loopThroughVisibleCells = function(minCol, minRow, maxCol, maxRow, callback)
    {
        var col, row;

        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                callback(this.grid[col][row], col, row);
            }
        }
    };

    this.loopThroughAllCells = function(callback)
    {
        var col, row;

        for(col = this.minCol; col <= this.maxCol; col++)
        {
            for(row = this.minRow; row <= this.maxRow; row++)
            {
                callback(this.grid[col][row], col, row);
            }
        }
    };

    this.addToAllCells = function(name, property)
    {
        var col, row;

        for(col = this.minCol; col <= this.maxCol; col++)
        {
            for(row = this.minRow; row <= this.maxRow; row++)
            {
                Object.defineProperty(this.grid[col][row], name, 
                {
                    enumerable: false,
                    writable: true,
                    configurable: true,
                    value: property
                });
            }
        }
    };

    // Will be expensive since this applies to the entire grid
    this.removeAll = function(arrayToRemove)
    {
        var col, row, cell, i;

        for(col = this.minCol; col <= this.maxCol; col++)
        {
            for(row = this.minRow; row <= this.maxRow; row++)
            {
                cell = this.grid[col][row];

                for(i in cell)
                {
                    if(cell[i].arrayName === arrayToRemove)
                    {
                        delete cell[i];
                    }
                }
            }
        }
    };
}

module.exports = CameraGrid;

/***/ }),

/***/ "./CartesianSystem.js":
/*!****************************!*\
  !*** ./CartesianSystem.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var CartesianSystem = {
    World: __webpack_require__(/*! ./World.js */ "./World.js"),
    Utils: {
        CreateAA: __webpack_require__(/*! ./createAA.js */ "./createAA.js")
    }
};

// Export it
module.exports = CartesianSystem;
global.CartesianSystem = CartesianSystem;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./GameObjectHandler.js":
/*!******************************!*\
  !*** ./GameObjectHandler.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createAA = __webpack_require__(/*! ./createAA.js */ "./createAA.js");

function GameObjectHandler()
{
    var gameObjects = createAA([], undefined, "gameObjects");

    // Process list used for loop (mainly so we don't use an object again)
    var usedFL = {};
    // Will be used as a cache to contain all the stuff we need to process
    var used = {};

    this.addArray = function(name, gameObjectArray)
    {
        return gameObjects.addObject(name, gameObjectArray);
    };
    
    this.getArray = function(name)
    {
        return gameObjects.getObject(name);
    };

    this.removeArray = function(name)
    {
        return gameObjects.removeObject(name);
    };

    this.resetProcessList = function()
    {
        usedFL = {};
        used = {};
    };

    this.addToProcessList = function(cameraGrid, minCol, minRow, maxCol, maxRow) 
    {
        var grid = cameraGrid.grid;

        var col, row, cell, i, object, id;

        // Loop through grid
        for(col = minCol; col <= maxCol; col++)
        {
            for(row = minRow; row <= maxRow; row++)
            {
                cell = grid[col][row];

                // Loop through the cell
                for(i in cell)
                {
                    // We already recorded key (`object._arrayName + object._id`), so don't do it again since some 
                    // objects can be in multiple cells at a time
                    if(usedFL[i])
                    {
                        continue;
                    }

                    // Is the same as createAA#getObject(name)
                    object = gameObjects[gameObjects.references[cell[i].arrayName]][cell[i].id];

                    // Save info for rendering
                    id = gameObjects.references[object._arrayName];
                    used[id] = used[id] === undefined ? [] : used[id];
                    used[id].push(object._id);

                    // Show we've recorded the key (`object._arrayName + object._id`)
                    usedFL[i] = true;
                }
            }
        }
    };

    this.act = function(cameraGrid, key)
    {
        var i, j, object;

        for(i in used)
        {
            for(j = 0; j < used[i].length; j++)
            {
                object = gameObjects[i][used[i][j]];

                object[key]();

                // Refreshes the object's cell place after it has been moved 
                if(object.body.moved)
                {
                    cameraGrid.removeRef(object);
                    cameraGrid.addRef(object);
                }
            }
        }
    };
}

module.exports = GameObjectHandler;

/***/ }),

/***/ "./World.js":
/*!******************!*\
  !*** ./World.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let Camera = __webpack_require__(/*! ./Camera.js */ "./Camera.js");
let CameraGrid = __webpack_require__(/*! ./CameraGrid.js */ "./CameraGrid.js");
let GameObjectHandler = __webpack_require__(/*! ./GameObjectHandler */ "./GameObjectHandler.js");
let createAA = __webpack_require__(/*! ./createAA.js */ "./createAA.js");

function World(config)
{
    let camera = new Camera(
        config.camera.window.x,
        config.camera.window.y,
        config.camera.window.width,
        config.camera.window.height,
    );
    let cameraGrid = new CameraGrid(
        config.grid.cols, 
        config.grid.rows, 
        config.grid.cell.width, 
        config.grid.cell.height
    );
    let gameObjectHandler = new GameObjectHandler();

    if(typeof config.level === "undefined" || typeof config.level.bounds === "undefined")
    {
        camera.bounds.minX = camera.bounds.minY = 0;
        camera.bounds.maxX = config.grid.cols * config.grid.cell.width;
        camera.bounds.maxY = config.grid.rows * config.grid.cell.height;
    }
    else
    {
        camera.bounds.minX = config.level.bounds.minX;
        camera.bounds.minY = config.level.bounds.minY;
        camera.bounds.maxX = config.level.bounds.maxX;
        camera.bounds.maxY = config.level.bounds.maxY;
    }

    var round = Math.round;
    var min = Math.min;
    var max = Math.max;

    var cameraTracker = {};
    cameraTracker.update = function()
    {
        // Note: Keep this out of the camera!
        var camBox = camera.boundingBox;
        var cg = cameraGrid;

        // Todo: get rid of the bounds restrainment (min/max functions) and keep the camera in the world/grid 
        this.minCol = min(max(round((camBox.minX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.minRow = min(max(round((camBox.minY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
        this.maxCol = min(max(round((camBox.maxX - cg.halfCellWidth) / cg.cellWidth), cg.minCol), cg.maxCol);
        this.maxRow = min(max(round((camBox.maxY - cg.halfCellHeight) / cg.cellHeight), cg.minRow), cg.maxRow);
    };

    this.init = function()
    {
        cameraGrid.reset();
        cameraTracker.update();

        // You can't initalize more than once (kinda like a singleton)
        delete this.init;

        return this;
    };

    var intertermFunction = function()
    {

    };

    this.setIntertermFunction = function(callback)
    {
        intertermFunction = callback || intertermFunction;

        return this;
    };

    this.getIntertermFunction = function()
    {
        return intertermFunction;
    };

    this.processOffscreen = function(gameObject)
    {
        var ct = cameraTracker;

        // Perform a bounds check to make sure we only add this object to the processList when it's offscreen
        // So it doesn't happen twice if it is onscreen
        if(gameObject._maxCol < ct.minCol || gameObject._minCol > ct.maxCol ||
           gameObject._maxRow < ct.minRow || gameObject._minRow > ct.maxRow)
        {
            gameObjectHandler.addToProcessList(
                cameraGrid,
                gameObject._minCol,
                gameObject._minRow,
                gameObject._maxCol,
                gameObject._maxRow,
            );
        }

        return this;
    };

    this.processOnscreen = function()
    {
        gameObjectHandler.addToProcessList(
            cameraGrid,
            cameraTracker.minCol, 
            cameraTracker.minRow, 
            cameraTracker.maxCol, 
            cameraTracker.maxRow
        );

        return this;
    };

    this.step = function()
    {
        for(var i = 0; i < arguments.length; i++)
        {
            gameObjectHandler.act(cameraGrid, arguments[i]);
        }

        // We don't need this information anymore, get rid of it
        gameObjectHandler.resetProcessList();

        return this;
    };

    this.update = function()
    {
        this.cam.update();
        this.processOnscreen();
        intertermFunction();
        this.step.apply(this, arguments);

        return this;
    };

    this.add = {};
    this.add.gameObjectArray = function(object, arrayName)
    {
        if(arrayName === undefined) { arrayName = object.name.charAt(0).toLowerCase() + object.name.slice(1); }

        var array = gameObjectHandler.addArray(arrayName, createAA(object, undefined, arrayName));

        var lastAdd = array.add;
        Object.defineProperty(array, "add", 
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function()
            {
                var gameObject = lastAdd.apply(this, arguments);

                cameraGrid.addRef(gameObject);
                return gameObject;
            }
        });
        var lastAddObject = array.addObject;
        Object.defineProperty(array, "addObject", 
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function()
            {
                var gameObject = lastAddObject.apply(this, arguments);
                if(!gameObject) { return; }

                cameraGrid.addRef(gameObject);
                return gameObject;
            }
        });

        var lastRemove = array.remove;
        Object.defineProperty(array, "remove",  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function(id)
            {
                cameraGrid.removeRef(this[id]);
                return lastRemove.apply(this, arguments);
            }
        });
        var lastRemoveObject = array.removeObject;
        Object.defineProperty(array, "removeObject",  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function(name)
            {
                cameraGrid.removeRef(this[this.references[name]]);
                return lastRemoveObject.apply(this, arguments);
            }
        });

        return array;
    };
    this.add.gameObject = function(arrayName)
    {
        var gameObjectArray = gameObjectHandler.getArray(arrayName);
        var gameObject = gameObjectArray.add.apply(gameObjectArray, Array.prototype.slice.call(arguments, 1));
        cameraGrid.addRef(gameObject);
        return gameObject;
    };

    this.get = {};
    this.get.gameObjectArray = function(arrayName)
    {
        return gameObjectHandler.getArray(arrayName);
    };
    this.get.gameObject = function(arrayName, id)
    {
        return gameObjectHandler.getArray(arrayName)[id];
    };

    this.remove = {};
    this.remove.gameObjectArray = function(arrayName)
    {
        cameraGrid.removeAll(arrayName);
        gameObjectHandler.removeArray(arrayName);
        return this;
    };
    this.remove.gameObject = function(arrayName, id)
    {
        var gameObjectArray = gameObjectHandler.getArray(arrayName);
        cameraGrid.removeRef(gameObjectArray[id]);
        gameObjectArray.remove(id);
        return this;
    };

    this.grid = {};
    this.grid.getCell = function(x, y)
    {
        var pos = cameraGrid.getCoors(x, y);
        return cameraGrid.grid[pos.col][pos.row];
    };
    this.grid.loopThroughVisibleCells = function(callback)
    {
        cameraGrid.loopThroughVisibleCells(
            cameraTracker.minCol,
            cameraTracker.minRow,
            cameraTracker.maxCol,
            cameraTracker.maxRow,
            callback
        );

        return this;
    };
    this.grid.loopThroughAllCells = function(callback)
    {
        cameraGrid.loopThroughAllCells(callback);
        return this;
    };
    this.grid.addToAllCells = function(name, property)
    {
        cameraGrid.addToAllCells(name, property);

        return this;
    };
    this.grid.refreshReferences = function(object)
    {
        cameraGrid.removeRef(object);
        cameraGrid.addRef(object);

        return this;
    };
    this.grid.getCoordinates = function(x, y)
    {
        return cameraGrid.getCoors(x, y);
    };

    this.cam = {};
    this.cam.update = function()
    {
        camera.update();
        cameraTracker.update();
    };
    this.cam.setFocus = function(x, y, name)
    {
        camera.setFocus(x, y, name);
        return this;
    };
    this.cam.updateFocus = function(x, y)
    {
        camera.updateFocus(x, y);
        return this;
    };
    this.cam.getFocus = function()
    {
        return camera.getFocus();
    };
    this.cam.removeFocus = function()
    {
        camera.removeFocus();
        return this;
    };
    this.cam.getScroll = function()
    {
        return camera.getScroll();
    };
    this.cam.getTranslateValues = function()
    {
        return camera.getTranslateValues();
    };
    this.cam.getBounds = function()
    {
        return camera.bounds;
    };
    this.cam.getWindow = function()
    {
        return {
            x: camera.windowX,
            y: camera.windowY,
            width: camera.windowWidth,
            height: camera.windowHeight
        };
    };
    this.cam.resize = function(windowX, windowY, windowWidth, windowHeight)
    {
        camera.resize(windowX, windowY, windowWidth, windowHeight);
    };
    this.cam.getWindowX = function()
    {
        return camera.windowX;
    };
    this.cam.getWindowY = function()
    {
        return camera.windowY;
    };
    this.cam.getWindowWidth = function()
    {
        return camera.windowWidth;
    };
    this.cam.getWindowHeight = function()
    {
        return camera.windowHeight;
    };
    this.cam.setWindowX = function(x)
    {
        camera.windowX = x;
        return this;
    };
    this.cam.setWindowY = function(y)
    {
        camera.windowY = y;
        return this;
    };
    this.cam.setWindowWidth = function(width)
    {
        camera.windowWidth = width;
        return this;
    };
    this.cam.setWindowHeight = function(height)
    {
        camera.windowHeight = height;
        return this;
    };

    // DEV only!
    this.exposeInternals = function()
    {
        return { 
            camera: camera,
            cameraGrid: cameraGrid,
            gameObjectHandler: gameObjectHandler,
            cameraTracker: cameraTracker
        };
    };
}

module.exports = World;

/***/ }),

/***/ "./createAA.js":
/*!*********************!*\
  !*** ./createAA.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @function `createAA` Creates a key value pair system or associative array with methods
 * 
 * @param {Object} object The constructor/object to pass in 
 * @param {object} keypairs The keypairs/associative array to pass in (optional)
 * @param {string} arrayName What this array will be called (optional)
 * 
 * @returns {object} The keypair/associative array
 */
function createAA(object, keypairs, arrayName)
{
    if(typeof keypairs !== "object")
    {
        keypairs = Object.create(null);
    }

    arrayName = arrayName || object.name.charAt(0).toLowerCase() + object.name.slice(1);

    /**
     * All the methods and properties that are **NOT** part of the data that will be stored in `keypairs`
     */
    var system = {
        cache: {
            lowest: undefined, // Lowest empty index
            highest: -1, // highest index
        },
        references: {},
        length: 0,
        _name: arrayName,
        // Any thing added to this `add` method must also be added to the `add` method in the `if` statement
        add: function()
        {
            var id = this.cache.highest + 1;

            if(this.cache.lowest !== undefined && !this.unique)
            {
                id = this.cache.lowest;
                this.cache.lowest = undefined;
            }
            if(id > this.cache.highest)
            {
                this.cache.highest = id;
            }
            this.cache.tempId = id;
            this.length++;

            var item = Object.create(object.prototype);
            object.apply(item, arguments);
            this[id] = item;
            this[id]._name = this.cache.tempName || this.name;
            this[id]._arrayName = this._name;
            this[id]._id = id;
            return item;
        },
        remove: function(id)
        {
            if(this[id] === undefined)
            {
                return false;
            }

            if(id === this.cache.highest)
            {
                this.cache.highest--;
            }
            if(this.cache.lowest === undefined || id < this.cache.lowest)
            {
                this.cache.lowest = id;
            }

            this.length--;
            return delete this[id];
        },
        addObject: function(name)
        {
            if(this.references[name] !== undefined)
            {
                return;
            }
            
            var args = Array.prototype.slice.call(arguments);
            this.cache.tempName = args.shift();
            var item = this.add.apply(this, args);
            this.references[name] = this.cache.tempId;
            delete this.cache.tempId;
            return item;
        },
        getObject: function(name)
        {
            return this[this.references[name]] || delete this.references[name];
        },
        removeObject: function(name)
        {   
            var toRemove = this.references[name];
            var success = delete this.references[name];

            return this.remove(toRemove) && success;
        },
        forEach: function(callback)
        {
            for(var i in this)
            {
                callback(this[i], i, this);
            }

            return this;
        },
        define: function(key, prop)
        {
            Object.defineProperty(this, key,  
            {
                enumerable: false,
                writable: true,
                configurable: true,
                value: prop
            });
        }
    };

    if(object.apply === undefined)
    {
        system.add = function()
        {
            var id = this.cache.highest + 1;
            if(this.cache.lowest !== undefined && !this.unique)
            {
                id = this.cache.lowest;
                this.cache.lowest = undefined;
            }
            if(id > this.cache.highest)
            {
                this.cache.highest = id;
            }
            this.cache.tempId = id;

            this[id] = arguments[0];
            this[id]._name = this.cache.tempName || this.name;
            this[id]._arrayName = this._name;
            this[id]._id = id;
            return this[id];
        };
    }

    // Add methods and properties from system to keypairs/associative array that will be returned
    for(var i in system)
    {
        Object.defineProperty(keypairs, i,  
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: system[i]
        });
    }

    return keypairs;
}

module.exports = createAA;

/***/ })

/******/ });
});
//# sourceMappingURL=CartesianSystem.js.map