angular.module('pixel-app').component('myDashboard', {
  bindings: {
  	onChange: '&',
  	onLogout: '&'
  },
  templateUrl:'pixel-app/dashboard/my-dashboard.html',
  controller: 'dashboardController'
});