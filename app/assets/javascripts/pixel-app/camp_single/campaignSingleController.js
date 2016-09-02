angular.module('pixel-app').controller('campaignSingleController', ['dataservice', '$scope','$routeParams',
	function (dataservice, $scope, $routeParams) {

		var vm = this;
    vm.scope = $scope;
    vm.opened = vm;
    // vm.opened = $scope.opened;
    if ($routeParams.id) {
      console.log($routeParams.id)
      // var obj =  vm.unis.filter(function(obj) {
      //   return obj.id == $routeParams.id;
      // });
      // var i =  vm.unis.indexOf(obj[0]);
      dataservice.getCampaign($routeParams.id).then(function(data) {
        vm.camp = data;
        dataservice.getTargets(vm.camp.id).then(function(data) {
          vm.camp.targets = data;
        });
      });
    }
    
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

    this.editTarget = function(id) {
      vm.type = "edit";
      if (vm.t.show) {
        vm.t.show = false
      }
      else {
        vm.opened.show = false;
        vm.t.show = true
        vm.opened = vm.t;
      }
      vm.target = angular.copy(vm.t);
      console.log("editTarget " + id)
    };

    this.editRecord = function (id,data) {
      // console.log(id);
      // console.log(data);
      vm.opened.show = !vm.opened.show;
      vm.camp = data;
      console.log("edit record " + id + " data " + data)
    };

    this.delete = function (id) {
      vm.scope.$emit('deleteRecord', id);
      console.log("delete " + id)
    };

    this.more = function (id) {
      console.log("more " + id)
    }

    this.cancel = function () {
      vm.camp.show = false;
    	vm.onCancel();
      console.log("cancel")
    };

    this.addTarget = function (newValue, camp_id) {
      newValue.campaign_id = camp_id;
      console.log(newValue);
      dataservice.createTarget(newValue).then(function(data) {
        data.target.count = 0
        vm.camp.targets.unshift(data.target)
      });
    };

    this.destroy = function (id) {
      var obj =  vm.camp.targets.filter(function(obj) {
        return obj.id == id;
      });
      var i =  vm.camp.targets.indexOf(obj[0]);
      //console.log(id);
      dataservice.destroyTarget(id).then(function(id) {
        vm.camp.targets.splice(i, 1);
      });

    };
	}
]);
