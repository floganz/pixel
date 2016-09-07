angular.module('pixel-app').component('myDashboard', {
  bindings: {
  	onLogout: '&'
  },
  templateUrl:'pixel-app/dashboard/my-dashboard.html',
  controller: 'dashboardController'
});