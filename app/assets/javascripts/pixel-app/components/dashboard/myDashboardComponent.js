angular.module('pixel-app').component('myDashboard', {
  bindings: {
  	onChange: '&',
  	onLogout: '&'
  },
  templateUrl:'pixel-app/components/dashboard/my-dashboard.html',
  controller: 'myDashboardController'
});