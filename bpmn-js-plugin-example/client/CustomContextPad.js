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