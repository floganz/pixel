angular.module('pixel-app').component('campaignRecord', {
  bindings: {
    camp: '<',
    opened: "=",
    onUpdate: '&',
    onCancel: '&'
  },
  templateUrl:'pixel-app/campaign/campaign-record.html',
  controller: 'campaignController'
});