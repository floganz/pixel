angular.module('pixel-app').controller('campaignController', ['dataservice', '$scope','$routeParams',
	function (dataservice, $scope, $routeParams) {

		var vm = this;
    vm.scope = $scope;
    // vm.opened = $scope.opened;
    // if ($routeParams.id) {
    //   console.log($routeParams.id)
    //   // var obj =  vm.unis.filter(function(obj) {
    //   //   return obj.id == $routeParams.id;
    //   // });
    //   // var i =  vm.unis.indexOf(obj[0]);
    //   dataservice.getCampaign($routeParams.id).then(function(data) {
    //     vm.camp = data;
    //     dataservice.getTargets(vm.camp.id).then(function(data) {
    //       vm.camp.targets = data;
    //     });
    //   });
    // }
    
    this.edit = function(id) {
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

    this.editRecord = function (id,data) {
      // console.log(id);
      // console.log(data);
      vm.opened.show = !vm.opened.show;
      vm.camp = data;
      // console.log("edit record " + id + " data " + data)
    };

    this.delete = function (id) {
      vm.scope.$emit('deleteRecord', id);
      // console.log("delete " + id)
    };

    this.more = function (id) {
      // console.log("more " + id)
    }

    this.cancel = function () {
      vm.camp.show = false;
    	vm.onCancel();
      // console.log("cancel")
    };
	}
]);
