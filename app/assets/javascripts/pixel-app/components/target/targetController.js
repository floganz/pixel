angular.module('pixel-app').controller('targetController', ['$location','$mdDialog', '$mdMedia',
	function ($location, $mdDialog, $mdMedia) {

		var vm = this;
    // vm.host = $location.protocol() + "://" + $location.host();
    vm.host = $location.protocol() + "://" + $location.host() + ":" + $location.port();
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
    
    vm.edit = function(id) {
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

    vm.editRecord = function (id,data) {
      vm.opened.show = !vm.opened.show;
      vm.targ.name = data.name;
    };

    vm.delete = function (id) {
      vm.onDelete({id: id});
    };

    vm.cancel = function () {
      vm.targ.show = false;
    	vm.onCancel();
    };

    vm.showAdvanced = function(ev, record, del) {
      $mdDialog.show({
        controller: 'modalController as $ctrl',
        templateUrl: 'pixel-app/components/modal/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          camp: record,
          del: del
        },
        clickOutsideToClose:true
      })
      .then(function(answer) {
        // console.log(answer);
      }, function() {
        // console.log("cancel");
      });
    };
	}
]);
