angular.module('pixel-app').component('targetRecord', {
  bindings: {
    targ: '<',
    opened: "=",
    onUpdate: '&',
    onDelete: '&',
    onCancel: '&'
  },
  templateUrl:'pixel-app/target/target-record.html',
  controller: 'targetController'
});