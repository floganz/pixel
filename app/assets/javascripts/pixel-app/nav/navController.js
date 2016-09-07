angular.module('pixel-app').controller('navController', ['dataservice',
	function (dataservice) {

    var vm = this;

    if ( vm.selected ) {
      // console.log(tabs[current]);
      console.log(vm.selectedIndex + " " + vm.selected);
      vm.selectedIndex = vm.selected;
    }

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
