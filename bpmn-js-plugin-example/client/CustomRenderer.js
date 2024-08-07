
//import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
//const { BaseRenderer } = require('diagram-js/lib/draw/BaseRenderer'); 
//import { BaseRenderer } from 'diagram-js/lib/draw/BaseRenderer';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
//import 'diagram-js/lib/draw/BaseRenderer';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import { append as svgAppend, create as svgCreate } from "tiny-svg";


const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2;

class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }
  
  canRender(element) {
    // only render tasks and events (ignore labels)
    return isAny(element, [ 'vng:zaken' ]) && !element.labelTarget;
  }
  
  drawShape(parentNode, element) {
	
	if (element.type === "vng:zaken") {
      const rect = svgCreate("rect");

      rect.setAttribute("width", element.width);
      rect.setAttribute("height", element.height);
      rect.setAttribute("stroke", "black");
      rect.setAttribute("fill", "white");
      rect.setAttribute("stroke-width", 2);
	  
	  svgAppend(parentNode, rect);
	
	  const rect2 = svgCreate("image");

      rect2.setAttribute("width", element.width / 3);
      rect2.setAttribute("height", element.height / 3);
      rect2.setAttribute("x", 0);
      rect2.setAttribute("y", 0);
	  //rect2.setAttribute("border", "1px red solid");
	  //rect2.setAttribute("z-index", "1000");
	  rect2.setAttribute("href", "data:image/png;base64,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");

      svgAppend(parentNode, rect2);

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


export default {
  __init__: [ 'CustomRenderer' ],
  CustomRenderer: [ 'type', CustomRenderer ]
};

// module.exports = {
//     __init__: ['CustomRenderer'],
//     CustomRenderer: ['type', CustomRenderer]
// };


//  rect.setAttribute("href", "data:image/png;base64,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");