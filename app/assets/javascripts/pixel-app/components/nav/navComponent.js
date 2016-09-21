angular.module('pixel-app').component('nav', {
  bindings: {
  	onChange: '&',
  	onLogout: '&'
  },
  templateUrl:'pixel-app/components/nav/nav.html',
  controller: 'navController'
});