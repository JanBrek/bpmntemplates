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