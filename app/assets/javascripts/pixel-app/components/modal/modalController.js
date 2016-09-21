angular.module('pixel-app')
			 .controller('modalController', ['$mdDialog', 'camp', 'del',
	function ($mdDialog, camp, del) {
		
		var vm = this;
		vm.camp = camp;

	  vm.hide = function() {
	    $mdDialog.hide();
	  };

	  vm.cancel = function() {
	    $mdDialog.cancel();
	  };

	  vm.delete = function() {
	  	del(camp.id);
	    $mdDialog.hide();
	  };
}]);