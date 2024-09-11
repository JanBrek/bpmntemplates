/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/CustomContextPad.js":
/*!************************************!*\
  !*** ./client/CustomContextPad.js ***!
  \************************************/
/***/ ((module) => {

class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, bpmnFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
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
      bpmnFactory,
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
  'bpmnFactory',
  'injector',
  'translate'
];

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
	    //console.log('the shape', shape);


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
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");
/* harmony import */ var bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/util/ModelingUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var bpmn_js_lib_draw_BpmnRenderUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bpmn-js/lib/draw/BpmnRenderUtil */ "./node_modules/bpmn-js/lib/draw/BpmnRenderUtil.js");
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-svg */ "./node_modules/tiny-svg/dist/index.esm.js");

//import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
//const { BaseRenderer } = require('diagram-js/lib/draw/BaseRenderer'); 
//import { BaseRenderer } from 'diagram-js/lib/draw/BaseRenderer';

//import 'diagram-js/lib/draw/BaseRenderer';













const HIGH_PRIORITY = 1500,
  TASK_BORDER_RADIUS = 2;

class CustomRenderer extends diagram_js_lib_draw_BaseRenderer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(eventBus, bpmnRenderer, textRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
    this.textRenderer = textRenderer
  }

  canRender(element) {
    // only render tasks and events (ignore labels)
    return (0,bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_1__.isAny)(element, ['vng:zaken']) && !element.labelTarget;
  }

  drawShape(parentNode, element) {

    if (element.type === "vng:zaken") {

      // Main block
      const rect = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("rect");
      rect.setAttribute("width", element.width);
      rect.setAttribute("height", element.height);
      rect.setAttribute("stroke", "black");
      rect.setAttribute("fill", "white");
      rect.setAttribute("stroke-width", 2);

      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(parentNode, rect);

      // Render text from name
      renderEmbeddedLabel(parentNode, element, 'center-middle', this.textRenderer);

      //console.log('parent', parentNode);

      // Image in the top corner
      const rect2 = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.create)("image");
      rect2.setAttribute("width", element.width / 3);
      rect2.setAttribute("height", element.height / 3);
      rect2.setAttribute("x", 0);
      rect2.setAttribute("y", 0);
      //rect2.setAttribute("border", "1px red solid");
      //rect2.setAttribute("z-index", "1000");
	  rect2.setAttribute("href", "data:image/png;base64,	  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");
      //rect2.setAttribute("href", "data:image/png;base64,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");

      (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(parentNode, rect2);

      return rect;
    }
  }

  getName(element) {
    return element.name
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
  }
}

function renderLabel(parentGfx, label, textRenderer, attrs = {}) {
  attrs = (0,min_dash__WEBPACK_IMPORTED_MODULE_3__.assign)({
    size: {
      width: 100
    }
  }, attrs);

  var text = textRenderer.createText(label || '', attrs);

  (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.classes)(text).add('djs-label');

  (0,tiny_svg__WEBPACK_IMPORTED_MODULE_2__.append)(parentGfx, text);

  return text;
}

function renderEmbeddedLabel(parentGfx, element, align, textRenderer, attrs = {}) {
  var semantic = (0,bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element);

  var box = (0,bpmn_js_lib_draw_BpmnRenderUtil__WEBPACK_IMPORTED_MODULE_4__.getBounds)({
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height
  }, attrs);

  return renderLabel(parentGfx, semantic.name, textRenderer, {
    align,
    box,
    padding: 7,
    style: {
      fill: "#000"
    }
  });
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer', 'textRenderer'];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __init__: ['CustomRenderer'],
  CustomRenderer: ['type', CustomRenderer]
});


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

/***/ "./node_modules/bpmn-js/lib/draw/BpmnRenderUtil.js":
/*!*********************************************************!*\
  !*** ./node_modules/bpmn-js/lib/draw/BpmnRenderUtil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   black: () => (/* binding */ black),
/* harmony export */   getBounds: () => (/* binding */ getBounds),
/* harmony export */   getCirclePath: () => (/* binding */ getCirclePath),
/* harmony export */   getDi: () => (/* reexport safe */ _util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__.getDi),
/* harmony export */   getDiamondPath: () => (/* binding */ getDiamondPath),
/* harmony export */   getFillColor: () => (/* binding */ getFillColor),
/* harmony export */   getHeight: () => (/* binding */ getHeight),
/* harmony export */   getLabelColor: () => (/* binding */ getLabelColor),
/* harmony export */   getRectPath: () => (/* binding */ getRectPath),
/* harmony export */   getRoundRectPath: () => (/* binding */ getRoundRectPath),
/* harmony export */   getSemantic: () => (/* reexport safe */ _util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__.getBusinessObject),
/* harmony export */   getStrokeColor: () => (/* binding */ getStrokeColor),
/* harmony export */   getWidth: () => (/* binding */ getWidth),
/* harmony export */   isCollection: () => (/* binding */ isCollection),
/* harmony export */   isThrowEvent: () => (/* binding */ isThrowEvent),
/* harmony export */   isTypedEvent: () => (/* binding */ isTypedEvent),
/* harmony export */   white: () => (/* binding */ white)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");
/* harmony import */ var _util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ModelUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diagram-js/lib/util/RenderUtil */ "./node_modules/diagram-js/lib/util/RenderUtil.js");







/**
 * @typedef {import('../model').ModdleElement} ModdleElement
 * @typedef {import('../model').Element} Element
 *
 * @typedef {import('../model').ShapeLike} ShapeLike
 *
 * @typedef {import('diagram-js/lib/util/Types').Dimensions} Dimensions
 * @typedef {import('diagram-js/lib/util/Types').Rect} Rect
 */

// re-export for compatibility



var black = 'hsl(225, 10%, 15%)';
var white = 'white';

// element utils //////////////////////

/**
 * Checks if eventDefinition of the given element matches with semantic type.
 *
 * @param {ModdleElement} event
 * @param {string} eventDefinitionType
 *
 * @return {boolean}
 */
function isTypedEvent(event, eventDefinitionType) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.some)(event.eventDefinitions, function(definition) {
    return definition.$type === eventDefinitionType;
  });
}

/**
 * Check if element is a throw event.
 *
 * @param {ModdleElement} event
 *
 * @return {boolean}
 */
function isThrowEvent(event) {
  return (event.$type === 'bpmn:IntermediateThrowEvent') || (event.$type === 'bpmn:EndEvent');
}

/**
 * Check if element is a throw event.
 *
 * @param {ModdleElement} element
 *
 * @return {boolean}
 */
function isCollection(element) {
  var dataObject = element.dataObjectRef;

  return element.isCollection || (dataObject && dataObject.isCollection);
}


// color access //////////////////////

/**
 * @param {Element} element
 * @param {string} [defaultColor]
 * @param {string} [overrideColor]
 *
 * @return {string}
 */
function getFillColor(element, defaultColor, overrideColor) {
  var di = (0,_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__.getDi)(element);

  return overrideColor || di.get('color:background-color') || di.get('bioc:fill') || defaultColor || white;
}

/**
 * @param {Element} element
 * @param {string} [defaultColor]
 * @param {string} [overrideColor]
 *
 * @return {string}
 */
function getStrokeColor(element, defaultColor, overrideColor) {
  var di = (0,_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__.getDi)(element);

  return overrideColor || di.get('color:border-color') || di.get('bioc:stroke') || defaultColor || black;
}

/**
 * @param {Element} element
 * @param {string} [defaultColor]
 * @param {string} [defaultStrokeColor]
 * @param {string} [overrideColor]
 *
 * @return {string}
 */
function getLabelColor(element, defaultColor, defaultStrokeColor, overrideColor) {
  var di = (0,_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__.getDi)(element),
      label = di.get('label');

  return overrideColor || (label && label.get('color:color')) || defaultColor ||
    getStrokeColor(element, defaultStrokeColor);
}

// cropping path customizations //////////////////////

/**
 * @param {ShapeLike} shape
 *
 * @return {string} path
 */
function getCirclePath(shape) {

  var cx = shape.x + shape.width / 2,
      cy = shape.y + shape.height / 2,
      radius = shape.width / 2;

  var circlePath = [
    [ 'M', cx, cy ],
    [ 'm', 0, -radius ],
    [ 'a', radius, radius, 0, 1, 1, 0, 2 * radius ],
    [ 'a', radius, radius, 0, 1, 1, 0, -2 * radius ],
    [ 'z' ]
  ];

  return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_2__.componentsToPath)(circlePath);
}

/**
 * @param {ShapeLike} shape
 * @param {number} [borderRadius]
 *
 * @return {string} path
 */
function getRoundRectPath(shape, borderRadius) {

  var x = shape.x,
      y = shape.y,
      width = shape.width,
      height = shape.height;

  var roundRectPath = [
    [ 'M', x + borderRadius, y ],
    [ 'l', width - borderRadius * 2, 0 ],
    [ 'a', borderRadius, borderRadius, 0, 0, 1, borderRadius, borderRadius ],
    [ 'l', 0, height - borderRadius * 2 ],
    [ 'a', borderRadius, borderRadius, 0, 0, 1, -borderRadius, borderRadius ],
    [ 'l', borderRadius * 2 - width, 0 ],
    [ 'a', borderRadius, borderRadius, 0, 0, 1, -borderRadius, -borderRadius ],
    [ 'l', 0, borderRadius * 2 - height ],
    [ 'a', borderRadius, borderRadius, 0, 0, 1, borderRadius, -borderRadius ],
    [ 'z' ]
  ];

  return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_2__.componentsToPath)(roundRectPath);
}

/**
 * @param {ShapeLike} shape
 *
 * @return {string} path
 */
function getDiamondPath(shape) {

  var width = shape.width,
      height = shape.height,
      x = shape.x,
      y = shape.y,
      halfWidth = width / 2,
      halfHeight = height / 2;

  var diamondPath = [
    [ 'M', x + halfWidth, y ],
    [ 'l', halfWidth, halfHeight ],
    [ 'l', -halfWidth, halfHeight ],
    [ 'l', -halfWidth, -halfHeight ],
    [ 'z' ]
  ];

  return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_2__.componentsToPath)(diamondPath);
}

/**
 * @param {ShapeLike} shape
 *
 * @return {string} path
 */
function getRectPath(shape) {
  var x = shape.x,
      y = shape.y,
      width = shape.width,
      height = shape.height;

  var rectPath = [
    [ 'M', x, y ],
    [ 'l', width, 0 ],
    [ 'l', 0, height ],
    [ 'l', -width, 0 ],
    [ 'z' ]
  ];

  return (0,diagram_js_lib_util_RenderUtil__WEBPACK_IMPORTED_MODULE_2__.componentsToPath)(rectPath);
}

/**
 * Get width and height from element or overrides.
 *
 * @param {Dimensions|Rect|ShapeLike} bounds
 * @param {Object} overrides
 *
 * @returns {Dimensions}
 */
function getBounds(bounds, overrides = {}) {
  return {
    width: getWidth(bounds, overrides),
    height: getHeight(bounds, overrides)
  };
}

/**
 * Get width from element or overrides.
 *
 * @param {Dimensions|Rect|ShapeLike} bounds
 * @param {Object} overrides
 *
 * @returns {number}
 */
function getWidth(bounds, overrides = {}) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.has)(overrides, 'width') ? overrides.width : bounds.width;
}

/**
 * Get height from element or overrides.
 *
 * @param {Dimensions|Rect|ShapeLike} bounds
 * @param {Object} overrides
 *
 * @returns {number}
 */
function getHeight(bounds, overrides = {}) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_1__.has)(overrides, 'height') ? overrides.height : bounds.height;
}

/***/ }),

/***/ "./node_modules/bpmn-js/lib/util/ModelUtil.js":
/*!****************************************************!*\
  !*** ./node_modules/bpmn-js/lib/util/ModelUtil.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBusinessObject: () => (/* binding */ getBusinessObject),
/* harmony export */   getDi: () => (/* binding */ getDi),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isAny: () => (/* binding */ isAny)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");


/**
 * @typedef { import('../model/Types').Element } Element
 * @typedef { import('../model/Types').ModdleElement } ModdleElement
 */

/**
 * Is an element of the given BPMN type?
 *
 * @param  {Element|ModdleElement} element
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
 * @param {Element|ModdleElement} element
 * @param {string[]} types
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
 * @param {Element|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

/**
 * Return the di object for a given element.
 *
 * @param {Element} element
 *
 * @return {ModdleElement}
 */
function getDi(element) {
  return element && element.di;
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
/* harmony export */   getModelerDirectory: () => (/* binding */ getModelerDirectory),
/* harmony export */   getPluginsDirectory: () => (/* binding */ getPluginsDirectory),
/* harmony export */   registerBpmnJSModdleExtension: () => (/* binding */ registerBpmnJSModdleExtension),
/* harmony export */   registerBpmnJSPlugin: () => (/* binding */ registerBpmnJSPlugin),
/* harmony export */   registerClientExtension: () => (/* binding */ registerClientExtension),
/* harmony export */   registerClientPlugin: () => (/* binding */ registerClientPlugin),
/* harmony export */   registerCloudBpmnJSModdleExtension: () => (/* binding */ registerCloudBpmnJSModdleExtension),
/* harmony export */   registerCloudBpmnJSPlugin: () => (/* binding */ registerCloudBpmnJSPlugin),
/* harmony export */   registerCloudDmnJSModdleExtension: () => (/* binding */ registerCloudDmnJSModdleExtension),
/* harmony export */   registerCloudDmnJSPlugin: () => (/* binding */ registerCloudDmnJSPlugin),
/* harmony export */   registerDmnJSModdleExtension: () => (/* binding */ registerDmnJSModdleExtension),
/* harmony export */   registerDmnJSPlugin: () => (/* binding */ registerDmnJSPlugin),
/* harmony export */   registerPlatformBpmnJSModdleExtension: () => (/* binding */ registerPlatformBpmnJSModdleExtension),
/* harmony export */   registerPlatformBpmnJSPlugin: () => (/* binding */ registerPlatformBpmnJSPlugin),
/* harmony export */   registerPlatformDmnJSModdleExtension: () => (/* binding */ registerPlatformDmnJSModdleExtension),
/* harmony export */   registerPlatformDmnJSPlugin: () => (/* binding */ registerPlatformDmnJSPlugin)
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
 * Validate and register a cloud specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudDmnJSModdleExtension
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
 * registerCloudDmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformDmnJSModdleExtension
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
 * registerPlatformDmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.platform.modeler.moddleExtension');
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
 * Validate and register a cloud specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerCloudDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerCloudDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.cloud.modeler.${c}.additionalModules`));
}

/**
 * Validate and register a platform specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerPlatformDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerPlatformDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.platform.modeler.${c}.additionalModules`));
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
 * @typedef {import('../core/Types').ElementLike} Element
 * @typedef {import('../core/Types').ConnectionLike} Connection
 * @typedef {import('../core/Types').ShapeLike} Shape
 *
 * @typedef {import('../core/EventBus').default} EventBus
 */

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

  eventBus.on([ 'render.getShapePath', 'render.getConnectionPath' ], renderPriority, function(evt, element) {
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
 * Checks whether an element can be rendered.
 *
 * @param {Element} element The element to be rendered.
 *
 * @return {boolean} Whether the element can be rendered.
 */
BaseRenderer.prototype.canRender = function(element) {};

/**
 * Draws a shape.
 *
 * @param {SVGElement} visuals The SVG element to draw the shape into.
 * @param {Shape} shape The shape to be drawn.
 *
 * @return {SVGElement} The SVG element of the shape drawn.
 */
BaseRenderer.prototype.drawShape = function(visuals, shape) {};

/**
 * Draws a connection.
 *
 * @param {SVGElement} visuals The SVG element to draw the connection into.
 * @param {Connection} connection The connection to be drawn.
 *
 * @return {SVGElement} The SVG element of the connection drawn.
 */
BaseRenderer.prototype.drawConnection = function(visuals, connection) {};

/**
 * Gets the SVG path of the graphical representation of a shape.
 *
 * @param {Shape} shape The shape.
 *
 * @return {string} The SVG path of the shape.
 */
BaseRenderer.prototype.getShapePath = function(shape) {};

/**
 * Gets the SVG path of the graphical representation of a connection.
 *
 * @param {Connection} connection The connection.
 *
 * @return {string} The SVG path of the connection.
 */
BaseRenderer.prototype.getConnectionPath = function(connection) {};


/***/ }),

/***/ "./node_modules/diagram-js/lib/util/RenderUtil.js":
/*!********************************************************!*\
  !*** ./node_modules/diagram-js/lib/util/RenderUtil.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentsToPath: () => (/* binding */ componentsToPath),
/* harmony export */   createLine: () => (/* binding */ createLine),
/* harmony export */   toSVGPoints: () => (/* binding */ toSVGPoints),
/* harmony export */   updateLine: () => (/* binding */ updateLine)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");
/* harmony import */ var tiny_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-svg */ "./node_modules/tiny-svg/dist/index.esm.js");





/**
 * @typedef {(string|number)[]} Component
 *
 * @typedef {import('../util/Types').Point} Point
 */

/**
 * @param {Component[] | Component[][]} elements
 *
 * @return {string}
 */
function componentsToPath(elements) {
  return elements.flat().join(',').replace(/,?([A-z]),?/g, '$1');
}

/**
 * @param {Point[]} points
 *
 * @return {string}
 */
function toSVGPoints(points) {
  var result = '';

  for (var i = 0, p; (p = points[i]); i++) {
    result += p.x + ',' + p.y + ' ';
  }

  return result;
}

/**
 * @param {Point} point
 *
 * @return {Component[]}
 */
function move(point) {
  return [ 'M', point.x, point.y ];
}

/**
 * @param {Point} point
 *
 * @return {Component[]}
 */
function lineTo(point) {
  return [ 'L', point.x, point.y ];
}

/**
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 *
 * @return {Component[]}
 */
function curveTo(p1, p2, p3) {
  return [ 'C', p1.x, p1.y, p2.x, p2.y, p3.x, p3.y ];
}

/**
 * @param {Point[]} waypoints
 * @param {number} [cornerRadius]
 * @return {Component[][]}
 */
function drawPath(waypoints, cornerRadius) {
  const pointCount = waypoints.length;

  const path = [ move(waypoints[0]) ];

  for (let i = 1; i < pointCount; i++) {

    const pointBefore = waypoints[i - 1];
    const point = waypoints[i];
    const pointAfter = waypoints[i + 1];

    if (!pointAfter || !cornerRadius) {
      path.push(lineTo(point));

      continue;
    }

    const effectiveRadius = Math.min(
      cornerRadius,
      vectorLength(point.x - pointBefore.x, point.y - pointBefore.y),
      vectorLength(pointAfter.x - point.x, pointAfter.y - point.y)
    );

    if (!effectiveRadius) {
      path.push(lineTo(point));

      continue;
    }

    const beforePoint = getPointAtLength(point, pointBefore, effectiveRadius);
    const beforePoint2 = getPointAtLength(point, pointBefore, effectiveRadius * .5);

    const afterPoint = getPointAtLength(point, pointAfter, effectiveRadius);
    const afterPoint2 = getPointAtLength(point, pointAfter, effectiveRadius * .5);

    path.push(lineTo(beforePoint));
    path.push(curveTo(beforePoint2, afterPoint2, afterPoint));
  }

  return path;
}

function getPointAtLength(start, end, length) {

  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  const totalLength = vectorLength(deltaX, deltaY);

  const percent = length / totalLength;

  return {
    x: start.x + deltaX * percent,
    y: start.y + deltaY * percent
  };
}

function vectorLength(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * @param {Point[]} points
 * @param {number|Object} [attrs]
 * @param {number} [radius]
 *
 * @return {SVGElement}
 */
function createLine(points, attrs, radius) {

  if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isNumber)(attrs)) {
    radius = attrs;
    attrs = null;
  }

  if (!attrs) {
    attrs = {};
  }

  const line = (0,tiny_svg__WEBPACK_IMPORTED_MODULE_1__.create)('path', attrs);

  if ((0,min_dash__WEBPACK_IMPORTED_MODULE_0__.isNumber)(radius)) {
    line.dataset.cornerRadius = String(radius);
  }

  return updateLine(line, points);
}

/**
 * @param {SVGElement} gfx
 * @param {Point[]} points
 *
 * @return {SVGElement}
 */
function updateLine(gfx, points) {

  const cornerRadius = parseInt(gfx.dataset.cornerRadius, 10) || 0;

  (0,tiny_svg__WEBPACK_IMPORTED_MODULE_1__.attr)(gfx, {
    d: componentsToPath(drawPath(points, cornerRadius))
  });

  return gfx;
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
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   appendTo: () => (/* binding */ appendTo),
/* harmony export */   attr: () => (/* binding */ attr),
/* harmony export */   classes: () => (/* binding */ classes),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   createMatrix: () => (/* binding */ createMatrix),
/* harmony export */   createPoint: () => (/* binding */ createPoint),
/* harmony export */   createTransform: () => (/* binding */ createTransform),
/* harmony export */   innerSVG: () => (/* binding */ innerSVG),
/* harmony export */   off: () => (/* binding */ off),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   prepend: () => (/* binding */ prepend),
/* harmony export */   prependTo: () => (/* binding */ prependTo),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   select: () => (/* binding */ select),
/* harmony export */   selectAll: () => (/* binding */ selectAll),
/* harmony export */   transform: () => (/* binding */ transform)
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
 * Taken from https://github.com/component/classes
 *
 * Without the component bits.
 */

/**
 * toString reference.
 */

const toString = Object.prototype.toString;

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
  this.list.add(name);
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
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  this.list.remove(name);
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
  const arr = this.array();
  for (let i = 0; i < arr.length; i++) {
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
  if ('undefined' !== typeof force) {
    if (force !== this.list.toggle(name, force)) {
      this.list.toggle(name); // toggle again to correct
    }
  } else {
    this.list.toggle(name);
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
  return Array.from(this.list);
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
   return this.list.contains(name);
 };

/**
 * Clear utility
 */

/**
 * Removes all children from the given element
 *
 * @param  {SVGElement} element
 * @return {Element} the element (for chaining)
 */
function clear(element) {
  var child;

  while ((child = element.firstChild)) {
    element.removeChild(child);
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

  name = name.trim();

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

function remove(element) {
  var parent = element.parentNode;

  if (parent) {
    parent.removeChild(element);
  }

  return element;
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

/***/ "./node_modules/min-dash/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/min-dash/dist/index.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   bind: () => (/* binding */ bind),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   ensureArray: () => (/* binding */ ensureArray),
/* harmony export */   every: () => (/* binding */ every),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findIndex: () => (/* binding */ findIndex),
/* harmony export */   flatten: () => (/* binding */ flatten),
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   groupBy: () => (/* binding */ groupBy),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isDefined: () => (/* binding */ isDefined),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNil: () => (/* binding */ isNil),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   matchPattern: () => (/* binding */ matchPattern),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   reduce: () => (/* binding */ reduce),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   some: () => (/* binding */ some),
/* harmony export */   sortBy: () => (/* binding */ sortBy),
/* harmony export */   throttle: () => (/* binding */ throttle),
/* harmony export */   unionBy: () => (/* binding */ unionBy),
/* harmony export */   uniqueBy: () => (/* binding */ uniqueBy),
/* harmony export */   values: () => (/* binding */ values),
/* harmony export */   without: () => (/* binding */ without)
/* harmony export */ });
/**
 * Flatten array, one level deep.
 *
 * @template T
 *
 * @param {T[][] | T[] | null} [arr]
 *
 * @return {T[]}
 */
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

const nativeToString = Object.prototype.toString;
const nativeHasOwnProperty = Object.prototype.hasOwnProperty;

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

/**
 * @param {any} obj
 *
 * @return {boolean}
 */
function isFunction(obj) {
  const tag = nativeToString.call(obj);

  return (
    tag === '[object Function]' ||
    tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' ||
    tag === '[object AsyncGeneratorFunction]' ||
    tag === '[object Proxy]'
  );
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
 * @template T
 * @typedef { (
 *   ((e: T) => boolean) |
 *   ((e: T, idx: number) => boolean) |
 *   ((e: T, key: string) => boolean) |
 *   string |
 *   number
 * ) } Matcher
 */

/**
 * @template T
 * @template U
 *
 * @typedef { (
 *   ((e: T) => U) | string | number
 * ) } Extractor
 */


/**
 * @template T
 * @typedef { (val: T, key: any) => boolean } MatchFn
 */

/**
 * @template T
 * @typedef { T[] } ArrayCollection
 */

/**
 * @template T
 * @typedef { { [key: string]: T } } StringKeyValueCollection
 */

/**
 * @template T
 * @typedef { { [key: number]: T } } NumberKeyValueCollection
 */

/**
 * @template T
 * @typedef { StringKeyValueCollection<T> | NumberKeyValueCollection<T> } KeyValueCollection
 */

/**
 * @template T
 * @typedef { KeyValueCollection<T> | ArrayCollection<T> } Collection
 */

/**
 * Find element in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {Object}
 */
function find(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let match;

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      match = val;

      return false;
    }
  });

  return match;

}


/**
 * Find element index in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {number}
 */
function findIndex(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let idx = isArray(collection) ? -1 : undefined;

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      idx = key;

      return false;
    }
  });

  return idx;
}


/**
 * Filter elements in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {T[]} result
 */
function filter(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let result = [];

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      result.push(val);
    }
  });

  return result;
}


/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param { ((item: T, idx: number) => (boolean|void)) | ((item: T, key: string) => (boolean|void)) } iterator
 *
 * @return {T} return result that stopped the iteration
 */
function forEach(collection, iterator) {

  let val,
      result;

  if (isUndefined(collection)) {
    return;
  }

  const convertKey = isArray(collection) ? toNum : identity;

  for (let key in collection) {

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
 * @template T
 * @param {ArrayCollection<T>} arr
 * @param {Matcher<T>} matcher
 *
 * @return {T[]}
 */
function without(arr, matcher) {

  if (isUndefined(arr)) {
    return [];
  }

  ensureArray(arr);

  const matchFn = toMatcher(matcher);

  return arr.filter(function(el, idx) {
    return !matchFn(el, idx);
  });

}


/**
 * Reduce collection, returning a single result.
 *
 * @template T
 * @template V
 *
 * @param {Collection<T>} collection
 * @param {(result: V, entry: T, index: any) => V} iterator
 * @param {V} result
 *
 * @return {V} result returned from last iterator
 */
function reduce(collection, iterator, result) {

  forEach(collection, function(value, idx) {
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

  return !!reduce(collection, function(matches, val, key) {
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

  let result = [];

  forEach(collection, function(val, key) {
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
  return map(collection, (val) => val);
}


/**
 * Group collection members by attribute.
 *
 * @param {Object|Array} collection
 * @param {Extractor} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */
function groupBy(collection, extractor, grouped = {}) {

  extractor = toExtractor(extractor);

  forEach(collection, function(val) {
    let discriminator = extractor(val) || '_';

    let group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });

  return grouped;
}


function uniqueBy(extractor, ...collections) {

  extractor = toExtractor(extractor);

  let grouped = {};

  forEach(collections, (c) => groupBy(c, extractor, grouped));

  let result = map(grouped, function(val, key) {
    return val[0];
  });

  return result;
}


const unionBy = uniqueBy;



/**
 * Sort collection by criteria.
 *
 * @template T
 *
 * @param {Collection<T>} collection
 * @param {Extractor<T, number | string>} extractor
 *
 * @return {Array}
 */
function sortBy(collection, extractor) {

  extractor = toExtractor(extractor);

  let sorted = [];

  forEach(collection, function(value, key) {
    let disc = extractor(value, key);

    let entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      let { d } = sorted[idx];

      if (disc < d) {
        sorted.splice(idx, 0, entry);
        return;
      }
    }

    // not inserted, append (!)
    sorted.push(entry);
  });

  return map(sorted, (e) => e.v);
}


/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * ```javascript
 * const matcher = matchPattern({ id: 1 });
 *
 * let element = find(elements, matcher);
 * ```
 *
 * @template T
 *
 * @param {T} pattern
 *
 * @return { (el: any) =>  boolean } matcherFn
 */
function matchPattern(pattern) {

  return function(el) {

    return every(pattern, function(val, key) {
      return el[key] === val;
    });

  };
}


/**
 * @param {string | ((e: any) => any) } extractor
 *
 * @return { (e: any) => any }
 */
function toExtractor(extractor) {

  /**
   * @satisfies { (e: any) => any }
   */
  return isFunction(extractor) ? extractor : (e) => {

    // @ts-ignore: just works
    return e[extractor];
  };
}


/**
 * @template T
 * @param {Matcher<T>} matcher
 *
 * @return {MatchFn<T>}
 */
function toMatcher(matcher) {
  return isFunction(matcher) ? matcher : (e) => {
    return e === matcher;
  };
}


function identity(arg) {
  return arg;
}

function toNum(arg) {
  return Number(arg);
}

/* global setTimeout clearTimeout */

/**
 * @typedef { {
 *   (...args: any[]): any;
 *   flush: () => void;
 *   cancel: () => void;
 * } } DebouncedFunction
 */

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
 * @return {DebouncedFunction} debounced function
 */
function debounce(fn, timeout) {

  let timer;

  let lastArgs;
  let lastThis;

  let lastNow;

  function fire(force) {

    let now = Date.now();

    let scheduledDiff = force ? 0 : (lastNow + timeout) - now;

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

  /**
   * @type { DebouncedFunction }
   */
  function callback(...args) {
    lastNow = Date.now();

    lastArgs = args;
    lastThis = this;

    // ensure an execution is scheduled
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
  let throttling = false;

  return function(...args) {

    if (throttling) {
      return;
    }

    fn(...args);
    throttling = true;

    setTimeout(() => {
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

/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */
function assign(target, ...others) {
  return Object.assign(target, ...others);
}

/**
 * Sets a nested property of a given object to the specified value.
 *
 * This mutates the object and returns it.
 *
 * @template T
 *
 * @param {T} target The target of the set operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} value The value to set.
 *
 * @return {T}
 */
function set(target, path, value) {

  let currentTarget = target;

  forEach(path, function(key, idx) {

    if (typeof key !== 'number' && typeof key !== 'string') {
      throw new Error('illegal key type: ' + typeof key + '. Key should be of type number or string.');
    }

    if (key === 'constructor') {
      throw new Error('illegal key: constructor');
    }

    if (key === '__proto__') {
      throw new Error('illegal key: __proto__');
    }

    let nextKey = path[idx + 1];
    let nextTarget = currentTarget[key];

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
 *
 * @return {any}
 */
function get(target, path, defaultValue) {

  let currentTarget = target;

  forEach(path, function(key) {

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
 * Pick properties from the given target.
 *
 * @template T
 * @template {any[]} V
 *
 * @param {T} target
 * @param {V} properties
 *
 * @return Pick<T, V>
 */
function pick(target, properties) {

  let result = {};

  let obj = Object(target);

  forEach(properties, function(prop) {

    if (prop in obj) {
      result[prop] = target[prop];
    }
  });

  return result;
}

/**
 * Pick all target properties, excluding the given ones.
 *
 * @template T
 * @template {any[]} V
 *
 * @param {T} target
 * @param {V} properties
 *
 * @return {Omit<T, V>} target
 */
function omit(target, properties) {

  let result = {};

  let obj = Object(target);

  forEach(obj, function(prop, key) {

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
function merge(target, ...sources) {

  if (!sources.length) {
    return target;
  }

  forEach(sources, function(source) {

    // skip non-obj sources, i.e. null
    if (!source || !isObject(source)) {
      return;
    }

    forEach(source, function(sourceVal, key) {

      if (key === '__proto__') {
        return;
      }

      let targetVal = target[key];

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

/***/ "./resources/qa.json":
/*!***************************!*\
  !*** ./resources/qa.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"QualityAssurance","uri":"http://some-company/schema/bpmn/qa","prefix":"qa","xml":{"tagAlias":"lowerCase"},"types":[{"name":"AnalyzedNode","extends":["bpmn:FlowNode"],"properties":[{"name":"suitable","isAttr":true,"type":"Float"}]},{"name":"AnalysisDetails","superClass":["Element"],"properties":[{"name":"lastChecked","isAttr":true,"type":"String"},{"name":"nextCheck","isAttr":true,"type":"String"},{"name":"comments","isMany":true,"type":"Comment"}]},{"name":"Comment","properties":[{"name":"author","isAttr":true,"type":"String"},{"name":"text","isBody":true,"type":"String"}]}],"emumerations":[],"associations":[]}');

/***/ }),

/***/ "./resources/zakenModdle.json":
/*!************************************!*\
  !*** ./resources/zakenModdle.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"vng","uri":"http://some-company/schema/bpmn/vng","prefix":"vng","xml":{"tagAlias":"lowerCase"},"types":[{"name":"zaken","superClass":["bpmn:ServiceTask"]},{"name":"zakenNew"}],"emumerations":[],"associations":[]}');

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