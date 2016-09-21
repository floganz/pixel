angular.module('pixel-app').controller('campaignController', ['$mdDialog', '$mdMedia',
	function ($mdDialog, $mdMedia) {

		var vm = this;
    // vm.scope = $scope;
    
    vm.edit = function(id) {
      vm.type = "edit";
      if (vm.camp.show) {
        vm.camp.show = false
      }
      else {
        vm.opened.show = false;
        vm.camp.show = true
        vm.opened = vm.camp;
      }
      vm.campaign = angular.copy(vm.camp);
      console.log("edit " + id)
    };

    vm.editRecord = function (id,data) {
      // console.log(id);
      // console.log(data);
      vm.opened.show = !vm.opened.show;
      vm.camp = data;
      // console.log("edit record " + id + " data " + data)
    };

    vm.delete = function (id) {
      // vm.scope.$emit('deleteRecord', id);
      vm.onDelete({ id: id });
      // console.log("delete " + id)
    };

    vm.cancel = function () {
      vm.camp.show = false;
    	vm.onCancel();
      // console.log("cancel")
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
