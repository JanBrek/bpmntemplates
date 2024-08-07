import { registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';

import LoggingPlugin from './LoggingPlugin';

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



