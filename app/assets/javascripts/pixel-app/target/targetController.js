angular.module('pixel-app').controller('targetController', ['dataservice', '$scope','$routeParams','$location',
	function (dataservice, $scope, $routeParams, $location) {

		var vm = this;
    vm.scope = $scope;
    vm.host = $location.protocol() + "://" + $location.host();
    vm.visits_chart = {
      labels: ["visits", "unique visits"],
      options: {
        responsive: true
      },
      legend: {
        labels: ["visits", "unique visits"]
      }
    }
    vm.visits_chart.data = [vm.targ.visits, vm.targ.unique];
    vm.browser_chart = {
      labels: ["IE", "Chrome", "Mozilla", "Safari", "Opera"],
      options: {
        responsive: true
      }
    }
    vm.browser_chart.data = [vm.targ.ie, vm.targ.chrome, vm.targ.mozilla, vm.targ.safari, vm.targ.opera];
    
    this.edit = function(id) {
      vm.type = "edit";
      if (vm.targ.show) {
        vm.targ.show = false
      }
      else {
        vm.opened.show = false;
        vm.targ.show = true
        vm.opened = vm.targ;
      }
      vm.target = angular.copy(vm.targ);
    };

    this.editRecord = function (id,data) {
      vm.opened.show = !vm.opened.show;
      vm.targ.name = data.name;
    };

    this.delete = function (id) {
      vm.onDelete({id: id});
    };

    this.cancel = function () {
      vm.targ.show = false;
    	vm.onCancel();
    };
	}
]);
