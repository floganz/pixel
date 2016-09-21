angular.module('pixel-app').component('campaignRecord', {
  bindings: {
    camp: '<',
    opened: "=",
    onUpdate: '&',
    onCancel: '&',
    onDelete: '&'
  },
  templateUrl:'pixel-app/components/campaign/campaign-record.html',
  controller: 'campaignController'
});