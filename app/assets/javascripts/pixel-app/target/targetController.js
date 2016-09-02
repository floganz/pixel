angular.module('pixel-app').controller('targetController', ['dataservice', '$scope','$routeParams',
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
      if (vm.targ.show) {
        vm.targ.show = false
      }
      else {
        vm.opened.show = false;
        vm.targ.show = true
        vm.opened = vm.targ;
      }
      vm.target = angular.copy(vm.targ);
      console.log("editTarget " + id)
    };

    this.editRecord = function (id,data) {
      // console.log(id);
      // console.log(data);
      vm.opened.show = !vm.opened.show;
      vm.targ = data;
      console.log("edit record T " + id + " data " + data)
    };

    this.delete = function (id) {
      // vm.scope.$emit('deleteRecord', id);
      vm.onDelete({id: id});
      console.log("delete T" + id)
    };

    this.cancel = function () {
      vm.targ.show = false;
    	vm.onCancel();
      console.log("cancel T")
    };
	}
]);
