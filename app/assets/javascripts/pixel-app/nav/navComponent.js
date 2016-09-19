angular.module('pixel-app').component('nav', {
  bindings: {
  	logged: '<',
  	solo: '<',
    stat: '<',
    selected: '<',
  	onChange: '&',
  	onLogout: '&',
  	onNew: '&',
  	onCancel: '&'
  },
  templateUrl:'pixel-app/nav/nav.html',
  controller: 'navController'
});