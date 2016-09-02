angular.module('pixel-app').component('myForm', {
  bindings: {
  	type: '<',
    campaign: '<',
    onUpdate: '&',
    onCancel: '&'
  },
  templateUrl:'pixel-app/form/my-form.html',
  controller: 'myFormController'
});