angular.module('pixel-app').controller('navController', ['dataservice',
	function (dataservice) {

    var vm = this;

    if ( vm.selected ) {
      // console.log(tabs[current]);
      // console.log(vm.selectedIndex + " " + vm.selected);
      vm.selectedIndex = vm.selected;
    }

    vm.tab = function (tab) {
      vm.onChange({tab: tab});
    };
    
    vm.logout = function () {
      vm.onLogout();
    }

    vm.new = function () {
      vm.onNew();
    }

    vm.cancel = function () {
      vm.onCancel();
    }
  }
]);
