/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/CustomContextPad.js":
/*!************************************!*\
  !*** ./client/CustomContextPad.js ***!
  \************************************/
/***/ ((module) => {

class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate
    } = this;

    function appendServiceTask(event, element) {
      if (autoPlace) {
        const businessObject = bpmnFactory.create("vng:zaken");
        const shape = elementFactory.createShape({ type: 'vng:zaken',  businessObject: businessObject, x:10, y:10 });
  
        autoPlace.append(element, shape);
      } else {
        appendServiceTaskStart(event, element);
      }
    }

    function appendServiceTaskStart(event) {
      const businessObject = bpmnFactory.create("vng:zaken");
      const shape = elementFactory.createShape({ type: 'vng:zaken',  businessObject: businessObject, x:10, y:10 });
  
      create.start(event, shape, element);
    }

    return {
      'append.service-task': {
        group: 'vng',
        className: 'bpmn-icon-service-task',
        title: translate('Append ZaakTask'),
        action: {
          click: appendServiceTask,
          dragstart: appendServiceTaskStart
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];

// export default {
//   __init__: [ 'CustomContextPad' ],
//   CustomContextPad: [ 'type', CustomContextPad ]
// };

module.exports = {
    __init__: ['CustomContextPad'],
    CustomContextPad: ['type', CustomContextPad]
};

/***/ }),

/***/ "./client/CustomPalette.js":
/*!*********************************!*\
  !*** ./client/CustomPalette.js ***!
  \*********************************/
/***/ ((module) => {

class CustomPalette {
  constructor(create, elementFactory, bpmnFactory, palette, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
	this.bpmnFactory = bpmnFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      create,
      elementFactory,
	  bpmnFactory,
      translate
    } = this;

    function createServiceTask(event) {
      const businessObject = bpmnFactory.create("vng:zaken");
      const shape = elementFactory.createShape({ type: 'vng:zaken',  businessObject: businessObject, x:10, y:10 });
	  console.log('the shape', shape);


      create.start(event, shape);
    }

    return {
      'create.service-task': {
        group: 'vng',
        className: 'bpmn-icon-service-task',
        title: translate('Create ZaakTask'),
		//imageUrl: Cat.dataURL,
        action: {
          dragstart: createServiceTask,
          click: createServiceTask
        }
      },
    }
  }
}

CustomPalette.$inject = [
  'create',
  'elementFactory',
  'bpmnFactory',
  'palette',
  'translate'
];

module.exports = {
    __init__: ['CustomPalette'],
    CustomPalette: ['type', CustomPalette]
};

/***/ }),

/***/ "./client/CustomRenderer.js":
/*!**********************************!*\
  !*** ./client/CustomRenderer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diagram-js/lib/draw/BaseRenderer */ "./node_modules/diagram-js/lib/draw/BaseRenderer.js");
/* harmony import */ var bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/util/ModelingUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-svg */ "./node_modules/tiny-svg/dist/index.esm.js");

//import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
//const { BaseRenderer } = require('diagram-js/lib/draw/BaseRenderer'); 
//import { BaseRenderer } from 'diagram-js/lib/draw/BaseRenderer';

//import 'diagram-js/lib/draw/BaseRenderer';







const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2;

class CustomRenderer extends diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }
  
  canRender(element) {
    // only render tasks and events (ignore labels)
    return (0,bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_1__.isAny)(element, [ 'vng:zaken' ]) && !element.labelTarget;
  }
  
  drawShape(parentNode, element) {
	
	if (element.type === "vng:zaken") {
      const rect = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("rect");

      rect.setAttribute("width", element.width);
      rect.setAttribute("height", element.height);
      rect.setAttribute("stroke", "black");
      rect.setAttribute("fill", "white");
      rect.setAttribute("stroke-width", 2);
	  
	  (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(parentNode, rect);
	
	  const rect2 = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("image");

      rect2.setAttribute("width", element.width / 3);
      rect2.setAttribute("height", element.height / 3);
      rect2.setAttribute("x", 0);
      rect2.setAttribute("y", 0);
	  //rect2.setAttribute("border", "1px red solid");
	  //rect2.setAttribute("z-index", "1000");
	  rect2.setAttribute("href", "data:image/png;base64,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");

      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(parentNode, rect2);

      return rect;
    }
	
    // const shape = this.bpmnRenderer.drawShape(parentNode, element);
    //
    // if (is(element, 'bpmn:Task')) {
    //   const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');
	// 
    //   prependTo(rect, parentNode);
	// 
    //   svgRemove(shape);
	// 
    //   return shape;
    // }
	// 
    // const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, '#cc0000');
	// 
    // svgAttr(rect, {
    //   transform: 'translate(-20, -10)'
    // });

    return shape;
  }
  
  getShapePath(shape) {
	  const { x, y, width, height } = shape;
    return [
      ["M", x, y],
      ["l", width, 0],
      ["l", 0, height],
      ["l", -width, 0],
      ["z"]
    ];
    // if (is(shape, 'bpmn:Task')) {
    //   return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    // }
	// 
    // return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __init__: [ 'CustomRenderer' ],
  CustomRenderer: [ 'type', CustomRenderer ]
});

// module.exports = {
//     __init__: ['CustomRenderer'],
//     CustomRenderer: ['type', CustomRenderer]
// };


//  rect.setAttribute("href", "data:image/png;base64,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");

/***/ }),

/***/ "./client/LoggingPlugin.js":
/*!*********************************!*\
  !*** ./client/LoggingPlugin.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class LoggingPlugin {

  // `eventBus` will be injected through dependency injection
  constructor(eventBus, canvas) {
    eventBus.on('shape.added', (context) => {
      
      // Inspect `context` to see all the information that is provided in the context of this event
      console.log('A shape was added to the diagram!', context);
    });
	
  }
}

// Use `$inject` to specify what modules should be injected
LoggingPlugin.$inject = [ 'eventBus', 'canvas' ];

// Specify the module using a unique name
// Use __init__ to make sure an instance will be created
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __init__: [ 'loggingPlugin' ],
  loggingPlugin: [ 'type', LoggingPlugin ]
});


/***/ }),

/***/ "./node_modules/bpmn-js/lib/util/ModelUtil.js":
/*!****************************************************!*\
  !*** ./node_modules/bpmn-js/lib/util/ModelUtil.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBusinessObject": () => (/* binding */ getBusinessObject),
/* harmony export */   "getDi": () => (/* binding */ getDi),
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "isAny": () => (/* binding */ isAny)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");



/**
 * Is an element of the given BPMN type?
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {string} type
 *
 * @return {boolean}
 */
function is(element, type) {
  var bo = getBusinessObject(element);

  return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);
}


/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<string>} types
 *
 * @return {boolean}
 */
function isAny(element, types) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.some)(types, function(t) {
    return is(element, t);
  });
}

/**
 * Return the business object for a given element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

/**
 * Return the di object for a given element.
 *
 * @param  {djs.model.Base} element
 *
 * @return {ModdleElement}
 */
function getDi(element) {
  var bo = getBusinessObject(element);

  return bo && bo.di;
}

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModelerDirectory": () => (/* binding */ getModelerDirectory),
/* harmony export */   "getPluginsDirectory": () => (/* binding */ getPluginsDirectory),
/* harmony export */   "registerBpmnJSModdleExtension": () => (/* binding */ registerBpmnJSModdleExtension),
/* harmony export */   "registerBpmnJSPlugin": () => (/* binding */ registerBpmnJSPlugin),
/* harmony export */   "registerClientExtension": () => (/* binding */ registerClientExtension),
/* harmony export */   "registerClientPlugin": () => (/* binding */ registerClientPlugin),
/* harmony export */   "registerCloudBpmnJSModdleExtension": () => (/* binding */ registerCloudBpmnJSModdleExtension),
/* harmony export */   "registerCloudBpmnJSPlugin": () => (/* binding */ registerCloudBpmnJSPlugin),
/* harmony export */   "registerDmnJSModdleExtension": () => (/* binding */ registerDmnJSModdleExtension),
/* harmony export */   "registerDmnJSPlugin": () => (/* binding */ registerDmnJSPlugin),
/* harmony export */   "registerPlatformBpmnJSModdleExtension": () => (/* binding */ registerPlatformBpmnJSModdleExtension),
/* harmony export */   "registerPlatformBpmnJSPlugin": () => (/* binding */ registerPlatformBpmnJSPlugin)
/* harmony export */ });
/**
 * Validate and register a client plugin.
 *
 * @param {Object} plugin
 * @param {String} type
 */
function registerClientPlugin(plugin, type) {
  var plugins = window.plugins || [];
  window.plugins = plugins;

  if (!plugin) {
    throw new Error('plugin not specified');
  }

  if (!type) {
    throw new Error('type not specified');
  }

  plugins.push({
    plugin: plugin,
    type: type
  });
}

/**
 * Validate and register a client plugin.
 *
 * @param {import('react').ComponentType} extension
 *
 * @example
 *
 * import MyExtensionComponent from './MyExtensionComponent';
 *
 * registerClientExtension(MyExtensionComponent);
 */
function registerClientExtension(component) {
  registerClientPlugin(component, 'client');
}

/**
 * Validate and register a bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerBpmnJSPlugin(BpmnJSModule);
 */
function registerBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.modeler.additionalModules');
}

/**
 * Validate and register a platform specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformBpmnJSPlugin(BpmnJSModule);
 */
function registerPlatformBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.platform.modeler.additionalModules');
}

/**
 * Validate and register a cloud specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudBpmnJSPlugin(BpmnJSModule);
 */
function registerCloudBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.cloud.modeler.additionalModules');
}

/**
 * Validate and register a bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerBpmnJSModdleExtension(moddleDescriptor);
 */
function registerBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformBpmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudBpmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerDmnJSModdleExtension(moddleDescriptor);
 */
function registerDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.modeler.${c}.additionalModules`)); 
}

/**
 * Return the modeler directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getModelerDirectory() {
  return window.getModelerDirectory();
}

/**
 * Return the modeler plugin directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getPluginsDirectory() {
  return window.getPluginsDirectory();
}

/***/ }),

/***/ "./node_modules/diagram-js/lib/draw/BaseRenderer.js":
/*!**********************************************************!*\
  !*** ./node_modules/diagram-js/lib/draw/BaseRenderer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseRenderer)
/* harmony export */ });
var DEFAULT_RENDER_PRIORITY = 1000;

/**
 * The base implementation of shape and connection renderers.
 *
 * @param {EventBus} eventBus
 * @param {number} [renderPriority=1000]
 */
function BaseRenderer(eventBus, renderPriority) {
  var self = this;

  renderPriority = renderPriority || DEFAULT_RENDER_PRIORITY;

  eventBus.on([ 'render.shape', 'render.connection' ], renderPriority, function(evt, context) {
    var type = evt.type,
        element = context.element,
        visuals = context.gfx,
        attrs = context.attrs;

    if (self.canRender(element)) {
      if (type === 'render.shape') {
        return self.drawShape(visuals, element, attrs);
      } else {
        return self.drawConnection(visuals, element, attrs);
      }
    }
  });

  eventBus.on([ 'render.getShapePath', 'render.getConnectionPath'], renderPriority, function(evt, element) {
    if (self.canRender(element)) {
      if (evt.type === 'render.getShapePath') {
        return self.getShapePath(element);
      } else {
        return self.getConnectionPath(element);
      }
    }
  });
}

/**
 * Should check whether *this* renderer can render
 * the element/connection.
 *
 * @param {element} element
 *
 * @returns {boolean}
 */
BaseRenderer.prototype.canRender = function() {};

/**
 * Provides the shape's snap svg element to be drawn on the `canvas`.
 *
 * @param {djs.Graphics} visuals
 * @param {Shape} shape
 *
 * @returns {Snap.svg} [returns a Snap.svg paper element ]
 */
BaseRenderer.prototype.drawShape = function() {};

/**
 * Provides the shape's snap svg element to be drawn on the `canvas`.
 *
 * @param {djs.Graphics} visuals
 * @param {Connection} connection
 *
 * @returns {Snap.svg} [returns a Snap.svg paper element ]
 */
BaseRenderer.prototype.drawConnection = function() {};

/**
 * Gets the SVG path of a shape that represents it's visual bounds.
 *
 * @param {Shape} shape
 *
 * @return {string} svg path
 */
BaseRenderer.prototype.getShapePath = function() {};

/**
 * Gets the SVG path of a connection that represents it's visual bounds.
 *
 * @param {Connection} connection
 *
 * @return {string} svg path
 */
BaseRenderer.prototype.getConnectionPath = function() {};


/***/ }),

/***/ "./node_modules/min-dash/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/min-dash/dist/index.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "ensureArray": () => (/* binding */ ensureArray),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "groupBy": () => (/* binding */ groupBy),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isNil": () => (/* binding */ isNil),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "matchPattern": () => (/* binding */ matchPattern),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "omit": () => (/* binding */ omit),
/* harmony export */   "pick": () => (/* binding */ pick),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "throttle": () => (/* binding */ throttle),
/* harmony export */   "unionBy": () => (/* binding */ unionBy),
/* harmony export */   "uniqueBy": () => (/* binding */ uniqueBy),
/* harmony export */   "values": () => (/* binding */ values),
/* harmony export */   "without": () => (/* binding */ without)
/* harmony export */ });
/**
 * Flatten array, one level deep.
 *
 * @param {Array<?>} arr
 *
 * @return {Array<?>}
 */
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;
function isUndefined(obj) {
  return obj === undefined;
}
function isDefined(obj) {
  return obj !== undefined;
}
function isNil(obj) {
  return obj == null;
}
function isArray(obj) {
  return nativeToString.call(obj) === '[object Array]';
}
function isObject(obj) {
  return nativeToString.call(obj) === '[object Object]';
}
function isNumber(obj) {
  return nativeToString.call(obj) === '[object Number]';
}
function isFunction(obj) {
  var tag = nativeToString.call(obj);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object AsyncGeneratorFunction]' || tag === '[object Proxy]';
}
function isString(obj) {
  return nativeToString.call(obj) === '[object String]';
}
/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */

function ensureArray(obj) {
  if (isArray(obj)) {
    return;
  }

  throw new Error('must supply array');
}
/**
 * Return true, if target owns a property with the given key.
 *
 * @param {Object} target
 * @param {String} key
 *
 * @return {Boolean}
 */

function has(target, key) {
  return nativeHasOwnProperty.call(target, key);
}

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function|Object} matcher
 *
 * @return {Object}
 */

function find(collection, matcher) {
  matcher = toMatcher(matcher);
  var match;
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      match = val;
      return false;
    }
  });
  return match;
}
/**
 * Find element index in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Object}
 */

function findIndex(collection, matcher) {
  matcher = toMatcher(matcher);
  var idx = isArray(collection) ? -1 : undefined;
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      idx = key;
      return false;
    }
  });
  return idx;
}
/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Array} result
 */

function filter(collection, matcher) {
  var result = [];
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      result.push(val);
    }
  });
  return result;
}
/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param  {Array|Object} collection
 * @param  {Function} iterator
 *
 * @return {Object} return result that stopped the iteration
 */

function forEach(collection, iterator) {
  var val, result;

  if (isUndefined(collection)) {
    return;
  }

  var convertKey = isArray(collection) ? toNum : identity;

  for (var key in collection) {
    if (has(collection, key)) {
      val = collection[key];
      result = iterator(val, convertKey(key));

      if (result === false) {
        return val;
      }
    }
  }
}
/**
 * Return collection without element.
 *
 * @param  {Array} arr
 * @param  {Function} matcher
 *
 * @return {Array}
 */

function without(arr, matcher) {
  if (isUndefined(arr)) {
    return [];
  }

  ensureArray(arr);
  matcher = toMatcher(matcher);
  return arr.filter(function (el, idx) {
    return !matcher(el, idx);
  });
}
/**
 * Reduce collection, returning a single result.
 *
 * @param  {Object|Array} collection
 * @param  {Function} iterator
 * @param  {Any} result
 *
 * @return {Any} result returned from last iterator
 */

function reduce(collection, iterator, result) {
  forEach(collection, function (value, idx) {
    result = iterator(result, value, idx);
  });
  return result;
}
/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */

function every(collection, matcher) {
  return !!reduce(collection, function (matches, val, key) {
    return matches && matcher(val, key);
  }, true);
}
/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */

function some(collection, matcher) {
  return !!find(collection, matcher);
}
/**
 * Transform a collection into another collection
 * by piping each member through the given fn.
 *
 * @param  {Object|Array}   collection
 * @param  {Function} fn
 *
 * @return {Array} transformed collection
 */

function map(collection, fn) {
  var result = [];
  forEach(collection, function (val, key) {
    result.push(fn(val, key));
  });
  return result;
}
/**
 * Get the collections keys.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */

function keys(collection) {
  return collection && Object.keys(collection) || [];
}
/**
 * Shorthand for `keys(o).length`.
 *
 * @param  {Object|Array} collection
 *
 * @return {Number}
 */

function size(collection) {
  return keys(collection).length;
}
/**
 * Get the values in the collection.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */

function values(collection) {
  return map(collection, function (val) {
    return val;
  });
}
/**
 * Group collection members by attribute.
 *
 * @param  {Object|Array} collection
 * @param  {Function} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */

function groupBy(collection, extractor) {
  var grouped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  extractor = toExtractor(extractor);
  forEach(collection, function (val) {
    var discriminator = extractor(val) || '_';
    var group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });
  return grouped;
}
function uniqueBy(extractor) {
  extractor = toExtractor(extractor);
  var grouped = {};

  for (var _len = arguments.length, collections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    collections[_key - 1] = arguments[_key];
  }

  forEach(collections, function (c) {
    return groupBy(c, extractor, grouped);
  });
  var result = map(grouped, function (val, key) {
    return val[0];
  });
  return result;
}
var unionBy = uniqueBy;
/**
 * Sort collection by criteria.
 *
 * @param  {Object|Array} collection
 * @param  {String|Function} extractor
 *
 * @return {Array}
 */

function sortBy(collection, extractor) {
  extractor = toExtractor(extractor);
  var sorted = [];
  forEach(collection, function (value, key) {
    var disc = extractor(value, key);
    var entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      var d = sorted[idx].d;

      if (disc < d) {
        sorted.splice(idx, 0, entry);
        return;
      }
    } // not inserted, append (!)


    sorted.push(entry);
  });
  return map(sorted, function (e) {
    return e.v;
  });
}
/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = matchPattern({ id: 1 });
 *
 * let element = find(elements, matcher);
 *
 * @param  {Object} pattern
 *
 * @return {Function} matcherFn
 */

function matchPattern(pattern) {
  return function (el) {
    return every(pattern, function (val, key) {
      return el[key] === val;
    });
  };
}

function toExtractor(extractor) {
  return isFunction(extractor) ? extractor : function (e) {
    return e[extractor];
  };
}

function toMatcher(matcher) {
  return isFunction(matcher) ? matcher : function (e) {
    return e === matcher;
  };
}

function identity(arg) {
  return arg;
}

function toNum(arg) {
  return Number(arg);
}

/**
 * Debounce fn, calling it only once if the given time
 * elapsed between calls.
 *
 * Lodash-style the function exposes methods to `#clear`
 * and `#flush` to control internal behavior.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {Function} debounced function
 */
function debounce(fn, timeout) {
  var timer;
  var lastArgs;
  var lastThis;
  var lastNow;

  function fire(force) {
    var now = Date.now();
    var scheduledDiff = force ? 0 : lastNow + timeout - now;

    if (scheduledDiff > 0) {
      return schedule(scheduledDiff);
    }

    fn.apply(lastThis, lastArgs);
    clear();
  }

  function schedule(timeout) {
    timer = setTimeout(fire, timeout);
  }

  function clear() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = lastNow = lastArgs = lastThis = undefined;
  }

  function flush() {
    if (timer) {
      fire(true);
    }

    clear();
  }

  function callback() {
    lastNow = Date.now();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this; // ensure an execution is scheduled

    if (!timer) {
      schedule(timeout);
    }
  }

  callback.flush = flush;
  callback.cancel = clear;
  return callback;
}
/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param  {Function} fn
 * @param  {Number} interval
 *
 * @return {Function} throttled function
 */

function throttle(fn, interval) {
  var throttling = false;
  return function () {
    if (throttling) {
      return;
    }

    fn.apply(void 0, arguments);
    throttling = true;
    setTimeout(function () {
      throttling = false;
    }, interval);
  };
}
/**
 * Bind function against target <this>.
 *
 * @param  {Function} fn
 * @param  {Object}   target
 *
 * @return {Function} bound function
 */

function bind(fn, target) {
  return fn.bind(target);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */

function assign(target) {
  for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  return _extends.apply(void 0, [target].concat(others));
}
/**
 * Sets a nested property of a given object to the specified value.
 *
 * This mutates the object and returns it.
 *
 * @param {Object} target The target of the set operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} value The value to set.
 */

function set(target, path, value) {
  var currentTarget = target;
  forEach(path, function (key, idx) {
    if (typeof key !== 'number' && typeof key !== 'string') {
      throw new Error('illegal key type: ' + _typeof(key) + '. Key should be of type number or string.');
    }

    if (key === 'constructor') {
      throw new Error('illegal key: constructor');
    }

    if (key === '__proto__') {
      throw new Error('illegal key: __proto__');
    }

    var nextKey = path[idx + 1];
    var nextTarget = currentTarget[key];

    if (isDefined(nextKey) && isNil(nextTarget)) {
      nextTarget = currentTarget[key] = isNaN(+nextKey) ? {} : [];
    }

    if (isUndefined(nextKey)) {
      if (isUndefined(value)) {
        delete currentTarget[key];
      } else {
        currentTarget[key] = value;
      }
    } else {
      currentTarget = nextTarget;
    }
  });
  return target;
}
/**
 * Gets a nested property of a given object.
 *
 * @param {Object} target The target of the get operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} [defaultValue] The value to return if no value exists.
 */

function get(target, path, defaultValue) {
  var currentTarget = target;
  forEach(path, function (key) {
    // accessing nil property yields <undefined>
    if (isNil(currentTarget)) {
      currentTarget = undefined;
      return false;
    }

    currentTarget = currentTarget[key];
  });
  return isUndefined(currentTarget) ? defaultValue : currentTarget;
}
/**
 * Pick given properties from the target object.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */

function pick(target, properties) {
  var result = {};
  var obj = Object(target);
  forEach(properties, function (prop) {
    if (prop in obj) {
      result[prop] = target[prop];
    }
  });
  return result;
}
/**
 * Pick all target properties, excluding the given ones.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */

function omit(target, properties) {
  var result = {};
  var obj = Object(target);
  forEach(obj, function (prop, key) {
    if (properties.indexOf(key) === -1) {
      result[key] = prop;
    }
  });
  return result;
}
/**
 * Recursively merge `...sources` into given target.
 *
 * Does support merging objects; does not support merging arrays.
 *
 * @param {Object} target
 * @param {...Object} sources
 *
 * @return {Object} the target
 */

function merge(target) {
  for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  if (!sources.length) {
    return target;
  }

  forEach(sources, function (source) {
    // skip non-obj sources, i.e. null
    if (!source || !isObject(source)) {
      return;
    }

    forEach(source, function (sourceVal, key) {
      if (key === '__proto__') {
        return;
      }

      var targetVal = target[key];

      if (isObject(sourceVal)) {
        if (!isObject(targetVal)) {
          // override target[key] with object
          targetVal = {};
        }

        target[key] = merge(targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }
    });
  });
  return target;
}




/***/ }),

/***/ "./node_modules/tiny-svg/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/tiny-svg/dist/index.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "appendTo": () => (/* binding */ appendTo),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "classes": () => (/* binding */ classes),
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "createMatrix": () => (/* binding */ createMatrix),
/* harmony export */   "createPoint": () => (/* binding */ createPoint),
/* harmony export */   "createTransform": () => (/* binding */ createTransform),
/* harmony export */   "innerSVG": () => (/* binding */ innerSVG),
/* harmony export */   "off": () => (/* binding */ off),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "prepend": () => (/* binding */ prepend),
/* harmony export */   "prependTo": () => (/* binding */ prependTo),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "select": () => (/* binding */ select),
/* harmony export */   "selectAll": () => (/* binding */ selectAll),
/* harmony export */   "transform": () => (/* binding */ transform)
/* harmony export */ });
function ensureImported(element, target) {

  if (element.ownerDocument !== target.ownerDocument) {
    try {
      // may fail on webkit
      return target.ownerDocument.importNode(element, true);
    } catch (e) {
      // ignore
    }
  }

  return element;
}

/**
 * appendTo utility
 */

/**
 * Append a node to a target element and return the appended node.
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} target
 *
 * @return {SVGElement} the appended node
 */
function appendTo(element, target) {
  return target.appendChild(ensureImported(element, target));
}

/**
 * append utility
 */

/**
 * Append a node to an element
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the element
 */
function append(target, node) {
  appendTo(node, target);
  return target;
}

/**
 * attribute accessor utility
 */

var LENGTH_ATTR = 2;

var CSS_PROPERTIES = {
  'alignment-baseline': 1,
  'baseline-shift': 1,
  'clip': 1,
  'clip-path': 1,
  'clip-rule': 1,
  'color': 1,
  'color-interpolation': 1,
  'color-interpolation-filters': 1,
  'color-profile': 1,
  'color-rendering': 1,
  'cursor': 1,
  'direction': 1,
  'display': 1,
  'dominant-baseline': 1,
  'enable-background': 1,
  'fill': 1,
  'fill-opacity': 1,
  'fill-rule': 1,
  'filter': 1,
  'flood-color': 1,
  'flood-opacity': 1,
  'font': 1,
  'font-family': 1,
  'font-size': LENGTH_ATTR,
  'font-size-adjust': 1,
  'font-stretch': 1,
  'font-style': 1,
  'font-variant': 1,
  'font-weight': 1,
  'glyph-orientation-horizontal': 1,
  'glyph-orientation-vertical': 1,
  'image-rendering': 1,
  'kerning': 1,
  'letter-spacing': 1,
  'lighting-color': 1,
  'marker': 1,
  'marker-end': 1,
  'marker-mid': 1,
  'marker-start': 1,
  'mask': 1,
  'opacity': 1,
  'overflow': 1,
  'pointer-events': 1,
  'shape-rendering': 1,
  'stop-color': 1,
  'stop-opacity': 1,
  'stroke': 1,
  'stroke-dasharray': 1,
  'stroke-dashoffset': 1,
  'stroke-linecap': 1,
  'stroke-linejoin': 1,
  'stroke-miterlimit': 1,
  'stroke-opacity': 1,
  'stroke-width': LENGTH_ATTR,
  'text-anchor': 1,
  'text-decoration': 1,
  'text-rendering': 1,
  'unicode-bidi': 1,
  'visibility': 1,
  'word-spacing': 1,
  'writing-mode': 1
};


function getAttribute(node, name) {
  if (CSS_PROPERTIES[name]) {
    return node.style[name];
  } else {
    return node.getAttributeNS(null, name);
  }
}

function setAttribute(node, name, value) {
  var hyphenated = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  var type = CSS_PROPERTIES[hyphenated];

  if (type) {
    // append pixel unit, unless present
    if (type === LENGTH_ATTR && typeof value === 'number') {
      value = String(value) + 'px';
    }

    node.style[hyphenated] = value;
  } else {
    node.setAttributeNS(null, name, value);
  }
}

function setAttributes(node, attrs) {

  var names = Object.keys(attrs), i, name;

  for (i = 0, name; (name = names[i]); i++) {
    setAttribute(node, name, attrs[name]);
  }
}

/**
 * Gets or sets raw attributes on a node.
 *
 * @param  {SVGElement} node
 * @param  {Object} [attrs]
 * @param  {String} [name]
 * @param  {String} [value]
 *
 * @return {String}
 */
function attr(node, name, value) {
  if (typeof name === 'string') {
    if (value !== undefined) {
      setAttribute(node, name, value);
    } else {
      return getAttribute(node, name);
    }
  } else {
    setAttributes(node, name);
  }

  return node;
}

/**
 * Clear utility
 */
function index(arr, obj) {
  if (arr.indexOf) {
    return arr.indexOf(obj);
  }


  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) {
      return i;
    }
  }

  return -1;
}

var re = /\s+/;

var toString = Object.prototype.toString;

function defined(o) {
  return typeof o !== 'undefined';
}

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

function classes(el) {
  return new ClassList(el);
}

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name) {

  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) {
    arr.push(name);
  }

  if (defined(this.el.className.baseVal)) {
    this.el.className.baseVal = arr.join(' ');
  } else {
    this.el.className = arr.join(' ');
  }

  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name) {
  if ('[object RegExp]' === toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) {
    arr.splice(i, 1);
  }
  this.el.className.baseVal = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re) {
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force) {
  // classList
  if (this.list) {
    if (defined(force)) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if (defined(force)) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function() {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) {
    arr.shift();
  }
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name) {
  return (
    this.list ?
      this.list.contains(name) :
      !! ~index(this.array(), name)
  );
};

function remove(element) {
  var parent = element.parentNode;

  if (parent) {
    parent.removeChild(element);
  }

  return element;
}

/**
 * Clear utility
 */

/**
 * Removes all children from the given element
 *
 * @param  {DOMElement} element
 * @return {DOMElement} the element (for chaining)
 */
function clear(element) {
  var child;

  while ((child = element.firstChild)) {
    remove(child);
  }

  return element;
}

function clone(element) {
  return element.cloneNode(true);
}

var ns = {
  svg: 'http://www.w3.org/2000/svg'
};

/**
 * DOM parsing utility
 */

var SVG_START = '<svg xmlns="' + ns.svg + '"';

function parse(svg) {

  var unwrap = false;

  // ensure we import a valid svg document
  if (svg.substring(0, 4) === '<svg') {
    if (svg.indexOf(ns.svg) === -1) {
      svg = SVG_START + svg.substring(4);
    }
  } else {
    // namespace svg
    svg = SVG_START + '>' + svg + '</svg>';
    unwrap = true;
  }

  var parsed = parseDocument(svg);

  if (!unwrap) {
    return parsed;
  }

  var fragment = document.createDocumentFragment();

  var parent = parsed.firstChild;

  while (parent.firstChild) {
    fragment.appendChild(parent.firstChild);
  }

  return fragment;
}

function parseDocument(svg) {

  var parser;

  // parse
  parser = new DOMParser();
  parser.async = false;

  return parser.parseFromString(svg, 'text/xml');
}

/**
 * Create utility for SVG elements
 */


/**
 * Create a specific type from name or SVG markup.
 *
 * @param {String} name the name or markup of the element
 * @param {Object} [attrs] attributes to set on the element
 *
 * @returns {SVGElement}
 */
function create(name, attrs) {
  var element;

  if (name.charAt(0) === '<') {
    element = parse(name).firstChild;
    element = document.importNode(element, true);
  } else {
    element = document.createElementNS(ns.svg, name);
  }

  if (attrs) {
    attr(element, attrs);
  }

  return element;
}

/**
 * Events handling utility
 */

function on(node, event, listener, useCapture) {
  node.addEventListener(event, listener, useCapture);
}

function off(node, event, listener, useCapture) {
  node.removeEventListener(event, listener, useCapture);
}

/**
 * Geometry helpers
 */

// fake node used to instantiate svg geometry elements
var node = null;

function getNode() {
  if (node === null) {
    node = create('svg');
  }

  return node;
}

function extend(object, props) {
  var i, k, keys = Object.keys(props);

  for (i = 0; (k = keys[i]); i++) {
    object[k] = props[k];
  }

  return object;
}


function createPoint(x, y) {
  var point = getNode().createSVGPoint();

  switch (arguments.length) {
  case 0:
    return point;
  case 2:
    x = {
      x: x,
      y: y
    };
    break;
  }

  return extend(point, x);
}

/**
 * Create matrix via args.
 *
 * @example
 *
 * createMatrix({ a: 1, b: 1 });
 * createMatrix();
 * createMatrix(1, 2, 0, 0, 30, 20);
 *
 * @return {SVGMatrix}
 */
function createMatrix(a, b, c, d, e, f) {
  var matrix = getNode().createSVGMatrix();

  switch (arguments.length) {
  case 0:
    return matrix;
  case 1:
    return extend(matrix, a);
  case 6:
    return extend(matrix, {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f
    });
  }
}

function createTransform(matrix) {
  if (matrix) {
    return getNode().createSVGTransformFromMatrix(matrix);
  } else {
    return getNode().createSVGTransform();
  }
}

/**
 * Serialization util
 */

var TEXT_ENTITIES = /([&<>]{1})/g;
var ATTR_ENTITIES = /([\n\r"]{1})/g;

var ENTITY_REPLACEMENT = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '\''
};

function escape(str, pattern) {

  function replaceFn(match, entity) {
    return ENTITY_REPLACEMENT[entity] || entity;
  }

  return str.replace(pattern, replaceFn);
}

function serialize(node, output) {

  var i, len, attrMap, attrNode, childNodes;

  switch (node.nodeType) {
  // TEXT
  case 3:
    // replace special XML characters
    output.push(escape(node.textContent, TEXT_ENTITIES));
    break;

  // ELEMENT
  case 1:
    output.push('<', node.tagName);

    if (node.hasAttributes()) {
      attrMap = node.attributes;
      for (i = 0, len = attrMap.length; i < len; ++i) {
        attrNode = attrMap.item(i);
        output.push(' ', attrNode.name, '="', escape(attrNode.value, ATTR_ENTITIES), '"');
      }
    }

    if (node.hasChildNodes()) {
      output.push('>');
      childNodes = node.childNodes;
      for (i = 0, len = childNodes.length; i < len; ++i) {
        serialize(childNodes.item(i), output);
      }
      output.push('</', node.tagName, '>');
    } else {
      output.push('/>');
    }
    break;

  // COMMENT
  case 8:
    output.push('<!--', escape(node.nodeValue, TEXT_ENTITIES), '-->');
    break;

  // CDATA
  case 4:
    output.push('<![CDATA[', node.nodeValue, ']]>');
    break;

  default:
    throw new Error('unable to handle node ' + node.nodeType);
  }

  return output;
}

/**
 * innerHTML like functionality for SVG elements.
 * based on innerSVG (https://code.google.com/p/innersvg)
 */


function set(element, svg) {

  var parsed = parse(svg);

  // clear element contents
  clear(element);

  if (!svg) {
    return;
  }

  if (!isFragment(parsed)) {
    // extract <svg> from parsed document
    parsed = parsed.documentElement;
  }

  var nodes = slice(parsed.childNodes);

  // import + append each node
  for (var i = 0; i < nodes.length; i++) {
    appendTo(nodes[i], element);
  }

}

function get(element) {
  var child = element.firstChild,
      output = [];

  while (child) {
    serialize(child, output);
    child = child.nextSibling;
  }

  return output.join('');
}

function isFragment(node) {
  return node.nodeName === '#document-fragment';
}

function innerSVG(element, svg) {

  if (svg !== undefined) {

    try {
      set(element, svg);
    } catch (e) {
      throw new Error('error parsing SVG: ' + e.message);
    }

    return element;
  } else {
    return get(element);
  }
}


function slice(arr) {
  return Array.prototype.slice.call(arr);
}

/**
 * Selection utilities
 */

function select(node, selector) {
  return node.querySelector(selector);
}

function selectAll(node, selector) {
  var nodes = node.querySelectorAll(selector);

  return [].map.call(nodes, function(element) {
    return element;
  });
}

/**
 * prependTo utility
 */

/**
 * Prepend a node to a target element and return the prepended node.
 *
 * @param  {SVGElement} node
 * @param  {SVGElement} target
 *
 * @return {SVGElement} the prepended node
 */
function prependTo(node, target) {
  return target.insertBefore(ensureImported(node, target), target.firstChild || null);
}

/**
 * prepend utility
 */

/**
 * Prepend a node to a target element
 *
 * @param  {SVGElement} target
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the target element
 */
function prepend(target, node) {
  prependTo(node, target);
  return target;
}

/**
 * Replace utility
 */

function replace(element, replacement) {
  element.parentNode.replaceChild(ensureImported(replacement, element), element);
  return replacement;
}

/**
 * transform accessor utility
 */

function wrapMatrix(transformList, transform) {
  if (transform instanceof SVGMatrix) {
    return transformList.createSVGTransformFromMatrix(transform);
  }

  return transform;
}


function setTransforms(transformList, transforms) {
  var i, t;

  transformList.clear();

  for (i = 0; (t = transforms[i]); i++) {
    transformList.appendItem(wrapMatrix(transformList, t));
  }
}

/**
 * Get or set the transforms on the given node.
 *
 * @param {SVGElement} node
 * @param  {SVGTransform|SVGMatrix|Array<SVGTransform|SVGMatrix>} [transforms]
 *
 * @return {SVGTransform} the consolidated transform
 */
function transform(node, transforms) {
  var transformList = node.transform.baseVal;

  if (transforms) {

    if (!Array.isArray(transforms)) {
      transforms = [ transforms ];
    }

    setTransforms(transformList, transforms);
  }

  return transformList.consolidate();
}




/***/ }),

/***/ "./resources/qa.json":
/*!***************************!*\
  !*** ./resources/qa.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"QualityAssurance","uri":"http://some-company/schema/bpmn/qa","prefix":"qa","xml":{"tagAlias":"lowerCase"},"types":[{"name":"AnalyzedNode","extends":["bpmn:FlowNode"],"properties":[{"name":"suitable","isAttr":true,"type":"Float"}]},{"name":"AnalysisDetails","superClass":["Element"],"properties":[{"name":"lastChecked","isAttr":true,"type":"String"},{"name":"nextCheck","isAttr":true,"type":"String"},{"name":"comments","isMany":true,"type":"Comment"}]},{"name":"Comment","properties":[{"name":"author","isAttr":true,"type":"String"},{"name":"text","isBody":true,"type":"String"}]}],"emumerations":[],"associations":[]}');

/***/ }),

/***/ "./resources/zakenModdle.json":
/*!************************************!*\
  !*** ./resources/zakenModdle.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"vng","uri":"http://some-company/schema/bpmn/vng","prefix":"vng","xml":{"tagAlias":"lowerCase"},"types":[{"name":"zaken","superClass":["bpmn:ServiceTask"]}],"emumerations":[],"associations":[]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers */ "./node_modules/camunda-modeler-plugin-helpers/index.js");
/* harmony import */ var _CustomContextPad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomContextPad */ "./client/CustomContextPad.js");
/* harmony import */ var _CustomContextPad__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CustomContextPad__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CustomPalette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomPalette */ "./client/CustomPalette.js");
/* harmony import */ var _CustomPalette__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CustomPalette__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CustomRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomRenderer */ "./client/CustomRenderer.js");
/* harmony import */ var _LoggingPlugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoggingPlugin */ "./client/LoggingPlugin.js");
/* harmony import */ var _resources_zakenModdle_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../resources/zakenModdle.json */ "./resources/zakenModdle.json");
/* harmony import */ var _resources_qa_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../resources/qa.json */ "./resources/qa.json");















// Specify the module using a unique name
// Use __init__ to make sure an instance will be created
// export default {
//   __init__: [ 'loggingPlugin', 'CustomPalette', 'CustomContextPad' ],
//   loggingPlugin: [ 'type', LoggingPlugin ],
//   CustomPalette: [ 'type', CustomPalette ],
//   CustomContextPad: [ 'type', CustomContextPad ]
// };


// Register a plugin for bpmn-js
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)(_LoggingPlugin__WEBPACK_IMPORTED_MODULE_4__["default"]);
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)((_CustomContextPad__WEBPACK_IMPORTED_MODULE_1___default()));
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)((_CustomPalette__WEBPACK_IMPORTED_MODULE_2___default()));
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)(_CustomRenderer__WEBPACK_IMPORTED_MODULE_3__["default"]);
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSModdleExtension)(_resources_zakenModdle_json__WEBPACK_IMPORTED_MODULE_5__);
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSModdleExtension)(_resources_qa_json__WEBPACK_IMPORTED_MODULE_6__);




})();

/******/ })()
;
//# sourceMappingURL=client.bundle.js.map