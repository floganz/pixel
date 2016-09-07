angular.module('pixel-app').controller('navController', ['dataservice',
	function (dataservice) {

    var vm = this;

    this.tab = function (tab) {
      vm.onChange({tab: tab});
    };
    
    this.logout = function () {
      vm.onLogout();
    }

    this.new = function () {
      vm.onNew();
    }

    this.cancel = function () {
      vm.onCancel();
    }
  }
]);
