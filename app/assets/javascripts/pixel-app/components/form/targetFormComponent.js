angular.module('pixel-app').component('targetForm', {
  bindings: {
  	type: '<',
    target: '<',
    onUpdate: '&',
    onCancel: '&'
  },
  templateUrl:'pixel-app/components/form/target-form.html',
  controller: 'targetFormController'
});