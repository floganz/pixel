angular.module('pixel-app').controller('navController', ['$state',
	function ($state) {

    var vm = this;
    vm.$state = $state;
    vm.displayCamp = false;

    vm.tab = function (tab) {
      vm.onChange({tab: tab});
    };

    vm.active = function(val) {
      if(vm.$state.is('sign_in') || vm.$state.is('sign_up')) {
        return true;
      } else {
        if( vm.$state.is('campaign')) {
          vm.displayCamp = true;
          vm.selectedIndex  = 1;
        } else {
          vm.displayCamp = false;
        }
        if ( vm.$state.is('dashboard')) {
          vm.selectedIndex  = 0;
        }
        if ( vm.$state.is('new_campaign')) {
          vm.selectedIndex  = 1;
        }
        return false;
      }
    };
    
    vm.logout = function () {
      vm.onLogout();
    }
  }
]);
