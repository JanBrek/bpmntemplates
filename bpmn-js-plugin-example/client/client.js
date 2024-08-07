import { registerBpmnJSModdleExtension } from 'camunda-modeler-plugin-helpers';
import { registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';

import CustomRenderer from './CustomRenderer';

import LoggingPlugin from './LoggingPlugin';

import ModdleExtension from '../resources/zakenModdle.json';
import qaExtension from '../resources/qa.json';



// Specify the module using a unique name
// Use __init__ to make sure an instance will be created
// export default {
//   __init__: [ 'loggingPlugin', 'CustomPalette', 'CustomContextPad' ],
//   loggingPlugin: [ 'type', LoggingPlugin ],
//   CustomPalette: [ 'type', CustomPalette ],
//   CustomContextPad: [ 'type', CustomContextPad ]
// };


// Register a plugin for bpmn-js
registerBpmnJSPlugin(LoggingPlugin);
registerBpmnJSPlugin(CustomContextPad);
registerBpmnJSPlugin(CustomPalette);
registerBpmnJSPlugin(CustomRenderer);
registerBpmnJSModdleExtension(ModdleExtension);
registerBpmnJSModdleExtension(qaExtension);



