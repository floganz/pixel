angular.module('pixel-app').controller('targetController', ['dataservice', '$scope','$routeParams',
	function (dataservice, $scope, $routeParams) {

		var vm = this;
    vm.scope = $scope;
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
      // console.log("editTarget " + id)
    };

    this.editRecord = function (id,data) {
      vm.opened.show = !vm.opened.show;
      vm.targ = data;
      // console.log("edit record T " + id + " data " + data)
    };

    this.delete = function (id) {
      vm.onDelete({id: id});
      // console.log("delete T" + id)
    };

    this.cancel = function () {
      vm.targ.show = false;
    	vm.onCancel();
      // console.log("cancel T")
    };
	}
]);
